<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_HDCustom_HDeWayResults" CodeFile="~/CMSWebParts/HDCustom/HDeWayResults.ascx.cs" %>
<asp:HiddenField ID="hdfOrderId" runat="server" />
<asp:Label ID="lblError" runat="server" EnableViewState="false"></asp:Label>
<asp:Literal ID="ltlThankYou" runat="server" EnableViewState="false" Visible="false"></asp:Literal>
<asp:Literal ID="ltlPaymentFailed" runat="server" EnableViewState="false" Visible="false"></asp:Literal>
<div class="text-center">
    <asp:LinkButton ID="btnPaymentLink" runat="server" CssClass="btn btn-info" Visible="false" OnClick="btnPaymentLink_Click"></asp:LinkButton>

    <asp:LinkButton ID="btnFailConfirm" runat="server" Visible="false" CssClass="btn btn-warning" OnClick="btnFailConfirm_Click">Confirm</asp:LinkButton>
</div>
