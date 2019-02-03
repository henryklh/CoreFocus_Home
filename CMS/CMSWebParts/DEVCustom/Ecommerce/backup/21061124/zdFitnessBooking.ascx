<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_DEVCustom_Ecommerce_zdFitnessBooking" CodeFile="~/CMSWebParts/DEVCustom/Ecommerce/zdFitnessBooking.ascx.cs" %>
<asp:Label ID="lab1" runat="server"></asp:Label>
<asp:Label ID="labSteps" runat="server"></asp:Label>
<asp:Panel ID="pnlYourPurchase" runat="server" Visible="true">
    <h1 style="text-align: center;"><span class="letter-spacing-2"><strong>MY PURCHASE</strong></span></h1>
    <asp:Repeater ID="rptYourPurchase" runat="server" OnItemDataBound="rptYourPurchase_ItemDataBound" OnItemCommand="rptYourPurchase_ItemCommand">
        <HeaderTemplate>
            <table class="table">
                <thead>
                    <tr>
                        <th>Your Purchased Item</th>
                        <th>Expiry Date</th>
                        <th>Limits</th>
                        <th>Avaliable</th>
                    </tr>
                </thead>
                <tbody>
        </HeaderTemplate>
        <ItemTemplate>
            <tr>
                <td>
                    <asp:Label ID="Label1" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label2" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label3" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label4" runat="server"></asp:Label></td>
            </tr>
        </ItemTemplate>
        <SeparatorTemplate>
        </SeparatorTemplate>
        <FooterTemplate>
            </tbody>
        </table>
        </FooterTemplate>
    </asp:Repeater>
    <br />
    <br />
</asp:Panel>
<asp:Panel ID="pnlYourBooking" runat="server" Visible="true">
    <h1 style="text-align: center;"><span class="letter-spacing-2"><strong>MY BOOKING</strong></span></h1>
    <asp:Repeater ID="rptYourBooking" runat="server" OnItemDataBound="rptYourBooking_ItemDataBound" OnItemCommand="rptYourBooking_ItemCommand">
        <HeaderTemplate>
            <table class="table">
                <thead>
                    <tr>
                        <th>Date Time</th>
                        <th>Your Booking Item</th>
                        <th>Status</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
        </HeaderTemplate>
        <ItemTemplate>
            <tr>
                <td>
                    <asp:Label ID="Label1" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label2" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label3" runat="server"></asp:Label></td>
                <td>
                    <asp:Button ID="btnCancel" runat="server" Text="Cancel" CssClass="btn btn-primary" Visible="false" CommandName="CancelBooking" /></td>
            </tr>
        </ItemTemplate>
        <SeparatorTemplate>
        </SeparatorTemplate>
        <FooterTemplate>
            </tbody>
        </table>
        </FooterTemplate>
    </asp:Repeater>
    <br />
    <br />
</asp:Panel>

<asp:Panel ID="pnlTimeTable" runat="server" Visible="true">
    <h1 style="text-align: center;"><span class="letter-spacing-2"><strong>TIMETABLE</strong></span></h1>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-4 text-xs-left">
                <asp:HyperLink ID="hypPre" runat="server" CssClass="btn btn-primary">pre</asp:HyperLink>
            </div>
            <div class="col-sm-4 text-xs-center">
                <asp:Label ID="labDate" runat="server" CssClass="BookingDate"></asp:Label>
            </div>
            <div class="col-sm-4 text-xs-right">
                <asp:HyperLink ID="hypNext" runat="server" CssClass="btn btn-primary">next</asp:HyperLink>
            </div>
        </div>
    </div>
    <br />
    <br />
    <asp:Repeater ID="rptTimeTable" runat="server" OnItemDataBound="rptTimeTable_ItemDataBound" OnItemCommand="rptTimeTable_ItemCommand">
        <HeaderTemplate>
            <table class="table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Class Name</th>
                        <th>Capacity</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
        </HeaderTemplate>
        <ItemTemplate>
            <tr>
                <td>
                    <asp:Label ID="Label1" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label2" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label3" runat="server"></asp:Label></td>
                <td>
                    <asp:LinkButton ID="hypBookNow" runat="server" CssClass="btn btn-book" Text="Book Now"></asp:LinkButton></td>
            </tr>
        </ItemTemplate>
        <AlternatingItemTemplate>
            <tr>
                <td>
                    <asp:Label ID="Label1" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label2" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label3" runat="server"></asp:Label></td>
                <td>
                    <asp:LinkButton ID="hypBookNow" runat="server" CssClass="btn btn-book" Text="Book Now"></asp:LinkButton></td>
            </tr>
        </AlternatingItemTemplate>
        <SeparatorTemplate>
        </SeparatorTemplate>
        <FooterTemplate>
            </tbody>
        </table>
        </FooterTemplate>
    </asp:Repeater>
