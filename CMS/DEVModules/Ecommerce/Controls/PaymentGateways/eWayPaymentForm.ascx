<%@ Control Language="C#" AutoEventWireup="true" CodeFile="eWayPaymentForm.ascx.cs" Inherits="DevPaymentGateways_eWayPaymentForm" %>

<asp:Literal ID="ltlTest" runat="server" Visible="false"></asp:Literal>
<asp:Panel ID="pnleWayAccess" runat="server" CssClass="eWayAccessForm">
    <div class="row">
        <div class="col-xs-12">
            <h4>Credit Card</h4>
            <div style="line-height: 2em;"><strong style="float: left; margin-right: 15px; display: inline-block;">Cards we accept: </strong><i class="fa fa-cc-visa fa-2x"></i>  <i class="fa fa-cc-mastercard fa-2x"></i>  <i class="fa fa-cc-amex fa-2x"></i></div>
        </div>
        <div class="col-xs-12">
            <br />
            <br />
            <asp:Button ID="btnConfirmOrder" runat="server" Text="Pay by Credit Card" CssClass="btn btn-lg btn-success" OnClick="btnConfirmOrder_Click" /></div>
    </div>
</asp:Panel>

<asp:Panel ID="pnleWayProcess" runat="server" CssClass="eWayProcessForm" Visible="false">
    <h2>Please enter your credit card detail.</h2>
    <div class="CreditCardForm">
        <div class="form-horizontal">
            <div class="form-group">
                <label for="<%= EWAY_CARDNUMBER.ClientID %>" class="col-md-4 col-xs-12 Label control-label">Card Number: <i class="fa fa-asterisk"></i></label>
                <div class="col-md-8 col-xs-12 EditingFormControlNestedControl">
                    <asp:TextBox ID="EWAY_CARDNUMBER" runat="server" CssClass="form-control" Text=""></asp:TextBox>
                    <asp:Label ID="lblEWAY_CARDNUMBER" runat="server" CssClass="EditingFormErrorLabel" Visible="false">Please enter card number.</asp:Label>
                </div>
            </div>
            <div class="form-group">
                <label for="<%= EWAY_CARDNAME.ClientID %>" class="col-md-4 col-xs-12 Label control-label">Name on Card: <i class="fa fa-asterisk"></i></label>
                <div class="col-md-8 col-xs-12 EditingFormControlNestedControl">
                    <asp:TextBox ID="EWAY_CARDNAME" runat="server" CssClass="form-control" Text=""></asp:TextBox>
                    <asp:Label ID="lblEWAY_CARDNAME" runat="server" CssClass="EditingFormErrorLabel" Visible="false">Please enter name on card.</asp:Label>
                </div>
            </div>
            <div class="form-group">
                <label for="<%= EWAY_CARDEXPIRYMONTH.ClientID %>" class="col-md-4 col-xs-12 Label control-label">Expiry Date: <i class="fa fa-asterisk"></i></label>
                <div class="col-md-8 col-xs-12 ComboField">
                    <span class="EditingFormControlNestedControl">
                        <asp:DropDownList ID="EWAY_CARDEXPIRYMONTH" runat="server" CssClass="form-control">
                            <asp:ListItem Value="01"></asp:ListItem>
                            <asp:ListItem Value="02"></asp:ListItem>
                            <asp:ListItem Value="03"></asp:ListItem>
                            <asp:ListItem Value="04"></asp:ListItem>
                            <asp:ListItem Value="05"></asp:ListItem>
                            <asp:ListItem Value="06"></asp:ListItem>
                            <asp:ListItem Value="07"></asp:ListItem>
                            <asp:ListItem Value="08"></asp:ListItem>
                            <asp:ListItem Value="09"></asp:ListItem>
                            <asp:ListItem Value="10"></asp:ListItem>
                            <asp:ListItem Value="11"></asp:ListItem>
                            <asp:ListItem Value="12"></asp:ListItem>
                        </asp:DropDownList>
                        <asp:Label ID="lblEWAY_CARDEXPIRYMONTH" runat="server" CssClass="EditingFormErrorLabel" Visible="false">Please select expiry month.</asp:Label>
                    </span>
                    <span class="ComboFieldSeparator form-control-static">/</span>
                    <span class="EditingFormControlNestedControl">
                        <asp:DropDownList ID="EWAY_CARDEXPIRYYEAR" runat="server" CssClass="form-control"></asp:DropDownList>
                        <asp:Label ID="lblEWAY_CARDEXPIRYYEAR" runat="server" CssClass="EditingFormErrorLabel" Visible="false">Please select expiry year.</asp:Label>
                    </span>
                    <asp:Label ID="lblExpiryError" runat="server" CssClass="EditingFormErrorLabel" Visible="false">Please select correct card expiry.</asp:Label>
                </div>
            </div>
            <div class="form-group">
                <label for="<%= EWAY_CARDCVN.ClientID %>" class="col-md-4 col-xs-12 Label control-label">Card CVN: <i class="fa fa-asterisk"></i></label>
                <div class="col-md-8 col-xs-12 EditingFormControlNestedControl">
                    <asp:TextBox ID="EWAY_CARDCVN" runat="server" MaxLength="5" CssClass="form-control" Text=""></asp:TextBox>
                    <asp:Label ID="lblEWAY_CARDCVN" runat="server" CssClass="EditingFormErrorLabel" Visible="false">Please enter CVN.</asp:Label>
                </div>
            </div>
            <div class="form-group form-button">
                <asp:Button ID="btnProcessPayment" runat="server" Text="Pay now" CssClass="btn btn-lg btn-primary pull-right" OnClick="btnProcessPayment_Click" />
            </div>
        </div>
    </div>
</asp:Panel>
