<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_HDCustom_HDOrderPayment" CodeFile="~/CMSWebParts/HDCustom/HDOrderPayment.ascx.cs" %>
<%@ Register Src="~/CMSModules/ECommerce/FormControls/PaymentSelector.ascx" TagName="PaymentSelector" TagPrefix="cms" %>
<%--<style>
    .SelectorClass {
        overflow:hidden;
        padding-right:10px;
    }
</style>--%>

<asp:Literal ID="ltlTest" runat="server"></asp:Literal>
<asp:Panel runat="server" ID="pnlPayment">
    <h2>
        <cms:LocalizedLabel ResourceString="PaymentSummary.OrderId" ID="lblOrderId" runat="server" EnableViewState="false" Visible="false" />
        <asp:Label ID="lblOrderIdValue" runat="server" EnableViewState="false" /></h2>

    <asp:Panel ID="pnlCartContent" runat="server" CssClass="CartContent" Visible="false">
        <cms:BasicUniView runat="server" ID="shoppingCartUniView" CssClass="PanelShoppingCartContent" />
        <hr />
    </asp:Panel>
    <div class="row">
        <div class="CartContentSummary col-sm-6 col-sm-push-6 col-xs-12">
            <div class="TotalViewer">
                <div class="Label">
                    <cms:LocalizedLabel ID="LocalizedLabel1" runat="server" EnableViewState="false" Text="Subtotal:" />
                </div>
                <div class="Value">
                    <asp:Label ID="lblSubTotal" runat="server" EnableViewState="false" />
                </div>
            </div>
            <div class="TotalViewer">
                <div class="Label">
                    <cms:LocalizedLabel ID="LocalizedLabel2" runat="server" EnableViewState="false" Text="Tax (GST):" />
                </div>
                <div class="Value">
                    <asp:Label ID="lblTax" runat="server" EnableViewState="false" />
                </div>
            </div>
            <div class="TotalViewer">
                <div class="Label">
                    <cms:LocalizedLabel ID="lblDeliveryCharge" runat="server" EnableViewState="false" Text="Delivery charge:" />
                </div>
                <div class="Value">
                    <asp:Label ID="lblDeliveryChargeValue" runat="server" EnableViewState="false" />
                </div>
            </div>
            <div class="TotalViewer">
                <div class="Label">
                    <cms:LocalizedLabel Text="Pay amount:" ID="lblTotalPrice" runat="server" EnableViewState="false" />
                </div>
                <div class="Value">
                    <asp:Label ID="lblTotalPriceValue" runat="server" EnableViewState="false" />
                </div>
            </div>
        </div>
        <div class="col-sm-6 col-sm-pull-6 col-xs-12">
            <div class="form-group">
                <label>Your comments:</label>
                <asp:Label ID="lblNote" runat="server" EnableViewState="false" CssClass="TextArea-Static" />
            </div>
        </div>
    </div>
    <hr />
    <asp:Panel runat="server" ID="pnlOrderSummary" CssClass="OrderSummary">
        <asp:Panel runat="server" ID="pnlError" CssClass="ErrorLabel" Visible="false">
            <asp:Label runat="server" ID="lblError" EnableViewState="false" />
        </asp:Panel>
        <asp:Panel runat="server" ID="pnlInfo" CssClass="InfoLabel" Visible="false">
            <asp:Label runat="server" ID="lblInfo" EnableViewState="false" />
        </asp:Panel>
        <div class="row">
            <div class="col-sm-6"><p class="mb-15">You may change your payment method if you have difficulty to use the current payment method.</p></div>
            <div class="FormPanel col-sm-6">
                <div class="form-horizontal">
                    <div class="form-group">
                        <cms:LocalizedLabel ResourceString="PaymentSummary.Payment" ID="lblPayment" runat="server" Font-Bold="true" EnableViewState="false" CssClass="col-sm-6 Label control-label" />
                        <div class="col-sm-6 ComboField">
                            <span class="EditingFormControlNestedControl">
                                <asp:Label ID="lblPaymentValue" runat="server" Visible="false" EnableViewState="false" />
                                <cms:PaymentSelector AddAllItemsRecord="false" ID="drpPayment" runat="server" AddNoneRecord="true" DisplayOnlyEnabled="true" IsLiveSite="true" CssClass="PaymentSelector" />
                            </span>
                            <span class="EditingFormControlNestedButton">
                                <asp:Button ID="btnChangePaymentMethod" runat="server" CssClass="btn btn-info pull-right" Text="Change" OnClick="btnChangePaymentMethod_Click" /></span>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr />
    </asp:Panel>
    
    <div class="PaymentGatewayControls">
        <div class="row">
            <div class="col-sm-6">
                <asp:PlaceHolder ID="cardSample" runat="server" Visible="false">
                    <h4>Sample Card Details for test</h4>
                    <table class="table">
                        <tr>
                            <th>Card Number</th>
                            <td>4444333322221111</td>
                        </tr>
                        <tr>
                            <th>Name on Card</th>
                            <td>Test Credit Card</td>
                        </tr>
                        <tr>
                            <th>Expiry Date</th>
                            <td>Must be after the current month</td>
                        </tr>
                        <tr>
                            <th>Card CVN</th>
                            <td>123</td>
                        </tr>
                    </table>
                </asp:PlaceHolder>
            </div>
            <div class="col-sm-6">
                <asp:Literal ID="ltlMessage" runat="server" EnableViewState="false"></asp:Literal>
                <asp:Panel runat="server" ID="pnlPaymentDataContainer" CssClass="PaymentGatewayDataContainer" />
                <br />
                <cms:CMSButton runat="server" ID="btnProcessPayment" ButtonStyle="Primary" CssClass="ProcessPaymentButton" OnClick="btnProcessPayment_Click" Text="Process payment" />
            </div>
        </div>
    </div>
</asp:Panel>


