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
                        <th>Location</th>
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
                    <asp:Label ID="Label4" runat="server" CssClass="location"></asp:Label></td>
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
            <div class="col-xs-4 text-xs-left">
                <asp:HyperLink ID="hypPre" runat="server" CssClass="btn btn-primary">pre</asp:HyperLink>
            </div>
            <div class="col-xs-4 text-xs-center">
                <asp:Label ID="labDate" runat="server" CssClass="BookingDate"></asp:Label>
            </div>
            <div class="col-xs-4 text-xs-right">
                <asp:HyperLink ID="hypNext" runat="server" CssClass="btn btn-primary">next</asp:HyperLink>
            </div>
        </div>
    </div>
    <br />
    <br />
    <asp:Repeater ID="rptTimeTable" runat="server" OnItemDataBound="rptTimeTable_ItemDataBound" OnItemCommand="rptTimeTable_ItemCommand">
        <HeaderTemplate>
            <div class="row">
                <div class="col-xs-4">
                    <button type="button" class="btn btn-primary btn-lg btn-block" onclick='$(".subiaco").removeClass("hidden-xs-up");$(".nedlands").removeClass("hidden-xs-up");'>All Classes</button>
                </div>
                <div class="col-xs-4">
                    <button type="button" class="btn btn-primary btn-lg btn-block" onclick='$(".nedlands").addClass("hidden-xs-up");$(".subiaco").removeClass("hidden-xs-up");'>Subiaco only</button>
                </div>
                <div class="col-xs-4">
                    <button type="button" class="btn btn-primary btn-lg btn-block" onclick='$(".subiaco").addClass("hidden-xs-up");$(".nedlands").removeClass("hidden-xs-up");'>Nedlands only</button>
                </div>
            </div>
            <table class="table">
                <thead>
                    <tr>
                        <th>Time</th>
                        <th>Class Name</th>
                        <th>Capacity</th>
                        <th>Location</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
        </HeaderTemplate>
        <ItemTemplate>
            <tr id="bookingrow" runat="server">
                <td>
                    <asp:Label ID="Label1" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label2" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label3" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label4" runat="server" CssClass="location"></asp:Label></td>
                <td>
                    <asp:LinkButton ID="hypBookNow" runat="server" CssClass="btn btn-book" Text="Book Now"></asp:LinkButton>
                    <asp:LinkButton ID="hypFull" runat="server" CssClass="btn btn-book disabled" Text="Fully Booked" Enabled="false" Visible="false"></asp:LinkButton>
                </td>
            </tr>
        </ItemTemplate>
        <AlternatingItemTemplate>
            <tr id="bookingrow" runat="server">
                <td>
                    <asp:Label ID="Label1" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label2" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label3" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label4" runat="server" CssClass="location"></asp:Label></td>
                <td>
                    <asp:LinkButton ID="hypBookNow" runat="server" CssClass="btn btn-book" Text="Book Now"></asp:LinkButton>
                    <asp:LinkButton ID="hypFull" runat="server" CssClass="btn btn-book disabled" Text="Fully Booked" Enabled="false" Visible="false"></asp:LinkButton>
                </td>
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

