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

public partial class CMSWebParts_DEVCustom_Ecommerce_zdFitnessBookingAdmin : CMSAbstractWebPart
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
        pnlBooking.Visible = false;
        pnlCancel.Visible = false;
        pnlTimeTableCustomerBooking.Visible = true;

    }

    private void GenerateTimeTable(DateTime d)
    {
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereGreaterThan("StartDateTime", d.Date).WhereLessThan("StartDateTime", d.Date.AddDays(1)).OrderByAscending("StartDateTime").ToList();
        if (c.Count == 0)
        {
            d = d.AddDays(-7);
            List<CustomTableItem> n = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereGreaterThan("StartDateTime", d.Date).WhereLessThan("StartDateTime", d.Date.AddDays(1)).WhereNotEquals("Capactiy",0).OrderByAscending("StartDateTime").ToList();
            //lab1.Text = n.Count.ToString();

            foreach (CustomTableItem e in n)
            {
                CustomTableItem newCustomTableItem = CustomTableItem.New(zdFitnessTimeTable);
                // Sets the values for the fields of the custom table (ItemText in this case)
                newCustomTableItem.SetValue("ClassName", ValidationHelper.GetString(e.GetValue("ClassName"), ""));
                newCustomTableItem.SetValue("ClassType", ValidationHelper.GetString(e.GetValue("ClassType"), ""));
                newCustomTableItem.SetValue("ClassSummary", ValidationHelper.GetString(e.GetValue("ClassSummary"), ""));
                newCustomTableItem.SetValue("Location", ValidationHelper.GetString(e.GetValue("Location"), ""));

                newCustomTableItem.SetValue("AllDayEvent", ValidationHelper.GetBoolean(e.GetValue("AllDayEvent"), false));
                newCustomTableItem.SetValue("AllowOverBook", ValidationHelper.GetBoolean(e.GetValue("AllowOverBook"), false));

                newCustomTableItem.SetValue("StartDateTime", ValidationHelper.GetDateTime(e.GetValue("StartDateTime"), DateTime.Now, "").AddDays(7));
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

            LinkButton btnCancelClass = (LinkButton)e.Item.FindControl("btnCancelClass");

            Label Label1 = (Label)e.Item.FindControl("Label1");
            DateTime a = ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"), DateTime.Now, "");
            Label1.Text = a.ToString("H:mm tt");

            Label Label2 = (Label)e.Item.FindControl("Label2");
            Label2.Text = ValidationHelper.GetString(item1.GetValue("ClassName"), "");

            Label Label3 = (Label)e.Item.FindControl("Label3");
            Label3.Text = ValidationHelper.GetString(item1.GetValue("Capacity"), "");

            Label Label4 = (Label)e.Item.FindControl("Label4");
            Label4.Text = ValidationHelper.GetString(item1.GetValue("Location"), "");

            btnShowBooking.CommandName = "showbooking";
            btnShowBooking.CommandArgument = classItemID.ToString();

            btnCancelClass.CommandName = "cancelclass";
            btnCancelClass.CommandArgument = classItemID.ToString();

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
                pnlCancel.Visible = false;
                GetClassBooking(id);
            }

            if (action.ToLower().ToString() == "cancelclass")
            {
                string id = e.CommandArgument.ToString();
                pnlTimeTableCustomerBooking.Visible = false;
                pnlBooking.Visible = false;
                pnlCancel.Visible = true;
                GetClassCancel(id);
            }
        }
    }

    protected void GetClassBooking(string id)
    {
        ClassID.Value = "";
        /*get data*/
        List<CustomTableItem> t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(id, 0)).ToList();
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(id, 0)).WhereEquals("IsCancel", 0).ToList();

        int i = aryT.IndexOf(id);
        btnNextClass.CommandArgument = "";
        btnPreClass.CommandArgument = "";
        if (t.Count > 0)
        {
            DateTime a = ValidationHelper.GetDateTime(t[0].GetValue("StartDateTime"), DateTime.Now, "");
            ClassID.Value = ValidationHelper.GetString(t[0].GetValue("ItemID"),"");
            string classTime = a.ToString("H:mm tt");
            labClassDate.Text = a.ToString("dd MMM yyyy");
            labBookedClass.Text = classTime + " " + ValidationHelper.GetString(t[0].GetValue("ClassName"), "") + " (" + ClassID.Value + ")";

            hypNextDate.NavigateUrl = CurrentDocument.DocumentUrlPath + "?date=" + a.AddDays(1).ToString("dd-MM-yyyy");
            hypNextDate.Text = a.AddDays(1).ToString("dd-MM-yyyy");
            hypPrevDate.NavigateUrl = CurrentDocument.DocumentUrlPath + "?date=" + a.AddDays(-1).ToString("dd-MM-yyyy");
            hypPrevDate.Text = a.AddDays(-1).ToString("dd-MM-yyyy");
            hypBack.NavigateUrl = CurrentDocument.DocumentUrlPath + "?date=" + a.ToString("dd-MM-yyyy");
            hypBack.Text = "Same Day (" + a.ToString("dd-MM-yyyy") + ")";
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

    protected void GetClassCancel(string id)
    {
        labSuccess.Visible = false;
        /*get data*/
        List<CustomTableItem> t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(id, 0)).ToList();
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(id, 0)).WhereEquals("IsCancel", 0).ToList();

        int i = aryT.IndexOf(id);
        btn_cancel.CommandArgument = id;

        if (t.Count > 0)
        {
            DateTime a = ValidationHelper.GetDateTime(t[0].GetValue("StartDateTime"), DateTime.Now, "");
            string classTime = a.ToString("H:mm tt");
            labClassDateCancel.Text = a.ToString("dd MMM yyyy");
            labBookedClassCancel.Text = classTime + " " + ValidationHelper.GetString(t[0].GetValue("ClassName"), "");
        }
        else
        {
        }
    }

    protected void ProcessClassCancel(string id)
    {
        /*get data*/
        List<CustomTableItem> t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(id, 0)).ToList();
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(id, 0)).WhereEquals("IsCancel", 0).ToList();

        int i = aryT.IndexOf(id);

        if (t.Count > 0)
        {
            DateTime a = ValidationHelper.GetDateTime(t[0].GetValue("StartDateTime"), DateTime.Now, "");
            string classTime = a.ToString("H:mm tt");
            labClassDateCancel.Text = a.ToString("dd MMM yyyy");
            labBookedClassCancel.Text = classTime + " " + ValidationHelper.GetString(t[0].GetValue("ClassName"), "");
            t[0].SetValue("Capacity", 0);
            t[0].Update();

            //email for cancel
            foreach (CustomTableItem item1 in c)
            {
                UserInfo u = UserInfoProvider.GetUserInfo(ValidationHelper.GetInteger(item1.GetValue("UserID"), 0));
                sendMailtoCancelCustomer("This Class has been cancelled - " +  a.ToString("dd MMM yyyy") + ", " + ValidationHelper.GetString(t[0].GetValue("ClassName"), ""), u.Email);
                List<CustomTableItem> b = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserID", u.UserID).OrderByDescending("ItemModifiedWhen").ToList();
                item1.SetValue("IsCancel", 1);
                item1.Update();
                if (b.Count > 0)
                {
                    DateTime d = ValidationHelper.GetDateTime(b[0].GetValue("DateTimeEnd"), DateTime.Now, "");
                    if (d > DateTime.Now)
                    {
                    }
                    else
                    {
                        b[0].SetValue("DateTimeEnd", d.AddDays(7));
                    }
                    int r = ValidationHelper.GetInteger(b[0].GetValue("RemainCounter"), -1);
                    int p = ValidationHelper.GetInteger(b[0].GetValue("PeriodMax"), -1);

                    if (r >= 0)
                    {
                        b[0].SetValue("RemainCounter", r + 1);
                    }
                    if (p >= 0)
                    {
                        b[0].SetValue("PeriodMax", p + 1);
                    }
                    b[0].SetValue("ItemModifiedWhen", DateTime.Now);
                    b[0].Update();

                }
            }
            labSuccess.Text = "<div class=\"alert alert-success\" role=\"alert\">Class cancel successfully</div>";
            labSuccess.Visible = true;
            LoadTimeTable();
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
            Label1.Text = u.FullName + "(" + u.UserID.ToString() + ")";

            Label Label2 = (Label)e.Item.FindControl("Label2");
            Label2.Text = u.Email;

            Label Label3 = (Label)e.Item.FindControl("Label3");
            Label3.Text = ValidationHelper.GetString(item1.GetValue("IsConfirmed"), "") + " #" + ValidationHelper.GetString(item1.GetValue("ItemID"), "");

            Button btn_cancelthisperson = (Button)e.Item.FindControl("btn_cancelthisperson");
            btn_cancelthisperson.CommandArgument = u.UserID + "," + ClassID.Value.ToString();
                    
        }
    }

    protected void rptCustomer_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (e.CommandName.ToString() == "cancelthisperson")
        {
            labSuccess.Visible = false;
            labFail.Visible = false;
            //lab1.Text += "Start Cancel";
            string[] result = e.CommandArgument.ToString().Split(',');
            List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(result[1], 0)).WhereEquals("UserID", ValidationHelper.GetInteger(result[0], 0)).WhereEquals("IsCancel", 0).ToList();
            //lab1.Text += result[0].ToString() + "," + result[1].ToString();
            if (c.Count > 0)
            {
               
                c[0].SetValue("IsCancel", 1);
                c[0].Update();
                UserInfo u = UserInfoProvider.GetUserInfo(ValidationHelper.GetInteger(result[0], 0));
                sendMailtoCancelCustomer("This class booking has been cancelled by Admin - " + labClassDateCancel.Text + ", " + labBookedClassCancel.Text, u.Email);
                lab1.Text += u.Email.ToString();
                List<CustomTableItem> b = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserID", ValidationHelper.GetInteger(result[0], 0)).OrderByDescending("ItemModifiedWhen").ToList();
                if (b.Count > 0)
                {
                    DateTime d = ValidationHelper.GetDateTime(b[0].GetValue("DateTimeEnd"), DateTime.Now, "");
                    if (d > DateTime.Now)
                    {
                    }
                    else
                    {
                        b[0].SetValue("DateTimeEnd", d.AddDays(7));
                    }

                    int r = ValidationHelper.GetInteger(b[0].GetValue("RemainCounter"), -1);
                    int p = ValidationHelper.GetInteger(b[0].GetValue("PeriodMax"), -1);

                    if (r >= 0)
                    {
                        b[0].SetValue("RemainCounter", r + 1);
                    }
                    if (p >= 0)
                    {
                        b[0].SetValue("PeriodMax", p + 1);
                    }
                    b[0].SetValue("ItemModifiedWhen", DateTime.Now);
                    b[0].Update();

                }
                labSuccess.Text = "<div class=\"alert alert-success\" role=\"alert\">Cancel successfully</div>";
                labSuccess.Visible = true;
                GetClassBooking(result[1]);
            }
                                                    
        }
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

    protected void btn_cancel_Click(object sender, EventArgs e)
    {
        labSuccess.Visible = false;
        labFail.Visible = false;
        if (txtConfirm.Text.ToUpper() == "YES")
        {
            txtConfirm.BorderColor = System.Drawing.Color.Black;
            //process cancel and email to customer and add credit back to them
            ProcessClassCancel(btn_cancel.CommandArgument.ToString());
        }
        else
        {
            txtConfirm.BorderColor = System.Drawing.Color.Red;
        }
    }

    protected bool checkBookingAvailable(int classItemID, UserInfo u)
    {
        DataClassInfo FitnessbookingCredit = DataClassInfoProvider.GetDataClassInfo(zdFitnessbookingCredit);
        DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);

        List<CustomTableItem> t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", classItemID).ToList();

        List<CustomTableItem> bookingClassPeople = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(classItemID, 0)).WhereEquals("IsCancel",0).ToList();
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserId", ValidationHelper.GetInteger(u.UserID, 0)).WhereContains("ClassType", ValidationHelper.GetString(t[0].GetValue("ClassType"), "")).WhereGreaterThan("DateTimeEnd", DateTime.Now).OrderByAscending("ItemCreatedWhen").ToList();
        //lab1.Text += bookingClassPeople.Count.ToString();
        if (!(ValidationHelper.GetInteger(t[0].GetValue("Capacity"), 0) > bookingClassPeople.Count))
        {
            return false;
        }

        if (c.Count() > 0)
        {
            DateTime d = ValidationHelper.GetDateTime(c[0].GetValue("DateTimeEnd"), DateTime.Now.AddYears(-1), "");
            //lab1.Text += d.ToString() + "<br/>";

            //if (d < DateTime.Now)
            //{
            //    return false;
            //}

            foreach (CustomTableItem e in c)
            {
                int a = ValidationHelper.GetInteger(e.GetValue("RemainCounter"), -1);
                int b = ValidationHelper.GetInteger(e.GetValue("PeriodMax"), -1);
                //lab1.Text += "(" + a.ToString() +"," + b.ToString()+  ")<br/>";
                if (a + b >= 0)
                {
                    //lab1.Text += a.ToString() + "<br/>";
                    //lab1.Text += b.ToString() + "<br/>";
                    hidOrderIfno.Value = ValidationHelper.GetString(e.GetValue("OrderID"), "") + "," + ValidationHelper.GetString(e.GetValue("OrderItemID"), "") + "," + ValidationHelper.GetString(e.GetValue("IsUnlimited"), "0");
                    return true;
                }
            }
        }
        return false;
    }

    protected void btn_AddtoClass_Click(object sender, EventArgs e)
    {
        hidOrderIfno.Value = "";
        labSuccess.Visible = false;
        labFail.Visible = false;
        UserInfo u = UserInfoProvider.GetUserInfo(txtemail.Text);
        if (u != null)
        {
            //lab1.Text += "Step1";
           
            if (checkBookingAvailable(ValidationHelper.GetInteger(ClassID.Value, 0), u))
            {

                string[] orderResult = hidOrderIfno.Value.Split(',');
                //lab1.Text += "Step2";
                string BookingConfirm = "";
                string message = "";
                string ClassType = "";
                DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
                CustomTableItem t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(ClassID.Value.ToString(), 0)).FirstObject;
                ClassType = ValidationHelper.GetString(t.GetValue("ClassType"), "");
                List<CustomTableItem> bookingClassPeople = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(ClassID.Value.ToString(), 0)).WhereEquals("IsCancel",0).ToList();
                //lab1.Text += (!(bookingClassPeople.Count < ValidationHelper.GetInteger(t.GetValue("Capacity"), 0))).ToString();

                if ((ValidationHelper.GetInteger(t.GetValue("Capacity"), 0) > bookingClassPeople.Count))
                {
                    //lab1.Text += "Step3";
                    int cap = ValidationHelper.GetInteger(t.GetValue("Capacity"), 0);
                    DateTime StartDateTime = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "");

                    message = "Customer: " + u.FullName + " has booked in " + StartDateTime.ToString("dd-MMM-yyyy H:mm tt") + " " + ValidationHelper.GetString(t.GetValue("ClassName"), "");

                    DataClassInfo Fitnessbooking = DataClassInfoProvider.GetDataClassInfo(zdFitnessbooking);
                    CustomTableItem b = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(ClassID.Value.ToString(), 0)).WhereEquals("UserID", u.UserID).WhereEquals("IsCancel", 0).OrderByDescending("ItemCreatedWhen");
                    if (b == null)
                    {
                        CustomTableItem newCustomTableItem = CustomTableItem.New(zdFitnessbooking);
                        // Sets the values for the fields of the custom table (ItemText in this case)

                        newCustomTableItem.SetValue("UserID", u.UserID);
                        newCustomTableItem.SetValue("ClassID", ClassID.Value.ToString());
                        newCustomTableItem.SetValue("StartDateTime", StartDateTime);

                        newCustomTableItem.SetValue("IsCancel", 0);
                        newCustomTableItem.SetValue("IsConfirmed", 1);

                        List<CustomTableItem> cb = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(ClassID.Value.ToString(), 0)).WhereEquals("IsCancel", 0).OrderByDescending("ItemCreatedWhen").ToList();
                        if (cb.Count > 0)
                        {
                            if (cap > cb.Count())
                            {
                                newCustomTableItem.SetValue("IsConfirmed", 1);
                                BookingConfirm = "confirmed";
                            }
                            else
                            {
                                newCustomTableItem.SetValue("IsConfirmed", 0);
                                BookingConfirm = "on waiting list";
                            }
                        }
                        else
                        {
                            newCustomTableItem.SetValue("IsConfirmed", 1);
                            BookingConfirm = "confirmed";
                        }

                        if (orderResult[2].ToString() == "FALSE")
                        {
                            newCustomTableItem.SetValue("IsUnlimited", 0);
                        }
                        else
                        {
                            newCustomTableItem.SetValue("IsUnlimited", 1);
                        }
                        newCustomTableItem.SetValue("OrderID", ValidationHelper.GetInteger(orderResult[0].ToString(), 0));
                        newCustomTableItem.SetValue("OrderItemID", ValidationHelper.GetInteger(orderResult[1].ToString(), 0));
                        /*check thie part*/
                        List<CustomTableItem> c1 = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserID", u.UserID).WhereGreaterThan("RemainCounter", 0).WhereGreaterThan("DateTimeEnd", DateTime.Now.AddDays(-1)).WhereContains("ClassType", ValidationHelper.GetString(ClassType, "")).OrderByDescending("DateTimeEnd").ToList();
                        List<CustomTableItem> c2 = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserID", u.UserID).WhereGreaterThan("RemainCounter", 0).WhereGreaterThan("DateTimeEnd", DateTime.Now.AddDays(-1)).WhereContains("ClassType", ValidationHelper.GetString(ClassType, "")).OrderByDescending("DateTimeEnd").ToList();




                        List<CustomTableItem> v = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserID", u.UserID).WhereGreaterThan("DateTimeEnd", DateTime.Now.AddDays(-1)).WhereContains("ClassType", ValidationHelper.GetString(ClassType, "")).OrderByAscending("DateTimeEnd").ToList();


                        CustomTableItem c = new CustomTableItem();

                        foreach (CustomTableItem f in v)
                        {
                            if (ValidationHelper.GetDateTime(f.GetValue("DateTimeEnd"), DateTime.Now.AddDays(-1)) > DateTime.Now)
                            {
                                int r = ValidationHelper.GetInteger(f.GetValue("RemainCounter"), -1);
                                int p = ValidationHelper.GetInteger(f.GetValue("PeriodMax"), -1);
                                if ((r + p) >= 0)
                                {
                                    c = f;
                                    break;
                                }
                            }

                        }

                        if (c != null)
                        {
                           
                            int r = ValidationHelper.GetInteger(c.GetValue("RemainCounter"), -1);
                            int p = ValidationHelper.GetInteger(c.GetValue("PeriodMax"), -1);
                            //string unlimited = ValidationHelper.GetString(c.GetValue("IsUnlimited"), "False");
                            lab1.Text += r + "<br/>";
                            lab1.Text += p + "<br/>";
                            if ((r + p) >= 0)
                            {
                                
                                if (r > 0)
                                {
                                    c.SetValue("RemainCounter", r - 1);
                                    c.Update();
                                    labSuccess.Visible = true;
                                    labSuccess.Text = "<div class=\"alert alert-success\" role=\"alert\">You Booking is " + BookingConfirm + "</div>";
                                    sendMailtoAdmin(message + " - " + BookingConfirm.ToUpper());
                                }

                                if (p > 0)
                                {
                                    c.SetValue("PeriodMax", p - 1);
                                    c.Update();

                                    labSuccess.Visible = true;
                                    labSuccess.Text = "<div class=\"alert alert-success\" role=\"alert\">You Booking is " + BookingConfirm + "</div>";
                                    sendMailtoAdmin(message + " - " + BookingConfirm.ToUpper());
                                }
                                newCustomTableItem.Insert();
                            }
                            else
                            {
                                labFail.Visible = true;
                                labFail.Text = "<div class=\"alert alert-danger\" role=\"alert\">You don't have enough credit for booking</div>";
                            }

                        }
                    }
                    else
                    {
                        labFail.Text = "<div class=\"alert alert-danger\" role=\"alert\"><b>Already Booked</b> SORRY this class you aleady booked.</div>";
                        labFail.Visible = true;
                    }

                }
                else
                {
                    labFail.Text = "<div class=\"alert alert-danger\" role=\"alert\"><b>Fully Booked</b> SORRY this class is full.</div>";
                    labFail.Visible = true;
                }
            }
            else
            {
                labFail.Text = "<div class=\"alert alert-danger\" role=\"alert\"><b>Fully Booked or You have no enough credit</b></div>";
                labFail.Visible = true;
            }
            GetClassBooking(ClassID.Value);
            txtemail.Text = "";
        }
        
        
    }

    private void sendMailtoAdmin(string message)
    {
        CMS.EmailEngine.EmailMessage em = new CMS.EmailEngine.EmailMessage();
        em.EmailFormat = CMS.EmailEngine.EmailFormatEnum.Html;
        em.From = "corefocuspilates@outlook.com";
        em.Recipients = "corefocuspilates@outlook.com;henry@ziseo.com.au";
        //em.Recipients = "henry@ziseo.com.au";
        em.Subject = "Booking Notification";
        em.Body = message;

        CMS.EmailEngine.EmailSender.SendEmail(em);
    }

    private void sendMailtoCancelCustomer(string message, string Recipients)
    {
        CMS.EmailEngine.EmailMessage em = new CMS.EmailEngine.EmailMessage();
        em.EmailFormat = CMS.EmailEngine.EmailFormatEnum.Html;
        em.From = "corefocuspilates@outlook.com";
        em.Recipients = Recipients;
        //em.Recipients = "henry@ziseo.com.au";
        em.Subject = "Booking Cancel Notification";
        em.Body = message;

        CMS.EmailEngine.EmailSender.SendEmail(em);
    }
}