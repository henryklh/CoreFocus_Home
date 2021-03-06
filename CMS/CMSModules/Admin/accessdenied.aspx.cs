﻿using System;

using CMS.ExtendedControls;
using CMS.Helpers;
using CMS.UIControls;
using CMS.Membership;

public partial class CMSModules_Admin_accessdenied : AccessDeniedPage
{
    #region "Page events"

    protected void Page_Load(object sender, EventArgs e)
    {
        CurrentMaster.Title.HideTitle = false;
        btnSignOut.OnClientClick = AuthenticationHelper.GetSignOutOnClickScript(this);

        // Setup page title text and image
        string title = GetString("CMSDesk.AccessDenied");
        string message = GetString("CMSDesk.IsNotEditorMsg");

        bool hideLinks = GetTexts(ref message, ref title);

        lblMessage.Text = message;
        hdnPermission.Text = PageTitle.TitleText = title;

        // hide signout button for not authenticated users
        if (!AuthenticationHelper.IsAuthenticated())
        {
            btnSignOut.Visible = false;
        }

        if (!hideLinks)
        {
            lnkGoBack.Text = GetString("CMSDesk.GoBack");

            // Hide for windows authentication
            if (RequestHelper.IsWindowsAuthentication())
            {
                btnSignOut.Visible = false;
            }
        }
        else
        {
            btnSignOut.Style.Add("display", "none");
            lnkGoBack.Visible = false;
        }

        // Handle dialog
        CMSDialogHelper.RegisterDialogHelper(this);
        var script = String.Format("HandleAspxPageDialog('{0}');", CurrentMaster.PanelHeader.ClientID);
        ScriptHelper.RegisterStartupScript(this, typeof(string), "HandleAspxPageDialog", script, true);
    }

    #endregion


    #region "Methods"

    protected override void PerformSignOut()
    {
        base.PerformSignOut();
        ScriptHelper.RegisterClientScriptBlock(this, typeof(string), "Perfsignout",
            ScriptHelper.GetScript("parent.location.href= '" + ResolveUrl("~/") + "';"));
    }

    #endregion


    #region "Button handling"

    protected void btnSignOut_Click(object sender, EventArgs e)
    {
        PerformSignOut();
    }

    #endregion
}