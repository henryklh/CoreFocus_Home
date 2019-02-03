<%@ Control Language="C#" AutoEventWireup="true" Inherits="CMSWebParts_DEVCustom_Membership_Profile_DEVMyAccount"
    CodeFile="~/CMSWebParts/DEVCustom/Membership/Profile/DEVMyAccount.ascx.cs" %>
<%@ Register Src="~/CMSModules/Membership/FormControls/Passwords/ChangePassword.ascx" TagName="ChangePassword"
    TagPrefix="cms" %>
<%@ Register Src="~/CMSModules/Membership/Controls/MyProfile.ascx" TagName="MyProfile"
    TagPrefix="cms" %>
<asp:Literal ID="ltlTest" runat="server"></asp:Literal>
<asp:Panel runat="server" ID="pnlBody" CssClass="MyAccount">
    <div class="TabsHeader">
        <cms:BasicTabControl ID="tabMenu" runat="server" />
        <asp:PlaceHolder ID="plcBootstrapNav" runat="server" Visible="false">
            <nav class="navbar navbar-default visible-xs">
                <div class="container-fluid">
                    <!-- Brand and toggle get grouped for better mobile display -->
                    <div class="navbar-header">
                        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span class="sr-only">Toggle navigation</span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                            <span class="icon-bar"></span>
                        </button>
                        <div class="navbar-brand">
                            <asp:Literal ID="ltlNavTitle" runat="server"></asp:Literal></div>
                    </div>

                    <!-- Collect the nav links, forms, and other content for toggling -->
                    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul class="nav navbar-nav">
                            <asp:Literal ID="ltlNavLinks" runat="server"></asp:Literal>
                        </ul>
                    </div>
                </div>
            </nav>
            <div class="nabtabs hidden-xs">
                <ul class="nav nav-tabs">
                    <asp:Literal ID="ltlNavTabs" runat="server"></asp:Literal>
                </ul>
            </div>
            
        </asp:PlaceHolder>
        
    </div>
    <asp:Panel ID="pnlTabs" runat="server" CssClass="TabsContent">
        <asp:Label ID="lblError" CssClass="ErrorLabel" runat="server" Visible="false" EnableViewState="false" />
        <cms:MyProfile ID="myProfile" runat="server" Visible="false" StopProcessing="true" />
        <cms:ChangePassword ID="ucChangePassword" runat="server" Visible="false" />
        <asp:PlaceHolder runat="server" ID="plcOther" />
    </asp:Panel>
</asp:Panel>
