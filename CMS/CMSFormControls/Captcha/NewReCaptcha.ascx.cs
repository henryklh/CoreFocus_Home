using System;
using CMS.Base;
using CMS.DataEngine;
using CMS.FormControls;
using CMS.Helpers;

public partial class CMSFormControls_Captcha_NewReCaptcha : FormEngineUserControl
{
    #region "Properties"

    /// <summary>
    /// The public site key from https://www.google.com/recaptcha/admin.
    /// </summary>
    public string SiteKey
    {
        get
        {
            var siteKey = ValidationHelper.GetString(GetValue("SiteKey"), "");

            if (string.IsNullOrEmpty(siteKey))
            {
                siteKey = SettingsKeyInfoProvider.GetValue("CMSReCaptchaPublicKey");
            }

            if (string.IsNullOrEmpty(siteKey))
            {
                siteKey = SettingsHelper.AppSettings["RecaptchaPublicKey"];
            }

            return siteKey;
        }
        set
        {
            SetValue("SiteKey", value);
        }
    }


    /// <summary>
    /// The private secret from https://www.google.com/recaptcha/admin.
    /// </summary>
    public string Secret
    {
        get
        {
            var secret = ValidationHelper.GetString(GetValue("Secret"), "");

            if (string.IsNullOrEmpty(secret))
            {
                secret = SettingsKeyInfoProvider.GetValue("CMSReCaptchaPrivateKey");
            }

            if (string.IsNullOrEmpty(secret))
            {
                secret = SettingsHelper.AppSettings["RecaptchaPrivateKey"];
            }

            return secret;
        }
        set
        {
            SetValue("Secret", value);
        }
    }


    /// <summary>
    /// Optional. The type of CAPTCHA to serve. Possible values are 'audio' and 'image'. Default is 'image'.
    /// </summary>
    public string DataType
    {
        get
        {
            return ValidationHelper.GetString(GetValue("DataType"), "");
        }
        set
        {
            SetValue("DataType", value);
        }
    }


    /// <summary>
    /// Gets or sets the enabled state of the control.
    /// </summary>
    public override bool Enabled
    {
        get
        {
            return base.Enabled;
        }
        set
        {
            base.Enabled = value;

            // Disable CAPTCHA control
            captcha.Enabled = value;
            captcha.Visible = value;

            if (FieldInfo != null)
            {
                FieldInfo.Visible = value;
            }
        }
    }


    /// <summary>
    /// Get or sets control value
    /// </summary>
    public override object Value
    {
        get
        {
            return null;
        }
        set
        {
        }
    }


    /// <summary>
    /// Indicates if validation of form control was successful
    /// </summary>
    public override bool IsValid()
    {
        captcha.Validate();
        return captcha.IsValid && base.IsValid();
    }


    /// <summary>
    /// Error message displayed when validation fails
    /// </summary>
    public override string ErrorMessage
    {
        get
        {
            return captcha.ErrorMessage;
        }
        set
        {
        }
    }


    /// <summary>
    /// Gets or sets reCaptcha theme.
    /// </summary>
    public string Theme
    {
        get
        {
            return ValidationHelper.GetString(GetValue("Theme"), "light");
        }
        set
        {
            SetValue("Theme", value);
        }
    }

    #endregion


    #region "Control methods"

    /// <summary>
    /// Page load event
    /// </summary>
    protected void Page_Load(object sender, EventArgs e)
    {
        captcha.SiteKey = SiteKey;
        captcha.Secret = Secret;
        captcha.DataType = DataType;
        captcha.Theme = Theme;
    }

    #endregion
}