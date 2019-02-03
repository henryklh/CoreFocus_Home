using System;
using System.Linq;
using System.Web.UI;
using System.Collections;
using System.Collections.Generic;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;

using CMS.Controls;
using CMS.Ecommerce;
using CMS.Helpers;
using CMS.PortalEngine;
using CMS.DataEngine;

public partial class CMSWebParts_DevCustom_Ecommerce_DevPackageShoppingCartTotals : CMSCheckoutWebPart
{
    #region "Constructor"

    /// <summary>
    /// Initializes a new instance of the CMSWebParts_Ecommerce_Checkout_Viewers_ShoppingCartTotals" class.
    /// </summary>
    public CMSWebParts_DevCustom_Ecommerce_DevPackageShoppingCartTotals()
    {
        // Do not resolve Visible field in configuration
        base.NotResolveProperties = string.Format("{0};Visible;", base.NotResolveProperties);
    }

    #endregion


    #region "Properties"

    /// <summary>
    /// Gets the visibility condition. If the condition is true web part is visible.
    /// </summary>
    public string VisibilityCondition
    {
        get
        {
            // return macro string without macro brackets
            return ValidationHelper.GetString(GetValue("Visible"), "").Replace("{%", "").Replace("%}", "");
        }
    }


    /// <summary>
    /// Gets or sets the name of the transformation which is used for MultiBuy discount summary.
    /// </summary>
    public string OrderDiscountSummaryTransformationName
    {
        get
        {
            return ValidationHelper.GetString(GetValue("OrderDiscountSummaryTransformationName"), "");
        }
        set
        {
            SetValue("OrderDiscountSummaryTransformationName", value);
        }
    }

    #endregion


    #region "Event handling"

