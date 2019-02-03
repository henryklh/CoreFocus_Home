<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_DEVCustom_DEVTelerikShoppingCartContent" CodeFile="DEVTelerikShoppingCartContent.ascx.cs" %>

<cms:CMSUpdatePanel ID="upnlAjax" runat="server">
    <ContentTemplate>
        <asp:Literal ID="ltlHeader" runat="server"></asp:Literal>
        <asp:Panel ID="pnlCartContent" runat="server" CssClass="CartContent">
            <cms:BasicUniView runat="server" ID="shoppingCartUniView" CssClass="PanelShoppingCartContent" />
            <asp:Label runat="server" ID="lblShoppingCartEmpty" Visible="false" EnableViewState="false" CssClass="ShoppingCartEmpty" />
            <asp:Label runat="server" ID="lblError" Visible="false" CssClass="ErrorLabel" EnableViewState="false" />
        </asp:Panel>
        <asp:Literal ID="ltlFooter" runat="server"></asp:Literal>
    </ContentTemplate>
</cms:CMSUpdatePanel>
