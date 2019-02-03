using CMS.Ecommerce;
using CMS.EmailEngine;
using CMS.ExtendedControls;
using CMS.Helpers;
using CMS.MacroEngine;
using CMS.Membership;
using CMS.PortalControls;
using CMS.SiteProvider;
using CMS.WebAnalytics;
using System;
using System.Web.UI.WebControls;

public partial class CMSWebParts_DEVCustom_Ecommerce_DEVWishlist : CMSAbstractWebPart
{
    #region "Variables"

    protected int mSKUId = 0;
    protected CurrentUserInfo currentUser = null;
    protected SiteInfo currentSite = null;
    protected bool mRemove = false;

    protected Button btnRemoveProduct = null;
    protected HiddenField hidProductID = null;
    protected HiddenField hidQuantity = null;
    protected string mTransformationName = "Wishlist.Transformations.WishList_ContentTable";

    #endregion "Variables"

    #region "Private properties"

    /// <summary>
    /// Gets or sets the page url which is related to 'continue shopping' action.
    /// </summary>
    private string PreviousPageUrl
    {
        get
        {
            object obj = ViewState["PreviousPageUrl"];
            return (obj != null) ? (string)obj : "~/";
        }
        set
        {
            ViewState["PreviousPageUrl"] = value;
        }
    }

    #endregion "Private properties"

    #region "Public properties"

