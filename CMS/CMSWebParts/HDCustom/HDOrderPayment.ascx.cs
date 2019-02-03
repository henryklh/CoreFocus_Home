using System;
using System.Linq;
using System.Web.UI;
using System.Data;
using System.Collections.Generic;

using CMS.Base;
using CMS.Controls;

using CMS.Ecommerce;
using CMS.EcommerceProvider;
using CMS.ExtendedControls;
using CMS.Helpers;
using CMS.PortalControls;
using CMS.EventLog;
using CMS.PortalEngine;
using CMS.Membership;

public partial class CMSWebParts_HDCustom_HDOrderPayment : CMSAbstractWebPart
{
    #region "Variables"

    /// <summary>
    /// Payment gateway provider.
    /// </summary>
    private CMSPaymentGatewayProvider mPaymentGatewayProvider;
    private int orderId;
    private int ordernumber;
    private ShoppingCartInfo mShoppingCart;

    #endregion


    #region "Properties"

    private ShoppingCartInfo ShoppingCart
    {
        get
        {
            return mShoppingCart ?? (mShoppingCart = ShoppingCartInfoProvider.GetShoppingCartInfoFromOrder(orderId));
        }
    }


    /// <summary>
    /// Payment gateway provider instance.
    /// </summary>
    public CMSPaymentGatewayProvider PaymentGatewayProvider
    {
        get
        {
            if ((mPaymentGatewayProvider == null) && (ShoppingCart != null))
            {
                // Get payment gateway provider instance
                mPaymentGatewayProvider = CMSPaymentGatewayProvider.GetPaymentGatewayProvider(ShoppingCart.ShoppingCartPaymentOptionID);
            }

            return mPaymentGatewayProvider;
        }
        set
        {
            mPaymentGatewayProvider = value;
        }
    }


    /// <summary>
    /// Page where the user should be redirected after successful payment.
    /// </summary>
    public string RedirectAfterPurchase
    {
        get
        {
            return ValidationHelper.GetString(GetValue("RedirectAfterPurchase"), "");
        }
        set
        {
            SetValue("RedirectAfterPurchase", value);
        }
    }


    /// <summary>
    /// Button text to be displayed on Process payment button.
    /// </summary>
    public string ProcessPaymentButtonText
    {
        get
        {
            return ValidationHelper.GetString(GetValue("ProcessPaymentButtonText"), "");
        }
        set
        {
            SetValue("ProcessPaymentButtonText", value);
        }
    }

