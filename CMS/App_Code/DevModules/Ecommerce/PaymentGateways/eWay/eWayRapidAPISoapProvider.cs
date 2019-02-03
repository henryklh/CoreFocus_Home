using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Text;

using CMS;
using CMS.Base;
using CMS.EcommerceProvider;
using CMS.Helpers;
using CMS.DataEngine;
using CMS.SiteProvider;
using CMS.EventLog;

using eWAY.RapidAPI;

[assembly: RegisterCustomClass("eWayRapidAPISoapProvider", typeof(eWayRapidAPISoapProvider))]

/// <summary>
/// Summary description for eWayRapidAPISoapProvider
/// </summary>
public class eWayRapidAPISoapProvider : CMSPaymentGatewayProvider
{
    /// <summary>
    /// Returns path to payment gateway form with custom controls.
    /// </summary>
    public override string GetPaymentDataFormPath()
    {
        try
        {
            if (string.IsNullOrWhiteSpace(SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayFormAliasPath")))
            {
                return "~/DEVModules/Ecommerce/Controls/PaymentGateways/eWayPaymentForm.ascx";
            }

            return SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".DEVeWayFormAliasPath");
            
        }
        catch
        {
            EventLogProvider.LogInformation("eWayRapidAPISoapProvider", "CONTROLNOTFOUND",
                    "The path to the eWay payment gateway control is incorrect. Please check the site settings.");
            return null;
        }
    }

    private bool IsLivePayment
    {
        get
        {
            return ValidationHelper.GetBoolean(SettingsKeyInfoProvider.GetBoolValue(SiteContext.CurrentSiteName + ".DEVeWayUseRapidAPI"), false);
        }
    }

    public override void ProcessPayment()
    {
        if (base.ShoppingCartInfoObj == null)
        {
            base.ErrorMessage = ResHelper.GetString("paymentgatewayprovider.paymentdatanotfound", null, true);
            return;
        }

        CreateAccessCodeResponse eWayAccessCodeResponse = (CreateAccessCodeResponse)SessionHelper.GetValue("DEVeWayResponse");

        if (eWayAccessCodeResponse == null)
        {
            ErrorMessage = "ProcessPayment() - Payment gateway access response is invalid";
            EventLogProvider.LogInformation("eWayGateway", "EXCEPTION", ErrorMessage);
            PaymentResult.PaymentStatusValue = "Unpaid";
            PaymentResult.PaymentMethodID = ShoppingCartInfoObj.ShoppingCartPaymentOptionID;
            PaymentResult.PaymentDescription = ErrorMessage;
            PaymentResult.PaymentIsCompleted = false;
            UpdateOrderPaymentResult();
        }
        else{
            // If there was an error getting the method from the url, then show all options to the customer        
            Method method = Method.TokenPayment;

            // Get the method that was used
            string requestType = CMS.Helpers.QueryHelper.GetString("Method", string.Empty);
            if (!string.IsNullOrEmpty(requestType))
                method = (Method)Enum.Parse(typeof(Method), requestType);

            string requestUrl = eWayAccessCodeResponse.FormActionURL;
            Dictionary<string, string> requestParams = new Dictionary<string, string>();

            requestParams.Add("EWAY_ACCESSCODE", eWayAccessCodeResponse.AccessCode);

            requestParams.Add("EWAY_CARDNAME", PaymentDataForm.PaymentGatewayCustomData["EWAY_CARDNAME"].ToString());
            requestParams.Add("EWAY_CARDNUMBER", PaymentDataForm.PaymentGatewayCustomData["EWAY_CARDNUMBER"].ToString());
            requestParams.Add("EWAY_CARDEXPIRYMONTH", PaymentDataForm.PaymentGatewayCustomData["EWAY_CARDEXPIRYMONTH"].ToString());
            requestParams.Add("EWAY_CARDEXPIRYYEAR", PaymentDataForm.PaymentGatewayCustomData["EWAY_CARDEXPIRYYEAR"].ToString());
            requestParams.Add("EWAY_CARDCVN", PaymentDataForm.PaymentGatewayCustomData["EWAY_CARDCVN"].ToString());

            //PaymentResult.PaymentStatusValue = "Unpaid";
            //PaymentResult.PaymentDescription = ErrorMessage;
            //PaymentResult.PaymentIsCompleted = false;
            //return;


            // Start building the request
            try
            {
                PerformPostRequest(requestUrl, requestParams);
            }
            catch (Exception ex)
            {
                ErrorMessage = "ProcessPayment() - Unable to process payment. Fatal error while communicating to payment gateway. Exception: " + ex.ToString();
                EventLogProvider.LogInformation("eWayGateway", "EXCEPTION", ErrorMessage);
                PaymentResult.PaymentStatusValue = "Unpaid";
                PaymentResult.PaymentMethodID = ShoppingCartInfoObj.ShoppingCartPaymentOptionID;
                PaymentResult.PaymentDescription = ErrorMessage;
                PaymentResult.PaymentIsCompleted = false;
                UpdateOrderPaymentResult();
            }
        
        }
        
    }

    /// <summary>
    /// Virtually send form action with a new form tag with jQuery.
    /// </summary>
    /// <param name="url"></param>
    /// <param name="requestParams"></param>
    private void PerformPostRequest(string url, Dictionary<string, string> requestParams)
    {
        var form = new StringBuilder();

        form.AppendFormat(@"<form id=""postform"" action=""{0}"" method=""post"">", url);

        form.AppendFormat(string.Join(" ", requestParams.Select(p => string.Format(@"<input type=""hidden"" name=""{0}"" value=""{1}"">", p.Key, HttpUtility.JavaScriptStringEncode(p.Value)))));

        form.AppendFormat(@"<input type=""submit"" value=""{0}"">", "Pay now");

        form.Append("</form>");

        var page = CMS.Helpers.PageContext.CurrentPage;

        page.ClientScript.RegisterStartupScript(
            page.GetType(),
            "__EWAY_PAYMENT_PROCESS",
            String.Format(@"jQuery('form').after('{0}'); jQuery('#postform').submit(); ", form.ToString()),
            true);
    }
}