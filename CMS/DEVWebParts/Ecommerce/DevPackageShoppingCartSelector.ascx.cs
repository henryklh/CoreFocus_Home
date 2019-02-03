using System;
using System.Data;
using System.Collections;
using System.Collections.Generic;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using System.ComponentModel;
using System.Linq;
using System.Text;

using CMS.PortalControls;
using CMS.Helpers;
using CMS.Ecommerce;
using CMS.Membership;
using CMS.SiteProvider;
using CMS.UIControls;
using CMS.WebAnalytics;
using CMS.DataEngine;

public partial class CMSWebParts_DevCustom_Ecommerce_DevPackageShoppingCartSelector : CMSAbstractWebPart
{

    #region "Properties"

    private bool mIsCartPackage = false;

    public string PackageClassNames
    {
        get
        {
            return ValidationHelper.GetString(GetValue("PackageClassNames"), "");
        }
        set
        {
            SetValue("PackageClassNames", value);
        }
    }

    public bool PackagePickerAutoPostBack
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("PackagePickerAutoPostBack"), false);
        }
        set
        {
            SetValue("PackagePickerAutoPostBack", value);
        }
    }

    public int PackageSKUID
    {
        get
        {
            return ValidationHelper.GetInteger(hdnPackageSKUID.Value, 0);
        }
        set
        {
            hdnPackageSKUID.Value = value.ToString();
        }
    }

    public bool IsCartPackage
    {
        get
        {
            return mIsCartPackage;
        }
        set
        {
            mIsCartPackage = value;
        }
    }

    public class SelectedSKU
    {
        public SKUInfo SKU
        {
            get;
            set;
        }

        public int QTY
        {
            get;
            set;
        }

        public SelectedSKU(SKUInfo sku, int qty)
        {
            SKU = sku;
            QTY = qty;
        }
    }

    public class PackageDiscount
    {
        public string DISCOUNTNAME
        {
            get;
            set;
        }

        public double DISCOUNTAMOUNT{
            get;
            set;
        }

        public int SKUID
        {
            get;
            set;
        }

        public PackageDiscount(string discountName, double discountAmount, int skuId)
        {
            DISCOUNTNAME = discountName;
            DISCOUNTAMOUNT = discountAmount;
            SKUID = skuId;
        }
    }

    #endregion

    #region "Methods"
    protected override void OnInit(EventArgs e)
    {
        base.OnInit(e);

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
    /// Initializes the control properties.
    /// </summary>
    protected void SetupControl()
    {
        if (this.StopProcessing)
        {
            // Do not process
        }
        else
        {
            //ltlTest.Text = ShoppingCartItemPicker1.GetType().ToString();
            if (!PackageClassNames.Contains(CurrentDocument.ClassName) || !CurrentDocument.HasSKU)
            {
                // disabled
                this.Visible = false;
                return;
            }

            PackageSKUID = CurrentDocument.NodeSKUID;
            ShoppingCartInfo CurrentShoppingCart = ECommerceContext.CurrentShoppingCart;
            // first load

            rblTEST.Items.Add(new ListItem("test <a href=\"#\">test</a>", "test"));

            if (!IsPostBack)
            {
                lbnAddToCart.Visible = !PackagePickerAutoPostBack;

                if (QueryHelper.GetString("Fresh", "false") == "true")
                {
                    ShoppingCartInfoProvider.EmptyShoppingCart(CurrentShoppingCart);
                }

                LoadRequiredList();
                LoadOptionalList();

                LoadProductListsDataBind(CurrentShoppingCart);

                bool PackageAddProductsOnLoad = ValidationHelper.GetBoolean(GetValue("PackageAddProductsOnLoad"), false);

                // Re-fresh shopping cart (empty cart and add default items)
                if (PackageAddProductsOnLoad )
                {

                    bool UpdateCart = false;

                    if (CurrentShoppingCart != null)
                    {
                        if (CurrentShoppingCart.IsEmpty)
                        {
                            UpdateCart = true;
                        }
                        else
                        {
                            SKUInfo pSKU = SKUInfoProvider.GetSKUInfo(PackageSKUID);
                            if (pSKU != null)
                            {
                                if (!IsProductInShoppingCart(CurrentShoppingCart, pSKU))
                                {
                                    UpdateCart = true;
                                }
                            }
                        }
                    }
                    else
                    {
                        UpdateCart = true;
                    }

                    if (UpdateCart)
                    {
                        UpdateShoppingCart();
                    }
                }
            }
        }
    }


    /// <summary>
    /// Reloads the control data.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();

        SetupControl();
    }

    private bool IsProductInShoppingCart(ShoppingCartInfo sCart, SKUInfo sku)
    {
        if (sCart != null)
        {
            if (sCart.IsEmpty)
            {
                return false;
            }

            return sCart.CartItems.Any(x => x.SKU.SKUID == sku.SKUID);
        }
        else
        {
            return false;
        }
    }

    private void LoadRequiredList()
    {

        DepartmentInfo diPlans = DepartmentInfoProvider.GetDepartmentInfo("Plans", CurrentSiteName);
        if (diPlans != null)
        {
            List<SKUInfo> lSki = new List<SKUInfo>();
            lSki = SKUInfoProvider.GetSKUs(CurrentSite.SiteID).Where(x => x.SKUDepartmentID == diPlans.DepartmentID).OrderByDescending(x=>x.SKURetailPrice).ToList();

            if (lSki.Count > 0)
            {
                rptPlansProducts.DataSource = lSki;
                rptPlansProducts.DataBind();
            }
        }

        DepartmentInfo diContracts = DepartmentInfoProvider.GetDepartmentInfo("Contracts", CurrentSiteName);
        if (diContracts != null)
        {
            List<SKUInfo> lSki = new List<SKUInfo>();
            lSki = SKUInfoProvider.GetSKUs(CurrentSite.SiteID).Where(x => x.SKUDepartmentID == diContracts.DepartmentID).OrderByDescending(x => x.SKURetailPrice).ToList();

            if (lSki.Count > 0)
            {
                rptContractProducts.DataSource = lSki;
                rptContractProducts.DataBind();
            }
        }

        DepartmentInfo diCoreElements = DepartmentInfoProvider.GetDepartmentInfo("CoreElements", CurrentSiteName);
        if (diCoreElements != null)
        {
            List<SKUInfo> lSki = new List<SKUInfo>();
            lSki = SKUInfoProvider.GetSKUs(CurrentSite.SiteID).Where(x => x.SKUDepartmentID == diCoreElements.DepartmentID).OrderByDescending(x => x.SKURetailPrice).ToList();

            if (lSki.Count > 0)
            {
                rptCoreElements.DataSource = lSki;
                rptCoreElements.DataBind();
            }
        }
    }
    private void LoadOptionalList()
    {
        string dIDs = ValidationHelper.GetString(CurrentDocument.GetValue("OptionalDepartments"), string.Empty);
        List<string> lIDs = dIDs.Split('|').ToList();

        List<SKUInfo> optionals = new List<SKUInfo>();
        foreach (string sID in lIDs)
        {
            int dID = ValidationHelper.GetInteger(sID, 0);

            if (dID > 0)
            {
                List<SKUInfo> lSki = new List<SKUInfo>();
                lSki = SKUInfoProvider.GetSKUs(CurrentSite.SiteID).Where(x => x.SKUDepartmentID == dID).ToList();

                if (lSki.Count > 0)
                {
                    foreach (SKUInfo skuinfo in lSki)
                    {
                        optionals.Add(skuinfo);
                    }
                }
            }
        }

        if (optionals.Count > 0)
        {
            rptOptionals.DataSource = optionals;
            rptOptionals.DataBind();
        }
    }

    public void LoadProductListsDataBind(ShoppingCartInfo sCart)
    {
        
        string RequiredPreselectedProducts = ValidationHelper.GetString(CurrentDocument.GetValue("RequiredPreselectedProducts"), string.Empty);     

        if (sCart.IsEmpty)
        {
            ltlTest.Text += "<br/>LoadProductListsDataBind: Load Default.";
            if (rptPlansProducts.Items.Count > 0)
            {
                foreach (RepeaterItem ri in rptPlansProducts.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");

                    x.UpdateCheckedStatus(RequiredPreselectedProducts);
                }
            }

            if (rptContractProducts.Items.Count > 0)
            {
                foreach (RepeaterItem ri in rptContractProducts.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");

                    x.UpdateCheckedStatus(RequiredPreselectedProducts);
                }
            }

            if (rptCoreElements.Items.Count > 0)
            {
                foreach (RepeaterItem ri in rptCoreElements.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");

                    x.UpdateCheckedStatus(RequiredPreselectedProducts);
                }
            }

            if (rptOptionals.Items.Count > 0)
            {
                foreach (RepeaterItem ri in rptOptionals.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");
                    SKUInfo sku = x.SKU;
                    x.DefaultQuantity = OptionalProductsDefaultQuantity(sku.SKUID);
                }
            }
        }
        else
        {
            ltlTest.Text += "<br/>LoadProductListsDataBind: Load Cart.";
            if (rptPlansProducts.Items.Count > 0)
            {
                foreach (RepeaterItem ri in rptPlansProducts.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");
                    SKUInfo sku = x.SKU;
                    if (IsProductInShoppingCart(sCart, sku))
                    {
                        x.Quantity = 1;
                    }
                }
            }

            if (rptContractProducts.Items.Count > 0)
            {
                foreach (RepeaterItem ri in rptContractProducts.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");
                    SKUInfo sku = x.SKU;
                    if (IsProductInShoppingCart(sCart, sku))
                    {
                        x.Quantity = 1;
                    }
                }
            }

            if (rptCoreElements.Items.Count > 0)
            {
                foreach (RepeaterItem ri in rptCoreElements.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");
                    SKUInfo sku = x.SKU;
                    if (IsProductInShoppingCart(sCart, sku))
                    {
                        x.Quantity = 1;
                    }
                }
            }

            if (rptOptionals.Items.Count > 0)
            {
                foreach (RepeaterItem ri in rptOptionals.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");
                    SKUInfo sku = x.SKU;
                    if (IsProductInShoppingCart(sCart, sku))
                    {
                        foreach (ShoppingCartItemInfo scii in sCart.CartItems)
                        {
                            if (sku.SKUID == scii.SKUID)
                            {
                                x.Quantity = scii.CartItemUnits;
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    public int OptionalProductsDefaultQuantity(int skuid)
    {
        string sQty = ValidationHelper.GetString(CurrentDocument.GetValue("OptionalProductsDefaultQuantity"), string.Empty);

        if (!string.IsNullOrEmpty(sQty))
        {
            string[] ary = sQty.Split(new string[] { System.Environment.NewLine }, System.StringSplitOptions.RemoveEmptyEntries);

            if (ary.Length > 0)
            {
                for (int i = 0; i < ary.Length; i++)
                {
                    if (!string.IsNullOrEmpty(ary[i]))
                    {
                        string[] sAry = ary[i].Split(';');

                        if (!string.IsNullOrEmpty(sAry[0]) && !string.IsNullOrEmpty(sAry[1]))
                        {
                            if (skuid.ToString() == sAry[0])
                            {
                                return ValidationHelper.GetInteger(sAry[1], 0);
                            }
                        }
                    }
                }
            }
        }
        return 0;
    }

    /// <summary>
    /// Returns selected shopping cart item parameters containing product option parameters.
    /// </summary>
    public ShoppingCartItemParameters GetShoppingCartItemParameters(SKUInfo CartItem, int Quantity)
    {
        // Get product options - no options and no variants for package product
        List<ShoppingCartItemParameters> options = new List<ShoppingCartItemParameters>();;
        int skuId = CartItem.SKUID;

        // Create params
        ShoppingCartItemParameters cartItemParams = new ShoppingCartItemParameters(skuId, Quantity, options);

        // Ensure minimum allowed number of items is met
        if (CartItem.SKUMinItemsInOrder > Quantity)
        {
            cartItemParams.Quantity = CartItem.SKUMinItemsInOrder;
        }

        return cartItemParams;
    }

    /// <summary>
    /// Logs activity
    /// </summary>
    /// <param name="skuId">Product ID</param>
    /// <param name="skuName">Product name</param>
    /// <param name="quantity">Quantity</param>
    private void LogProductAddedToSCActivity(int skuId, string skuName, int quantity)
    {
        Activity activity = new ActivityProductAddedToShoppingCart(skuName, quantity, skuId, AnalyticsContext.ActivityEnvironmentVariables);
        activity.Log();
    }

    /// <summary>
    /// Update shopping cart and items in cart
    /// </summary>
    private void UpdateShoppingCart()
    {
        // add all item with qty > 0 to cart
        try
        {
            ltlTest.Text += "<br/>";
            List<SelectedSKU> ss = new List<SelectedSKU>();

            if (rptPlansProducts.Items.Count > 0)
            {
                foreach (RepeaterItem rptItem in rptPlansProducts.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)rptItem.FindControl("ShoppingCartItemPicker");
                    if (x != null)
                    {
                        if (x.Quantity > 0)
                        {
                            ss.Add(new SelectedSKU(x.SKU, x.Quantity));
                        }

                        ltlTest.Text += "Control Exist > ";

                        if (x.SKU != null)
                        {
                            ltlTest.Text += " SKU Exist > ";

                            ltlTest.Text += x.SKU.SKUName + ": " + x.Quantity + "<br/>";
                        }
                    }
                }
            }

            if (rptContractProducts.Items.Count > 0)
            {
                foreach (RepeaterItem rptItem in rptContractProducts.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)rptItem.FindControl("ShoppingCartItemPicker");
                    if (x != null)
                    {
                        if (x.Quantity > 0)
                        {
                            ss.Add(new SelectedSKU(x.SKU, x.Quantity));
                        }

                        ltlTest.Text += "Control Exist > ";

                        if (x.SKU != null)
                        {
                            ltlTest.Text += " SKU Exist > ";

                            ltlTest.Text += x.SKU.SKUName + ": " + x.Quantity + "<br/>";
                        }
                    }
                }
            }

            if (rptCoreElements.Items.Count > 0)
            {
                foreach (RepeaterItem rptItem in rptCoreElements.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)rptItem.FindControl("ShoppingCartItemPicker");
                    if (x != null)
                    {
                        if (x.Quantity > 0)
                        {
                            ss.Add(new SelectedSKU(x.SKU, x.Quantity));
                        }

                        ltlTest.Text += "Control Exist > ";

                        if (x.SKU != null)
                        {
                            ltlTest.Text += " SKU Exist > ";

                            ltlTest.Text += x.SKU.SKUName + ": " + x.Quantity + "<br/>";
                        }
                    }
                }
            }

            if (rptOptionals.Items.Count > 0)
            {
                foreach (RepeaterItem rptItem in rptOptionals.Items)
                {
                    var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)rptItem.FindControl("ShoppingCartItemPicker");
                    if (x != null)
                    {
                        if (x.Quantity > 0)
                        {
                            ss.Add(new SelectedSKU(x.SKU, x.Quantity));
                        }

                        ltlTest.Text += "Control Exist > ";

                        if (x.SKU != null)
                        {
                            ltlTest.Text += " SKU Exist > ";

                            ltlTest.Text += x.SKU.SKUName + ": " + x.Quantity + "<br/>";
                        }
                    }
                }
            }

            ltlTest.Text += "Total Rows: " + ss.Count().ToString();

            ShoppingCartInfo ShoppingCart = ECommerceContext.CurrentShoppingCart;


            if (ss.Count > 0)
            {
                List<ShoppingCartItemParameters> lSCIP = new List<ShoppingCartItemParameters>();
                string error = string.Empty;
                if (CurrentDocument.HasSKU)
                {
                    SKUInfo selfSKU = SKUInfoProvider.GetSKUInfo(CurrentDocument.NodeSKUID);
                    if (selfSKU != null)
                    {
                        ShoppingCartItemParameters selfParams = GetShoppingCartItemParameters(selfSKU, 1);
                        lSCIP.Add(selfParams);
                    }
                }

                foreach (SelectedSKU ssku in ss)
                {
                    if (ssku.QTY > 0)
                    {
                        // Get cart item parameters
                        ShoppingCartItemParameters cartItemParams = GetShoppingCartItemParameters(ssku.SKU, ssku.QTY);

                        if (!ShoppingCartInfoProvider.CheckNewShoppingCartItems(ECommerceContext.CurrentShoppingCart, cartItemParams))
                        {
                            error += String.Format(GetString("ecommerce.cartcontent.productdisabled"), ssku.SKU.SKUName);
                            break;
                        }

                        lSCIP.Add(cartItemParams);

                        // Log activity
                        LogProductAddedToSCActivity(ssku.SKU.SKUID, ssku.SKU.SKUName, ssku.QTY);
                    }
                }

                if (!string.IsNullOrEmpty(error))
                {
                    ltlTest.Text += "<br/>" + error;
                    return;
                }

                if (lSCIP.Count == 0)
                {
                    return;
                }

                

                if (ShoppingCart != null)
                {
                    bool updateCart = false;
                    ShoppingCartInfoProvider.EmptyShoppingCart(ShoppingCart);
                    double CartTotal = 0;

                    // Assign current shopping cart to current user
                    var ui = MembershipContext.AuthenticatedUser;
                    if (!ui.IsPublic())
                    {
                        ShoppingCart.User = ui;
                        updateCart = true;
                    }

                    // Shopping cart is not saved yet
                    if (ShoppingCart.ShoppingCartID == 0)
                    {
                        updateCart = true;
                    }

                    // Update shopping cart when required
                    if (updateCart)
                    {
                        ShoppingCartInfoProvider.SetShoppingCartInfo(ShoppingCart);
                    }

                    List<ShoppingCartItemInfo> lAddedItem = new List<ShoppingCartItemInfo>();

                    foreach (ShoppingCartItemParameters scip in lSCIP)
                    {
                        // Add item to shopping cart
                        ShoppingCartItemInfo addedItem = ShoppingCart.SetShoppingCartItem(scip);
                        lAddedItem.Add(addedItem);
                        CartTotal += addedItem.TotalPrice;

                        if (addedItem != null)
                        {
                            addedItem.CartItemAutoAddedUnits = 0;

                            // Update shopping cart item in database
                            ShoppingCartItemInfoProvider.SetShoppingCartItemInfo(addedItem);

                            ECommerceHelper.TrackAddToShoppingCartConversion(addedItem);

                            // Recalculate shopping cart
                            ShoppingCartInfoProvider.EvaluateShoppingCart(ShoppingCart);
                        }
                    }

                    double PackageStartupPrice = ValidationHelper.GetDouble(CurrentDocument.GetValue("PackageStartupPrice"), 0);
                    bool PackageStartupPriceAsMinPrice = ValidationHelper.GetBoolean(CurrentDocument.GetValue("PackageStartupPriceAsMinPrice"), false);

                    ShoppingCart.ShoppingCartCustomData.SetValue("PackageStartupPrice", PackageStartupPrice);
                    ShoppingCart.ShoppingCartCustomData.SetValue("PackageStartupPriceAsMinPrice", PackageStartupPriceAsMinPrice);
                    ShoppingCart.ShoppingCartCustomData.SetValue("PackageNodeAliasPath", CurrentDocument.NodeAliasPath);
                    ShoppingCart.Update();

                    if (EcommerceFunctions.UsePackageStartPrice(ref ShoppingCart))
                    {
                        ShoppingCartInfoProvider.SetShoppingCartInfo(ShoppingCart);
                    }

                    ltlTest.Text += "<br/>Discounts applied: " + ShoppingCart.OrderRelatedDiscountSummaryItems.Count.ToString();

                    ltlTest.Text += "<br/>Shopping Cart is updated.";
                }
            }

            //LoadProductListsDataBind(ShoppingCart);
        }
        catch (Exception ex)
        {
            ltlError.Text = ex.ToString();
        }
        
    }

    #endregion

    protected void rptPlansProducts_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            SKUInfo sku = (SKUInfo)e.Item.DataItem;
            var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)e.Item.FindControl("ShoppingCartItemPicker");
            x.AutoPostBack = PackagePickerAutoPostBack;
            //x.PickedIDs = ValidationHelper.GetString(CurrentDocument.GetValue("RequiredPreselectedProducts"), string.Empty);
        }
    }
    protected void rptContractProducts_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)e.Item.FindControl("ShoppingCartItemPicker");
            x.AutoPostBack = PackagePickerAutoPostBack;
            //x.PickedIDs = ValidationHelper.GetString(CurrentDocument.GetValue("RequiredPreselectedProducts"), string.Empty);
        }

    }
    protected void rptCoreElements_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)e.Item.FindControl("ShoppingCartItemPicker");
            x.AutoPostBack = PackagePickerAutoPostBack;
            //x.PickedIDs = ValidationHelper.GetString(CurrentDocument.GetValue("RequiredPreselectedProducts"), string.Empty);
        }
    }
    protected void rptOptionals_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            SKUInfo sku = (SKUInfo)e.Item.DataItem;
            var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)e.Item.FindControl("ShoppingCartItemPicker");
            x.AutoPostBack = PackagePickerAutoPostBack;
            //x.DefaultQuantity = OptionalProductsDefaultQuantity(sku.SKUID);
        }
    }
    protected void lbnAddToCart_Click(object sender, EventArgs e)
    {
        UpdateShoppingCart();
    }

    protected void rptPlansProducts_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        ltlTest.Text += "<br/>rptPlansProducts_ItemCommand CommandEventArgs: " + e.CommandArgument.ToString();
    }
    protected void rptContractProducts_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        ltlTest.Text += "<br/>rptContractProducts_ItemCommand CommandEventArgs: " + e.CommandArgument.ToString();
    }
    protected void rptCoreElements_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        ltlTest.Text += "<br/>rptCoreElements_ItemCommand CommandEventArgs: " + e.CommandArgument.ToString();
    }
    protected void ShoppingCartItemPicker_UpdateCart(object sender, CommandEventArgs e)
    {

        ltlTest.Text += "<br/>Args: " + e.CommandName+ " & " + e.CommandArgument.ToString();

        if (e.CommandName == "RadioCheckedChange")
        {
            // update for remove other radio option
            SKUInfo sku = (SKUInfo)e.CommandArgument;

            if (sku != null)
            {

                DepartmentInfo di = DepartmentInfoProvider.GetDepartmentInfo(sku.SKUDepartmentID);

                if (di != null)
                {
                    if (di.DepartmentName == "Plans")
                    {
                        foreach (RepeaterItem ri in rptPlansProducts.Items)
                        {
                            
                            var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");
                            if(x.SKUID != sku.SKUID)
                            {
                                x.UpdateQuantity(0);
                            }
                        }
                    }

                    if (di.DepartmentName == "Contracts")
                    {
                        foreach (RepeaterItem ri in rptContractProducts.Items)
                        {

                            var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");
                            if (x.SKUID != sku.SKUID)
                            {
                                x.UpdateQuantity(0);
                            }
                        }
                    }

                    if (di.DepartmentName == "CoreElements")
                    {
                        foreach (RepeaterItem ri in rptCoreElements.Items)
                        {

                            var x = (ASP.devmodules_ecommerce_controls_productoptions_shoppingcartitempicker_ascx)ri.FindControl("ShoppingCartItemPicker");
                            if (x.SKUID != sku.SKUID)
                            {
                                x.UpdateQuantity(0);
                            }
                        }
                    }
                }
            }
            else
            {
                ltlTest.Text += "<br/>Radio SKU is null.";
            }
        }

        UpdateShoppingCart();
    }
}



