<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_Ecommerce_Checkout_InputFields_DiscountCoupon"  CodeFile="~/CMSWebParts/Ecommerce/Checkout/InputFields/DiscountCoupon.ascx.cs" %>
<asp:Panel runat="server" ID="pnlDsicountCoupon" DefaultButton="btnUpdate">
    <cms:CMSTextBox runat="server" ID="txtCouponField" autocomplete="off"/>
    <cms:CMSButton runat="server" ID="btnUpdate" OnClick="btnUpdate_Click" Visible="false" ButtonStyle="Primary" />
    <asp:panel runat="server" ID="pnlError" class="Error" Visible="false">
        <asp:Label runat="server" ID="lblError" />
    </asp:panel>
</asp:Panel>