<%@ Control Language="C#" AutoEventWireup="true" Inherits="DEVModules_Ecommerce_Controls_ProductOptions_ShoppingCartItemSelector"
    CodeFile="ShoppingCartItemSelector.ascx.cs" %>
<%@ Register TagPrefix="cms" TagName="DonationProperties" Src="~/CMSModules/Ecommerce/Controls/ProductOptions/DonationProperties.ascx" %>
<cms:CMSUpdatePanel ID="upnlAjax" runat="server">
    <ContentTemplate>
        <asp:Literal ID="ltlTest" runat="server" EnableViewState="false"></asp:Literal>
        <asp:Button ID="btnClear" runat="server" Text="Clear" OnClick="btnClear_Click" Visible="false" />
        <asp:Panel ID="pnlContainer" runat="server" CssClass="CartItemSelectorContainer">
            <%-- Stock --%>
            <asp:Panel ID="pnlStock" runat="server" CssClass="StockContainer" EnableViewState="false" Visible="false">
                <asp:Label ID="lblStock" runat="server" CssClass="StockLabel" EnableViewState="false" />
                <asp:Label ID="lblStockValue" runat="server" EnableViewState="false" />
            </asp:Panel>
            <asp:Panel ID="pnlSeparator" runat="server" CssClass="hr" EnableViewState="false" />
            <asp:Panel ID="pnlSelectors" runat="server" CssClass="CartItemSelector form-horizontal">
                <%-- Donation properties --%>
                <cms:DonationProperties runat="server" ID="donationProperties" Visible="false" StopProcessing="true"
                    ShowDonationUnits="false" />
                <%-- Here come product options --%>
            </asp:Panel>
            <asp:Panel ID="pnlMessages" runat="server" CssClass="MessagesContainer">
                <cms:LocalizedLabel ID="lblUnavailableVariantInfo" runat="server" Visible="false" CssClass="UnavailableVariantLabel unavailable" ResourceString="com.cartcontent.nonexistingvariantselected" />
            </asp:Panel>
            <%-- Price --%>
            <asp:Panel ID="pnlPrice" runat="server" CssClass="TotalPriceContainer" EnableViewState="false">
                <asp:Label ID="lblPrice" runat="server" CssClass="TotalPriceLabel" EnableViewState="false" />
                <asp:Label ID="lblPriceValue" runat="server" CssClass="TotalPrice" EnableViewState="false" />
            </asp:Panel>
            <asp:Panel ID="pnlButton" runat="server" CssClass="AddToCartContainer add-to-cart-container control-group-inline" EnableViewState="false">
                <%-- Add to wishlist --%>
                <asp:ImageButton ID="btnWishlist" runat="server" Visible="false" CssClass="AddToWishlistImageButton add-to-wishlist-image-button" />
                <asp:LinkButton ID="lnkWishlist" runat="server" Visible="false" CssClass="AddToWishlistLink add-to-wishlist-link" />
                <%-- Units --%>

                <div class="d-flex justify-content-between align-items-center g-brd-bottom g-brd-gray-light-v3 py-3 g-mb-30" role="tab">
                    <h5 class="g-color-gray-dark-v5 g-font-weight-400 g-font-size-default mb-0">
                        <cms:LocalizedLabel ID="lblUnits" runat="server" Visible="false" CssClass="UnitsLabel units-label form-control-text" ResourceString="ecommerce.shoppingcartcontent.skuunits" /></h5>
                    <div class="js-quantity input-group u-quantity-v1 g-width-80 g-brd-primary--focus">

                        <cms:CMSTextBox ID="txtUnits" runat="server" Visible="false" CssClass="AddToCartTextBox add-to-cart-text-box js-result form-control text-center g-font-size-13 rounded-0" MaxLength="9" />

                        <div class="input-group-addon d-flex align-items-center g-brd-gray-light-v2 g-width-30 g-bg-white g-font-size-13 rounded-0 g-pa-5">
                            <i class="js-plus g-color-gray g-color-primary--hover fa fa-angle-up"></i>
                            <i class="js-minus g-color-gray g-color-primary--hover fa fa-angle-down"></i>
                        </div>
                    </div>
                </div>

                <%-- Add to cart controls --%>
                <cms:CMSButton ID="btnAdd" runat="server" Visible="false" ButtonStyle="Primary" CssClass="AddToCartButton add-to-cart-button" />
                <asp:ImageButton ID="btnAddImage" runat="server" Visible="false" CssClass="AddToCartImageButton add-to-cart-image-button"
                    OnClick="btnAddImage_Click" />
                <asp:LinkButton ID="lnkAdd" runat="server" Visible="false" CssClass="AddToCartLink add-to-cart-link btn btn-block u-btn-primary g-font-size-12 text-uppercase g-py-15 g-px-25" data-toggle="tooltip" data-placement="top" title="" data-original-title="Add to Cart">
                     <i class="icon-finance-100 u-line-icon-pro"></i>
                </asp:LinkButton>
            </asp:Panel>
        </asp:Panel>
        <asp:HiddenField runat="server" ID="hdnSKUID" Value="0" />
    </ContentTemplate>
</cms:CMSUpdatePanel>