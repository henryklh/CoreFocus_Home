<%@ Page Language="C#" AutoEventWireup="true" Inherits="CMSPages_PortalTemplate"
    ValidateRequest="false" MaintainScrollPositionOnPostback="true" EnableEventValidation="false"
     CodeFile="PortalTemplate.aspx.cs" %>

<%=DocType%>
<!--[if lt IE 7 ]><html class="ie ie6" lang="en"> <![endif]-->
<!--[if IE 7 ]><html class="ie ie7" lang="en"> <![endif]-->
<!--[if IE 8 ]><html class="ie ie8" lang="en"> <![endif]-->
<!--[if (gte IE 9)|!(IE)]><!-->
<html <%=XHtmlNameSpace%> <%=XmlNamespace%>>
<!--<![endif]-->
<head id="head" runat="server" enableviewstate="false">
    <title id="_title" runat="server">My site</title>
    <asp:Literal runat="server" ID="tags" EnableViewState="false" />
</head>
<body class="<%=BodyClass%>" <%=BodyParameters%>>
    <form id="form" runat="server">
    <asp:PlaceHolder runat="server" ID="plcManagers">
        <ajaxToolkit:ToolkitScriptManager ID="manScript" runat="server" ScriptMode="Release"
            EnableViewState="false" />
        <cms:CMSPortalManager ID="manPortal" ShortID="m" runat="server" EnableViewState="false" />
        <cms:CMSDocumentManager ID="docMan" ShortID="dm" runat="server" StopProcessing="true"
            Visible="false" IsLiveSite="false" />
    </asp:PlaceHolder>
    <cms:ContextMenuPlaceHolder ID="plcCtx" runat="server" />
    <cms:CMSPagePlaceholder ID="plcRoot" ShortID="p" runat="server" Root="true" />
    <asp:PlaceHolder runat="server" ID="plcFooter" />
    </form>
</body>
</html>
