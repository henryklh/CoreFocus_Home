using System;

using CMS.Helpers;
using CMS.MacroEngine;
using CMS.Base;
using CMS.Ecommerce;
using CMS;

// Makes all methods in the 'CustomMacroMethods' container class available for string objects
[assembly: RegisterExtension(typeof(CustomMacroMethods), typeof(string))]
// Registers methods from the 'CustomMacroMethods' container into the "String" macro namespace
[assembly: RegisterExtension(typeof(CustomMacroMethods), typeof(StringNamespace))]

/// <summary>
/// Example of custom module with custom macro methods registration.
/// </summary>
public class CustomMacroMethods : MacroMethodContainer
{
    #region "Macro methods implementation"

    ///// <summary>
    ///// Concatenates the given string with " default" string.
    ///// </summary>
    ///// <param name="param1">String to be concatenated with " default"</param>
    //public static string GetDocumentSqlWhereByTagNames(string TagNames)
    //{
    //    return "DocumentID IN (SELECT DocumentID FROM CMS_DocumentTag WHERE TagID IN (Select TagID FROM CMS_Tag WHERE TagName IN ('aluminium', 'bar', 'bar set')))";
    //}

    // Add your own custom methods here

    #endregion "Macro methods implementation"

    #region "MacroResolver wrapper methods"

    ///// <summary>
    ///// Wrapper method of MyMethod suitable for MacroResolver.
    ///// </summary>
    ///// <param name="context">Evaluation context with child resolver</param>
    ///// <param name="parameters">Parameters of the method</param>
    //[MacroMethod(typeof(string), "Returns SQL query WHERE of DocumentIDs without AND / OR.", 1)]
    //[MacroMethodParam(0, "TagNames", typeof(string), "TagNames string to convert.")]
    //public static object GetDocumentSqlWhereByTagNames(EvaluationContext context, params object[] parameters)
    //{
    //    switch (parameters.Length)
    //    {
    //        case 1:
    //            // Overload with one parameter
    //            return GetDocumentSqlWhereByTagNames(ValidationHelper.GetString(parameters[0], ""));

    //        default:
    //            // No other overload is supported
    //            throw new NotSupportedException();
    //    }
    //}

    /// <summary>
    /// Compares two strings according to resolver IsCaseSensitiveComparison setting.
    /// </summary>
    /// <param name="context">Evaluation context with child resolver</param>
    /// <param name="parameters">Parameters of the method</param>
    [MacroMethod(typeof(string), "Compares two strings according to resolver IsCaseSensitiveComparison setting.", 2)]
    [MacroMethodParam(0, "param1", typeof(string), "First string to compare.")]
    [MacroMethodParam(1, "param2", typeof(string), "Second string to compare.")]
    public static object StringCaseSensitiveCompare(EvaluationContext context, params object[] parameters)
    {
        switch (parameters.Length)
        {
            case 2:
                // Overload with two parameters
                return ValidationHelper.GetString(parameters[0], "").EqualsCSafe(ValidationHelper.GetString(parameters[1], ""), !context.CaseSensitive);

            default:
                // No other overload is supported
                throw new NotSupportedException();
        }
    }

    // Add wrappers for MacroResolver for your own custom methods here
    // The signature of wrapper methods has to be "public static object MyMethodName(EvaluationContext context, params object[] parameters)"

    #endregion "MacroResolver wrapper methods"

    [MacroMethod(typeof(string), "GetFormatedSKUPrice", 2)]
    [MacroMethodParam(0, "param1", typeof(string), "SKUID")]
    [MacroMethodParam(1, "param2", typeof(string), "SKUPriceColumn")]
    public static object GetFormatedSKUPrice(EvaluationContext context, params object[] parameters)
    {
        switch (parameters.Length)
        {
            case 2:
                // Overload with two parameters
                int skuid = ValidationHelper.GetInteger(ValidationHelper.GetString(parameters[0], ""), 0);
                string pricecolumn = ValidationHelper.GetString(parameters[1], "");
                if (skuid > 0 && !string.IsNullOrEmpty(pricecolumn))
                {
                    SKUInfo sku = SKUInfoProvider.GetSKUInfo(skuid);
                    ShoppingCartInfo cart = ECommerceContext.CurrentShoppingCart;
                    string price = SKUInfoProvider.GetSKUFormattedPrice(sku, cart, true, true, pricecolumn);
                    if (price == "$0.00")
                    {
                        return null;
                    }
                    else
                    {
                        return price;
                    }
                }

                return null;

            default:
                // No other overload is supported
                throw new NotSupportedException();
        }
    }
}