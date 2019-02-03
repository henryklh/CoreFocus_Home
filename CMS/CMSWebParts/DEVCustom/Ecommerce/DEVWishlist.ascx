<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_DEVCustom_Ecommerce_DEVWishlist" CodeFile="~/CMSWebParts/DEVCustom/Ecommerce/DEVWishlist.ascx.cs" %>
<div class="container-fluid">
    <div class="WishListBody">
        <div class="row">
            <div class="col-xs-12">
                <asp:Panel ID="pnlWishlist" runat="server">
                    <asp:Panel ID="pnlWishlistInner" runat="server">
                        <asp:Label ID="lblInfo" runat="server" CssClass="WishlistInfo" EnableViewState="false" Visible="false" />
                        <table class="WisthList table">
                            <thead>
                                <tr>
                                    <th>Item Name</th>
                                    <th>Item Description</th>
                                    <th>Unit Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <cms:QueryRepeater ID="repeater" runat="server" />
                            </tbody>
                        </table>
                    </asp:Panel>
                </asp:Panel>
            </div>
        </div>
    </div>
    <div class="WishListFooter">
        <div class="row">
            <div class="col-xs-6">
                <div class="btnContinue">
                    <cms:CMSButton ID="btnContinue" runat="server" OnClick="btnContinue_Click" ButtonStyle="Default" />
                </div>
            </div>
            <div class="col-xs-6">
                <div class="btnContinue pull-right" data-toggle="modal" data-target="#myModal">
                    <a class="btn btn-default">Share via email</a>
                </div>
            </div>
        </div>
    </div>
</div>
<asp:Literal ID="ltlScript" runat="server" EnableViewState="false" />
<asp:Panel ID="pnlSuccess" runat="server" ClientIDMode="Static" Visible="false">
    <div class="alert alert-success" role="alert">
        <strong>Well done!</strong> You successfully send the message.
    </div>
</asp:Panel>
<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                <h4 class="modal-title">Share your Wish List</h4>
            </div>
            <div class="modal-body">
                <fieldset class="form-group">
                    <label for="txtSender"><b>Recipient Email</b></label>
                    <div class="input-group">
                        <asp:TextBox ID="txtRecipientEmail" runat="server" TextMode="Email" ClientIDMode="Static" CssClass="form-control" placeholder="Enter email"></asp:TextBox>
                    </div>
                    <div>
                        <asp:RequiredFieldValidator runat="server" CssClass="form-error text-danger" Display="Dynamic" ClientIDMode="Static" ID="RequiredFieldValidator4" ControlToValidate="txtRecipientEmail" ErrorMessage="Recipient Email is required."></asp:RequiredFieldValidator>
                    </div>
                    <div>
                        <asp:RegularExpressionValidator runat="server" Display="dynamic" CssClass="form-error text-danger"
                            ControlToValidate="txtRecipientEmail"
                            ErrorMessage="Invalid Email Address"
                            ValidationExpression="^[a-zA-Z0-9_\-\+]+(\.[a-zA-Z0-9_\-\+]+)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$" /></div>
                </fieldset>
                <fieldset class="form-group">
                    <label for="txtSender"><b>Recipient</b></label>
                    <div class="input-group">
                        <div class="input-group-addon">Dear</div>
                        <asp:TextBox ID="txtRecipient" runat="server"  ClientIDMode="Static" CssClass="form-control" placeholder="Enter email"></asp:TextBox>
                    </div>
                    <div>
                        <asp:RequiredFieldValidator runat="server" CssClass="form-error text-danger" Display="Dynamic" ClientIDMode="Static" ID="RequiredFieldValidator3" ControlToValidate="txtRecipient" ErrorMessage="Recipient is required."></asp:RequiredFieldValidator></div>
                </fieldset>
                <fieldset class="form-group">
                    <label for="txtMessage"><b>Message</b></label>
                    <asp:TextBox class="form-control" ClientIDMode="Static" ID="txtMessage" runat="server"   Rows="3" TextMode="MultiLine">I found these products and wanted to share them with you.</asp:TextBox>
                    <div>
                        <asp:RequiredFieldValidator runat="server" CssClass="form-error text-danger" Display="Dynamic" ClientIDMode="Static" ID="RequiredFieldValidator1" ControlToValidate="txtMessage" ErrorMessage="Message is required."></asp:RequiredFieldValidator></div>
                </fieldset>

                <fieldset class="form-group">
                    <div class="input-group">
                        <div class="input-group-addon">From</div>
                        <asp:TextBox ID="txtSender" runat="server" ClientIDMode="Static" CssClass="form-control " placeholder="e.g John"></asp:TextBox>
                    </div>
                    <div>
                        <asp:RequiredFieldValidator runat="server" CssClass="form-error text-danger" Display="Dynamic" ClientIDMode="Static" ID="RequiredFieldValidator2" ControlToValidate="txtSender" ErrorMessage="Sender is required."></asp:RequiredFieldValidator></div>
                </fieldset>
            </div>
            <div class="modal-footer">
                <div class="pull-left text-danger">All field required</div>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <asp:Button Text="Send" CssClass="btn btn-primary" ID="btnSend" runat="server" ClientIDMode="Static" OnClick="btnSend_Click" />
                <div class="clearfix"></div>
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->
