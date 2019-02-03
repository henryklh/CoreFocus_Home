<%@ Control Language="C#" AutoEventWireup="true"
    Inherits="CMSWebParts_DEVCustom_DEVTelerikCssListMenu" CodeFile="DEVTelerikCssListMenu.ascx.cs" %>
<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>
<telerik:RadMenu ID="RadMenu1" runat="server" DataFieldID="NodeID" DataValueField="NodeAliasPath"
    DataFieldParentID="NodeParentID" CollapseAnimation-Duration="150" CollapseDelay="150" CollapseAnimation-Type="InOutCubic"
    DataNavigateUrlField="DocumentAbsoluteUrl" DataTextField="NodeName" EnableAjaxSkinRendering="false"
    EnableEmbeddedSkins="false" OnItemDataBound="RadMenu1_ItemDataBound" >
    <DefaultGroupSettings />
</telerik:RadMenu>
<asp:Label ID="labSystem" runat="server" EnableViewState="false"></asp:Label>
<cms:CMSListMenu ID="menuElem" runat="server" />