    /// <summary>
    /// Gets or sets the name of the transforamtion which is used for displaying the results.
    /// </summary>
    public string TransformationName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("TransformationName"), mTransformationName);
        }
        set
        {
            SetValue("TransformationName", value);
        }
    }

    /// <summary>
    /// Gets or sets the separator (tetx, html code) which is displayed between displayed items.
    /// </summary>
    public string ItemSeparator
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ItemSeparator"), repeater.ItemSeparator);
        }
        set
        {
            SetValue("ItemSeparator", value);
            repeater.ItemSeparator = value;
        }
    }

    #endregion "Public properties"

    /// <summary>
    /// Content loaded event handler.
    /// </summary>
    public override void OnContentLoaded()
    {
        base.OnContentLoaded();
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
        }
        else
        {
            currentUser = MembershipContext.AuthenticatedUser;

            if (AuthenticationHelper.IsAuthenticated())
            {
                // Control initialization

                btnContinue.Text = GetString("Ecommerce.Wishlist.btnContinue");

                mSKUId = QueryHelper.GetInteger("productID", 0);
                currentSite = SiteContext.CurrentSite;

                // Set repeater transformation
                repeater.TransformationName = TransformationName;
                repeater.ItemSeparator = ItemSeparator;

                if ((currentUser != null) && (currentSite != null))
                {
                    if ((!RequestHelper.IsPostBack()) && (mSKUId > 0))
                    {
                        int addSKUId = mSKUId;

                        // Get added SKU info object from database
                        SKUInfo skuObj = SKUInfoProvider.GetSKUInfo(addSKUId);
                        if (skuObj != null)
                        {
                            // Can not add option as a product
                            if (skuObj.SKUOptionCategoryID > 0)
                            {
                                addSKUId = 0;
                            }
                            else if (!skuObj.IsGlobal)
                            {
                                // Site specific product must belong to the current site
                                if (skuObj.SKUSiteID != currentSite.SiteID)
                                {
                                    addSKUId = 0;
                                }
                            }
                            else
                            {
                                // Global products must be allowed when adding global product
                                if (!ECommerceSettings.AllowGlobalProducts(currentSite.SiteName))
                                {
                                    addSKUId = 0;
                                }
                            }
                        }

                        if (addSKUId > 0)
                        {
                            // Add specified product to the user's wishlist
                            WishlistItemInfoProvider.AddSKUToWishlist(currentUser.UserID, addSKUId, currentSite.SiteID);
                            LogProductAddedToWLActivity(addSKUId, ResHelper.LocalizeString(skuObj.SKUName));
                        }
                    }

                    if (mSKUId > 0)
                    {
                        // Remove product parameter from URL to avoid adding it next time
                        string newUrl = URLHelper.RemoveParameterFromUrl(RequestContext.CurrentURL, "productID");
                        URLHelper.Redirect(newUrl);
                    }
                }
            }
            else
            {
                // Hide control if current user is not authenticated
                Visible = false;
            }
        }
    }

    /// <summary>
    /// Child control creation.
    /// </summary>
    protected override void CreateChildControls()
    {
        // Add product button
        btnRemoveProduct = new CMSButton();
        btnRemoveProduct.Attributes["style"] = "display: none";
        Controls.Add(btnRemoveProduct);
        btnRemoveProduct.Click += new EventHandler(btnRemoveProduct_Click);

        // Add the hidden fields for productId
        hidProductID = new HiddenField();
        hidProductID.ID = "hidProductID";
        Controls.Add(hidProductID);

        base.CreateChildControls();
    }

    /// <summary>
    /// Load event handler.
    /// </summary>
    protected override void OnLoad(EventArgs e)
    {
        base.OnLoad(e);

        LoadData();
    }

    /// <summary>
    /// OnPreRender.
    /// </summary>
    protected override void OnPreRender(EventArgs e)
    {
        if (!StopProcessing)
        {
            // Register the dialog scripts
            ScriptHelper.RegisterClientScriptBlock(this, typeof(string), "RemoveProductFromWishlist",
                                                   ScriptHelper.GetScript(
                                                       "function setProduct(val) { document.getElementById('" + hidProductID.ClientID + "').value = val; } \n" +
                                                       "function RemoveFromWishlist(productId) { \n" +
                                                       "setProduct(productId); \n" +
                                                       ControlsHelper.GetPostBackEventReference(btnRemoveProduct, null) +
                                                       ";} \n"
                                                       ));
        }

        // Set previous page url
        if ((!RequestHelper.IsPostBack()) && (Request.UrlReferrer != null))
        {
            string path = URLHelper.GetAppRelativePath(Request.UrlReferrer);
            if (!URLHelper.IsExcludedSystem(path))
            {
                PreviousPageUrl = Request.UrlReferrer.AbsoluteUri;
            }
        }
        else
        {
            // Try to find the Previeous page in session
            string prevPage = ValidationHelper.GetString(SessionHelper.GetValue("ShoppingCartUrlReferrer"), "");
            if (!String.IsNullOrEmpty(prevPage))
            {
                PreviousPageUrl = prevPage;
            }
        }

        base.OnPreRender(e);
    }

    /// <summary>
    /// Removes product from wishlist.
    /// </summary>
    private void btnRemoveProduct_Click(object sender, EventArgs e)
    {
        if ((currentUser != null) && (currentSite != null))
        {
            // Remove specified product from the user's wishlist
            WishlistItemInfoProvider.RemoveSKUFromWishlist(currentUser.UserID, ValidationHelper.GetInteger(hidProductID.Value, 0), currentSite.SiteID);

            LoadData();
        }
    }

    /// <summary>
    /// Reload data.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();
        SetupControl();
    }

    /// <summary>
    /// Reloads data for wishlist.
    /// </summary>
    private void LoadData()
    {
        SetContext();
        pnlSuccess.Visible = false;
        if ((currentUser != null) && (currentSite != null))
        {
            repeater.DataSource = SKUInfoProvider.GetWishlistProducts(currentUser.UserID, currentSite.SiteID).TypedResult;
            repeater.DataBind();
        }

        // Show "Empty wishlist" message
        if (DataHelper.DataSourceIsEmpty(repeater.DataSource))
        {
            lblInfo.Visible = true;
            lblInfo.Text = GetString("Ecommerce.Wishlist.EmptyMessage");
        }

        ReleaseContext();
    }

    /// <summary>
    /// Continue shopping.
    /// </summary>
    protected void btnContinue_Click(object sender, EventArgs e)
    {
        URLHelper.Redirect(PreviousPageUrl);
    }

    /// <summary>
    /// Clears cache.
    /// </summary>
    public override void ClearCache()
    {
        repeater.ClearCache();
    }

    /// <summary>
    /// Logs activity
    /// </summary>
    /// <param name="skuId">SKU ID</param>
    /// <param name="skuName">Product name</param>
    private void LogProductAddedToWLActivity(int skuId, string skuName)
    {
        Activity activity = new ActivityProductAddedToWishlist(skuName, skuId, AnalyticsContext.ActivityEnvironmentVariables);
        activity.Log();
    }

    protected void btnSend_Click(object sender, EventArgs e)
    {
        MacroResolver resolver = MacroResolver.GetInstance();
        resolver.SetNamedSourceData("txtSender", txtSender.Text);
        resolver.SetNamedSourceData("txtRecipient", txtRecipient.Text);
        resolver.SetNamedSourceData("txtMessage", txtMessage.Text);
        resolver.SetNamedSourceData("ContentTable", SKUInfoProvider.GetWishlistProducts(currentUser.UserID, currentSite.SiteID).Result.Tables[0].Rows);
        resolver.Settings.EncodeResolvedValues = false;
        resolver.Settings.AllowContextMacros = true;

        EmailTemplateInfo eti = EmailTemplateProvider.GetEmailTemplate("Ecommerce.WishListEmail", CurrentSite.SiteID);

        EmailMessage em = new EmailMessage();
        em.EmailFormat = EmailFormatEnum.Both;
        em.From = "noreply@" + CurrentSite.DomainName.Replace("www.", "");
        em.Recipients = txtRecipientEmail.Text;

        EmailSender.SendEmailWithTemplateText(CurrentSite.SiteName, em, eti, resolver, true);
        pnlSuccess.Visible = true;
    }
}