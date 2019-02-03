using CMS.CustomTables;
using CMS.DataEngine;
using CMS.Helpers;
using CMS.Membership;
using CMS.PortalControls;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.UI.WebControls;

public partial class CMSWebParts_DEVCustom_Ecommerce_zdFitnessBookingClassManage : CMSAbstractWebPart
{
    #region "Properties"

    private string zdFitnessbooking = "zd.Fitnessbooking";
    private string zdFitnessTimeTable = "zd.FitnessTimeTable";
    private string zdFitnessbookingCredit = "zd.FitnessbookingCredit";
    private string zdFitnessbookingCancel = "zd.FitnessbookingCancel";
    private ArrayList aryT = new ArrayList();

    #endregion "Properties"

    #region "Methods"

    /// <summary>
    /// Content loaded event handler.
    /// </summary>
    public override void OnContentLoaded()
    {
        base.OnContentLoaded();
        SetupControl();
    }

    /// <summary>
    /// Initializes the control properties.
    /// </summary>
    protected void SetupControl()
    {
        if (this.StopProcessing)
        {
            // Do not process
        }
        else
        {
            LoadTimeTable();
        }
    }

    /// <summary>
    /// Reloads the control data.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();

        SetupControl();
    }

    #endregion "Methods"

    public void LoadTimeTable()
    {
        DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
        if (customTable != null)
        {
            string urlParameterValue = Request.RawUrl;
            DateTime d1 = DateTime.Now;

            if (Request.QueryString["date"] != null)
            {
                string d = Request.QueryString["date"];
                d1 = new DateTime(ValidationHelper.GetInteger(d.Split('-')[2], 1), ValidationHelper.GetInteger(d.Split('-')[1], 1), ValidationHelper.GetInteger(d.Split('-')[0], 1));
            }
            GetTimeTable(d1);
        }
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessTimeTable).OrderByAscending("StartDateTime").ToList();
        CustomTableItem lastItem = c.Last();
        labCurrentUpto.Text = ValidationHelper.GetDateTime(lastItem.GetValue("StartDateTime"), DateTime.Now, "").ToString();
       

    }
    private void GenerateTimeTable(DateTime d)
    {
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereGreaterThan("StartDateTime", d.Date).WhereLessThan("StartDateTime", d.Date.AddDays(1)).OrderByAscending("StartDateTime").ToList();
        if (c.Count == 0)
        {
            d = d.AddDays(-7);
            List<CustomTableItem> n = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereGreaterThan("StartDateTime", d.Date).WhereLessThan("StartDateTime", d.Date.AddDays(1)).OrderByAscending("StartDateTime").ToList();
            //lab1.Text = n.Count.ToString();

            foreach (CustomTableItem e in n)
            {
                CustomTableItem newCustomTableItem = CustomTableItem.New(zdFitnessTimeTable);
                // Sets the values for the fields of the custom table (ItemText in this case)
                newCustomTableItem.SetValue("ClassName", ValidationHelper.GetString(e.GetValue("ClassName"), ""));
                newCustomTableItem.SetValue("ClassType", ValidationHelper.GetString(e.GetValue("ClassType"), ""));
                newCustomTableItem.SetValue("ClassSummary", ValidationHelper.GetString(e.GetValue("ClassSummary"), ""));
                newCustomTableItem.SetValue("Location", ValidationHelper.GetString(e.GetValue("Location"), ""));

                newCustomTableItem.SetValue("AllDayEvent", ValidationHelper.GetBoolean(e.GetValue("AllDayEvent"),false));
                newCustomTableItem.SetValue("AllowOverBook", ValidationHelper.GetBoolean(e.GetValue("AllowOverBook"), false));

                newCustomTableItem.SetValue("StartDateTime", ValidationHelper.GetDateTime(e.GetValue("StartDateTime"), DateTime.Now , "").AddDays(14));
                //newCustomTableItem.SetValue("EndDateTime", ValidationHelper.GetDateTime(e.GetValue("EndDateTime"), DateTime.Now, "").AddDays(7));


                newCustomTableItem.SetValue("Capacity", ValidationHelper.GetInteger(e.GetValue("Capacity"), 0));

                newCustomTableItem.Insert();
            }
            
            List<CustomTableItem> m = CustomTableItemProvider.GetItems(zdFitnessTimeTable).OrderByAscending("StartDateTime").ToList();
            CustomTableItem lastItem = m.Last();
            labCurrentUpto.Text = ValidationHelper.GetDateTime(lastItem.GetValue("StartDateTime"), DateTime.Now, "").ToString();
        }
    }


    public void GetTimeTable(DateTime d)
    {
        labDate.Text = d.ToString("dd/MM/yyyy") + " " + "<strong>" + d.DayOfWeek + "</strong>";
        hypNext.NavigateUrl = CurrentDocument.DocumentUrlPath + "?date=" + d.AddDays(1).ToString("dd-MM-yyyy");
        hypPre.NavigateUrl = CurrentDocument.DocumentUrlPath + "?date=" + d.AddDays(-1).ToString("dd-MM-yyyy");
        DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereGreaterThan("StartDateTime", d.Date).WhereLessThan("StartDateTime", d.Date.AddDays(1)).OrderByAscending("StartDateTime").ToList();
        rptTimeTable.DataSource = c;
        rptTimeTable.DataBind();
    }

    protected void rptTimeTable_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            CustomTableItem item1 = (CustomTableItem)e.Item.DataItem;

            List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(item1.GetValue("ItemID"), 0)).WhereEquals("IsCancel", 0).ToList();

            int classItemID = ValidationHelper.GetInteger(item1.GetValue("ItemID"), 0);
            LinkButton btnShowBooking = (LinkButton)e.Item.FindControl("btnShowBooking");
            btnShowBooking.Text = btnShowBooking.Text + " (" + c.Count.ToString() + ")";

            Label Label1 = (Label)e.Item.FindControl("Label1");
            DateTime a = ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"), DateTime.Now, "");
            Label1.Text = a.ToString("H:mm tt");

            Label Label2 = (Label)e.Item.FindControl("Label2");
            Label2.Text = ValidationHelper.GetString(item1.GetValue("ClassName"), "");

            Label Label3 = (Label)e.Item.FindControl("Label3");
            Label3.Text = ValidationHelper.GetString(item1.GetValue("Capacity"), "");

            btnShowBooking.CommandName = "showbooking";
            btnShowBooking.CommandArgument = classItemID.ToString();
            aryT.Add(classItemID.ToString());
        }
    }

    protected void rptTimeTable_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (!string.IsNullOrEmpty(e.CommandArgument.ToString()))
        {
            string action = e.CommandName.ToString();
            if (action.ToLower().ToString() == "showbooking")
            {
                string id = e.CommandArgument.ToString();
                pnlTimeTableCustomerBooking.Visible = false;
                pnlBooking.Visible = true;
                GetClassBooking(id);
            }
        }
    }

    protected void GetClassBooking(string id)
    {
        /*get data*/
        List<CustomTableItem> t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(id, 0)).ToList();
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(id, 0)).WhereEquals("IsCancel", 0).ToList();

        int i = aryT.IndexOf(id);
        btnNextClass.CommandArgument = "";
        btnPreClass.CommandArgument = "";
        if (t.Count > 0)
        {
            DateTime a = ValidationHelper.GetDateTime(t[0].GetValue("StartDateTime"), DateTime.Now, "");
            string classTime = a.ToString("H:mm tt");
            labClassDate.Text = a.ToString("dd MMM yyyy");
            labBookedClass.Text = classTime + " " + ValidationHelper.GetString(t[0].GetValue("ClassName"), "");

            hypNextDate.NavigateUrl = CurrentDocument.DocumentUrlPath + "?date=" + a.AddDays(1).ToString("dd-MM-yyyy");
            hypNextDate.Text = a.AddDays(1).ToString("dd-MM-yyyy");
            hypPrevDate.NavigateUrl = CurrentDocument.DocumentUrlPath + "?date=" + a.AddDays(-1).ToString("dd-MM-yyyy");
            hypPrevDate.Text = a.AddDays(-1).ToString("dd-MM-yyyy");
            hypBack.NavigateUrl = CurrentDocument.DocumentUrlPath + "?date=" + a.ToString("dd-MM-yyyy");
            hypBack.Text = "Same Day (" +  a.ToString("dd-MM-yyyy") + ")"; 
        }

        if (c != null)
        {
            try
            {
                if ((i - 1) >= 0)
                {
                    btnPreClass.CommandArgument = aryT[i - 1].ToString();
                    btnPreClass.Attributes.Add("preID", btnPreClass.CommandArgument);
                    btnPreClass.Visible = true;
                }
                else
                {
                    btnPreClass.Visible = false;
                }

                if ((i + 1) < aryT.Count)
                {
                    btnNextClass.CommandArgument = aryT[i + 1].ToString();
                    btnNextClass.Attributes.Add("nextID", btnNextClass.CommandArgument);
                    btnNextClass.Visible = true;
                }
                else
                {
                    btnNextClass.Visible = false;
                }
            }
            catch (InvalidCastException e)
            {
            }
            rptCustomer.DataSource = c;
            rptCustomer.DataBind();
        }
        else
        {
        }
    }

    protected void rptCustomer_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            CustomTableItem item1 = (CustomTableItem)e.Item.DataItem;
            UserInfo u = UserInfoProvider.GetUserInfo(ValidationHelper.GetInteger(item1.GetValue("UserID"), 0));

            Label labIndex = (Label)e.Item.FindControl("labIndex");
            labIndex.Text = (e.Item.ItemIndex + 1).ToString();

            Label Label1 = (Label)e.Item.FindControl("Label1");
            Label1.Text = u.FullName;

            //Label Label2 = (Label)e.Item.FindControl("Label2");
            //Label2.Text = u.Email;

            Label Label3 = (Label)e.Item.FindControl("Label3");
            Label3.Text = ValidationHelper.GetString(item1.GetValue("IsConfirmed"), "") + " #" + ValidationHelper.GetString(item1.GetValue("ItemID"), "");
        }
    }

    protected void rptCustomer_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
    }

    protected void btnNextClass_Click(object sender, EventArgs e)
    {
        GetClassBooking(btnNextClass.CommandArgument.ToString());
    }

    protected void btnPreClass_Click(object sender, EventArgs e)
    {
        GetClassBooking(btnPreClass.CommandArgument.ToString());
    }

    private UserInfo getCustomerInfo(int id)
    {
        UserInfo updateUser = UserInfoProvider.GetUserInfo(id);

        return updateUser;
    }
    protected void btnGeneralTimeTable_Click(object sender, EventArgs e)
    {
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessTimeTable).OrderByAscending("StartDateTime").ToList();
        CustomTableItem lastItem = c.Last();
        GenerateTimeTable(ValidationHelper.GetDateTime(lastItem.GetValue("StartDateTime"), DateTime.Now, "").AddDays(1));
    }
}