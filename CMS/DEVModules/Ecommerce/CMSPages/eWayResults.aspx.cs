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
using CMS.UIControls;

using eWAY.RapidAPI;

public partial class DevPaymentGateways_eWayResults : CMSPage
{
    private int orderId = 0;
    private string transactionId = "";
    private bool paymentStatus = false;

    protected void Page_Load(object sender, EventArgs e)
    {
        string accessCode = Request.QueryString["AccessCode"] as string;

        // If the accessCode was not found in the url, some error happened so just return
        if (accessCode == null)
        {
            lblResponseMessage.Text = string.Format("Error: \"{0}\" not found.", "AccessCode");
            return;
        }

        // Create a request to retrieve the results from eWAY
        GetAccessCodeResultRequest request = new GetAccessCodeResultRequest();

        // Add the access code
        request.AccessCode = accessCode;

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

        // Authentication
        ICredentials credentials = eWayAuthentication.GetCredentials(apiKey, apiPassword);

        // Create a new instance of the RapidAPI service and send the request
        using (Rapid30 service = new Rapid30())
        {

            ltlTest.Text += "Rapid30 1<br/>";
            service.Credentials = credentials;
            service.Url = soapUrl;

            // Request result from service
            GetAccessCodeResultResponse response = null;
            try
            {
                response = service.GetAccessCodeResult(request);
                ltlTest.Text += "Rapid30 1.1<br/>";
            }
            catch (Exception ex)
            {
                ltlTest.Text += "Rapid30 1.2<br/>";
                lblResponseMessage.Text = string.Format("Error getting the result: \"{0}\".", ex.Message);
                return;
            }

            ltlTest.Text += "Rapid30 2<br/>";
            // Use the response object to display the details returned by eWAY
            lblAccessCode.Text = response.AccessCode;
            lblAuthorisationCode.Text = response.AuthorisationCode;
            lblInvoiceNumber.Text = response.InvoiceNumber;
            lblInvoiceReference.Text = response.InvoiceReference;
            lblResponseCode.Text = response.ResponseCode;
            lblResponseMessage.Text = response.ResponseMessage;

            //// Get the options that we sent
            //Option[] options = response.Options ?? new Option[0];

            //if (options.Length > 2)
            //    lblOption3.Text = options[2].Value;
            //if (options.Length > 1)
            //    lblOption2.Text = options[1].Value;
            //if (options.Length > 0)
            //    lblOption1.Text = options[0].Value;

            // Get the customer / transaction status
            lblTotalAmount.Text = response.TotalAmount != null ? response.TotalAmount.Value.ToString() : string.Empty;
            lblTransactionID.Text = response.TransactionID != null ? response.TransactionID.Value.ToString() : string.Empty;
            lblTransactionStatus.Text = response.TransactionStatus != null ? response.TransactionStatus.Value.ToString() : string.Empty;
            lblTokenCustomerId.Text = response.TokenCustomerID.HasValue ? response.TokenCustomerID.ToString() : string.Empty;


            // CMS Ecommerce Update
            orderId = ValidationHelper.GetInteger(response.InvoiceNumber, 0);
            paymentStatus = ValidationHelper.GetBoolean(response.TransactionStatus, false);
            transactionId = ValidationHelper.GetString(response.TransactionID, null);

            eWayRapidAPISoapProvider eWayProvider;
            string errorMessage;

            OrderInfo oi = OrderInfoProvider.GetOrderInfo(orderId);

            if(oi != null)
            {
                try
                {
                    ltlTest.Text += "Rapid30 2.1<br/>";
                    eWayProvider = (eWayRapidAPISoapProvider)CMSPaymentGatewayProvider.GetPaymentGatewayProvider(oi.OrderPaymentOptionID);
                    eWayProvider.OrderId = orderId;
                }
                catch (Exception ex)
                {
                    ltlTest.Text += "Rapid30 2.2<br/>";
                    // Log exception
                    errorMessage = EventLogProvider.GetExceptionLogMessage(ex);
                    LogEvent(errorMessage, "Payment_Provider_Not_Found");
                    return;
                }
            }
            else
            {
                ltlTest.Text += "Rapid30 2.3<br/>";
                errorMessage = string.Format(GetString("PaymentGatewayProvider.ordernotfound"), orderId);
                LogEvent(errorMessage, "Order_Not_Found");
                return;
            }

            ltlTest.Text += "Rapid30 3<br/>";
            string paymentDesc = "eWayResults : [" +
                    "{ AccessCode : " + lblAccessCode.Text + " }, " +
                    "{ AuthorisationCode : " + lblAuthorisationCode.Text + " }, " +
                    "{ InvoiceNumber : " + lblInvoiceNumber.Text + " }, " +
                    "{ InvoiceReference : " + lblInvoiceReference.Text + " }, " +
                    "{ ResponseCode : " + lblResponseCode.Text + " }, " +
                    "{ ResponseMessage : " + lblResponseMessage.Text + " }, " +
                    "{ TotalAmount : " + lblTotalAmount.Text + " }, " +
                    "{ TransactionID : " + lblTransactionID.Text + " }, " +
                    "{ TransactionStatus : " + lblTransactionStatus.Text + " }, " +
                    "{ TokenCustomerId : " + lblTokenCustomerId.Text + " } " +
                    "]";

            ltlTest.Text += "Rapid30 3: " + paymentDesc + "<br/>";
            // Payment Successful
            if (paymentStatus)
            {
                eWayProvider.PaymentResult.PaymentIsCompleted = true;
                eWayProvider.PaymentResult.PaymentTransactionID = transactionId;
                eWayProvider.PaymentResult.PaymentDescription = paymentDesc;
                eWayProvider.PaymentResult.PaymentDate = DateTime.Now;
            }
            else
            {
                eWayProvider.PaymentResult.PaymentIsCompleted = false;
                eWayProvider.PaymentResult.PaymentDescription = paymentDesc;
                eWayProvider.PaymentResult.PaymentDate = DateTime.Now;
            }

            ltlTest.Text += "Rapid30 3: session: " + SessionHelper.GetValue("DEVeWayResponse").ToString() + "<br/>";
            // Update order payment result in database
            errorMessage = eWayProvider.UpdateOrderPaymentResult();

            if (!string.IsNullOrEmpty(errorMessage))
            {
                // Log the event
                LogEvent(errorMessage, "Order_Payment_Result_Update");
            }


            if (eWayProvider.IsPaymentCompleted)
            {
                // redirect to payment successful page
                string redirectUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWaySuccessfulUrl");

                if (!string.IsNullOrEmpty(redirectUrl))
                    Response.Redirect(redirectUrl);
                
                ltlTest.Text += "Rapid30 4<br/>";
            }
            else
            {
                // redirect to payment failed page
                string HDeWayFailedUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayFailedUrl");

                string HDeWayCancelledUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayCancelledUrl");

                string orderHash = QueryHelper.GetString("o", string.Empty);
                if (!string.IsNullOrEmpty(orderHash))
                {
                    ltlTest.Text += "Rapid30 4<.0br/>";
                    int failedorderId = ValidationHelper.GetInteger(WindowHelper.GetItem(orderHash), 0);

                    if (failedorderId > 0)
                    {
                        if (!string.IsNullOrEmpty(HDeWayFailedUrl))
                            Response.Redirect(URLHelper.AddParameterToUrl(HDeWayFailedUrl, "o", orderHash));
                        ltlTest.Text += "Rapid30 4.1<br/>";
                    }
                    else
                    {
                        ltlTest.Text += "Rapid30 4.2<br/>";
                        if (CMS.Membership.AuthenticationHelper.IsAuthenticated())
                        {
                            if (!string.IsNullOrEmpty(HDeWayFailedUrl))
                                Response.Redirect(URLHelper.AddParameterToUrl(HDeWayFailedUrl, "orderpayment", orderId.ToString()));
                        }
                        else
                        {
                            // Guest user and order session is gone.
                            eWayProvider.PaymentResult.PaymentStatusName = "cancelled";
                            eWayProvider.PaymentResult.PaymentStatusValue = "Cancelled";
                            eWayProvider.UpdateOrderPaymentResult();

                            // exception - cancel will always be the last order status
                            OrderStatusInfo osi = OrderStatusInfoProvider.GetOrderStatuses(SiteContext.CurrentSiteID, true).OrderBy("StatusOrder").LastOrDefault();
                            eWayProvider.Order.OrderNote = "Guest online order - payment failed and session is timeout.";
                            eWayProvider.Order.OrderStatusID = osi.StatusID;

                            eWayProvider.Order.Update();

                            lblError.Text = "Order " + orderId.ToString() + " has been cancelled. Payment session is timeout.";

                            if (!string.IsNullOrEmpty(HDeWayCancelledUrl))
                                Response.Redirect(URLHelper.AddParameterToUrl(HDeWayCancelledUrl, "orderpayment", orderId.ToString()));

                            
                        }
                    }
                }
                
    
                // default
                if (!string.IsNullOrEmpty(HDeWayFailedUrl))
                    Response.Redirect(HDeWayFailedUrl);
            }
        }
    }

    private bool IsLivePayment
    {
        get
        {
            return ValidationHelper.GetBoolean(SettingsKeyInfoProvider.GetBoolValue(SiteContext.CurrentSiteName + ".DEVeWayUseRapidAPI"), false);
        }
    }

    /// <summary>
    /// Logs error.
    /// </summary>
    /// <param name="message">Error message</param>
    /// <param name="eventCode">Event code</param>
    protected void LogEvent(string message, string eventCode)
    {
        try
        {
            // Add some additional information to the error message            
            string info = "ORDER ID: " + orderId + "\r\n";
            info += "TRANSACTION ID: " + transactionId + "\r\n";
            info += "PAYMENT STATUS: " + paymentStatus + "\r\n";

            message = info + message;

            EventLogProvider.LogEvent(EventType.ERROR, "EWAY_RESULTS", eventCode, message);
        }
        catch
        {
            // Unable to log the event
        }
    }
}