    /// <summary>
    /// OnInit event handler.
    /// </summary>
    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);

        // Subscribe to the wizard events
        SubscribeToWizardEvents();
    }


    /// <summary>
    /// Load event handler.
    /// </summary>
    protected override void OnLoad(EventArgs e)
    {
        base.OnLoad(e);

        SetupControl();

        if (UpdatePanel != null)
        {
            UpdatePanel.UpdateMode = UpdatePanelUpdateMode.Always;
        }
    }


    /// <summary>
    /// PreRender event handler.
    /// </summary>
    protected override void OnPreRender(EventArgs e)
    {
        base.OnPreRender(e);

        if (!String.IsNullOrEmpty(VisibilityCondition))
        {
            // Check condition value, if it is false, hide web part and also envelope
            var res = ContextResolver.ResolveMacroExpression(VisibilityCondition, true);
            if ((res == null) || !ValidationHelper.GetBoolean(res.Result, false))
            {
                totalViewer.Visible = false;
                HideWebPartContent();
            }
        }
    }


    /// <summary>
    /// Updates web part.
    /// </summary>
    /// <param name="sender">The sender.</param>
    /// <param name="e">The EventArgs instance containing the event data.</param>
    public void Update(object sender, EventArgs e)
    {
        SetupControl();
    }

    #endregion


    #region "Methods"

    /// <summary>
    /// Subscribes the web part to the wizard events.
    /// </summary>
    private void SubscribeToWizardEvents()
    {
        ComponentEvents.RequestEvents.RegisterForEvent(SHOPPING_CART_CHANGED, Update);
    }


    /// <summary>
    /// Setups the control.
    /// </summary>
    public void SetupControl()
    {
        double value = 0;
        string stringFormat = ValidationHelper.GetString(GetValue("StringFormat"), "");

        ShoppingCartInfo SC = ShoppingCart;
        bool IsOverrided = EcommerceFunctions.UsePackageStartPrice(ref SC);
        //ltlTest.Text = "IsOverrided: " + IsOverrided.ToString() + " Discount Count: " + SC.OrderDiscounts.Count();

        // Try to use the stringFormat format, to check, if it's a valid one
        try
        {
            String.Format(stringFormat, value);
            
        }
        catch (Exception ex)
        {
            CMS.EventLog.EventLogProvider.LogException("Checkout process", "ERROR", ex, CurrentSite.SiteID, "The StringFormat property of the web part isn't in a correct format: '" + stringFormat + "'");
            // Recovery
            stringFormat = "";
        }

        string type = ValidationHelper.GetString(GetValue("TotalToDisplay"), "TotalPriceOfProducts");

        // Display the correct value according to the TotalToDisplay property of the web part
        switch (type)
        {
            case "TotalPriceOfOrder":
                value = SC.TotalPrice;
                //if (IsOverrided)
                //{
                //    double PackageStartupPrice = ValidationHelper.GetDouble(SC.ShoppingCartCustomData.GetValue("PackageStartupPrice"), 0);
                //    value = (PackageStartupPrice + SC.TotalShippingInMainCurrency);
                //}
                DisplayValue(GetFormattedPriceToDisplay(value, stringFormat, SC));
                break;

            case "TotalPriceOfProducts":
                value = SC.TotalItemsPrice;
                DisplayValue(GetFormattedPriceToDisplay(value, stringFormat, SC));
                break;

            case "TotalPriceOfProductsWithoutTax":
                value = SC.TotalItemsPrice - SC.TotalItemsTax;
                DisplayValue(GetFormattedPriceToDisplay(value, stringFormat, SC));
                break;

            case "TotalShippingWithoutTax":
                if (SC.ShippingOption != null)
                {
                    value = SC.ApplyExchangeRate(ShippingOptionInfoProvider.CalculateShipping(SC));
                }

                DisplayValue(GetFormattedPriceToDisplay(value, stringFormat, SC));
                break;

            case "TotalShipping":
                if (SC.ShippingOption != null)
                {
                    value = SC.TotalShipping;
                }

                DisplayValue(GetFormattedPriceToDisplay(value, stringFormat, SC));
                break;

            case "TotalWeight":
                value = SC.TotalItemsWeight;
                DisplayValue(stringFormat == "" ? ShippingOptionInfoProvider.GetFormattedWeight(value, CurrentSiteName) : String.Format(stringFormat, value));
                break;

            case "TotalProductTax":
                value = SC.TotalTax;
                DisplayValue(GetFormattedPriceToDisplay(value, stringFormat, SC));
                break;

            case "TotalOrderTax":
                value = SC.TotalTax;

                if (SC.ShippingOption != null)
                {
                    value += SC.ApplyExchangeRate(ShippingOptionInfoProvider.CalculateShippingTax(SC));
                }

                DisplayValue(GetFormattedPriceToDisplay(value, stringFormat, SC));
                break;

            case "TotalShippingTax":
                if (!DataHelper.DataSourceIsEmpty(SC.ShippingTaxesTable))
                {
                    value = ValidationHelper.GetDoubleSystem(SC.ShippingTaxesTable.Rows[0]["TaxSummary"], 0);
                }

                DisplayValue(GetFormattedPriceToDisplay(value, stringFormat, SC));
                break;

            case "TotalDiscount":
                value = SC.OrderDiscount + SC.ItemsDiscount + SC.ShippingDiscount;

                if (IsOverrided)
                {
                    double PackageStartupPrice = ValidationHelper.GetDouble(SC.ShoppingCartCustomData.GetValue("PackageStartupPrice"), 0);
                    value = SC.TotalItemsPrice - PackageStartupPrice + SC.ItemsDiscount + SC.ShippingDiscount;
                }

                DisplayValue(GetFormattedPriceToDisplay(value, stringFormat, SC));
                break;

            case "TotalOrderDiscount":
                value = SC.OrderDiscount;
                
                if (IsOverrided)
                {
                    double PackageStartupPrice = ValidationHelper.GetDouble(SC.ShoppingCartCustomData.GetValue("PackageStartupPrice"), 0);
                    value = SC.TotalItemsPrice - PackageStartupPrice;
                }

                DisplayValue(GetFormattedPriceToDisplay(value, stringFormat, SC));
                break;

            case "OrderDiscountSummary":
                DisplayOrderDiscountSummary(SC);
                break;
        }
    }

    private string GetFormattedPriceToDisplay(double value, string stringFormat)
    {
        return stringFormat == "" ? ShoppingCart.GetFormattedPrice(value) : String.Format(stringFormat, value);
    }

    private string GetFormattedPriceToDisplay(double value, string stringFormat, ShoppingCartInfo shoppingcart)
    {
        return stringFormat == "" ? shoppingcart.GetFormattedPrice(value) : String.Format(stringFormat, value);
    }


    /// <summary>
    /// Displays the passed value and manages the label visibility.
    /// </summary>
    /// <param name="value">Value to display</param>
    private void DisplayValue(string value)
    {
        totalViewer.Visible = true;

        string label = ValidationHelper.GetString(GetValue("Label"), "");
        label = HTMLHelper.HTMLEncode(ResHelper.LocalizeString(label));

        if (!string.IsNullOrEmpty(label))
        {
            lblLabel.Text = label;
            lblLabel.Visible = true;
        }

        lblValue.Text = value;
    }


    /// <summary>
    /// Displays multibuy and order discounts summary based on provided transformation. 
    /// </summary>
    private void DisplayOrderDiscountSummary(ShoppingCartInfo shoppingCart)
    {
        if (!string.IsNullOrEmpty(OrderDiscountSummaryTransformationName))
        {
            TransformationInfo ti = TransformationInfoProvider.GetTransformation(OrderDiscountSummaryTransformationName);

            if (ti == null)
            {
                return;
            }

            uvMultiBuySummary.Visible = true;
            uvMultiBuySummary.DataSource = shoppingCart.OrderRelatedDiscountSummaryItems;
            uvMultiBuySummary.ItemTemplate = CMSAbstractDataProperties.LoadTransformation(uvMultiBuySummary, ti.TransformationFullName);

            // Makes sure new data is loaded if the date changes and transformation needs to be reloaded
            uvMultiBuySummary.DataBind();
            uvMultiBuySummary.ReloadData(true);
        }
    }

    #endregion
}



