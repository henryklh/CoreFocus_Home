<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DEVShoppingCartTotals.ascx.cs" Inherits="CMSWebParts_DEVCustom_DEVShoppingCartTotals" %>

<asp:Literal ID="ltlTest" runat="server" EnableViewState="false"></asp:Literal>
<div id="totalViewer" class="TotalViewer" runat="server" visible="False">
    <div class="Label">
        <asp:Label ID="lblLabel" Visible="false" runat="server" />
    </div>
    <div class="Value">
        <asp:Label ID="lblValue" runat="server" />
    </div>
</div>
<cms:BasicUniView runat="server" ID="uvMultiBuySummary" Visible="false" />
