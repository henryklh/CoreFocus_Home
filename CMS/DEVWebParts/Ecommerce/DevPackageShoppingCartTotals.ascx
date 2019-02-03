<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_DevCustom_Ecommerce_DevPackageShoppingCartTotals" CodeFile="~/CMSWebParts/DevCustom/Ecommerce/DevPackageShoppingCartTotals.ascx.cs" %>
<asp:Literal ID="ltlTest" runat="server"></asp:Literal>
<div id="totalViewer" class="TotalViewer" runat="server" visible="False">
    <div class="Label">
        <asp:Label ID="lblLabel" Visible="false" runat="server" />
    </div>
    <div class="Value">
        <asp:Label ID="lblValue" runat="server" />
    </div>
</div>
<cms:BasicUniView runat="server" ID="uvMultiBuySummary" Visible="false" />
