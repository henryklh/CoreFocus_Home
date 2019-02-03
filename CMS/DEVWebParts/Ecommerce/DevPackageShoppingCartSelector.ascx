<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_DevCustom_Ecommerce_DevPackageShoppingCartSelector" CodeFile="~/CMSWebParts/DevCustom/Ecommerce/DevPackageShoppingCartSelector.ascx.cs" %>
<%@ Register Src="~/DEVModules/Ecommerce/Controls/ProductOptions/ShoppingCartItemPicker.ascx" TagPrefix="uc1" TagName="ShoppingCartItemPicker" %>

<asp:HiddenField ID="hdnPackageSKUID" runat="server" />
<div class="PackageShoppingCartSelector">
    <section class="RequiredProducts panel panel-default">
        <header class="panel-heading">
            <h2 class="panel-title">
                WORLDCLASS MONITORING AT AN UNBEATABLE VALUE</h2>
            <p>Live safer with Frontpoint's 100% Wireless Monitoring. Traditional alarm systems can be easily defeated by burglars in seconds, just by cutting wires - not Frontpoint. And, our best selling Interactive Monitoring includes patented 'Crash and Smash' protection, along with really cool features to keep you connected to what's most important while you are away.</p>
        </header>
        <div class="panel-body" data-picker-type="radio" data-picker-group="Plans">
            <asp:Repeater ID="rptPlansProducts" runat="server" OnItemDataBound="rptPlansProducts_ItemDataBound" OnItemCommand="rptPlansProducts_ItemCommand">
                <ItemTemplate>
                    <uc1:ShoppingCartItemPicker runat="server" ID="ShoppingCartItemPicker" SKUID='<%# DataBinder.Eval(Container.DataItem, "SKUID") %>' ProductPicker="radio" RadioGroupName="Plans" ShowControlLabel="true" OnUpdateCart="ShoppingCartItemPicker_UpdateCart" />
                </ItemTemplate>
            </asp:Repeater>
        </div>
    </section>

    <section class="RequiredProducts panel panel-default">
        <header class="panel-heading">
            <h2 class="panel-title">FLEXIBLE CONTRACTS WITH INSTANT EQUIPMENT DISCOUNT</h2>
            <p>Choose from a 1 or 3 year monitoring agreement. The longer the contract, the bigger the savings. Plus, every single system includes Frontpoint's award winning WOW customer support! (Note: 3 year agreement requires homeownership and credit eligibility).</p>
        </header>
        <div class="panel-body" data-picker-type="radio" data-picker-group="Contracts">
            <asp:Repeater ID="rptContractProducts" runat="server" OnItemDataBound="rptContractProducts_ItemDataBound" OnItemCommand="rptContractProducts_ItemCommand">
                <ItemTemplate>
                    <uc1:ShoppingCartItemPicker runat="server" ID="ShoppingCartItemPicker" SKUID='<%# DataBinder.Eval(Container.DataItem, "SKUID") %>' ProductPicker="radio" RadioGroupName="Contracts" ShowControlLabel="true" OnUpdateCart="ShoppingCartItemPicker_UpdateCart" />
                </ItemTemplate>
            </asp:Repeater>
        </div>
    </section>

    <section class="RequiredProducts panel panel-default">
        <header class="panel-heading">
            <h2 class="panel-title">CONTROL PANELS</h2>
        </header>
        <div class="panel-body" data-picker-type="radio" data-picker-group="CoreElements">
            <asp:Repeater ID="rptCoreElements" runat="server" OnItemDataBound="rptCoreElements_ItemDataBound" OnItemCommand="rptCoreElements_ItemCommand">
                <ItemTemplate>
                    <uc1:ShoppingCartItemPicker runat="server" ID="ShoppingCartItemPicker" SKUID='<%# DataBinder.Eval(Container.DataItem, "SKUID") %>' ProductPicker="radio" RadioGroupName="CoreElements" ShowControlLabel="false" ShowContent="true" OnUpdateCart="ShoppingCartItemPicker_UpdateCart" />
                </ItemTemplate>
            </asp:Repeater>
        </div>
    </section>
    <section class="RequiredProducts panel panel-default">
        <header class="panel-heading">
            <h2 class="panel-title">EQUIPMENT OPTIONS</h2>
        </header>
        <div class="panel-body">
            <asp:Repeater ID="rptOptionals" runat="server" OnItemDataBound="rptOptionals_ItemDataBound">
                <ItemTemplate>
                    <uc1:ShoppingCartItemPicker runat="server" ID="ShoppingCartItemPicker" SKUID='<%# DataBinder.Eval(Container.DataItem, "SKUID") %>' ProductPicker="textbox" ShowContent="true" ShowPriceOnControlLabel="true" OnUpdateCart="ShoppingCartItemPicker_UpdateCart" />
                </ItemTemplate>
            </asp:Repeater>
        </div>
    </section>
    <asp:LinkButton ID="lbnAddToCart" runat="server" OnClick="lbnAddToCart_Click" CssClass="btn btn-primary add-to-cart-link"><i class="fa fa-cart-plus"></i>&nbsp;Add to cart</asp:LinkButton>
    <script type="text/javascript">

        Sys.WebForms.PageRequestManager.getInstance().add_beginRequest(startAddCartRequest);
        Sys.WebForms.PageRequestManager.getInstance().add_endRequest(endAddCartRequest);

        function startAddCartRequest(sender, e) {
            //disable button during the AJAX call
            if (jQuery('.add-to-cart-link').length > 0) {
                jQuery('.add-to-cart-link').attr('disabled', 'disabled');
            }
            if (jQuery('input[type="textbox"],input[type="number"],input[type="select"],input[type="radio"]').length > 0) {
                jQuery('input[type="textbox"],input[type="number"],input[type="select"],input[type="radio"]').attr('disabled', 'disabled');
            }
        }
        function endAddCartRequest(sender, e) {
            //re-enable button once the AJAX call has completed
            if (jQuery('.add-to-cart-link').length > 0) {
                jQuery('.add-to-cart-link').removeAttr('disabled');
            }
            if (jQuery('input[type="textbox"],input[type="number"],input[type="select"],input[type="radio"]').length > 0) {
                jQuery('input[type="textbox"],input[type="number"],input[type="select"],input[type="radio"]').removeAttr('disabled');
            }
        }
    </script>
</div>
<asp:Literal ID="ltlError" runat="server" EnableViewState="false"></asp:Literal>
<asp:Literal ID="ltlTest" runat="server" Visible="false"></asp:Literal>

<asp:RadioButtonList ID="rblTEST" runat="server"></asp:RadioButtonList>