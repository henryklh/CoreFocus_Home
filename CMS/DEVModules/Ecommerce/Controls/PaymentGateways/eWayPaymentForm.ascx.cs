using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Net;

using CMS;
using CMS.Base;
using CMS.Ecommerce;
using CMS.EcommerceProvider;
using CMS.Helpers;
using CMS.Globalization;
using CMS.DataEngine;
using CMS.SiteProvider;
using CMS.EventLog;

using eWAY.RapidAPI;

public partial class DevPaymentGateways_eWayPaymentForm : CMSPaymentGatewayForm
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Button btnNext = (Button)(this.Parent.Parent.FindControl("btnProcessPayment"));
        //ltlTest.Text = PaymentProvider.GetPaymentDataFormPath();
        btnNext.Visible = false;
    }

    public override void LoadData()
    {
        // Populate the year list with 7 years in advance from this year
        for (int i = 0; i < 7; i++)
        {
            EWAY_CARDEXPIRYYEAR.Items.Add(new ListItem((DateTime.Now.Year + i).ToString(), (DateTime.Now.Year + i).ToString()));
        }

        // set the current month selection to this month
        EWAY_CARDEXPIRYMONTH.SelectedValue = DateTime.Now.Month.ToString("00");

    }

    /// <summary>
    ///     Process customer payment data.
    /// </summary>
    /// <returns></returns>
    public override string ProcessData()
    {
        PaymentGatewayCustomData["EWAY_CARDNAME"] = EWAY_CARDNAME.Text.Trim();
        PaymentGatewayCustomData["EWAY_CARDEXPIRYMONTH"] = EWAY_CARDEXPIRYMONTH.SelectedValue.Trim();
        PaymentGatewayCustomData["EWAY_CARDEXPIRYYEAR"] = EWAY_CARDEXPIRYYEAR.SelectedValue.Trim();
        PaymentGatewayCustomData["EWAY_CARDNUMBER"] = EWAY_CARDNUMBER.Text.Trim();
        PaymentGatewayCustomData["EWAY_CARDCVN"] = EWAY_CARDCVN.Text.Trim();

        return string.Empty;
    }

    public override string ValidateData()
    {
        string returnValue = string.Empty;

        EWAY_CARDCVN.Style.Clear();
        EWAY_CARDEXPIRYMONTH.Style.Clear();
        EWAY_CARDEXPIRYYEAR.Style.Clear();
        EWAY_CARDNAME.Style.Clear();
        EWAY_CARDNUMBER.Style.Clear();

        lblEWAY_CARDCVN.Visible = false;
        lblEWAY_CARDEXPIRYMONTH.Visible = false;
        lblEWAY_CARDEXPIRYYEAR.Visible = false;
        lblEWAY_CARDNAME.Visible = false;
        lblEWAY_CARDNUMBER.Visible = false;
        lblExpiryError.Visible = false;

        // Form Validation
        if(string.IsNullOrEmpty(EWAY_CARDNAME.Text.Trim()))
        {
            lblEWAY_CARDNAME.Visible = true;
            returnValue += "<li>Invalid Name on Card.</li>";
            EWAY_CARDNAME.Style.Add("border-color", "#ff0000");
        }

        if (string.IsNullOrEmpty(EWAY_CARDNUMBER.Text.Trim()))
        {
            lblEWAY_CARDNUMBER.Visible = true;
            returnValue += "<li>Invalid Card Number.</li>";
            EWAY_CARDNUMBER.Style.Add("border-color", "#ff0000");
        }

        if (string.IsNullOrEmpty(EWAY_CARDEXPIRYMONTH.SelectedValue.Trim()))
        {
            lblEWAY_CARDEXPIRYMONTH.Visible = true;
            returnValue += "<li>Invalid Card Expiry Month.</li>";
            EWAY_CARDEXPIRYMONTH.Style.Add("border-color", "#ff0000");
        }

        if (string.IsNullOrEmpty(EWAY_CARDEXPIRYYEAR.SelectedValue.Trim()))
        {
            lblEWAY_CARDEXPIRYYEAR.Visible = true;
            returnValue += "<li>Invalid Card Expiry Year.</li>";
            EWAY_CARDEXPIRYYEAR.Style.Add("border-color", "#ff0000");
        }

        
        // check expiry month
        DateTime exp = new DateTime(ValidationHelper.GetInteger(EWAY_CARDEXPIRYYEAR.SelectedValue.Trim(), 0), ValidationHelper.GetInteger(EWAY_CARDEXPIRYMONTH.SelectedValue.Trim(), 0), 1);

        if (exp < DateTime.Now.Date)
        {
            lblExpiryError.Visible = true;
            returnValue += "<li>Invalid Card Expiry.</li>";
            EWAY_CARDEXPIRYMONTH.Style.Add("border-color", "#ff0000");
            EWAY_CARDEXPIRYYEAR.Style.Add("border-color", "#ff0000");
        }

        if (string.IsNullOrEmpty(EWAY_CARDCVN.Text.Trim()))
        {
            lblEWAY_CARDCVN.Visible = true;
            returnValue += "<li>Invalid Card CVN.</li>";
            EWAY_CARDCVN.Style.Add("border-color", "#ff0000");
        }        

        return returnValue;
    }

    private ShoppingCartInfo mShoppingCart;

    private ShoppingCartInfo ShoppingCart
    {
        get
        {
            return mShoppingCart ?? (mShoppingCart = ShoppingCartInfoProvider.GetShoppingCartInfoFromOrder(PaymentProvider.OrderId));
        }
    }

    protected void btnConfirmOrder_Click(object sender, EventArgs e)
    {
        try
        {
            // process Rapid API Access Code

            string soapUrl;
            string apiKey;
            string apiPassword;

            if (IsLivePayment)
            {
                // live soap settings
                soapUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayRapidAPISoapUrl");
                apiKey = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayRapidAPIKey");
                apiPassword = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayRapidAPIPassword");
            }
            else
            {
                // sandbox soap settings
                soapUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWaySandboxSoapUrl");
                apiKey = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWaySandboxKey");
                apiPassword = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWaySandboxPassword");
            }

            ltlTest.Text += "return 1<br/>";
            // Check for required settings.
            if (!string.IsNullOrWhiteSpace(soapUrl) && !string.IsNullOrWhiteSpace(apiKey) && !string.IsNullOrWhiteSpace(apiPassword))
            {
                // Create a new instance of the RapidAPI service
                Rapid30 service = new Rapid30();
                service.Url = soapUrl;
                ltlTest.Text += "return 2<br/>";
                // Start building the request
                CreateAccessCodeRequest request = new CreateAccessCodeRequest();

                // Add merchant credentials (Change your credentials in the web config)
                service.Credentials = eWayAuthentication.GetCredentials(apiKey, apiPassword);

                /* Get the values from the form */
                ltlTest.Text += "return 3<br/>";
                // Build the customer object
                request.Customer = new Customer();
                //request.Customer.Reference = txtCustomerRef.Text;
                //request.Customer.Title = ddlTitle.SelectedValue;

                request.Customer.FirstName = ShoppingCart.Customer.CustomerFirstName;
                request.Customer.LastName = ShoppingCart.Customer.CustomerLastName;
                request.Customer.Street1 = ShoppingCart.ShoppingCartBillingAddress.AddressLine1;
                request.Customer.Street2 = ShoppingCart.ShoppingCartBillingAddress.AddressLine2;
                request.Customer.City = ShoppingCart.ShoppingCartBillingAddress.AddressCity;

                request.Customer.PostalCode = ShoppingCart.ShoppingCartBillingAddress.AddressZip;

                string StateCode = ShoppingCart.ShoppingCartBillingAddress.GetStateCode();
                if (!string.IsNullOrEmpty(StateCode))
                {
                    request.Customer.State = StateCode;
                }

                string CountryCode = ShoppingCart.ShoppingCartBillingAddress.GetCountryTwoLetterCode();

                if (!string.IsNullOrEmpty(CountryCode))
                {
                    request.Customer.Country = CountryCode.ToLower();
                }
                else
                {
                    throw new Exception("eWay Access code prcoess - Customer Country code cannot be found.");
                }

                request.Customer.CompanyName = ShoppingCart.Customer.CustomerCompany;
                //request.Customer.JobDescription = txtJobDescription.Text;
                //request.Customer.Url = txtUrl.Text;
                request.CustomerIP = CMS.Helpers.RequestContext.UserHostAddress;
                request.Customer.Email = ShoppingCart.Customer.CustomerEmail;
                request.Customer.Phone = ShoppingCart.Customer.CustomerPhone;
                //request.Customer.Mobile = txtMobile.Text;
                request.Customer.Comments = ShoppingCart.Order.OrderNote;
                //request.DeviceID = txtDeviceId.Text;
                ltlTest.Text += "return 4<br/>";
                List<LineItem> lines = new List<LineItem>();

                foreach (ShoppingCartItemInfo scii in ShoppingCart.CartContentItems)
                {

                    if (!scii.IsProductOption)
                    {
                        LineItem line = new LineItem();

                        line.SKU = scii.SKUID.ToString();

                        line.Quantity = scii.CartItemUnits;

                        line.Tax = ValidationHelper.GetInteger(scii.UnitTotalTax.ToString("0.00").Replace(".", ""), 0);
                        line.UnitCost = ValidationHelper.GetInteger(scii.UnitTotalPriceIncludingOptions.ToString("0.00").Replace(".", ""), 0);
                        line.Total = ValidationHelper.GetInteger(scii.TotalPriceIncludingOptions.ToString("0.00").Replace(".", ""), 0);

                        //ltlTest.Text += "totals - ok <br/>";

                        string strDesc = string.Empty;
                        strDesc = scii.SKU.SKUName;

                        if (scii.ProductOptions.Count > 0)
                        {
                            strDesc += ":";
                            foreach (ShoppingCartItemInfo option in scii.ProductOptions)
                            {
                                strDesc += " " + scii.SKU.SKUName;
                            }
                        }

                        if (strDesc.Length > 26)
                        {
                            line.Description = strDesc.Substring(0, 26);
                        }
                        else
                        {
                            line.Description = strDesc;
                        }

                        lines.Add(line);
                    }

                }

                request.Items = lines.ToArray();
                ltlTest.Text += "return 5<br/>";
                ShippingAddress shippingAddress = new ShippingAddress();

                //ltlTest.Text += ShoppingCart.OrderId + "<br/>";
                //ltlTest.Text += ShoppingCart.ShoppingCartShippingAddress.AddressPersonalName + "<br/>";
                //ltlTest.Text += ShoppingCart.ShoppingCartShippingAddress.AddressLine1 + "<br/>";
                //ltlTest.Text += ShoppingCart.ShoppingCartShippingAddress.AddressLine2 + "<br/>";
                //ltlTest.Text += ShoppingCart.ShoppingCartShippingAddress.AddressCity + "<br/>";
                //ltlTest.Text += ShoppingCart.ShoppingCartShippingAddress.AddressZip + "<br/>";
                //ltlTest.Text += ShoppingCart.ShoppingCartShippingAddress.GetStateCode() + "<br/>";
                //ltlTest.Text += ShoppingCart.ShoppingCartShippingAddress.GetCountryTwoLetterCode() + "<br/>";
                ltlTest.Text += "return 5.1<br/>";

                if (ShoppingCart.ShoppingCartShippingAddress != null)
                {
                    if (string.IsNullOrEmpty(ShoppingCart.ShoppingCartShippingAddress.AddressPersonalName))
                    {
                        shippingAddress.FirstName = ShoppingCart.Customer.CustomerFirstName;
                        shippingAddress.LastName = ShoppingCart.Customer.CustomerLastName;
                    }
                    else
                    {
                        string[] nameSplit = ShoppingCart.ShoppingCartShippingAddress.AddressPersonalName.Split(' ');
                        if (nameSplit.Length > 1)
                        {
                            try
                            {
                                shippingAddress.FirstName = ShoppingCart.ShoppingCartShippingAddress.AddressPersonalName.Replace(nameSplit.LastOrDefault(), "");
                                shippingAddress.LastName = nameSplit.LastOrDefault();
                            }
                            catch (Exception exc)
                            {
                                // just reduce the error when replace old value is null.
                            }
                        }
                        else
                        {
                            shippingAddress.FirstName = ShoppingCart.ShoppingCartShippingAddress.AddressPersonalName;
                        }
                    }
                    ltlTest.Text += "return 5.1.1<br/>";

                    shippingAddress.Street1 = ShoppingCart.ShoppingCartShippingAddress.AddressLine1;
                    shippingAddress.Street2 = ShoppingCart.ShoppingCartShippingAddress.AddressLine2;
                    shippingAddress.City = ShoppingCart.ShoppingCartShippingAddress.AddressCity;
                    shippingAddress.PostalCode = ShoppingCart.ShoppingCartShippingAddress.AddressZip;
                    shippingAddress.State = ShoppingCart.ShoppingCartShippingAddress.GetStateCode();
                    ltlTest.Text += "return 5.2<br/>";
                    string sCountryCode = ShoppingCart.ShoppingCartShippingAddress.GetCountryTwoLetterCode();

                    if (string.IsNullOrEmpty(sCountryCode))
                    {
                        throw new Exception("eWay Access code prcoess - Shipping Country code cannot be found.");
                    }
                    shippingAddress.Country = sCountryCode.ToLower();

                    if (ShoppingCart.ShippingOption != null)
                    {
                        shippingAddress.ShippingMethod = "Other";
                    }
                    else
                    {
                        shippingAddress.ShippingMethod = "Unknown";
                    }
                    ltlTest.Text += "return 5.3<br/>";
                }
                

                //shippingAddress.Fax = txtShippingFax.Text;
                //shippingAddress.Phone = txtShippingPhone.Text;
                //shippingAddress.Email = txtShippingEmail.Text;
                
                request.ShippingAddress = shippingAddress;

                // Build the custom fields (used by the merchant for his/her own purposes)

                //Option optionOne = new Option();
                //optionOne.Value = txtOption1.Text;

                //Option optionTwo = new Option();
                //optionTwo.Value = txtOption2.Text;

                //Option optionThree = new Option();
                //optionThree.Value = txtOption3.Text;

                //request.Options = new Option[]
                //{
                //    optionOne, optionTwo, optionThree
                //};
                ltlTest.Text += "return 6<br/>";
                // Get the type of request
                request.Method = (Method)Enum.Parse(typeof(Method), "ProcessPayment");

                int totalAmount;
                // Get the total amount to charge the customer
                int.TryParse(ShoppingCart.TotalPrice.ToString("0.00").Replace(".", ""), out totalAmount);

                //ltlTest.Text += "total amount - ok <br/>";
                ltlTest.Text += "return 7<br/>";
                // Build the payment object
                request.Payment = new Payment();
                request.Payment.TotalAmount = totalAmount;
                request.Payment.InvoiceNumber = ShoppingCart.OrderId.ToString("000000000000");
                //request.Payment.InvoiceDescription = txtInvoiceDescription.Text;
                //request.Payment.InvoiceReference = txtInvoiceReference.Text;
                request.Payment.CurrencyCode = ShoppingCart.Currency.CurrencyCode.ToUpper();
                ltlTest.Text += "return 8<br/>";
                // The url we want the user to be redirected to after they enter their card details
                string RedirectUrl = (string.IsNullOrEmpty(SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayReturnUrl"))) ? "~/DEVModules/Ecommerce/CMSPages/eWayResults.aspx" : SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayReturnUrl");

                if (!string.IsNullOrEmpty(QueryHelper.GetString("o", string.Empty)))
                    request.RedirectUrl = CMS.Helpers.URLHelper.GetAbsoluteUrl(URLHelper.AddParameterToUrl(RedirectUrl, "o", QueryHelper.GetString("o", string.Empty)));
                else
                    request.RedirectUrl = CMS.Helpers.URLHelper.GetAbsoluteUrl(RedirectUrl);

                //ltlTest.Text = request.RedirectUrl;

                //return;

                CreateAccessCodeResponse response = null;
                ltlTest.Text += "return 9<br/>";
                // send request
                try
                {
                    // Send the request
                    response = service.CreateAccessCode(request);
                }
                catch (WebException exception)  // Catch any errors
                {
                    ltlTest.Text += exception.Message + "<br />";
                }
                catch (Exception exception)
                {
                    ltlTest.Text += exception.Message + "<br />";
                }

                // Finished with the service, so release the resources
                service.Dispose();

                if (response != null && !string.IsNullOrEmpty(response.Errors))
                {
                    // Print any errors from the RapidAPI
                    ltlTest.Text += "Validation Errors: " + response.Errors;
                }

                // Add details to the session to populate the payment form
                SessionHelper.SetValue("DEVeWayResponse", response);
                //Session.Add("HDeWayResponse", response);

                if (response != null && string.IsNullOrEmpty(response.Errors))
                {
                    Panel pnlOrderSummary = (Panel)(this.Parent.Parent.FindControl("pnlOrderSummary"));

                    pnlOrderSummary.Visible = false;
                    pnleWayAccess.Visible = false;
                    pnleWayProcess.Visible = true;
                }

            }
            else
            {
                throw new Exception("eWay soap settings cannot be found.");
            }
        }
        catch (Exception ex)
        {
            ltlTest.Text += ex.ToString();
            
            //throw new Exception(ex.ToString());
        }

    }

    /// <summary>
    /// Return State code by default. Return null if state is not found.
    /// </summary>
    /// <param name="StateID"></param>
    /// <param name="UseStateDisplayName"></param>
    /// <returns></returns>
    private string GetAddressStateCode(int StateID)
    {
        string strResult = string.Empty;

        StateInfo si = StateInfoProvider.GetStateInfo(StateID);

        if (si != null)
        {
            strResult = si.StateCode;
        }

        return strResult;
    }

    
    private string GetAddressCountryCode(int CountryID)
    {
        string strResult = string.Empty;

        CountryInfo ci = CountryInfoProvider.GetCountryInfo(CountryID);

        if (ci != null)
        {
            strResult = ci.CountryTwoLetterCode;
        }

        return strResult;
    }


    private bool IsLivePayment
    {
        get
        {
            return ValidationHelper.GetBoolean(SettingsKeyInfoProvider.GetBoolValue(SiteContext.CurrentSiteName + ".DEVeWayUseRapidAPI"), false);
        }
    }

    protected void btnProcessPayment_Click(object sender, EventArgs e)
    {
        // validate data by overrided function

        // saved payment gateway custom data by overrided process data function

        // process payment by parent button for tigger the process payment event.
        Button btnNext = (Button)(this.Parent.Parent.FindControl("btnProcessPayment"));
        ((IPostBackEventHandler)btnNext).RaisePostBackEvent(null);
    }
}