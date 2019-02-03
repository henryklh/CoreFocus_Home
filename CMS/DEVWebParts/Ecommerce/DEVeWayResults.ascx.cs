using System;
using System.Linq;
using System.Web.UI;
using System.Data;
using System.Collections.Generic;
using System.Net;
using System.Text;

using CMS.Base;
using CMS.Controls;

using CMS.Ecommerce;
using CMS.EcommerceProvider;
using CMS.ExtendedControls;
using CMS.Helpers;
using CMS.PortalControls;
using CMS.EventLog;
using CMS.PortalEngine;
using CMS.Membership;

using CMS.Globalization;
using CMS.DataEngine;
using CMS.SiteProvider;

using eWAY.RapidAPI;

public partial class DEVWebParts_Ecommerce_DEVeWayResults : CMSAbstractWebPart
{
    #region "Variables"

    public int orderId
    {
        get
        {
            return ValidationHelper.GetInteger(hdfOrderId.Value, 0);
        }
        set
        {
            hdfOrderId.Value = value.ToString();
        }
    }
    private string transactionId = "";
    private bool paymentStatus = false;

    #endregion


    #region "Properties"

    /// <summary>
    /// Enables or disables resolving of inline controls.
    /// </summary>
    public bool ResolveDynamicControls
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("ResolveDynamicControls"), true);
        }
        set
        {
            SetValue("ResolveDynamicControls", value);
        }
    }

    public string TextAfterPurchase
    {
        get
        {
            return ValidationHelper.GetString(GetValue("TextAfterPurchase"), ltlThankYou.Text);
        }
        set
        {
            SetValue("TextAfterPurchase", value);
            ltlThankYou.Text = value;
            ltlThankYou.EnableViewState = (ResolveDynamicControls && ControlsHelper.ResolveDynamicControls(this));
        }
    }

    public string TextPaymentFailed
    {
        get
        {
            return ValidationHelper.GetString(GetValue("TextPaymentFailed"), ltlPaymentFailed.Text);
        }
        set
        {
            SetValue("TextPaymentFailed", value);
            ltlPaymentFailed.Text = value;
            ltlPaymentFailed.EnableViewState = (ResolveDynamicControls && ControlsHelper.ResolveDynamicControls(this));
        }
    }

    public bool ShowPaymentLink
    {
        get
        {
            return ValidationHelper.GetBoolean(GetValue("ShowPaymentLink"), false);
        }
        set
        {
            SetValue("ShowPaymentLink", value);
        }
    }

    public string PaymentPageUrl
    {
        get
        {
            return ValidationHelper.GetString(GetValue("PaymentPageUrl"), "");
        }
        set
        {
            SetValue("PaymentPageUrl", value);
        }
    }

    #endregion



    /// <summary>
    /// Content loaded event handler.
    /// </summary>
    public override void OnContentLoaded()
    {
        base.OnContentLoaded();
        SetupControl();
    }


    /// <summary>
    /// Reloads the control data.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();
        SetupControl();
    }


    /// <summary>
    /// Initializes the control properties.
    /// </summary>
    protected void SetupControl()
    {
        if (StopProcessing)
        {
            // Do not process
        }
        else
        {
            string accessCode = Request.QueryString["AccessCode"] as string;

            // If the accessCode was not found in the url, some error happened so just return
            if (accessCode == null)
            {
                lblError.Text = string.Format("Error: \"{0}\" not found.", "AccessCode");
                return;
            }

            ltlThankYou.Text = TextAfterPurchase;
            ltlPaymentFailed.Text = TextPaymentFailed;


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
                service.Credentials = credentials;
                service.Url = soapUrl;

                // Request result from service
                GetAccessCodeResultResponse response = null;
                try
                {
                    response = service.GetAccessCodeResult(request);
                }
                catch (Exception ex)
                {
                    lblError.Text = string.Format("Error getting the result: \"{0}\".", ex.Message);
                    return;
                }

                // CMS Ecommerce Update
                orderId = ValidationHelper.GetInteger(response.InvoiceNumber, 0);
                paymentStatus = ValidationHelper.GetBoolean(response.TransactionStatus, false);
                transactionId = ValidationHelper.GetString(response.TransactionID, null);

                eWayRapidAPISoapProvider eWayProvider;
                string errorMessage;

                OrderInfo oi = OrderInfoProvider.GetOrderInfo(orderId);

                if (oi != null)
                {
                    try
                    {
                        eWayProvider = (eWayRapidAPISoapProvider)CMSPaymentGatewayProvider.GetPaymentGatewayProvider(oi.OrderPaymentOptionID);
                        eWayProvider.OrderId = orderId;
                    }
                    catch (Exception ex)
                    {
                        // Log exception
                        errorMessage = EventLogProvider.GetExceptionLogMessage(ex);
                        LogEvent(errorMessage, "Payment_Provider_Not_Found");
                        return;
                    }
                }
                else
                {
                    errorMessage = string.Format(GetString("PaymentGatewayProvider.ordernotfound"), orderId);
                    LogEvent(errorMessage, "Order_Not_Found");
                    return;
                }
                

                string paymentDesc = "eWayResults : [" +
                        "{ AccessCode : " + response.AccessCode + " }, " +
                        "{ AuthorisationCode : " + response.AuthorisationCode + " }, " +
                        "{ InvoiceNumber : " + response.InvoiceNumber + " }, " +
                        "{ InvoiceReference : " + response.InvoiceReference + " }, " +
                        "{ ResponseCode : " + response.ResponseCode + " }, " +
                        "{ ResponseMessage : " + response.ResponseMessage + " }, " +
                        "{ TotalAmount : " + (response.TotalAmount != null ? response.TotalAmount.Value.ToString() : string.Empty) + " }, " +
                        "{ TransactionID : " + (response.TransactionID != null ? response.TransactionID.Value.ToString() : string.Empty) + " }, " +
                        "{ TransactionStatus : " + (response.TransactionStatus != null ? response.TransactionStatus.Value.ToString() : string.Empty) + " }, " +
                        "{ TokenCustomerId : " + (response.TokenCustomerID.HasValue ? response.TokenCustomerID.ToString() : string.Empty) + " } " +
                        "]";
                //lblTest.Text += "paymentDesc:" + paymentDesc + "<br/>";
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

                // Update order payment result in database
                errorMessage = eWayProvider.UpdateOrderPaymentResult();

                //lblTest.Text += "UpdateOrderPaymentResult:" + errorMessage + "<br/>";

                if (!string.IsNullOrEmpty(errorMessage))
                {
                    // Log the event
                    LogEvent(errorMessage, "Order_Payment_Result_Update");
                }


                if (eWayProvider.IsPaymentCompleted)
                {
                    // redirect to payment successful page
                    string redirectUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWaySuccessfulUrl");

                    if(!string.IsNullOrEmpty(ltlThankYou.Text))
                    {
                        ltlThankYou.Visible = true;
                    }
                    
                    // default redirect by site setting.
                    if (!string.IsNullOrEmpty(redirectUrl))
                        Response.Redirect(redirectUrl);

                    return;
                }
                else
                {



                    string HDeWayFailedUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayFailedUrl");

                    string HDeWayCancelledUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayCancelledUrl");

                    string orderHash = QueryHelper.GetString("o", string.Empty);
                    int failedorderId = 0;

                    if (!string.IsNullOrEmpty(orderHash))
                    {
                        failedorderId = ValidationHelper.GetInteger(WindowHelper.GetItem(orderHash), 0);
                    }

                    if (!string.IsNullOrEmpty(ltlPaymentFailed.Text))
                    {
                        ltlPaymentFailed.Visible = true;
                        btnPaymentLink.Visible = ShowPaymentLink;
                        btnPaymentLink.Text = "Process payment again";

                        if (failedorderId == 0 && !CMS.Membership.AuthenticationHelper.IsAuthenticated())
                        {
                            btnPaymentLink.Text = "Confirm";
                        }

                        return;
                    }


                    if (failedorderId > 0)
                    {
                        if (!string.IsNullOrEmpty(HDeWayFailedUrl))
                            Response.Redirect(URLHelper.AddParameterToUrl(HDeWayFailedUrl, "o", orderHash));
                    }
                    else
                    {
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

                            //if (!string.IsNullOrEmpty(HDeWayCancelledUrl))
                            //    Response.Redirect(URLHelper.AddParameterToUrl(HDeWayCancelledUrl,"ordernumber", orderId.ToString()));
                            btnPaymentLink.Visible = false;
                            btnFailConfirm.Visible = true;

                        }
                    }


                    // default
                    if (!string.IsNullOrEmpty(HDeWayFailedUrl))
                        Response.Redirect(HDeWayFailedUrl);
                }
            }
        }
    }


    /// <summary>
    /// OnLoad handler
    /// </summary>
    protected override void OnLoad(EventArgs e)
    {
        // Update update panel always 
        if (UpdatePanel != null)
        {
            UpdatePanel.UpdateMode = UpdatePanelUpdateMode.Always;
        }

        base.OnLoad(e);
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
    protected void btnPaymentLink_Click(object sender, EventArgs e)
    {
        string HDeWayFailedUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayFailedUrl");

        string HDeWayCancelledUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayCancelledUrl");

        string orderHash = QueryHelper.GetString("o", string.Empty);
        int failedorderId = 0;

        if (!string.IsNullOrEmpty(orderHash))
        {
            failedorderId = ValidationHelper.GetInteger(WindowHelper.GetItem(orderHash), 0);
        }

        if (failedorderId > 0)
        {
            Response.Redirect(URLHelper.AddParameterToUrl(PaymentPageUrl, "o", orderHash));
            return;
        }

        if (CMS.Membership.AuthenticationHelper.IsAuthenticated())
        {
            Response.Redirect(URLHelper.AddParameterToUrl(PaymentPageUrl, "orderpayment", orderId.ToString()));
            return;
        }
        else
        {
            eWayRapidAPISoapProvider eWayProvider;
            string errorMessage;

            OrderInfo oi = OrderInfoProvider.GetOrderInfo(orderId);

            if (oi != null)
            {
                try
                {
                    eWayProvider = (eWayRapidAPISoapProvider)CMSPaymentGatewayProvider.GetPaymentGatewayProvider(oi.OrderPaymentOptionID);
                    eWayProvider.OrderId = orderId;
                }
                catch (Exception ex)
                {
                    // Log exception
                    errorMessage = EventLogProvider.GetExceptionLogMessage(ex);
                    LogEvent(errorMessage, "Payment_Provider_Not_Found");
                    return;
                }
            }
            else
            {
                errorMessage = string.Format(GetString("PaymentGatewayProvider.ordernotfound"), orderId);
                LogEvent(errorMessage, "Order_Not_Found");
                return;
            }

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


            btnPaymentLink.Visible = false;
            btnFailConfirm.Visible = true;
        }
    }
    protected void btnFailConfirm_Click(object sender, EventArgs e)
    {
        string HDeWayCancelledUrl = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayCancelledUrl");

        if (!string.IsNullOrEmpty(HDeWayCancelledUrl))
            Response.Redirect(URLHelper.AddParameterToUrl(HDeWayCancelledUrl, "orderpayment", orderId.ToString()));
    }
}