</asp:Panel>
<asp:Literal ID="labSuccess" runat="server" Visible="false"></asp:Literal>
<asp:Literal ID="labFail" runat="server" Visible="false"></asp:Literal>

<asp:Panel ID="pnlBookingForm" runat="server" Visible="false">
    <h1 style="text-align: center;"><span class="letter-spacing-2"><strong>BOOKING FORM</strong></span></h1>
    <div class="bookingForm">
        <div class="form-group row">
            <label for="txtName">Name</label>
            <asp:TextBox ID="txtName" ClientIDMode="Static" runat="server" CssClass="form-control"></asp:TextBox>
        </div>
        <div class="form-group row">
            <label for="exampleInputEmail2">Email (please check your email address)</label>
            <asp:TextBox ID="txtEmail" ClientIDMode="Static" runat="server" CssClass="form-control"></asp:TextBox>
        </div>
        <div class="form-group row">
            <asp:Label ID="labBookingClassDescription" runat="server">Booking Class Description</asp:Label>
        </div>
        <div class="form-group row">
            <div class="form-check">
                <label class="form-check-label">
                    <asp:CheckBox ID="chkAgree" runat="server" CssClass="form-check-input" />
                    Confirm My Booking
                </label>
            </div>
        </div>
        <div class="form-group row">
            <asp:HiddenField ID="hidBookingInfo" runat="server" />
            <asp:HiddenField ID="hidOrderIfno" runat="server" />
            <asp:Button ID="btnSubmitBooking" runat="server" ClientIDMode="Static" CssClass="btn btn-primary" Text="Confirm My Booking" OnClick="btnSubmit_Click" />
            <asp:Button ID="btnBackToPage" runat="server" ClientIDMode="Static" CssClass="btn btn-primary" Text="Back" OnClick="btnBack_Click" />
        </div>
    </div>
</asp:Panel>
<asp:Panel ID="pnlCancelForm" runat="server" Visible="false">
    <h2>Are your sure to cancel the class?</h2>
    <asp:Panel ID="pnlPay" runat="server" Visible="false">
        <div class="alert alert-warning" role="alert">
            <strong>Warning!</strong> You need to pay $10 for this cancellation.
        </div>
    </asp:Panel>
    <div class="container">
        <div class="bookingForm">
            <div class="form-group row">
                <h4>
                    Cancel Class Information</h4>
            </div>
            <div class="form-group row">
                <label for="labClassName"><b>Class Name</b></label>
                <asp:Label ID="labClassName" runat="server" ClientIDMode="Static"></asp:Label>
            </div>
            <div class="form-group row">
                <label for="labClassTime"><b>Class Time</b></label>
                <asp:Label ID="labClassTime" runat="server" ClientIDMode="Static"></asp:Label>
            </div>
            <div class="form-group row">
                <div class="form-check">
                    <label class="form-check-label">
                        <asp:CheckBox ID="chkCancel" runat="server" CssClass="form-check-input" />
                        Confirm Cancel My Booking
                    </label>
                </div>
            </div>
            <div class="form-group row">
                <asp:HiddenField ID="HiddenField1" runat="server" />
                <asp:HiddenField ID="HiddenField2" runat="server" />
                <asp:Button ID="btnCancel" runat="server" ClientIDMode="Static" CssClass="btn btn-primary" Text="Confirm Cancel My Booking" OnClick="btnCancel_Click" />
                <asp:Button ID="btnCancelBack" runat="server" ClientIDMode="Static" CssClass="btn btn-primary" Text="Back" OnClick="btnCancelBack_Click" />
            </div>
        </div>
    </div>
</asp:Panel>