using System;

using CMS.Base;
using CMS.DocumentEngine;


/// <summary>
/// Sample handler module. 
/// </summary>
[CustomHandlerModuleLoader]
public partial class CMSModuleLoader
{
    // You can copy additional samples from the \CodeSamples\App_Code Samples\ folder in your
    // Kentico installation directory (by default C:\Program Files\KenticoCMS\<version>).

    #region "Macro methods loader attribute"

    /// <summary>
    /// Module registration
    /// </summary>
    private class CustomHandlerModuleLoader : CMSLoaderAttribute
    {
        /// <summary>
        /// Initializes the module
        /// </summary>
        public override void Init()
        {
            DocumentEvents.Insert.Before += Insert_Before;
            DocumentEvents.Update.Before += Update_Before;
        }

        /// <summary>
        /// Custom before update handler
        /// </summary>
        private void Update_Before(object sender, DocumentEventArgs e)
        {
            var doc = e.Node;

            // check if it is pool product
            if (doc.ClassName == "Freedom.Pool_Product")
            {
                if (!string.IsNullOrEmpty(doc.GetStringValue("AvailableStates", string.Empty)))
                {
                    string[] aryStates = doc.GetStringValue("AvailableStates", string.Empty).Split('|');

                    foreach (string sState in aryStates)
                    {
                        bool bSizeDifferent = doc.GetBooleanValue("SizeDifferent" + sState, false);

                        if (!bSizeDifferent)
                        {
                            doc.SetValue("Width" + sState, doc.GetValue("StandardWidth"));
                            doc.SetValue("Length" + sState, doc.GetValue("StandardLength"));
                            doc.SetValue("DepthFrom" + sState, doc.GetValue("StandardDepthFrom"));
                            doc.SetValue("DepthTo" + sState, doc.GetValue("StandardDepthTo"));
                        }
                        else
                        {
                            if (doc.GetStringValue("Width" + sState, string.Empty) == string.Empty)
                            {
                                doc.SetValue("Width" + sState, doc.GetValue("StandardWidth"));
                            }
                            if (doc.GetStringValue("Length" + sState, string.Empty) == string.Empty)
                            {
                                doc.SetValue("Length" + sState, doc.GetValue("StandardLength"));
                            }
                            if (doc.GetStringValue("DepthFrom" + sState, string.Empty) == string.Empty)
                            {
                                doc.SetValue("DepthFrom" + sState, doc.GetValue("StandardDepthFrom"));
                            }
                            if (doc.GetStringValue("DepthTo" + sState, string.Empty) == string.Empty)
                            {
                                doc.SetValue("DepthTo" + sState, doc.GetValue("StandardDepthTo"));
                            }
                        }
                    }
                }
            }
        }


        /// <summary>
        /// Custom before insert handler
        /// </summary>
        private void Insert_Before(object sender, DocumentEventArgs e)
        {
            var doc = e.Node;

            // check if it is pool product
            if (doc.ClassName == "Freedom.Pool_Product")
            {
                if (!string.IsNullOrEmpty(doc.GetStringValue("AvailableStates", string.Empty)))
                {
                    string[] aryStates = doc.GetStringValue("AvailableStates", string.Empty).Split('|');

                    foreach (string sState in aryStates)
                    {
                        bool bSizeDifferent = doc.GetBooleanValue("SizeDifferent" + sState, false);

                        if (!bSizeDifferent)
                        {
                            doc.SetValue("Width" + sState, doc.GetValue("StandardWidth"));
                            doc.SetValue("Length" + sState, doc.GetValue("StandardLength"));
                            doc.SetValue("DepthFrom" + sState, doc.GetValue("StandardDepthFrom"));
                            doc.SetValue("DepthTo" + sState, doc.GetValue("StandardDepthTo"));
                        }
                        else
                        {
                            if (doc.GetStringValue("Width" + sState, string.Empty) == string.Empty)
                            {
                                doc.SetValue("Width" + sState, doc.GetValue("StandardWidth"));
                            }
                            if (doc.GetStringValue("Length" + sState, string.Empty) == string.Empty)
                            {
                                doc.SetValue("Length" + sState, doc.GetValue("StandardLength"));
                            }
                            if (doc.GetStringValue("DepthFrom" + sState, string.Empty) == string.Empty)
                            {
                                doc.SetValue("DepthFrom" + sState, doc.GetValue("StandardDepthFrom"));
                            }
                            if (doc.GetStringValue("DepthTo" + sState, string.Empty) == string.Empty)
                            {
                                doc.SetValue("DepthTo" + sState, doc.GetValue("StandardDepthTo"));
                            }
                        }
                    }
                }
            }
            //doc.DocumentName = doc.DocumentName.ToUpper();
        }
    }

    #endregion
}