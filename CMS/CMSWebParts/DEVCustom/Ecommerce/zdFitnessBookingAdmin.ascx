<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_DEVCustom_Ecommerce_zdFitnessBookingAdmin" CodeFile="~/CMSWebParts/DEVCustom/Ecommerce/zdFitnessBookingAdmin.ascx.cs" %>
<asp:Label ID="lab1" runat="server"></asp:Label>
<asp:Label ID="labSteps" runat="server"></asp:Label>
<asp:Literal ID="labSuccess" runat="server" Visible="false"></asp:Literal>
<asp:Literal ID="labFail" runat="server" Visible="false"></asp:Literal>
<asp:HiddenField runat="server" ID="hidOrderIfno" />
<asp:Panel ID="pnlTimeTableCustomerBooking" runat="server" Visible="true">
    <asp:Panel ID="pnlGenTimeTable" runat="server">
        <h3>Current Time table up to:
            <asp:Label ID="labCurrentUpto" runat="server"></asp:Label></h3>
        <asp:Button ID="btnGeneralTimeTable" runat="server" CssClass="btn btn-primary" Text="Generate Time Table" OnClick="btnGeneralTimeTable_Click" />
    </asp:Panel>
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
                    <asp:LinkButton ID="btnShowBooking" runat="server" CssClass="btn btn-book" Text="Show Booking"></asp:LinkButton>
                    <asp:LinkButton ID="btnCancelClass" runat="server" CssClass="btn btn-book" Text="Cancel this Class"></asp:LinkButton>
                </td>
            </tr>
        </ItemTemplate>
        <SeparatorTemplate>
        </SeparatorTemplate>
        <FooterTemplate>
            </tbody>
        </table>
        </FooterTemplate>
    </asp:Repeater>
</asp:Panel>
<asp:Panel ID="pnlBooking" runat="server" Visible="false">
    <h1 style="text-align: center;"><span class="letter-spacing-2"><strong>Booking</strong></span></h1>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-4 text-xs-left">
                <asp:LinkButton ID="btnPreClass" runat="server" CssClass="btn btn-primary" OnClick="btnPreClass_Click">prev Class (Today)</asp:LinkButton>
            </div>
            <div class="col-sm-4 text-xs-center">
                <h2>
                    <asp:Label ID="labClassDate" runat="server" CssClass="BookingDate"></asp:Label></h2>
                <asp:Label ID="labBookedClass" runat="server" CssClass="BookingDate"></asp:Label>
            </div>
            <div class="col-sm-4 text-xs-right">
                <asp:LinkButton ID="btnNextClass" runat="server" CssClass="btn btn-primary" OnClick="btnNextClass_Click">next Class (Today)</asp:LinkButton>
            </div>
        </div>
    </div>
    <br />
    <div>
        <div class="form-group">
            <label for="exampleInputEmail2">Email</label>
            <asp:TextBox  id="txtemail" runat="server" CssClass="form-control"  placeholder="jane.doe@example.com"></asp:TextBox>
        </div>
        <asp:Button id="btn_AddtoClass" runat="server" OnClick="btn_AddtoClass_Click" Text="Add to Class"/>
    </div>
    <br />
    <asp:HiddenField ID="ClassID" runat="server" Value="" />
    <asp:Repeater ID="rptCustomer" runat="server" OnItemDataBound="rptCustomer_ItemDataBound" OnItemCommand="rptCustomer_ItemCommand">
        <HeaderTemplate>
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Email</th>
                        <th>Confirmed</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
        </HeaderTemplate>
        <ItemTemplate>
            <tr>
                <td>
                    <asp:Label ID="labIndex" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label1" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label2" runat="server"></asp:Label></td>
                <td>
                    <asp:Label ID="Label3" runat="server"></asp:Label></td>
                <td>
                    <asp:Button ID="btn_cancelthisperson" runat="server" CommandName="cancelthisperson" Text="Cancel" OnClientClick="return confirm_delete('Are you sure?')"></asp:Button></td>
            </tr>
        </ItemTemplate>
        <SeparatorTemplate>
        </SeparatorTemplate>
        <FooterTemplate>
            </tbody>
        </table>
        </FooterTemplate>
    </asp:Repeater>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-4 text-xs-left">
                <asp:HyperLink ID="hypPrevDate" runat="server" CssClass="btn btn-primary">prev Day</asp:HyperLink>
            </div>
            <div class="col-sm-4 text-xs-center">
                <asp:HyperLink ID="hypBack" runat="server" CssClass="btn btn-primary">Today</asp:HyperLink>
            </div>
            <div class="col-sm-4 text-xs-right">
                <asp:HyperLink ID="hypNextDate" runat="server" CssClass="btn btn-primary">next Day</asp:HyperLink>
            </div>
        </div>
    </div>
</asp:Panel>
<asp:Panel ID="pnlCancel" runat="server" Visible="false">

    <h1 style="text-align: center;"><span class="letter-spacing-2"><strong>Booking</strong></span></h1>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-4 text-xs-left">
                <%--<asp:LinkButton ID="LinkButton1" runat="server" CssClass="btn btn-primary" OnClick="btnPreClass_Click">prev Class (Today)</asp:LinkButton>--%>
            </div>
            <div class="col-sm-4 text-xs-center">
                <h2>
                    <asp:Label ID="labClassDateCancel" runat="server" CssClass="BookingDate"></asp:Label></h2>
                <asp:Label ID="labBookedClassCancel" runat="server" CssClass="BookingDate"></asp:Label>
                <br />
                <br />
                <div>Please Type "YES" to confirm cancel this Class</div>
                <div>
                    Type Here:
                    <asp:TextBox ID="txtConfirm" runat="server"></asp:TextBox>
                </div>
                <br />
                <asp:Button ID="btn_cancel" runat="server" Text="Cancel Now" OnClick="btn_cancel_Click" />
            </div>
            <div class="col-sm-4 text-xs-right">
                <%--<asp:LinkButton ID="LinkButton2" runat="server" CssClass="btn btn-primary" OnClick="btnNextClass_Click">next Class (Today)</asp:LinkButton>--%>
            </div>
        </div>
    </div>
    <br />
    <br />
</asp:Panel>

<script type="text/javascript">
    function confirm_delete(question) {

        if (confirm(question)) {

            //alert("Action to delete");

        } else {
            return false;
        }

    }
</script>