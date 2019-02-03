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

    /// <summary>
    /// Gets or sets the Emails table name.
    /// </summary>
    public string EmailsTableName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("EmailsTableName"), "");
        }
        set
        {
            SetValue("EmailsTableName", value);
        }
    }

    /// <summary>
    /// Gets or sets the condition mapping field name.
    /// </summary>
    public string ConditionMappingField
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ConditionMappingField"), "");
        }
        set
        {
            SetValue("ConditionMappingField", value);
        }
    }

    /// <summary>
    /// Gets or sets the Emails mapping field name.
    /// </summary>
    public string EmailsMappingField
    {
        get
        {
            return ValidationHelper.GetString(GetValue("EmailsMappingField"), "");
        }
        set
        {
            SetValue("EmailsMappingField", value);
        }
    }

    /// <summary>
    /// Gets or sets the google event script after form validation.
    /// </summary>
    public string GoogleEventScript
    {
        get
        {
            //return DataHelper.GetNotEmpty(GetValue("GoogleEventScript"), null);
            return ValidationHelper.GetString(GetValue("GoogleEventScript"), null);
        }
        set
        {
            SetValue("GoogleEventScript", value);
        }
    }
    #endregion

    #region "Methods"

    protected override void OnLoad(EventArgs e)
    {
        viewBiz.OnAfterSave += viewBiz_OnAfterSave;
        base.OnLoad(e);
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

            if (AnalyticsHelper.AnalyticsEnabled(siteName) && AnalyticsHelper.TrackConversionsEnabled(siteName) && !AnalyticsHelper.IsIPExcluded(siteName, RequestContext.UserHostAddress))
            {
                HitLogProvider.LogConversions(SiteContext.CurrentSiteName, LocalizationContext.PreferredCultureCode, TrackConversionName, 0, ConversionValue);
            }
        }

        // Custom Code - google script after save
        if (!string.IsNullOrEmpty(GoogleEventScript))
        {
            // Adding Google event script after submit for validation
            bool dm = DisableMacros;

            // getting property value string without macro resolved 
            DisableMacros = true;
            string EventScript = GoogleEventScript;

            // roll back status
            DisableMacros = dm;

            EventScript = viewBiz.ResolveMacros(GoogleEventScript);

            //ScriptHelper.RegisterStartupScript(this, this.GetType(), "GoogleEvent", EventScript, true);

            RadAjaxPanel1.ResponseScripts.Add(EventScript);

        }

        // Custom Code - Email notification mapping with custom field and email address
        // Email mapping custom table fields must not be null to run custom mapping email notification.
        if (!string.IsNullOrEmpty(EmailsTableName) && !string.IsNullOrEmpty(ConditionMappingField) && !string.IsNullOrEmpty(EmailsMappingField))
        {
            // Condition Mapping field in the same name in both form and custom table.         

            DataSet dsEmails = CustomTableItemProvider.GetItems(EmailsTableName, ConditionMappingField + " = '" + ValidationHelper.GetString(viewBiz.Data.GetValue(ConditionMappingField), "") + "'", null, 0, EmailsMappingField);

            if (!DataHelper.DataSourceIsEmpty(dsEmails))
            {
                // Get BizFormInfo object
                BizFormInfo bi = BizFormInfoProvider.GetBizFormInfo(this.BizFormName, CurrentSite.SiteID);

                string stringEmails = ValidationHelper.GetString(dsEmails.Tables[0].Rows[0][0], string.Empty);

                if (!string.IsNullOrEmpty(stringEmails) && bi != null)
                {
                    viewBiz.SendNotificationEmail(bi.FormSendFromEmail, stringEmails, viewBiz.Data, bi);
                }
            }
        }
    }

    #endregion

}