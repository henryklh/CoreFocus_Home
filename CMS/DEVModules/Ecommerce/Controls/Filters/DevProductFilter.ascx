<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DevProductFilter.ascx.cs" Inherits="DEVModules_Ecommerce_Controls_Filters_DevProductFilter" %>
<%@ Register Src="~/CMSModules/ECommerce/FormControls/PublicStatusSelector.ascx"
    TagName="PublicStatusSelector" TagPrefix="cms" %>
<%@ Register Src="~/CMSModules/ECommerce/FormControls/ManufacturerSelector.ascx"
    TagName="ManufacturerSelector" TagPrefix="cms" %>

<asp:Panel ID="pnlContainer" runat="server">
    <div class="ProductFilter">
        <div class="row">
            <asp:PlaceHolder ID="plcFirstRow" runat="server">
                <div class="col-xs-2 hidden">
                    <cms:LocalizedLabel ID="lblSearch" ResourceString="ecommerce.filter.product.search" runat="server" EnableViewState="false" />
                </div>
                <div class="col-xs-2 hidden">
                    <cms:CMSTextBox ID="txtSearch" runat="server" CssClass="ProductSearch" EnableViewState="false" />
                </div>
                <div class="pull-left standard">
                    <cms:LocalizedLabel ID="lblStatus" ResourceString="ecommerce.filter.product.status" runat="server" EnableViewState="false" />
                </div>
                <div class="pull-left standard">
                    <cms:PublicStatusSelector ID="statusSelector" runat="server" UseNameForSelection="false" AutoPostBack="true"
                        AddAllItemsRecord="true" ReflectGlobalProductsUse="true" />
                </div>
                <div class="col-xs-2 hidden">
                    <cms:LocalizedLabel ID="lblManufacturer" ResourceString="ecommerce.filter.product.manufacturer" runat="server" EnableViewState="false" />
                </div>
                <div class="col-xs-2 hidden">
                    <cms:ManufacturerSelector ID="manufacturerSelector" runat="server" UseNameForSelection="false"
                        AddAllItemsRecord="true" />
                </div>

                <asp:PlaceHolder ID="plcFirstButton" runat="server" Visible="false">
                    <div class="col-xs-2 hidden">
                        <cms:LocalizedButton ID="btnFirstFilter" runat="server" ButtonStyle="Default" EnableViewState="false"
                            OnClick="btnFilter_Click" UseSubmitBehavior="false" ResourceString="ecommerce.filter.product.filter" />
                    </div>
                </asp:PlaceHolder>
            </asp:PlaceHolder>
            <asp:PlaceHolder ID="plcSecondRow" runat="server">
                <div class="col-xs-2 hidden">
                    <cms:LocalizedLabel ID="lblPaging" AssociatedControlID="drpPaging" EnableViewState="false" ResourceString="ecommerce.filter.product.paging"
                        runat="server" />
                </div>
                <div class="hidden">
                    <cms:CMSDropDownList ID="drpPaging" runat="server" UseResourceStrings="true" />
                </div>
                <div class="pull-left standard">
                    <cms:LocalizedLabel ResourceString="ecommerce.filter.product.sort" ID="lblSort" AssociatedControlID="drpSort" EnableViewState="false" runat="server" />
                </div>
                <div class="pull-left standard last">
                    <cms:CMSDropDownList ID="drpSort" runat="server" UseResourceStrings="true" AutoPostBack="true">
                        <asp:ListItem Text="(none)" Value="" />
                        <asp:ListItem Text="ecommerce.filter.product.nameasc" Value="nameasc" />
                        <asp:ListItem Text="ecommerce.filter.product.namedesc" Value="namedesc" />
                        <asp:ListItem Text="ecommerce.filter.product.priceasc" Value="priceasc" />
                        <asp:ListItem Text="ecommerce.filter.product.pricedesc" Value="pricedesc" />
                    </cms:CMSDropDownList>
                </div>
                <div class="pull-left standard hidden">
                    <cms:CMSCheckBox ID="chkStock" runat="server" AutoPostBack="true" />
                </div>
                <asp:PlaceHolder ID="plcSecButton" runat="server">
                    <div class="pull-left standard hidden">
                        <cms:LocalizedButton ID="btnSecFilter" runat="server" ButtonStyle="Default"
                            OnClick="btnFilter_Click" UseSubmitBehavior="false" EnableViewState="false" ResourceString="ecommerce.filter.product.filter" />
                    </div>
                </asp:PlaceHolder>
            </asp:PlaceHolder>
        </div>
    </div>
</asp:Panel>
