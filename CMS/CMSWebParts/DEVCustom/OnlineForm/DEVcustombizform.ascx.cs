using System;
using System.Data;
using System.Linq;
using System.Collections;
using System.Collections.Generic;

using CMS.Helpers;
using CMS.Localization;
using CMS.PortalControls;
using CMS.SiteProvider;
using CMS.WebAnalytics;
using CMS.CustomTables;
using CMS.OnlineForms;
using Telerik.Web.UI;

public partial class CMSWebParts_DEVCustom_DEVcustombizform : CMSAbstractWebPart
{
    #region "Properties"

    /// <summary>
    /// Gets or sets the form name of BizForm.
    /// </summary>
    public string BizFormName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("BizFormName"), "");
        }
        set
        {
            SetValue("BizFormName", value);
        }
    }


    /// <summary>
    /// Gets or sets the alternative form full name (ClassName.AlternativeFormName).
    /// </summary>
    public string AlternativeFormName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("AlternativeFormName"), "");
        }
        set
        {
            SetValue("AlternativeFormName", value);
        }
    }


    /// <summary>
    /// Gets or sets the site name.
    /// </summary>
    public string SiteName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("SiteName"), "");
        }
        set
        {
            SetValue("SiteName", value);
        }
    }


    /// <summary>
    /// Gets or sets the value that indicates whether the WebPart use colon behind label.
    /// </summary>
    public bool UseColonBehindLabel
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("UseColonBehindLabel"), true);
        }
        set
        {
            SetValue("UseColonBehindLabel", value);
        }
    }


    /// <summary>
    /// Gets or sets the message which is displayed after validation failed.
    /// </summary>
    public string ValidationErrorMessage
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ValidationErrorMessage"), "");
        }
        set
        {
            SetValue("ValidationErrorMessage", value);
        }
    }


    /// <summary>
    /// Gets or sets the conversion track name used after successful registration.
    /// </summary>
    public string TrackConversionName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("TrackConversionName"), "");
        }
        set
        {
            if (value.Length > 400)
            {
                value = value.Substring(0, 400);
            }
            SetValue("TrackConversionName", value);
        }
    }


    /// <summary>
    /// Gets or sets the conversion value used after successful registration.
    /// </summary>
    public double ConversionValue
    {
        get
        {
            return ValidationHelper.GetDoubleSystem(GetValue("ConversionValue"), 0);
        }
        set
        {
            SetValue("ConversionValue", value);
        }
    }

    #endregion

    #region "Custom Properties"
    public bool MarkRequiredFields
    {
        get 
        {
            return ValidationHelper.GetBoolean(GetValue("MarkRequiredFields"), false);
        }
        set
        {
            SetValue("MarkRequiredFields", value);
        }
    }

    #endregion

    #region "Methods"

    protected override void OnLoad(EventArgs e)
    {
        viewBiz.OnBeforeSave += viewBiz_OnBeforeSave;
        viewBiz.OnAfterSave += viewBiz_OnAfterSave;
        base.OnLoad(e);
        if (!IsPostBack)
        {
            var existingCookie = CookieHelper.GetExistingCookie("subscribed-" + viewBiz.FormName);
            if (existingCookie == null)
            {
                RadAjaxPanel1.ResponseScripts.Add("$('#myModal').modal('show')");
            }
        }
        else
        {
            if (!viewBiz.ValidateData())
            {
                RadAjaxPanel1.ResponseScripts.Add("$('#myModal').modal('show')");
            }
            else
            {
               
            }


        }
    }


    /// <summary>
    /// Content loaded event handler.
    /// </summary>
    public override void OnContentLoaded()
    {
        base.OnContentLoaded();
        SetupControl();
    }


    /// <summary>
    /// Reloads data for partial caching.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();
        SetupControl();
        
    }


    /// <summary>
    /// Initializes the control properties.
    /// </summary>
    protected void SetupControl()
    {
        if (StopProcessing)
        {
            // Do nothing
            viewBiz.StopProcessing = true;
        }
        else
        {
            // Set BizForm properties
            viewBiz.FormName = BizFormName;
            viewBiz.SiteName = SiteName;
            viewBiz.UseColonBehindLabel = UseColonBehindLabel;
            viewBiz.AlternativeFormFullName = AlternativeFormName;
            viewBiz.ValidationErrorMessage = ValidationErrorMessage;
            viewBiz.MarkRequiredFields = MarkRequiredFields;
            // Set the live site context
            if (viewBiz != null)
            {
                viewBiz.ControlContext.ContextName = CMS.ExtendedControls.ControlContext.LIVE_SITE;
            }
        }
    }

    private void viewBiz_OnAfterSave(object sender, EventArgs e)
    {
        if (TrackConversionName != String.Empty)
        {
            string siteName = SiteContext.CurrentSiteName;

            if (AnalyticsHelper.AnalyticsEnabled(siteName) && !AnalyticsHelper.IsIPExcluded(siteName, RequestContext.UserHostAddress))
            {
                HitLogProvider.LogConversions(SiteContext.CurrentSiteName, LocalizationContext.PreferredCultureCode, TrackConversionName, 0, ConversionValue);
            }
        }

        CookieHelper.SetValue("subscribed-" + viewBiz.FormName, "yes", DateTime.Now.AddDays(30));
        RadAjaxPanel1.ResponseScripts.Add("$('#myModalThanks').modal('show')");
    }

    private void viewBiz_OnBeforeSave(object sender, EventArgs e)
    {
    }

    

    #endregion

}