<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_DEVCustom_Ecommerce_zdFitnessBookingClassManage" CodeFile="~/CMSWebParts/DEVCustom/Ecommerce/zdFitnessBookingClassManage.ascx.cs" %>
<asp:Label ID="lab1" runat="server"></asp:Label>
<asp:Label ID="labSteps" runat="server"></asp:Label>

<asp:Panel ID="pnlTimeTableCustomerBooking" runat="server" Visible="true">
    <asp:Panel ID="pnlGenTimeTable" runat="server">
        <h3>Current Time table up to: <asp:Label ID="labCurrentUpto" runat="server"></asp:Label></h3>
        <asp:Button id="btnGeneralTimeTable" runat="server" CssClass="btn btn-primary" Text="Generate Time Table" OnClick="btnGeneralTimeTable_Click" />
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
                    <asp:LinkButton ID="btnShowBooking" runat="server" CssClass="btn btn-book" Text="Show Booking"></asp:LinkButton>
                    <asp:LinkButton ID="btnCancelClass" runat="server" CssClass="btn btn-book" Text="Cancel this Class" Visible="false"></asp:LinkButton>
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
    <br />
    <asp:Repeater ID="rptCustomer" runat="server" OnItemDataBound="rptCustomer_ItemDataBound" OnItemCommand="rptCustomer_ItemCommand">
        <HeaderTemplate>
            <table class="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Customer Name</th>
                        <th>Confirmed</th>
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
                    <asp:Label ID="Label3" runat="server"></asp:Label></td>
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