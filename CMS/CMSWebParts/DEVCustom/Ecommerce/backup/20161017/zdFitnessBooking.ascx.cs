using CMS.Ecommerce;
using CMS.EmailEngine;
using CMS.ExtendedControls;
using CMS.Helpers;
using CMS.MacroEngine;
using CMS.Membership;
using CMS.PortalControls;
using CMS.SiteProvider;
using CMS.WebAnalytics;
using System;
using System.Web.UI.WebControls;
using CMS.PortalControls;
using CMS.Helpers;
using CMS.DataEngine;
using CMS.CustomTables;
using System.Linq;
using System.Data;
using System.Collections.Generic;

public partial class CMSWebParts_DEVCustom_Ecommerce_zdFitnessBooking : CMSAbstractWebPart
{
    #region "Properties"
    string zdFitnessbooking = "zd.Fitnessbooking";
    string zdFitnessTimeTable = "zd.FitnessTimeTable";
    string zdFitnessbookingCredit = "zd.FitnessbookingCredit";
    string zdFitnessbookingCancel = "zd.FitnessbookingCancel";
    #endregion


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
            //Display order and Iput Credit from Order (only for the first time)
            LoadCustomerPurchase();
            LoadTimeTable();
            LoadCustomerBooking();
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
    public void LoadTimeTable()
    {

        txtEmail.Attributes.Add("type", "email");
        
        DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
        if (customTable != null)
        {
            
            string urlParameterValue = Request.RawUrl;
            DateTime d1 = DateTime.Now;

            if (Request.QueryString["date"] != null)
            {
                string d = Request.QueryString["date"];
                d1 = new DateTime(ValidationHelper.GetInteger(d.Split('-')[2], 1),ValidationHelper.GetInteger(d.Split('-')[1], 1), ValidationHelper.GetInteger(d.Split('-')[0], 1));
               
            }
            GetTimeTable(d1);
        }

    }

    public void LoadCustomerPurchase()
    {
        CustomerInfo customer = CustomerInfoProvider.GetCustomers()
                                            .WhereEquals("CustomerEmail", CurrentUser.Email)
                                            .FirstObject;
        
        if (customer != null)
        {

            List<OrderInfo> orders = OrderInfoProvider.GetOrders().WhereEquals("OrderCustomerID", customer.CustomerID).WhereEquals("OrderSiteID", CurrentSite.SiteID).WhereEquals("OrderStatusID", 3).OrderByDescending("OrderID").ToList();
            if (orders != null)
            {
                pnlYourPurchase.Visible = true;
                rptYourPurchase.DataSource = orders;
                rptYourPurchase.DataBind();
            }
            else
            {
                pnlYourPurchase.Visible = false;
            }

        }
        else
        {
            pnlYourPurchase.Visible = false;
        }
     
    }