<asp:Panel ID="pnlBookingForm" runat="server" Visible="false" CssClass="m-x-2">
    <asp:PlaceHolder ID="pnlCC" runat="server" Visible="true">
    <h1 style="text-align: center;"><span class="letter-spacing-2"><strong>CREDIT CARD DETAIL</strong></span></h1>
    <div class="creditCardForm">
        <div class="row">
            <div class="col-sm-12 col-xs-12">
               
                    <div class="form-group row">
                        <h5>*Please note this credit card will be attached to your CFP client account.      </h5>
                        <h5>*Please note our $15 LATE and $30 NO SHOW cancellation fees will be automatically deducted from this card. To find out more read our terms and conditions. </h5>
                    </div>
                    <div class="form-group row">
                        <label for="txtName">Card Number</label>
                        <asp:TextBox ID="txtCardNumber" runat="server" CssClass="form-control"  ClientIDMode="Static" TextMode="Number"></asp:TextBox>
                        <asp:literal id="litCardNumberError" runat="server"></asp:literal>
                    </div>
                    <div class="form-group row">
                        <label for="txtName">Name on Card</label>
                        <asp:TextBox ID="txtNameonCard"  runat="server" CssClass="form-control" ClientIDMode="Static" ></asp:TextBox>
                        <asp:literal id="litNameonCardError" runat="server"></asp:literal>
                    </div>
                    <div class="form-group row">
                        <div class="col-xs-6  no-padding-left">
                            <label for="txtName">Card Expiry (MM)</label>
                            <asp:DropDownList ID="ddlExpiryMonth" ClientIDMode="Static" runat="server" CssClass="form-control" >
                                <asp:ListItem Text="MONTH" Value=""></asp:ListItem>
                                <asp:ListItem Text="01" Value="01"></asp:ListItem>
                                <asp:ListItem Text="02" Value="02"></asp:ListItem>
                                <asp:ListItem Text="03" Value="03"></asp:ListItem>
                                <asp:ListItem Text="04" Value="04"></asp:ListItem>
                                <asp:ListItem Text="05" Value="05"></asp:ListItem>
                                <asp:ListItem Text="06" Value="06"></asp:ListItem>
                                <asp:ListItem Text="07" Value="07"></asp:ListItem>
                                <asp:ListItem Text="08" Value="08"></asp:ListItem>
                                <asp:ListItem Text="09" Value="09"></asp:ListItem>
                                <asp:ListItem Text="10" Value="10"></asp:ListItem>
                                <asp:ListItem Text="11" Value="11"></asp:ListItem>
                                <asp:ListItem Text="12" Value="12"></asp:ListItem>
                            </asp:DropDownList>
                            <asp:literal id="litExpiryMonthError" runat="server"></asp:literal>
                        </div>
                        <div class="col-xs-6  no-padding-right">
                            <label for="txtName">Card Expiry (YY)</label>
                             <asp:DropDownList ID="ddlExpiryYear" ClientIDMode="Static" runat="server" CssClass="form-control" >
                                <asp:ListItem Text="YEAR" Value=""></asp:ListItem>
                                <asp:ListItem Text="2017" Value="17"></asp:ListItem>
                                <asp:ListItem Text="2018" Value="18"></asp:ListItem>
                                <asp:ListItem Text="2019" Value="19"></asp:ListItem>
                                <asp:ListItem Text="2020" Value="20"></asp:ListItem>
                                <asp:ListItem Text="2021" Value="21"></asp:ListItem>
                                <asp:ListItem Text="2022" Value="22"></asp:ListItem>
                                <asp:ListItem Text="2023" Value="23"></asp:ListItem>
                                <asp:ListItem Text="2024" Value="24"></asp:ListItem>
                                <asp:ListItem Text="2025" Value="25"></asp:ListItem>
                                <asp:ListItem Text="2026" Value="26"></asp:ListItem>
                                <asp:ListItem Text="2027" Value="27"></asp:ListItem>
                                <asp:ListItem Text="2028" Value="28"></asp:ListItem>
                            </asp:DropDownList>
                            <asp:literal id="litExpiryYearError" runat="server"></asp:literal>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="txtName">CCV</label>
                        <asp:TextBox ID="txtCCV" ClientIDMode="Static" runat="server" CssClass="form-control" MaxLength="4" TextMode="Number"></asp:TextBox>
                        <asp:literal id="litCVVError" runat="server"></asp:literal>
                    </div>
                
            </div>
        </div>
    </div>
    <hr />
    </asp:PlaceHolder>
    <h1 style="text-align: center;"><span class="letter-spacing-2"><strong>BOOKING FORM</strong></span></h1>
    <div class="bookingForm">
        <div class="form-group row">
            <label for="txtName">Name</label>
            <asp:TextBox ID="txtName" ClientIDMode="Static" runat="server" CssClass="form-control"></asp:TextBox>
        </div>
        <div class="form-group row">
            <label for="exampleInputEmail2">Email (please check your email address)</label>
            <asp:TextBox ID="txtEmail" ClientIDMode="Static" runat="server" CssClass="form-control" ></asp:TextBox>
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
            <asp:Button ID="btnSubmitBooking" runat="server" ClientIDMode="Static" CssClass="btn btn-primary" Text="Confirm My Booking" OnClick="btnSubmit_Click"/>
            <asp:Button ID="btnBackToPage" runat="server" ClientIDMode="Static" CssClass="btn btn-primary" Text="Back" OnClick="btnBack_Click" />
        </div>
    </div>
</asp:Panel>
<asp:Panel ID="pnlCancelForm" runat="server" Visible="false">
    <h2>Are your sure to cancel the class?</h2>
    <asp:Panel ID="pnlPay" runat="server" Visible="false">
        <div class="alert alert-warning" role="alert">
            <strong>Warning!</strong> Your card will be charged $10 late cancellation fee under 5 hours before your booked class starts'.
        </div>
    </asp:Panel>
    <div class="container">
        <div class="bookingForm">
            <div class="form-group row">
                <h4>Cancel Class Information</h4>
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