using CMS.CustomTables;
using CMS.DataEngine;
using CMS.Ecommerce;
using CMS.Helpers;
using CMS.Membership;
using CMS.PortalControls;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;

public partial class CMSWebParts_DEVCustom_Ecommerce_zdFitnessBooking : CMSAbstractWebPart
{
    #region "Properties"

    private string zdFitnessbooking = "zd.Fitnessbooking";
    private string zdFitnessTimeTable = "zd.FitnessTimeTable";
    private string zdFitnessbookingCredit = "zd.FitnessbookingCredit";
    private string zdFitnessbookingCancel = "zd.FitnessbookingCancel";

    private static readonly string PasswordHash = "CPF!2016";
    private static readonly string SaltKey = "C@Re70cUs";
    private static readonly string VIKey = "@3B6c3D0e5F6g7H8";

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
                d1 = new DateTime(ValidationHelper.GetInteger(d.Split('-')[2], 1), ValidationHelper.GetInteger(d.Split('-')[1], 1), ValidationHelper.GetInteger(d.Split('-')[0], 1));
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
            lab1.Text = customer.CustomerID.ToString();
            //List<OrderInfo> orders = OrderInfoProvider.GetOrders().WhereEquals("OrderCustomerID", customer.CustomerID).WhereEquals("OrderSiteID", CurrentSite.SiteID).WhereEquals("OrderStatusID", 3).OrderByDescending("OrderID").ToList();
            List<OrderInfo> orders = OrderInfoProvider.GetOrders().WhereEquals("OrderCustomerID", customer.CustomerID).WhereEquals("OrderStatusID", 3).OrderByDescending("OrderID").ToList();
            if (orders != null)
            {
                lab1.Text += "," + orders.Count().ToString();
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
        labDate.Text = d.ToString("dd/MM/yyyy") + " " + "<strong>" + d.DayOfWeek + "</strong>";
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

    #endregion "Methods"

    public static string Encrypt(string plainText)
    {
        byte[] plainTextBytes = Encoding.UTF8.GetBytes(plainText);

        byte[] keyBytes = new Rfc2898DeriveBytes(PasswordHash, Encoding.ASCII.GetBytes(SaltKey)).GetBytes(256 / 8);
        var symmetricKey = new RijndaelManaged() { Mode = CipherMode.CBC, Padding = PaddingMode.Zeros };
        var encryptor = symmetricKey.CreateEncryptor(keyBytes, Encoding.ASCII.GetBytes(VIKey));

        byte[] cipherTextBytes;

        using (var memoryStream = new MemoryStream())
        {
            using (var cryptoStream = new CryptoStream(memoryStream, encryptor, CryptoStreamMode.Write))
            {
                cryptoStream.Write(plainTextBytes, 0, plainTextBytes.Length);
                cryptoStream.FlushFinalBlock();
                cipherTextBytes = memoryStream.ToArray();
                cryptoStream.Close();
            }
            memoryStream.Close();
        }
        return Convert.ToBase64String(cipherTextBytes);
    }

    public static string Decrypt(string encryptedText)
    {
        byte[] cipherTextBytes = Convert.FromBase64String(encryptedText);
        byte[] keyBytes = new Rfc2898DeriveBytes(PasswordHash, Encoding.ASCII.GetBytes(SaltKey)).GetBytes(256 / 8);
        var symmetricKey = new RijndaelManaged() { Mode = CipherMode.CBC, Padding = PaddingMode.None };

        var decryptor = symmetricKey.CreateDecryptor(keyBytes, Encoding.ASCII.GetBytes(VIKey));
        var memoryStream = new MemoryStream(cipherTextBytes);
        var cryptoStream = new CryptoStream(memoryStream, decryptor, CryptoStreamMode.Read);
        byte[] plainTextBytes = new byte[cipherTextBytes.Length];

        int decryptedByteCount = cryptoStream.Read(plainTextBytes, 0, plainTextBytes.Length);
        memoryStream.Close();
        cryptoStream.Close();
        return Encoding.UTF8.GetString(plainTextBytes, 0, decryptedByteCount).TrimEnd("\0".ToCharArray());
    }

    protected void rptTimeTable_ItemDataBound(object sender, RepeaterItemEventArgs e)
    {
        if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
        {
            CustomTableItem item1 = (CustomTableItem)e.Item.DataItem;
            LinkButton hypFull = (LinkButton)e.Item.FindControl("hypFull");
            hypFull.Visible = false;
            int classItemID = ValidationHelper.GetInteger(item1.GetValue("ItemID"), 0);
            LinkButton hypBookNow = (LinkButton)e.Item.FindControl("hypBookNow");
            String Status = checkBookingAvailable(classItemID);
            hypFull.Text = Status;
            if (Status == "OK")
            {
                hypBookNow.CommandArgument = ValidationHelper.GetString(item1.GetValue("ItemID"), "");
                hypBookNow.Attributes.Add("ItemID", ValidationHelper.GetString(item1.GetValue("ItemID"), ""));
                hypBookNow.Visible = true;

                DateTime y = ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"), DateTime.Today, "");
                if (y < DateTime.Now.AddHours(1))
                {
                    hypBookNow.Visible = false;
                    hypFull.Visible = true;
                }
            }
            else
            {
                hypBookNow.Visible = false;
                hypFull.Visible = true;
            }

            Label Label1 = (Label)e.Item.FindControl("Label1");
            DateTime a = ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"), DateTime.Now, "");
            Label1.Text = a.ToString("H:mm tt");

            if (DateTime.Now.AddHours(1) > a)
            {
                hypBookNow.Visible = false;
                hypFull.Visible = true;
            }

            //if (ValidationHelper.GetBoolean(item1.GetValue("AllowOverBook"), false))
            //{
            //    hypBookNow.Visible = ValidationHelper.GetBoolean(item1.GetValue("AllowOverBook"), false);
            //}

            Label Label2 = (Label)e.Item.FindControl("Label2");
            string trainer = ValidationHelper.GetString(item1.GetValue("ClassSummary"), "");
            if (string.IsNullOrEmpty(trainer))
            {
                Label2.Text = ValidationHelper.GetString(item1.GetValue("ClassName"), "");
            }
            else
            {
                Label2.Text = ValidationHelper.GetString(item1.GetValue("ClassName"), "") + " - " + ValidationHelper.GetString(item1.GetValue("ClassSummary"), "");
            }

            Label Label3 = (Label)e.Item.FindControl("Label3");
            Label3.Text = ValidationHelper.GetString(item1.GetValue("Capacity"), "");

            Label Label4 = (Label)e.Item.FindControl("Label4");
            Label4.Text = ValidationHelper.GetString(item1.GetValue("Location"), "");
            HtmlTableRow r = (HtmlTableRow)e.Item.FindControl("bookingrow");
            r.Attributes.Add("class", ValidationHelper.GetString(item1.GetValue("Location"), "").ToLower());
        }
    }

    protected void rptTimeTable_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (!string.IsNullOrEmpty(e.CommandArgument.ToString()))
        {
            string id = e.CommandArgument.ToString();
            int classItemID = ValidationHelper.GetInteger(id, 0);
            //Get Class Description
            DataClassInfo customTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
            CustomTableItem item1 = CustomTableItemProvider.GetItem(ValidationHelper.GetInteger(id, 0), zdFitnessTimeTable);

            string d = ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"), DateTime.Now, "").ToString("dd/MM/yyyy");
            string t = ValidationHelper.GetDateTime(item1.GetValue("StartDateTime"), DateTime.Now, "").ToString("H:mm tt");
            labBookingClassDescription.Text = d + "<br/>" + t + "<br/>" + ValidationHelper.GetString(item1.GetValue("ClassName"), "") + "<br/><b>Location: " + ValidationHelper.GetString(item1.GetValue("Location"), "") + "</b><br/>";

            List<CustomTableItem> cb = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(id, 0)).OrderByDescending("ItemCreatedWhen").ToList();

            if (checkBookingAvailable(classItemID) == "OK")
            {
                //lab1.Text = cb.Count().ToString();

                //Booking
                pnlBookingForm.Visible = true;

                if (CurrentUser.GetValue("card", "") != "")
                {
                    pnlCC.Visible = false;
                }
                else
                {
                    pnlCC.Visible = true;
                }

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

    protected string checkBookingAvailable(int classItemID)
    {
        DataClassInfo FitnessbookingCredit = DataClassInfoProvider.GetDataClassInfo(zdFitnessbookingCredit);
        DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);

        List<CustomTableItem> t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", classItemID).ToList();

        //List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserId", ValidationHelper.GetInteger(CurrentUser.UserID, 0)).WhereContains("ClassType", ValidationHelper.GetString(t.GetValue("ClassType"), "")).WhereGreaterThan("DateTimeEnd", DateTime.Now).OrderByDescending("ItemCreatedWhen").ToList();
        List<CustomTableItem> bookingClassPeople = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(classItemID, 0)).WhereEquals("IsCancel", 0).ToList();
        List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserId", ValidationHelper.GetInteger(CurrentUser.UserID, 0)).WhereContains("ClassType", ValidationHelper.GetString(t[0].GetValue("ClassType"), "")).WhereGreaterThan("DateTimeEnd", t[0].GetValue("StartDateTime")).OrderBy("DateTimeEnd").ToList();
        // lab1.Text += "bookingp" + bookingClassPeople.Count.ToString() + "<br/>";
        // lab1.Text += "cap" +  ValidationHelper.GetInteger(t[0].GetValue("Capacity"), 0) + "<br/>";
        int cap = ValidationHelper.GetInteger(t[0].GetValue("Capacity"), 0);
        if (!(cap > bookingClassPeople.Count))
        {
            //lab1.Text += "0<br/>";
            if (cap == 0)
            {
                return "Class cancelled";
            }
            return "Fully booked";
        }

        if (c.Count() > 0)
        {
            DateTime d = ValidationHelper.GetDateTime(c[0].GetValue("DateTimeEnd"), DateTime.Now.AddYears(-1), "");
            //lab1.Text += d.ToString("dd/MMMM/yyyy hh:mm tt")+ "<br/>";

            DateTime classStartDateTime = ValidationHelper.GetDateTime(t[0].GetValue("StartDateTime"), DateTime.Now, "");
            if (classStartDateTime < DateTime.Now.AddHours(1))
            {
                //lab1.Text += "2<br/>";
                return "Booking expired"; ;
            }

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
                    return "OK";
                }
            }
        }
        return "Need more credit"; ;
    }

    protected DateTime getExpiryDate(DateTime d, int AddDays)
    {
        d = d.AddDays(AddDays).Date;
        d = d.AddSeconds(-1);
        return d;
    }

    protected Boolean CheckForm()
    {
        if (!string.IsNullOrEmpty(ValidationHelper.GetString(CurrentUser.GetValue("card"), "")))
        {
            return true;
        }
        else
        {
            Boolean error = false;
            litCardNumberError.Text = "";
            litCVVError.Text = "";
            litNameonCardError.Text = "";
            litExpiryMonthError.Text = "";
            litExpiryYearError.Text = "";

            if (string.IsNullOrEmpty(txtCardNumber.Text))
            {
                litCardNumberError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> Card Number is invalid.</div>";
                error = true;
            }
            else
            {
                if (!ValidationHelper.IsLong(txtCardNumber.Text.Trim()))
                {
                    litCardNumberError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> Card Number Error</div>";
                    error = true;
                }
                else
                {
                    if (!IsValidCardNumber(txtCardNumber.Text.Trim()))
                    {
                        litCardNumberError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> Card Number is invalid.</div>";
                        error = true;
                    }
                }
            }

            if (string.IsNullOrEmpty(txtNameonCard.Text))
            {
                litNameonCardError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> Name on card is invalid.</div>";
                error = true;
            }

            if (string.IsNullOrEmpty(ddlExpiryMonth.SelectedValue))
            {
                litExpiryMonthError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> Expiry month is invalid.</div>";
                error = true;
            }

            if (string.IsNullOrEmpty(ddlExpiryYear.SelectedValue))
            {
                litExpiryYearError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> Expiry year is invalid.</div>";
                error = true;
            }
            else
            {
                if (ValidationHelper.GetInteger(ddlExpiryYear.SelectedItem.Text, 0) < DateTime.Now.Year)
                {
                    litExpiryYearError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> Expiry year is error.</div>";
                    error = true;
                }
                else
                {
                    int importM = ValidationHelper.GetInteger(ddlExpiryMonth.SelectedValue, 1);
                    if (importM < 12)
                    {
                        int m = ValidationHelper.GetInteger(ddlExpiryMonth.SelectedValue, 1) + 1;
                        string tester = ddlExpiryYear.SelectedItem.Text + "-" + m.ToString() + "-01";
                        DateTime maxDate = ValidationHelper.GetDate(tester, DateTime.Now.AddYears(-1)).AddDays(-1);

                        if (maxDate < ValidationHelper.GetDate(DateTime.Now, DateTime.Now))
                        {
                            litExpiryMonthError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> Expiry month is invalid.</div>";
                            error = true;
                        }
                    }
                    else
                    {
                        int m = ValidationHelper.GetInteger(ddlExpiryMonth.SelectedValue, 1);
                        int y = ValidationHelper.GetInteger(ddlExpiryYear.SelectedItem.Text, 1);
                        string tester = y.ToString() + "-" + m.ToString() + "-01";
                        DateTime maxDate = ValidationHelper.GetDate(tester, DateTime.Now.AddYears(-1)).AddDays(-1);

                        if (maxDate < ValidationHelper.GetDate(DateTime.Now, DateTime.Now))
                        {
                            litExpiryMonthError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> Expiry month is invalid.</div>";
                            error = true;
                        }
                    }
                }
            }

            if (string.IsNullOrEmpty(txtCCV.Text))
            {
                litCVVError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> Card CCV is invalid.</div>";
                error = true;
            }
            else
            {
                if (txtCCV.Text.Trim().Length > 4 || txtCCV.Text.Trim().Length < 3 || !ValidationHelper.IsInteger(txtCCV.Text.Trim()))
                {
                    litCVVError.Text = "<div class=\"alert alert-danger\" role=\"alert\"> CCV Error</div>";
                    error = true;
                }
            }

            if (!error)
            {
                //save CC to profile
                CurrentUser.SetValue("card", (txtCardNumber.Text.Trim()));
                CurrentUser.SetValue("cardname", txtNameonCard.Text.Trim());
                CurrentUser.SetValue("EXP", ddlExpiryMonth.SelectedValue + "/" + ddlExpiryYear.SelectedValue);
                CurrentUser.SetValue("ccv", (txtCCV.Text.Trim()));
                CurrentUser.Update();
                return true;
            }
            else
            {
                return false;
            }
        }
    }

    public static bool IsValidCardNumber(string cardNumber)
    {
        cardNumber = cardNumber.Replace(" ", "");

        //FIRST STEP: Double each digit starting from the right
        int[] doubledDigits = new int[cardNumber.Length / 2];
        int k = 0;
        for (int i = cardNumber.Length - 2; i >= 0; i -= 2)
        {
            int digit = int.Parse(cardNumber[i].ToString());
            doubledDigits[k] = digit * 2;
            k++;
        }

        //SECOND STEP: Add up separate digits
        int total = 0;
        foreach (int i in doubledDigits)
        {
            string number = i.ToString();
            for (int j = 0; j < number.Length; j++)
            {
                total += int.Parse(number[j].ToString());
            }
        }

        //THIRD STEP: Add up other digits
        int total2 = 0;
        for (int i = cardNumber.Length - 1; i >= 0; i -= 2)
        {
            int digit = int.Parse(cardNumber[i].ToString());
            total2 += digit;
        }

        //FOURTH STEP: Total
        int final = total + total2;

        return final % 10 == 0; //Well formed will divide evenly by 10
    }

    protected void btnSubmit_Click(object sender, EventArgs e)
    {
        string[] result = hidBookingInfo.Value.Split(',');
        string[] orderResult = hidOrderIfno.Value.Split(',');
        //lab1.Text = orderResult[2].ToString();
        if (chkAgree.Checked && CheckForm())
        {
            string BookingConfirm = "";
            string message = "";
            DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
            CustomTableItem t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(result[1].ToString(), 0)).FirstObject;
            List<CustomTableItem> bookingClassPeople = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(result[1].ToString(), 0)).WhereEquals("IsCancel", 0).ToList();

            if (ValidationHelper.GetInteger(t.GetValue("Capacity"), 0) > bookingClassPeople.Count)
            {
                int cap = ValidationHelper.GetInteger(t.GetValue("Capacity"), 0);
                DateTime StartDateTime = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "");

                message = "Customer: " + CurrentUser.FullName + " has booked in " + StartDateTime.ToString("dd-MMM-yyyy H:mm tt") + " " + ValidationHelper.GetString(t.GetValue("ClassName") + " Location: " + ValidationHelper.GetString(t.GetValue("Location"), ""), "");

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

                    List<CustomTableItem> cb = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(result[1].ToString(), 0)).WhereEquals("IsCancel", 0).OrderByDescending("ItemCreatedWhen").ToList();
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

                    List<CustomTableItem> c = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserID", CurrentUser.UserID).WhereGreaterThan("DateTimeEnd", DateTime.Now.AddDays(1)).WhereContains("ClassType", ValidationHelper.GetString(result[2].ToString(), "")).OrderByAscending("DateTimeEnd").ToList();

                    CustomTableItem v = new CustomTableItem();

                    foreach (CustomTableItem f in c)
                    {
                        if (ValidationHelper.GetDateTime(f.GetValue("DateTimeEnd"), DateTime.Now.AddDays(-1)) > DateTime.Now)
                        {
                            int r = ValidationHelper.GetInteger(f.GetValue("RemainCounter"), -1);
                            int p = ValidationHelper.GetInteger(f.GetValue("PeriodMax"), -1);
                            if ((r + p) >= 0)
                            {
                                v = f;
                                break;
                            }
                        }
                    }

                    //foreach (CustomTableItem f in c.Skip(1).Take(1))
                    //{
                    //    int r = ValidationHelper.GetInteger(f.GetValue("RemainCounter"), -1);
                    //    int p = ValidationHelper.GetInteger(f.GetValue("PeriodMax"), -1);
                    //    if ((r + p) >= 0)
                    //    {
                    //        v = f;
                    //    }
                    //}
                    //take credit
                    // Check available Credit Fix

                    //end of fix

                    if (v != null)
                    {
                        int r = ValidationHelper.GetInteger(v.GetValue("RemainCounter"), -1);
                        int p = ValidationHelper.GetInteger(v.GetValue("PeriodMax"), -1);
                        //lab1.Text += r + "<br/>";
                        // lab1.Text += p + "<br/>";
                        if ((r + p) >= 0)
                        {
                            if (r > 0)
                            {
                                v.SetValue("RemainCounter", r - 1);
                                v.Update();
                                newCustomTableItem.Insert();
                                labSuccess.Visible = true;
                                labSuccess.Text = "<div class=\"alert alert-success\" role=\"alert\">You Booking is " + BookingConfirm + "</div>";
                                sendMailtoAdmin(message + " - " + BookingConfirm.ToUpper());
                            }

                            if (p > 0)
                            {
                                v.SetValue("PeriodMax", p - 1);
                                v.Update();
                                newCustomTableItem.Insert();
                                labSuccess.Visible = true;
                                labSuccess.Text = "<div class=\"alert alert-success\" role=\"alert\">You Booking is " + BookingConfirm + "</div>";
                                sendMailtoAdmin(message + " - " + BookingConfirm.ToUpper());
                            }
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
                    labFail.Text = "<div class=\"alert alert-danger\" role=\"alert\"><b>Fully Booked</b> SORRY this class is full.</div>";
                    labFail.Visible = true;
                }
            }
            else
            {
                labFail.Text = "<div class=\"alert alert-danger\" role=\"alert\"><b>Fully Booked or You have no enough credit</b></div>";
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
        if (Request.UserHostAddress.ToLower().Contains("localhost"))
        {
            return;
        }

        CMS.EmailEngine.EmailMessage em = new CMS.EmailEngine.EmailMessage();
        em.EmailFormat = CMS.EmailEngine.EmailFormatEnum.Html;
        em.From = "corefocuspilates@outlook.com";
        em.Recipients = "corefocuspilates@outlook.com;henry@ziseo.com.au";
        em.Subject = "Booking Notification";
        em.Body = message;

        CMS.EmailEngine.EmailSender.SendEmail(em);
    }

    private void sendCancelMailtoAdmin(string message, DateTime ClassDateTime)
    {
        //if (Request.UserHostAddress.ToLower().Contains("localhost"))
        //{
        //    return;
        //}
        if (ClassDateTime <= DateTime.Now.AddHours(5))
        {
            CMS.EmailEngine.EmailMessage em = new CMS.EmailEngine.EmailMessage();
            em.EmailFormat = CMS.EmailEngine.EmailFormatEnum.Html;
            em.From = "corefocuspilates@outlook.com";
            em.Recipients = "amy@corefocuspilatesaustralia.com;henry@ziseo.com.au";
            em.Subject = "Cancel Booking";
            em.Body = message;

            CMS.EmailEngine.EmailSender.SendEmail(em);
        }
    
    }

    private void sendMailtoNextAvailableCustomer(string message, string Recipients)
    {
        CMS.EmailEngine.EmailMessage em = new CMS.EmailEngine.EmailMessage();
        em.EmailFormat = CMS.EmailEngine.EmailFormatEnum.Html;
        em.From = "corefocuspilates@outlook.com";
        em.Recipients = Recipients;
        em.Subject = "Booking Confirm Notification";
        em.Body = message;

        CMS.EmailEngine.EmailSender.SendEmail(em);
    }

    private int getUnlimtedMaxCredit(int SKUID)
    {
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
                credit = ValidationHelper.GetInteger(arySKU[1].Replace("W", ""), 0);
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
            DateTime expiryDate = DateTime.Now;
            int credit = 0;
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

                    expiryDate = ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(72);

                    if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("unlimited"))
                    {
                        newCustomTableItem.SetValue("IsUnlimited", 1);
                        credit = getUnlimtedMaxCredit(ValidationHelper.GetInteger(item1.GetValue("OrderItemSKUID"), 0));

                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("1 week"))
                        {
                            expiryDate = getExpiryDate(ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, ""), 7); //ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(7);
                            credit = 6 * credit;
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("2 weeks"))
                        {
                            expiryDate = getExpiryDate(ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, ""), 14);
                            credit = 6 * credit;
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("4 weeks"))
                        {
                            expiryDate = getExpiryDate(ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, ""), 28);
                            credit = 6 * credit;
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("12 weeks"))
                        {
                            expiryDate = getExpiryDate(ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, ""), 72);
                            credit = 72;
                        }
                        newCustomTableItem.SetValue("PeriodMax", credit);
                        newCustomTableItem.SetValue("DateTimeEnd", expiryDate);
                        newCustomTableItem.SetValue("ClassType", "TRX|REFORMER");
                    }
                    if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("class pack"))
                    {
                        newCustomTableItem.SetValue("IsUnlimited", 0);
                        credit = getUnlimtedMaxCredit(ValidationHelper.GetInteger(item1.GetValue("OrderItemSKUID"), 0));
                        newCustomTableItem.SetValue("ClassType", "TRX|REFORMER");
                        newCustomTableItem.SetValue("RemainCounter", credit);

                        expiryDate = getExpiryDate(ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, ""), 72);

                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("1 week"))
                        {
                            expiryDate = getExpiryDate(ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, ""), 7);
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("2 weeks"))
                        {
                            expiryDate = getExpiryDate(ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, ""), 14);
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("4 weeks"))
                        {
                            expiryDate = getExpiryDate(ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, ""), 28);
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("7 weeks"))
                        {
                            expiryDate = getExpiryDate(ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, ""), 50);
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("12 weeks"))
                        {
                            expiryDate = getExpiryDate(ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, ""), 72);
                        }

                        newCustomTableItem.SetValue("DateTimeEnd", expiryDate);
                    }

                    if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("casual"))
                    {
                        newCustomTableItem.SetValue("IsUnlimited", 0);
                        int qty = ValidationHelper.GetInteger(ValidationHelper.GetString(item1.GetValue("OrderItemUnitCount"), ""), 0);
                        credit = 1 * qty;
                        newCustomTableItem.SetValue("ClassType", "TRX|REFORMER");
                        newCustomTableItem.SetValue("RemainCounter", credit);
                        expiryDate = ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddMonths(2);

                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("1 week"))
                        {
                            expiryDate = ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(7);
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("2 weeks"))
                        {
                            expiryDate = ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(14);
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("4 weeks"))
                        {
                            expiryDate = ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(28);
                        }
                        if (ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "").ToLower().Contains("12 weeks"))
                        {
                            expiryDate = ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(60);
                        }

                        newCustomTableItem.SetValue("DateTimeEnd", expiryDate);
                    }
                    // Save the new custom table record into the database
                    newCustomTableItem.Insert();
                }
                else
                {
                    expiryDate = ValidationHelper.GetDateTime(CreditItem.GetValue("DateTimeEnd"), DateTime.Now, "");
                    //credit = ValidationHelper.GetInteger(CreditItem.GetValue("DateTimeEnd"), 0);
                    int a = ValidationHelper.GetInteger(CreditItem.GetValue("RemainCounter"), 0);
                    int b = ValidationHelper.GetInteger(CreditItem.GetValue("PeriodMax"), 0);
                    if (a + b > 0)
                    {
                        credit = a + b;
                    }
                }
            }

            Label Label1 = (Label)e.Item.FindControl("Label1");
            Label1.Text = ValidationHelper.GetString(item1.GetValue("OrderItemSKUName"), "");

            Label Label3 = (Label)e.Item.FindControl("Label3");
            if (Label1.Text.ToLower().Contains("unlimited"))
            {
                Label3.Text = "Unlimited (Max 6 classes per week)";
            }
            if (Label1.Text.ToLower().Contains("class pack"))
            {
                Label3.Text = Label1.Text.Replace(" pack", "");
            }

            Label Label2 = (Label)e.Item.FindControl("Label2");
            //if (Label1.Text.ToLower().Contains("unlimited"))
            //{
            //    DateTime a = ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddDays(7);
            //    Label2.Text = expiryDate.ToString("dd/MM/yyyy");
            //}
            //if (Label1.Text.ToLower().Contains("class pack"))
            //{
            //    DateTime a = ValidationHelper.GetDateTime(item1.GetValue("OrderItemLastModified"), DateTime.Now, "").AddYears(1);
            //    Label2.Text = expiryDate.ToString("dd/MM/yyyy");
            //}
            Label2.Text = expiryDate.ToString("dd/MM/yyyy");

            Label Label4 = (Label)e.Item.FindControl("Label4");
            //lab1.Text += "," + ValidationHelper.GetInteger(item1.GetValue("OrderItemID"), 0).ToString();
            //Label4.Text = AvailableClass(ValidationHelper.GetInteger(item1.GetValue("OrderItemID"), 0)).ToString();
            Label4.Text = credit.ToString();
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
            Label Label3 = (Label)e.Item.FindControl("Label3");
            Label Label4 = (Label)e.Item.FindControl("Label4");
            Button btnCancel = (Button)e.Item.FindControl("btnCancel");
            DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
            CustomTableItem t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(item1.GetValue("ClassID"), 0)).FirstObject;
            if (t != null)
            {
                Label2.Text = ValidationHelper.GetString(t.GetValue("ClassName"), "");
                Label3.Text = "Booking Confirmed";
                Label4.Text = ValidationHelper.GetString(t.GetValue("Location"), "");
                btnCancel.CommandArgument = ValidationHelper.GetString(item1.GetValue("ClassID"), "");
                btnCancel.Visible = false;
                btnCancel.Enabled = true;
                btnCancel.Text = "Cancel";

                if (a.AddHours(-12) > DateTime.Now)
                {
                    btnCancel.Visible = true;
                    btnCancel.Enabled = true;
                    btnCancel.Text = "Cancel";
                }
                else
                {
                    if (a > DateTime.Now)
                    {
                        btnCancel.Visible = true;
                        btnCancel.Enabled = true;
                        btnCancel.Text = "Cancel";
                        btnCancel.CommandName = "CancelBookingPay";
                    }
                }

                //lab1.Text += ValidationHelper.GetBoolean(item1.GetValue("IsCancel"), false) + "<br/>";
                if (ValidationHelper.GetBoolean(item1.GetValue("IsCancel"), false))
                {
                    btnCancel.Enabled = false;
                    btnCancel.Text = "Cancelled";
                }
            }
            else
            {
                Label2.Text = "Admin Removed this class";
                Label3.Text = "Not Available";
            }
        }
    }

    protected void rptYourBooking_ItemCommand(object source, RepeaterCommandEventArgs e)
    {
        if (e.CommandName.ToString() == "CancelBooking")
        {
            pnlYourBooking.Visible = false;
            pnlTimeTable.Visible = false;
            pnlBookingForm.Visible = false;
            pnlYourPurchase.Visible = false;
            pnlPay.Visible = false;
            pnlCancelForm.Visible = true;

            btnCancel.CommandArgument = e.CommandArgument.ToString();

            DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
            CustomTableItem t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(e.CommandArgument, 0)).FirstObject;
            string classDate = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "").ToString("dd/MM/yyyy");
            string classTime = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "").ToString("H:mm tt");
            labClassName.Text = ValidationHelper.GetString(t.GetValue("ClassName"), "");
            labClassTime.Text = classDate + ", " + classTime;
        }

        if (e.CommandName.ToString() == "CancelBookingPay")
        {
            pnlYourBooking.Visible = false;
            pnlTimeTable.Visible = false;
            pnlBookingForm.Visible = false;
            pnlYourPurchase.Visible = false;
            pnlCancelForm.Visible = true;
            pnlPay.Visible = true;
            btnCancel.CommandArgument = e.CommandArgument.ToString();

            DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
            CustomTableItem t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(e.CommandArgument, 0)).FirstObject;
            string classDate = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "").ToString("dd/MM/yyyy");
            string classTime = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "").ToString("H:mm tt");
            labClassName.Text = ValidationHelper.GetString(t.GetValue("ClassName"), "");
            labClassTime.Text = classDate + ", " + classTime;
        }
    }

    protected void btnBack_Click(object sender, EventArgs e)
    {
        pnlTimeTable.Visible = true;
        pnlBookingForm.Visible = false;
    }

    protected void btnCancel_Click(object sender, EventArgs e)
    {
        if (chkCancel.Checked)
        {
            // lab1.Text = "start cancel";
            DataClassInfo FitnessTimeTable = DataClassInfoProvider.GetDataClassInfo(zdFitnessTimeTable);
            CustomTableItem t = CustomTableItemProvider.GetItems(zdFitnessTimeTable).WhereEquals("ItemID", ValidationHelper.GetInteger(btnCancel.CommandArgument, 0)).FirstObject;
            DateTime ClassDateTime = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "");
            DataClassInfo Fitnessbooking = DataClassInfoProvider.GetDataClassInfo(zdFitnessbooking);
            CustomTableItem b = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(btnCancel.CommandArgument, 0)).WhereEquals("UserID", CurrentUser.UserID).OrderByDescending("ItemID").FirstObject;
            if (b != null)
            {
                lab1.Text = ValidationHelper.GetBoolean(b.GetValue("IsConfirmed"), false).ToString();
                if (ValidationHelper.GetBoolean(b.GetValue("IsConfirmed"), false))
                {
                    // lab1.Text = "record is confirm";
                    //update current user current class to cancel
                    string className = ValidationHelper.GetString(t.GetValue("ClassName"), "");
                    string classDate = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "").ToString("dd/MM/yyyy");
                    string classTime = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "").ToString("H:mm tt");
                  
                    b.SetValue("IsCancel", 1);
                    b.Update();
                    addCredit();

                    if (pnlPay.Visible)
                    {
                       
                            sendCancelMailtoAdmin("Booking was cancel: " + CurrentUser.FullName + ", " + CurrentUser.UserName + ", " + className + ", " + classDate + ", " + classTime, ClassDateTime);
                     
                    }

                    //get Next Available
                    CustomTableItem b1 = CustomTableItemProvider.GetItems(zdFitnessbooking).WhereEquals("ClassID", ValidationHelper.GetInteger(btnCancel.CommandArgument, 0)).WhereEquals("IsCancel", 0).WhereEquals("IsConfirmed", 0).OrderByAscending("ItemID").FirstObject;

                    if (b1 != null)
                    {
                        //lab1.Text = "have wating list";
                        b1.SetValue("IsConfirmed", 1);
                        b1.Update();

                        //get Class Info
                        //Send Email
                        UserInfo updateUser = UserInfoProvider.GetUserInfo(ValidationHelper.GetInteger(b1.GetValue("UserID"), 0));
                        if (updateUser != null)
                        {
                            sendMailtoNextAvailableCustomer("Your Booking is Confirm: " + classDate + ", " + classTime, updateUser.Email);
                            //lab1.Text = "send email to next available";
                        }
                    }
                }
                else
                {
                    b.SetValue("IsCancel", 1);
                    b.Update();
                    addCredit();

                    if (pnlPay.Visible)
                    {
                        string classDate = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "").ToString("dd/MM/yyyy");
                        string classTime = ValidationHelper.GetDateTime(t.GetValue("StartDateTime"), DateTime.Now, "").ToString("H:mm tt");
                        sendCancelMailtoAdmin("Booking was cancel: " + CurrentUser.FullName + ", " + CurrentUser.UserName + ", " + classDate + ", " + classTime, ClassDateTime);
                    }
                }
                LoadCustomerPurchase();
                LoadCustomerBooking();
                LoadTimeTable();

                pnlYourBooking.Visible = true;
                pnlTimeTable.Visible = true;
                pnlBookingForm.Visible = false;
                pnlYourPurchase.Visible = true;
                pnlPay.Visible = false;
                pnlCancelForm.Visible = false;
            }
        }
    }

    protected void addCredit()
    {
        //Add back the credit to current user
        DataClassInfo FitnessbookingCredit = DataClassInfoProvider.GetDataClassInfo(zdFitnessbookingCredit);
        CustomTableItem c = CustomTableItemProvider.GetItems(zdFitnessbookingCredit).WhereEquals("UserID", CurrentUser.UserID).OrderByDescending("ItemID").FirstObject;
        int RemainCounter = ValidationHelper.GetInteger(c.GetValue("RemainCounter"), -1);
        int PeriodMax = ValidationHelper.GetInteger(c.GetValue("PeriodMax"), -1);
        lab1.Text = "(" + PeriodMax.ToString() + "," + RemainCounter.ToString() + ")";
        if (PeriodMax > RemainCounter)
        {
            if (PeriodMax >= 0)
            {
                c.SetValue("PeriodMax", PeriodMax + 1);
                c.Update();
            }
        }
        else
        {
            if (RemainCounter >= 0)
            {
                c.SetValue("RemainCounter", RemainCounter + 1);
                c.Update();
            }
        }
    }

    protected void btnCancelBack_Click(object sender, EventArgs e)
    {
        pnlCancelForm.Visible = false;
        pnlYourBooking.Visible = true;
        pnlTimeTable.Visible = true;
        pnlBookingForm.Visible = false;
        pnlYourPurchase.Visible = true;
    }
}