    public string CartContentTransformationName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("CartContentTransformationName"), "Hyper.Transformation.OrderCartContent");
        }
        set
        {
            SetValue("CartContentTransformationName", value);
        }
    }


    #endregion


    #region "Page methods"

    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);
        EnsureChildControls();
    }


    protected override void OnLoad(EventArgs e)
    {
        base.OnLoad(e);

        var isLiveSite = (PortalContext.ViewMode == ViewModeEnum.LiveSite) || IsLiveSite;
        // Allow provider initialization and redirection only for live site attempts
        if (isLiveSite && ((PaymentGatewayProvider == null) && (orderId > 0)))
        {
            URLHelper.Redirect(RedirectAfterPurchase);
        }

        btnProcessPayment.Text = ProcessPaymentButtonText;

        pnlPayment.Visible = false;

        // Cancel setup for undefined cart.
        if (ShoppingCart != null)
        {
            //ltlTest.Text = "ID: " + ShoppingCart.Order.OrderID + ", Inc: " + ShoppingCart.Order.OrderInvoiceNumber + ", Paid: " + ShoppingCart.Order.OrderIsPaid.ToString();
            // validate order for user
            if (ordernumber > 0)
            {
                if(!CMS.Membership.AuthenticationHelper.IsAuthenticated())
                {
                    return;
                }

                if (ShoppingCart.Order.OrderCompletedByUserID != CurrentUser.UserID)
                {
                    return;
                }
            }

            if (ShoppingCart.Order.OrderIsPaid)
            {

                return;
            }

            SetupControl();
        }
        
    }

    #endregion


    #region "Event handling"

    protected void btnProcessPayment_Click(object sender, EventArgs e)
    {
        //ltlMessage.Text = "btnProcessPayment_Click: ";
        //ltlTest.Text = "btnProcessPayment_Click";
        //return;

        //ltlTest.Text += "here 1 ";

        if ((PaymentGatewayProvider != null) && (orderId > 0))
        {
            // Validate data if web part is not placed in wizard
            if (!String.IsNullOrEmpty(PaymentGatewayProvider.ValidateCustomData()))
            {
                // Do not continue if validation failed

                //ltlTest.Text = "here 2 ";
                ltlMessage.Text += "<div class=\"ErrorLabel\">Sorry, your card payment cannot be processed:<ul>";
                ltlMessage.Text += PaymentGatewayProvider.ValidateCustomData() + "</ul></div>";
                return;
            }

            //ltlTest.Text = "here 3 ";

            PaymentGatewayProvider.ProcessCustomData();

            // Skip payment when already paid or user is not authorized
            if (!PaymentGatewayProvider.IsPaymentCompleted &&
                PaymentGatewayProvider.IsUserAuthorizedToFinishPayment(MembershipContext.AuthenticatedUser, ShoppingCart, !IsLiveSite))
            {
                // Process payment 
                //ltlTest.Text = "here 4 ";
                PaymentGatewayProvider.ProcessPayment();
            }

            // Show info message
            if (PaymentGatewayProvider.InfoMessage != "")
            {
                //ltlTest.Text = "here 5 ";
                lblInfo.Visible = true;
                lblInfo.Text = PaymentGatewayProvider.InfoMessage;
            }

            // Show error message
            if (PaymentGatewayProvider.ErrorMessage != "")
            {
                //ltlTest.Text = "here 6 ";
                ShowError(PaymentGatewayProvider.ErrorMessage);
            }

            // Redirect after successful payment
            if (PaymentGatewayProvider.IsPaymentCompleted && !string.IsNullOrEmpty(RedirectAfterPurchase))
            {
                URLHelper.Redirect(RedirectAfterPurchase);
            }
        }
    }

    #endregion


    #region "Wizard methods"

    /// <summary>
    /// Validates data.
    /// </summary>
    protected override void ValidateStepData(object sender, StepEventArgs e)
    {
        base.ValidateStepData(sender, e);

        if (!StopProcessing && (PaymentGatewayProvider != null))
        {
            if (PaymentGatewayProvider.ValidateCustomData() != "")
            {
                e.CancelEvent = true;
            }
        }
    }


    /// <summary>
    /// Saves the data.
    /// </summary>
    protected override void SaveStepData(object sender, StepEventArgs e)
    {
        base.SaveStepData(sender, e);

        if (PaymentGatewayProvider != null)
        {
            // Process inserted custom payment data from the payment form
            PaymentGatewayProvider.ProcessCustomData();
        }
    }

    #endregion


    #region "Methods"

    protected override void CreateChildControls()
    {
        string orderHash = QueryHelper.GetString("o", string.Empty);
        orderId = ValidationHelper.GetInteger(WindowHelper.GetItem(orderHash), 0);

        // use orderId directly for payment
        ordernumber = ValidationHelper.GetInteger(QueryHelper.GetString("orderpayment", string.Empty), 0);

        // only log in user can use order id to receive order for payment
        if (orderId == 0 && ordernumber > 0 && CMS.Membership.AuthenticationHelper.IsAuthenticated())
        {
            orderId = ordernumber;
        }

        base.CreateChildControls();

        var provider = PaymentGatewayProvider;
        if (provider != null)
        {
            try
            {
                // Init paymentDataContainer
                Control paymentDataForm = LoadControl(provider.GetPaymentDataFormPath());
                provider.InitializeGatewayControl(pnlPaymentDataContainer, paymentDataForm);
                provider.OrderId = orderId;
                
                //ltlTest.Text = provider.GetPaymentDataFormPath();
                
            }
            catch (Exception ex)
            {
                EventLogProvider.LogException("PaymentForm", "EXCEPTION", ex);
            }
        }
    }


    private void SetupControl()
    {

        pnlPayment.Visible = true;
        // bind payment method dropdownlist

        // Set up empty record text. The macro ResourcePrefix + .empty represents empty record value.
        drpPayment.UniSelector.ResourcePrefix = "com.livesiteselector";

        DataSet dsOptions;

        // Get correct payment options if shipping is set or not
        if (ShoppingCart.ShippingOption != null)
        {
            dsOptions = PaymentOptionInfoProvider.GetPaymentOptionsForShipping(ShoppingCart.ShippingOption.ShippingOptionID, true)
                                .Column("PaymentOptionID")
                                .OrderBy("PaymentOptionDisplayName");
        }
        else
        {
            dsOptions = PaymentOptionInfoProvider.GetPaymentOptions(ShoppingCart.ShoppingCartSiteID, true)
                                .Column("PaymentOptionID")
                                .WhereTrue("PaymentOptionAllowIfNoShipping")
                                .OrderBy("PaymentOptionDisplayName");
        }

        IList<int> paymentIds = new List<int>();

        if (!DataHelper.DataSourceIsEmpty(dsOptions))
        {
            paymentIds = DataHelper.GetIntegerValues(dsOptions.Tables[0], "PaymentOptionID");
        }

        // If there is only one payment method set it.
        if (paymentIds.Count == 1)
        {
            ShoppingCart.ShoppingCartPaymentOptionID = paymentIds.FirstOrDefault();
            drpPayment.SelectedID = ShoppingCart.ShoppingCartPaymentOptionID;
        }

        // Set selected shipping option to determine available payment options
        drpPayment.ShippingOptionID = ShoppingCart.ShoppingCartShippingOptionID;
        drpPayment.DisplayOnlyAllowedIfNoShipping = (drpPayment.ShippingOptionID <= 0);

        if ((ShoppingCart.ShoppingCartPaymentOptionID != 0) && !paymentIds.Contains(ShoppingCart.ShoppingCartPaymentOptionID))
        {
            // Reset selector on shipping changed event if selected payment is not allowed for current shipping (zero shipping id is Please select state).
            ResetSelector();
        }

        

        // Update selection
        if (!RequestHelper.IsPostBack())
        {
            PreselectPaymentOption();
        }

        drpPayment.Reload();

        // Payment and order summary
        lblTotalPriceValue.Text = CurrencyInfoProvider.GetFormattedPrice(ShoppingCart.RoundedTotalPrice, ShoppingCart.Currency);
        // Updated with CMS order view page.
        lblOrderIdValue.Text = "Your order number is " + Convert.ToString(orderId) + ".";
        //lblOrderIdValue.Text = "<a class=\"OrderSummaryLink\" href=\"/CMSModules/Ecommerce/CMSPages/GetInvoice.aspx?orderid=" + orderId + "\">" + orderId + "</a>";

        if (ShoppingCart.PaymentOption != null)
        {
            lblPaymentValue.Text = GetString(ShoppingCart.PaymentOption.PaymentOptionDisplayName);

            // adding sample card details
            var x = PaymentOptionInfoProvider.GetPaymentOptionInfo(ShoppingCart.ShoppingCartPaymentOptionID);

            if (x != null)
            {
                bool IsLivePayment = ValidationHelper.GetBoolean(CMS.DataEngine.SettingsKeyInfoProvider.GetBoolValue(CMS.SiteProvider.SiteContext.CurrentSiteName + ".HDeWayIsLive"), false);
                if (x.PaymentOptionClassName == "eWayRapidAPISoapProvider" && !IsLivePayment)
                {
                    cardSample.Visible = true;
                }
            }
        }

        // Payment form is visible only if payment method is selected
        if (PaymentGatewayProvider == null)
        {
            ShowError(GetString("com.checkout.paymentoptionnotselected"));
        }

        lblNote.Text = string.IsNullOrEmpty(ShoppingCart.Order.OrderNote) ? "No order comment." : ShoppingCart.Order.OrderNote;

        lblSubTotal.Text = CurrencyInfoProvider.GetFormattedPrice((ShoppingCart.Order.OrderTotalPrice - ShoppingCart.Order.OrderTotalTax - ShoppingCart.Order.OrderTotalShipping), ShoppingCart.Currency);
        lblTax.Text = CurrencyInfoProvider.GetFormattedPrice(ShoppingCart.Order.OrderTotalTax, ShoppingCart.Currency);
        lblDeliveryChargeValue.Text =  CurrencyInfoProvider.GetFormattedPrice(ShoppingCart.Order.OrderTotalShipping, ShoppingCart.Currency);

        //ltlTest.Text = "ShoppingCart.CartItems.Count: " + ShoppingCart.CartItems.Count.ToString();
        if (ShoppingCart.CartItems.Count > 0)
        {
            pnlCartContent.Visible = true;

            shoppingCartUniView.DataSource = new GroupedEnumerable<ShoppingCartItemInfo>(ShoppingCart.CartItems, GetKey, GetLevel);

            LoadTransformations();
        }
        
    }

    /// <summary>
    /// Resets the selector.
    /// </summary>
    protected void ResetSelector()
    {
        drpPayment.Reload();
        ShoppingCart.ShoppingCartPaymentOptionID = 0;
        drpPayment.SelectedID = ShoppingCart.ShoppingCartPaymentOptionID;
    }

    /// <summary>
    /// Preselects payment option.
    /// </summary>
    protected void PreselectPaymentOption()
    {
        // Try to select payment option according to saved option in shopping cart object
        CustomerInfo customer = ShoppingCart.Customer;
        int paymentOptionId = 0;

        // At first try to select preselected payment option according to ShoppingCart object
        if (ShoppingCart.ShoppingCartPaymentOptionID > 0)
        {
            paymentOptionId = ShoppingCart.ShoppingCartPaymentOptionID;
        }
        else if (customer != null)
        {
            // Try to select the payment option according to the customer object
            if (customer.CustomerPreferredPaymentOptionID > 0)
            {
                paymentOptionId = customer.CustomerPreferredPaymentOptionID;
            }
            else
            {
                // Try to get at least preferred site payment option
                paymentOptionId = (customer.CustomerUser != null) ? customer.CustomerUser.GetUserPreferredPaymentOptionID(ShoppingCart.SiteName) : 0;
            }
        }

        // If a payment option was detected, set it on the UniSelector and on the ShoppingCart object
        if (paymentOptionId > 0)
        {
            drpPayment.Reload();
            ShoppingCart.ShoppingCartPaymentOptionID = paymentOptionId;
            drpPayment.SelectedID = paymentOptionId;
        }
    }


    /// <summary>
    /// Function for building the GroupedEnumerable. Returns the level on which the item should be placed in the object.
    /// </summary>
    protected int GetLevel(ShoppingCartItemInfo Item)
    {
        return (Item.IsProductOption || Item.IsBundleItem) ? 1 : 0;
    }


    /// <summary>
    /// Function for building the GroupedEnumerable. Returns the key according to which the hierarchy is build. If it is a top level item it returns 0.
    /// </summary>
    protected object GetKey(ShoppingCartItemInfo Item)
    {
        if (!(Item.IsProductOption || Item.IsBundleItem))
        {
            return 0;
        }

        return Item.CartItemParentGUID;
    }


    /// <summary>
    /// Load transformations with dependence.
    /// </summary>
    protected void LoadTransformations()
    {
        string TransformationName = CartContentTransformationName;

        if (!String.IsNullOrEmpty(TransformationName))
        {
            TransformationInfo ti = TransformationInfoProvider.GetTransformation(TransformationName);

            if (ti != null)
            {
                // Setting up the common BasicUniView properties
                shoppingCartUniView.HierarchicalDisplayMode = HierarchicalDisplayModeEnum.Inner;
                shoppingCartUniView.RelationColumnID = "CartItemGUID";

                if (ti.TransformationIsHierarchical)
                {
                    // Setting up the hierarchical transformation.
                    HierarchicalTransformations ht = new HierarchicalTransformations("CartItemGUID");
                    ht.LoadFromXML(ti.TransformationHierarchicalXMLDocument);
                    // Setting up the BasicUniView
                    shoppingCartUniView.Transformations = ht;
                    shoppingCartUniView.UseNearestItemForHeaderAndFooter = true;
                    
                }
                else
                {
                    // Setting up the BasicUniView with a non-hierarchical transformation
                    shoppingCartUniView.ItemTemplate = CMS.Controls.CMSDataProperties.LoadTransformation(shoppingCartUniView, ti.TransformationFullName);
                }

                // Makes sure new data is loaded if the date changes and transformation needs to be reloaded
                shoppingCartUniView.DataBind();
            }
        }


    }

    private void ShowError(string text)
    {
        pnlError.Visible = true;
        lblError.Text = text;
    }

    #endregion
    protected void btnChangePaymentMethod_Click(object sender, EventArgs e)
    {
        // validation        
        if (drpPayment.SelectedID != ShoppingCart.ShoppingCartPaymentOptionID && drpPayment.SelectedID > 0)
        {
            ShoppingCart.Order.OrderPaymentOptionID = drpPayment.SelectedID;
            ShoppingCart.Order.Update();
            Response.Redirect(Request.RawUrl);
        }
        
    }
}