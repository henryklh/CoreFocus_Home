<%@ Control Language="C#" AutoEventWireup="true" CodeFile="DEVcustombizform.ascx.cs" Inherits="CMSWebParts_DEVCustom_DEVcustombizform" %>
<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>
<telerik:RadAjaxPanel ID="RadAjaxPanel1" runat="server"></telerik:RadAjaxPanel>
<div class="modal fade" tabindex="-1" role="dialog" id="myModal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title">Subscribe to our newsletter and hear about our flash sales!</h4>
            </div>
            <div class="modal-body">
                <cms:BizForm ID="viewBiz" runat="server" IsLiveSite="true" />
            </div>
        </div>
        <!-- /.modal-content -->
    </div>
    <!-- /.modal-dialog -->
</div>
<!-- /.modal -->


<div class="modal fade" tabindex="-1" role="dialog"id="myModalThanks">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">Thank you for subscribe to our newsletter</h4>
      </div>
      <div class="modal-body">
        <p>Thank you !</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div><!-- /.modal-content -->
  </div><!-- /.modal-dialog -->
</div><!-- /.modal -->