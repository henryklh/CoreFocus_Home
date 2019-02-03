<%@ Page Language="C#" AutoEventWireup="true" CodeFile="eWayResults.aspx.cs" Inherits="DevPaymentGateways_eWayResults" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Test Response</title>
</head>
<body>
    <form id="form1" runat="server">
        <div id="titlearea">
            <h2>Sample Response</h2>
        </div>
        <asp:Literal ID="ltlTest" runat="server"></asp:Literal>
        <div id="error">
            <asp:Label ID="lblError" runat="server"></asp:Label>
        </div>
        <div id="maincontent" runat="server">
            <div class="response">
                <div class="fields">
                    <label for="<%= lblAccessCode.ClientID %>">
                        Access Code</label>
                    <asp:Label ID="lblAccessCode" runat="server"></asp:Label>
                </div>
                <div class="fields">
                    <label for="<%= lblAuthorisationCode.ClientID %>">
                        Authorisation Code</label>
                    <asp:Label ID="lblAuthorisationCode" runat="server"></asp:Label>
                </div>
                <div class="fields">
                    <label for="<%= lblInvoiceNumber.ClientID %>">
                        Invoice Number</label>
                    <asp:Label ID="lblInvoiceNumber" runat="server"></asp:Label>
                </div>
                <div class="fields">
                    <label for="<%= lblInvoiceReference.ClientID %>">
                        Invoice Reference</label>
                    <asp:Label ID="lblInvoiceReference" runat="server"></asp:Label>
                </div>
<%--                <div class="fields">
                    <label for="<%= lblOption1.ClientID %>">
                        Option1</label>
                    <asp:Label ID="lblOption1" runat="server"></asp:Label>
                </div>
                <div class="fields">
                    <label for="<%= lblOption2.ClientID %>">
                        Option2</label>
                    <asp:Label ID="lblOption2" runat="server"></asp:Label>
                </div>
                <div class="fields">
                    <label for="<%= lblOption3.ClientID %>">
                        Option3</label>
                    <asp:Label ID="lblOption3" runat="server"></asp:Label>
                </div>--%>
                <div class="fields">
                    <label for="<%= lblResponseCode.ClientID %>">
                        Response Code</label>
                    <asp:Label ID="lblResponseCode" runat="server"></asp:Label>
                </div>
                <div class="fields">
                    <label for="<%= lblResponseMessage.ClientID %>">
                        Response Message</label>
                    <asp:Label ID="lblResponseMessage" runat="server"></asp:Label>
                </div>
                <div class="fields">
                    <label for="<%= lblTotalAmount.ClientID %>">
                        Total Amount</label>
                    <asp:Label ID="lblTotalAmount" runat="server"></asp:Label>
                </div>
                <div class="fields">
                    <label for="<%= lblTransactionID.ClientID %>">
                        TransactionID</label>
                    <asp:Label ID="lblTransactionID" runat="server"></asp:Label>
                </div>
                <div class="fields">
                    <label for="<%= lblTransactionStatus.ClientID %>">
                        Transaction Status</label>
                    <asp:Label ID="lblTransactionStatus" runat="server"></asp:Label>
                </div>
                <div class="fields">
                    <label for="<%= lblTokenCustomerId.ClientID %>">
                        TokenCustomerId</label>
                    <asp:Label ID="lblTokenCustomerId" runat="server"></asp:Label>
                </div>
            </div>
        </div>
    </form>
</body>
</html>