    public void LoadCustomerBooking() 
    {
        DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessbooking);
        if (customTable != null)
        {
           
            CustomTableItem c = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereGreaterThan("StartDateTime", DateTime.Today.AddDays(-2)).WhereEquals("UserID", CurrentUser.UserID).OrderByDescending("ItemCreatedWhen");
            if (c != null)
            {
                pnlYourBooking.Visible = true;
                rptYourBooking.DataSource = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereGreaterThan("StartDateTime", DateTime.Today.AddDays(-2)).WhereEquals("UserID", CurrentUser.UserID).OrderByDescending("ItemCreatedWhen");
                rptYourBooking.DataBind();
            }
            else
            {
                pnlYourBooking.Visible = false;
            }
        }
     
    }

    public void GetTimeTable(DateTime d) 
    {
        labDate.Text = d.ToString("dd/MM/yyyy") + " " + "<strong>"+ d.DayOfWeek + "</strong>";
        hypNext.NavigateUrl = CurrentDocument.DocumentUrlPath + "?date=" + d.AddDays(1).ToString("dd-MM-yyyy");
        hypPre.NavigateUrl = CurrentDocument.DocumentUrlPath + "?date=" + d.AddDays(-1).ToString("dd-MM-yyyy");
        DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
        rptTimeTable.DataSource = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereGreaterThan("StartDateTime", d.Date).WhereLessThan("StartDateTime", d.Date.AddDays(1)).OrderByAscending("StartDateTime");
        rptTimeTable.DataBind();
      
    }

    public string GetTimeTableString(DateTime d)
    {
        DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
        CustomTableItem item1 = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereGreaterThan("StartDateTime", d.Date).WhereLessThan("StartDateTime", d.Date.AddDays(1)).FirstObject;
        string itemTextValue = ValidationHelper.GetString(item1.GetValue("ClassName"), "");
        return itemTextValue;
    }
    #endregion
    protected void rptTimeTable_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            CustomTableItem item1 = (CustomTableItem)e.Item.DataItem;

            int classItemID = ValidationHelper.GetInteger(item1.GetValue("ItemID"), 0);
            LinkButton hypBookNow = (LinkButton)e.Item.FindControl("hypBookNow");
            if (checkBookingAvailable(classItemID) )
            {
                hypBookNow.CommandArgument = ValidationHelper.GetString(item1.GetValue("ItemID"), "");
                hypBookNow.Attributes.Add("ItemID", ValidationHelper.GetString(item1.GetValue("ItemID"), ""));
                hypBookNow.Visible = true;

                DateTime y = ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"), DateTime.Today, "");
                if (y < DateTime.Now.AddHours(6))
                {
                    hypBookNow.Visible = false;
                }

            }
            else
            {
                hypBookNow.Visible = false;
            }

            Label Label1 = (Label)e.Item.FindControl("Label1");
            DateTime a = ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"),DateTime.Now, "");
            Label1.Text = a.ToString("H:mm tt");

            if (DateTime.Now.AddHours(6) > a)
            {
                hypBookNow.Visible = false;
            }

            Label Label2 = (Label)e.Item.FindControl("Label2");
            Label2.Text = ValidationHelper.GetString(item1.GetValue("ClassName"), "");

            Label Label3 = (Label)e.Item.FindControl("Label3");
            Label3.Text = ValidationHelper.GetString(item1.GetValue("Capacity"), "");

          

            
        }
    }
    protected void rptTimeTable_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (!string.IsNullOrEmpty(e.CommandArgument.ToString())) {
            string id = e.CommandArgument.ToString();
            int classItemID = ValidationHelper.GetInteger(id, 0);
            //Get Class Description
            DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
            CustomTableItem item1 = CustomTableItemProvider.GetItem(ValidationHelper.GetInteger(id, 0), zdFitnessTimeTable);

            string d = ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"), DateTime.Now, "").ToString("dd/MM/yyyy");
            string t= ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"), DateTime.Now, "").ToString("H:mm tt");
            labBookingClassDescription.Text = d + "<br/>" + t + "<br/>" + ValidationHelper.GetString(item1.GetValue("ClassName"), "") + "<br/>";


            List<CustomTableItem> cb = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(id, 0)).OrderByDescending("ItemCreatedWhen").ToList();

            if (checkBookingAvailable(classItemID))
            {
                //lab1.Text = cb.Count().ToString();

                //Booking
                pnlBookingForm.Visible = true;
                txtName.Text = CurrentUser.FirstName + " " + CurrentUser.LastName;
                if (CurrentUser.FullName == null)
                {
                    CurrentUser.FullName = CurrentUser.FirstName + " " + CurrentUser.LastName;
                    CurrentUser.Update();
                }
                txtName.ReadOnly = true;
                txtEmail.Text = CurrentUser.Email;
            }
            else
            {
                lab1.Text = checkBookingAvailable(classItemID).ToString();
            }


            hidBookingInfo.Value = CurrentUser.UserID + "," + id + "," + "," + ValidationHelper.GetString(item1.GetValue("ClassType"), "");
        }
        pnlTimeTable.Visible = false;
    }
    protected int AvailableClass(int OrderItemID)
    {
        DataClassInfo FitnessbookingCredit = DataClassInfoProvider.GetDataClassInfo(zdFitnessbookingCredit);
        DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
       

        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereContains("OrderItemID", OrderItemID.ToString()).OrderByDescending("ItemCreatedWhen").ToList();

        if (c.Count > 0)
        {

            if (c.Count() > 1)
            {

            }
            else
            {
                hidOrderIfno.Value = ValidationHelper.GetString(c[0].GetValue("OrderID"), "") + "," + ValidationHelper.GetString(c[0].GetValue("OrderItemID"), "") + "," + ValidationHelper.GetString(c[0].GetValue("IsUnlimited"), "0");
            }


            int r = ValidationHelper.GetInteger(c[0].GetValue("RemainCounter"), 0);
            int p = ValidationHelper.GetInteger(c[0].GetValue("PeriodMax"), 0);
            //lab1.Text += "(" + r.ToString() + "," + p.ToString() + ")";
            DateTime d = ValidationHelper.GetDateTime(c[0].GetValue("DateTimeEnd"), DateTime.Now.AddYears(-1), "");
            if ((r == 0 && p == 0) && d <= DateTime.Now)
            {
                return 0;
            }
            else
            {
                if (r > 0)
                {
                    return r;
                }
                if (p > 0)
                {
                    return p;
                }
            }
            

        }
        return 0;
    }
    protected bool checkBookingAvailable(int classItemID)
    {
        DataClassInfo FitnessbookingCredit = DataClassInfoProvider.GetDataClassInfo(zdFitnessbookingCredit);
        DataClassInfo FitnessTimeTable= DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);

        CustomTableItem t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", classItemID).OrderByDescending("ItemCreatedWhen");

        //List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserId", ValidationHelper.GetInteger(CurrentUser.UserID, 0)).WhereContains("ClassType", ValidationHelper.GetString(t.GetValue("ClassType"), "")).WhereGreaterThan("DateTimeEnd", DateTime.Now).OrderByDescending("ItemCreatedWhen").ToList();

        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserId", ValidationHelper.GetInteger(CurrentUser.UserID, 0)).WhereContains("ClassType", ValidationHelper.GetString(t.GetValue("ClassType"), "")).WhereGreaterThan("DateTimeEnd", DateTime.Now).OrderByAscending("ItemCreatedWhen").ToList();
        if (c.Count() > 0)
        {
            

            if (c.Count() > 1)
            {
               
            }
            else
            {
                
            }

            //hidOrderIfno.Value = ValidationHelper.GetString(c[0].GetValue("OrderID"), "") + "," + ValidationHelper.GetString(c[0].GetValue("OrderItemID"), "") + "," + ValidationHelper.GetString(c[0].GetValue("IsUnlimited"), "0");

            //int r = ValidationHelper.GetInteger(c[0].GetValue("RemainCounter"), 0);
            //int p = ValidationHelper.GetInteger(c[0].GetValue("PeriodMax"), 0);

            //DateTime d = ValidationHelper.GetDateTime(c[0].GetValue("DateTimeEnd"), DateTime.Now.AddYears(-1), "");
            //if ((r == 0 && p == 0) || d <= DateTime.Now)
            //{
            //    return false;
            //}
            //else {
            //    return true;
            //}
            foreach (CustomTableItem e in c)
            {
                int a = ValidationHelper.GetInteger(e.GetValue("RemainCounter"), 0);
                int b = ValidationHelper.GetInteger(e.GetValue("PeriodMax"), 0);
                //lab1.Text += "(" + a.ToString() +"," + b.ToString()+  ")<br/>";
                if (a + b > 0)
                {
                    hidOrderIfno.Value = ValidationHelper.GetString(e.GetValue("OrderID"), "") + "," + ValidationHelper.GetString(e.GetValue("OrderItemID"), "") + "," + ValidationHelper.GetString(e.GetValue("IsUnlimited"), "0");
                    return true;
                }
            } 
        }
        return false;
    }
    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        string[] result = hidBookingInfo.Value.Split(',');
        string[] orderResult = hidOrderIfno.Value.Split(',');

        //lab1.Text = orderResult[2].ToString();
        if (chkAgree.Checked)   
        {
            string BookingConfirm = "";
            string message = "";
            DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
            CustomTableItem t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(result[1].ToString(), 0));

           

            int cap = ValidationHelper.GetInteger(t.GetValue("Capacity"), 0);
            DateTime StartDateTime = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "");

            message = "Customer: " + CurrentUser.FullName + "has booked in " + StartDateTime.ToString("dd-MMM-yyyy H:mm tt") + " " + ValidationHelper.GetString(t.GetValue("ClassName"), "") ;



            DataClassInfo Fitnessbooking = DataClassInfoProvider.GetDataClassInfo(zdFitnessbooking);
            CustomTableItem b = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(result[1].ToString(), 0)).WhereEquals("UserID", CurrentUser.UserID).WhereEquals("IsCancel", 0).OrderByDescending("ItemCreatedWhen");
            if (b == null)
            {
                CustomTableItem newCustomTableItem = CustomTableItem.New(zdFitnessbooking);
                // Sets the values for the fields of the custom table (ItemText in this case)

                newCustomTableItem.SetValue("UserID", CurrentUser.UserID);
                newCustomTableItem.SetValue("ClassID", result[1].ToString());
                newCustomTableItem.SetValue("StartDateTime", StartDateTime);
                
                newCustomTableItem.SetValue("IsCancel", 0);
                newCustomTableItem.SetValue("IsConfirmed", 1);

                List<CustomTableItem> cb = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(result[1].ToString(), 0)).OrderByDescending("ItemCreatedWhen").ToList();
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
                newCustomTableItem.Insert();


                CustomTableItem c = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserID", CurrentUser.UserID).WhereEquals("UserID", CurrentUser.UserID).WhereGreaterThan("DateTimeEnd", DateTime.Now.AddDays(1)).WhereContains("ClassType", ValidationHelper.GetString(result[2].ToString(), "")).FirstObject;
                if (c != null)
                {
                    int r = ValidationHelper.GetInteger(c.GetValue("RemainCounter"), 0);
                    int p = ValidationHelper.GetInteger(c.GetValue("PeriodMax"), 0);
                    string unlimited = ValidationHelper.GetString(c.GetValue("IsUnlimited"), "False");
                    if (r > 0)
                    {
                        if (unlimited == "False")
                        {
                            c.SetValue("RemainCounter", r - 1);
                            c.Update();

                            labSuccess.Visible = true;
                            labSuccess.Text = "<div class=\"alert alert-success\" role=\"alert\">You Booking is " + BookingConfirm + "</div>";
                            sendMailtoAdmin(message + " - " + BookingConfirm.ToUpper());
                        }
                        else
                        {
                          //cannot book anymore      
                            labFail.Visible = true;
                            labFail.Text = "<div class=\"alert alert-danger\" role=\"alert\">You don't have enough credit for booking</div>";

                        }
                       
                    }
                    if (p > 0) 
                    {
                        if (unlimited == "False")
                        {
                           //cannot book anymore     
                            labFail.Visible = true;
                            labFail.Text = "<div class=\"alert alert-danger\" role=\"alert\">You don't have enough credit for booking</div>";
                        }
                        else
                        {
                            c.SetValue("PeriodMax", p - 1);
                            c.Update();

                            labSuccess.Visible = true;
                            labSuccess.Text = "<div class=\"alert alert-success\" role=\"alert\">You Booking is " + BookingConfirm + "</div>";
                            sendMailtoAdmin(message + " - " + BookingConfirm.ToUpper());
                        }


                    }
                }
            }
            else
            {
                labFail.Text = "<div class=\"alert alert-danger\" role=\"alert\"><b>Already Booked</b> you already booked in for this class.</div>";
                labFail.Visible = true;
            }

            chkAgree.Checked = false;
            pnlBookingForm.Visible = false;
            pnlTimeTable.Visible = true;

            LoadCustomerPurchase();
            LoadCustomerBooking();
            LoadTimeTable();
        }
    }
    private void sendMailtoAdmin(string message)
    {

        CMS.EmailEngine.EmailMessage em = new CMS.EmailEngine.EmailMessage();
        em.EmailFormat = CMS.EmailEngine.EmailFormatEnum.Html;
        em.From = "corefocuspilates@outlook.com";
        em.Recipients = "corefocuspilates@outlook.com;henry@ziseo.com.au";
        em.Subject = "Booking Notification";
        em.Body = message;

        CMS.EmailEngine.EmailSender.SendEmail(em);
    }

    private int getUnlimtedMaxCredit(int SKUID) {
        int credit = 0;
        SKUInfo updateProduct = SKUInfoProvider.GetSKUs()
                                    .WhereEquals("SKUID", SKUID)
                                    .FirstObject;
        if (updateProduct != null)
        {
            //CLASS
            if (updateProduct.SKUNumber.ToUpper().Contains("CLASS"))
            {
                string[] arySKU = updateProduct.SKUNumber.Split('-');
                credit = ValidationHelper.GetInteger(arySKU[0], 0);
            }

            //UNLIMITED
            if (updateProduct.SKUNumber.ToUpper().Contains("UNLIMITED"))
            {
                string[] arySKU = updateProduct.SKUNumber.Split('-');
                credit = ValidationHelper.GetInteger(arySKU[1].Replace("W",""), 0);
            }
          
        }
        return credit;
    }
    protected void rptYourPurchase_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            //OrderItemInfo item1 = (OrderItemInfo)e.Item.DataItem;
            OrderInfo order = (OrderInfo)e.Item.DataItem;
            OrderItemInfo item1 = OrderItemInfoProvider.GetOrderItems(order.OrderID).OrderByDescending("OrderItemLastModified");
            //lab1.Text += "," + order.OrderID.ToString();
            DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessbookingCredit);
            if (customTable != null)
            {
                // Gets all data records from the custom table whose 'ItemText' field value starts with 'New text'
                var CreditItem = CustomTableItemProvider.GetItems(zdFitnessbookingCredit)
                                                                    .WhereEquals("OrderItemID", ValidationHelper.GetInteger(item1.GetValue("OrderItemID"), 0)).FirstObject;

                //lab1.Text = ValidationHelper.GetInteger(item1.GetValue("OrderItemOrderID"), 0).ToString();
                //Add Credit to Account
                if (CreditItem == null)
                {
                    CustomTableItem newCustomTableItem = CustomTableItem.New(zdFitnessbookingCredit);
                    // Sets the values for the fields of the custom table (ItemText in this case)
                    newCustomTableItem.SetValue("UserID", CurrentUser.UserID);

                    newCustomTableItem.SetValue("OrderID", ValidationHelper.GetInteger(item1.GetValue("OrderItemOrderID"), 0));
                    newCustomTableItem.SetValue("OrderItemID", ValidationHelper.GetInteger(item1.GetValue("OrderItemID"), 0));
                    newCustomTableItem.SetValue("ClassType", "");
                    newCustomTableItem.SetValue("IsUnlimited", 0);
                    if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("unlimited"))
                    {
                        newCustomTableItem.SetValue("IsUnlimited", 1);
                        int credit = getUnlimtedMaxCredit(ValidationHelper.GetInteger(item1.GetValue("OrderItemSKUID"), 0));
                        newCustomTableItem.SetValue("PeriodMax", 5 * credit);
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("1 week"))
                        {
                            newCustomTableItem.SetValue("DateTimeEnd", ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(7));
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("2 weeks"))
                        {
                            newCustomTableItem.SetValue("DateTimeEnd", ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(14));
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("4 weeks"))
                        {
                            newCustomTableItem.SetValue("DateTimeEnd", ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(28));
                        }

                        newCustomTableItem.SetValue("ClassType", "TRX|REFORMER");

                    }
                    if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("class pack"))
                    {
                        newCustomTableItem.SetValue("IsUnlimited", 0);
                        int credit = getUnlimtedMaxCredit(ValidationHelper.GetInteger(item1.GetValue("OrderItemSKUID"), 0));
                        newCustomTableItem.SetValue("ClassType", "TRX|REFORMER");
                        newCustomTableItem.SetValue("RemainCounter", credit);
                        newCustomTableItem.SetValue("DateTimeEnd", ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddMonths(2));
                    }

                    if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("casual"))
                    {
                        newCustomTableItem.SetValue("IsUnlimited", 0);
                        int qty = ValidationHelper.GetInteger(ValidationHelper.GetString(item1.GetValue("OrderItemUnitCount"), ""), 0);
                        newCustomTableItem.SetValue("ClassType", "TRX|REFORMER");
                        newCustomTableItem.SetValue("RemainCounter", 1 * qty);
                        newCustomTableItem.SetValue("DateTimeEnd", ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddMonths(2));
                    }
                    // Save the new custom table record into the database
                    newCustomTableItem.Insert();
                }

            }


            Label Label1 = (Label)e.Item.FindControl("Label1");
            Label1.Text = ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "");

            Label Label3 = (Label)e.Item.FindControl("Label3");
            if (Label1.Text.ToLower().Contains("unlimited")) {
                Label3.Text = "Unlimited (Max 5 classes per week)";
            }
            if (Label1.Text.ToLower().Contains("class pack"))
            {
                Label3.Text = Label1.Text.Replace(" pack","");
            }


            Label Label2 = (Label)e.Item.FindControl("Label2");
            if (Label1.Text.ToLower().Contains("unlimited"))
            {
                DateTime a = ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(7);
                Label2.Text = a.ToString("dd/MM/yyyy");
            }
            if (Label1.Text.ToLower().Contains("class pack"))
            {
                DateTime a = ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddYears(1);
                Label2.Text = a.ToString("dd/MM/yyyy");
            }

            Label Label4 = (Label)e.Item.FindControl("Label4");
            //lab1.Text += "," + ValidationHelper.GetInteger(item1.GetValue("OrderItemID"), 0).ToString();
            Label4.Text = AvailableClass(ValidationHelper.GetInteger(item1.GetValue("OrderItemID"), 0)).ToString();
         
            
        }
    }
    protected void rptYourPurchase_ItemCommand(object source, RepeaterCommandEventArgs e)
    {

    }
    protected void rptYourBooking_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            CustomTableItem item1 = (CustomTableItem)e.Item.DataItem;


            Label Label1 = (Label)e.Item.FindControl("Label1");
            DateTime a = ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"), DateTime.Now, "");
            Label1.Text = a.ToString("dd/MM/yyyy H:mm tt");

            Label Label2 = (Label)e.Item.FindControl("Label2");

            DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
            CustomTableItem t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(item1.GetValue("ClassID"), 0)).FirstObject;
            Label2.Text = ValidationHelper.GetString(t.GetValue("ClassName"), "");

            Label Label3 = (Label)e.Item.FindControl("Label3");
            Label3.Text = "Booking Confirmed";

            Button btnCancel = (Button)e.Item.FindControl("btnCancel");
            btnCancel.CommandArgument = ValidationHelper.GetString(item1.GetValue("ClassID"), "");
           
           
        }
    }
    protected void rptYourBooking_ItemCommand(object source, RepeaterCommandEventArgs e)
    {

    }
    protected void btnBack_Click(object sender, EventArgs e)
    {
        pnlTimeTable.Visible = true;
        pnlBookingForm.Visible = false;
    }
}