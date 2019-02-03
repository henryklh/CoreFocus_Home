using System;
using System.Collections.Generic;
using System.Collections;
using System.Linq;
using System.Text;
using System.Data;

using CMS.Ecommerce;
using CMS.Helpers;
using CMS.DocumentEngine;
using CMS.DataEngine;
using CMS.SiteProvider;
using CMS.Membership;

using CultureInfo = System.Globalization.CultureInfo;
using TreeNode = CMS.DocumentEngine.TreeNode;

namespace CMS.Controls
{
    /// <summary>
    /// SKU transformation methods
    /// </summary>
    public partial class CMSTransformation
    {
        #region Text

        public string TextNewLineBreak(object strInput)
        {
            string strReturn = ValidationHelper.GetString(strInput, string.Empty);

            strReturn.Replace(Environment.NewLine, "<br/>");

            return strReturn;
        }

        #endregion Text

        #region Shopping Cart

        public bool CartItemHasOptions()
        {
            var cartItem = DataItem as ShoppingCartItemInfo;
            return (cartItem.ProductOptions.Count > 0);
        }

        public int CartItemDocumentID()
        {
            var cartItem = DataItem as ShoppingCartItemInfo;

            TreeNode y = DocumentEngine.DocumentHelper.GetDocuments().Where(x => x.NodeSKUID == cartItem.SKUID).FirstOrDefault();
            if (y != null)
            {
                return y.DocumentID;
            }
            else
            {
                return 0;
            }
        }

        public string GetShoppingCartItemFormattedDiscountUnitPrice(bool productoptions)
        {
            ShoppingCartItemInfo cartItem = DataItem as ShoppingCartItemInfo;
            double priceValue = 0;
            // Try to get the SKU object from the ShoppingCartItemInfo object at first if used
            if (cartItem != null)
            {
                double iPrice = cartItem.SKU.GetDoubleValue("SKUPriceIncTax", 0);

                if (iPrice == 0)
                {
                    iPrice = cartItem.SKU.SKUPrice;
                }

                //ltlTest.Text += "<br/>" + scii.SKU.SKUName + ": " + iPrice + " - " + scii.UnitTotalPrice + " = " + (iPrice - scii.UnitTotalPrice);
                priceValue += (iPrice - cartItem.UnitTotalPrice);

                if (cartItem.ProductOptions.Count > 0 && productoptions)
                {
                    foreach (ShoppingCartItemInfo scii in cartItem.ProductOptions)
                    {
                        double oPrice = scii.SKU.GetDoubleValue("SKUPriceIncTax", 0);

                        if (oPrice == 0)
                        {
                            oPrice = scii.SKU.SKUPrice;
                        }

                        priceValue += (oPrice - scii.UnitTotalPrice);
                    }
                }
            }
            return FormatPrice(priceValue);
        }

        public string GetShoppingCartItemFormattedOriginalPrice(bool productoptions)
        {
            ShoppingCartItemInfo cartItem = DataItem as ShoppingCartItemInfo;
            double priceValue = 0;
            // Try to get the SKU object from the ShoppingCartItemInfo object at first if used
            if (cartItem != null)
            {
                double iPrice = cartItem.SKU.GetDoubleValue("SKUPriceIncTax", 0);

                if (iPrice == 0)
                {
                    iPrice = cartItem.SKU.SKUPrice;
                }

                //ltlTest.Text += "<br/>" + scii.SKU.SKUName + ": " + iPrice + " - " + scii.UnitTotalPrice + " = " + (iPrice - scii.UnitTotalPrice);
                priceValue += iPrice;

                if (cartItem.ProductOptions.Count > 0 && productoptions)
                {
                    foreach (ShoppingCartItemInfo scii in cartItem.ProductOptions)
                    {
                        double oPrice = scii.SKU.GetDoubleValue("SKUPriceIncTax", 0);

                        if (oPrice == 0)
                        {
                            oPrice = scii.SKU.SKUPrice;
                        }

                        priceValue += oPrice;
                    }
                }
            }
            return FormatPrice(priceValue);
        }

        /// <summary>
        /// Returns names of Volume buy discounts for current cart item surrounded with li tag.
        /// </summary>
        public string GetVolumeDiscountNames()
        {
            var cartItem = DataItem as ShoppingCartItemInfo;
            if ((cartItem == null))
            {
                return string.Empty;
            }
            var sb = new StringBuilder();

            VolumeDiscountInfo ItemVolumeDiscount = new VolumeDiscountInfo();
            ItemVolumeDiscount = VolumeDiscountInfoProvider.GetVolumeDiscountInfo(cartItem.SKUID, cartItem.CartItemUnits);
            if (ItemVolumeDiscount == null)
            {
                return string.Empty;
            }
            if (ItemVolumeDiscount.ItemDiscountIsFlat)
            {
                sb.Append(string.Format("Buy " + ItemVolumeDiscount.ItemDiscountedUnits + " Get ", ECommerceContext.CurrentShoppingCart.GetFormattedPrice(ItemVolumeDiscount.ItemDiscountValue, true) + " off"));
            }
            else
            {
                sb.Append(string.Format("Buy " + ItemVolumeDiscount.ItemDiscountedUnits + " Get ", ItemVolumeDiscount.ItemDiscountValue + "% off"));
            }
            return string.Empty;
        }

        public string GetOrderItemOptionsFormatedString()
        {
            string returnValue = string.Empty;

            var cartItem = DataItem as ShoppingCartItemInfo;

            if ((cartItem == null))
            {
                return string.Empty;
            }

            var ois = OrderItemInfoProvider.GetOrderItems().Where(x => x.OrderItemParentGUID == cartItem.CartItemGUID);

            if (ois.Count() > 0)
            {
                foreach (OrderItemInfo oii in ois)
                {
                    if (!string.IsNullOrEmpty(returnValue))
                    {
                        returnValue += " | ";
                    }

                    returnValue += oii.OrderItemSKUName;
                }
            }

            return returnValue;
        }

        public string GetSKUFormattedOriginalPriceIncTax()
        {
            double price = GetSKUPriceSaving(true, true, null, null, false) + GetSKUPrice(true, true);
            return FormatPrice(price);
        }

        #endregion Shopping Cart

        #region Attachment

        public static AttachmentInfo GetAttachmentInfo(object AttachmentDocumentID, object AttachmentGUID)
        {
            Guid attGUID = ValidationHelper.GetGuid(AttachmentGUID, Guid.Empty);
            int attDocID = ValidationHelper.GetInteger(AttachmentDocumentID, 0);
            if (attDocID > 0 && attGUID != Guid.Empty)
            {
                AttachmentInfo ai = AttachmentInfoProvider.GetAttachmentInfo(attDocID, attGUID);

                if (ai != null)
                {
                    return ai;
                }
            }

            return null;
        }

        public static string GetFileTitle(object AttachmentDocumentID, object AttachmentGUID, object DefaultString)
        {
            string strDefault = ValidationHelper.GetString(DefaultString, string.Empty);

            AttachmentInfo ai = GetAttachmentInfo(AttachmentDocumentID, AttachmentGUID);
            if (ai != null)
            {
                if (!string.IsNullOrEmpty(ai.AttachmentTitle))
                {
                    strDefault = ai.AttachmentTitle;
                }
            }

            return strDefault;
        }

        public static string GetFileDescription(object AttachmentDocumentID, object AttachmentGUID, object DefaultString)
        {
            string strDefault = ValidationHelper.GetString(DefaultString, string.Empty);

            AttachmentInfo ai = GetAttachmentInfo(AttachmentDocumentID, AttachmentGUID);
            if (ai != null)
            {
                if (!string.IsNullOrEmpty(ai.AttachmentDescription))
                {
                    strDefault = ai.AttachmentDescription;
                }
            }

            return strDefault;
        }

        public static Guid GetClassAttachmentGroupGuid(string ClassName, string AttributeName)
        {
            DataClassInfo dci = DataClassInfoProvider.GetDataClassInfo(ClassName);

            if (dci != null)
            {
                CMS.FormEngine.FormInfo fi = new CMS.FormEngine.FormInfo(dci.ClassFormDefinition);
                CMS.FormEngine.FormFieldInfo ffi = fi.GetFormField(AttributeName);

                return ffi.Guid;
            }

            return Guid.Empty;
        }

        #endregion Attachment

        #region Tag

        public static string GetDocumentTags(object DocumentTagGroupID, object DocumentTags, object NodeAliasPath, string DocumentListPage, string LinkTextBefore, string LinkTextAfter, string LinkSeparator)
        {
            //GetDocumentByNodeId(1).Children.Any(x => (x.ClassName == "CMS.MenuItem" || x.ClassName == "CMS.Folder") && !x.DocumentMenuItemHideInNavigation);

            string result = string.Empty;

            if (string.IsNullOrEmpty(DocumentListPage))
            {
                TreeProvider x = new TreeProvider();

                var y = x.SelectSingleNode(SiteProvider.SiteContext.CurrentSiteName, (string)NodeAliasPath, "");
                if (y != null)
                {
                    DocumentListPage = "~" + y.Parent.NodeAliasPath;
                }
            }

            result = CMS.Blogs.BlogTransformationFunctions.GetDocumentTags(DocumentTagGroupID, DocumentTags, NodeAliasPath, DocumentListPage);

            // only use apply the settings when one / both of text before / after is entered.
            if (!string.IsNullOrEmpty(LinkTextBefore) || !string.IsNullOrEmpty(LinkTextAfter))
            {
                string[] aryLinks = result.Split(new string[] { ", " }, StringSplitOptions.RemoveEmptyEntries);
                if (aryLinks.Length > 0)
                {
                    string newLinks = string.Empty;
                    for (int i = 0; i < aryLinks.Length; i++)
                    {
                        if (i > 0)
                        {
                            newLinks += LinkSeparator;
                        }

                        string strTagHead = aryLinks[i].Substring(0, (aryLinks[i].IndexOf('>') + 1));
                        newLinks += strTagHead + LinkTextBefore + CMS.Helpers.HTMLHelper.HtmlToPlainText(aryLinks[i]).Trim() + LinkTextAfter + "</a>";
                    }

                    result = newLinks;
                }
            }
            return result;
        }

        /// <summary>
        /// return filter link for isotope with default format, {0} = TagCodeName and {1} = TagName
        /// </summary>
        /// <param name="DocumentID">DocumentID</param>
        /// <param name="FormatString"><a role=button class=IsotopeFilter data-filter={0}>{1}</a></param>
        /// <param name="Separator">string=, </param>
        /// <returns></returns>
        public static string GetDocumentTagsIsotopeFilter(object DocumentID, string FormatString = "<a role=\"button\" class=\"IsotopeFilter\" data-filter=\"{0}\">{1}</a>", string Separator = ", ")
        {
            // update for version 9
            int documentid = ValidationHelper.GetInteger(DocumentID, 0);

            if (documentid > 0)
            {
                List<Taxonomy.TagInfo> dt = Taxonomy.TagInfoProvider.GetTags(documentid).ToList();
                if (dt.Count > 0)
                {
                    string tags = string.Empty;
                    foreach (Taxonomy.TagInfo ti in dt)
                    {
                        tags += Separator + string.Format(FormatString, ti.TagCodeName, ti.TagName);
                    }

                    return tags.Substring(Separator.Length);
                }
            }

            return string.Empty;
        }

        #endregion Tag

        #region Navigation

        public static TreeNode GetDocumentByNodeId(object NodeId)
        {
            TreeProvider tree = new TreeProvider(MembershipContext.AuthenticatedUser);
            TreeNode node = tree.SelectSingleNode(ValidationHelper.GetInteger(NodeId, 0));

            if (node != null)
            {
                return node;
            }
            else
            {
                return null;
            }
        }

        public static string GetMenuItemDispalyName(object NodeId)
        {
            TreeProvider tree = new TreeProvider(MembershipContext.AuthenticatedUser);
            TreeNode node = tree.SelectSingleNode(ValidationHelper.GetInteger(NodeId, 0));
            if (node != null)
            {
                return (string.IsNullOrEmpty(node.DocumentMenuCaption)) ? node.DocumentName : node.DocumentMenuCaption;
            }
            else
            {
                return node.DocumentName;
            }
        }

        public static string GetMenuItemURL(object NodeId)
        {
            TreeProvider tree = new TreeProvider(MembershipContext.AuthenticatedUser);
            TreeNode node = tree.SelectSingleNode(ValidationHelper.GetInteger(NodeId, 0));
            if (node != null)
            {
                return TreePathUtils.GetDocumentUrl(node.DocumentID);
            }
            else
            {
                return node.NodeAliasPath;
            }
        }

        public static string GetUnifyEcommerceMenuListItemStyles(object NodeId)
        {
            TreeProvider tree = new TreeProvider(MembershipContext.AuthenticatedUser);
            TreeNode node = tree.SelectSingleNode(ValidationHelper.GetInteger(NodeId, 0));

            string result = null;

            if (node != null)
            {
                return result;
            }
            else
            {
                return null;
            }
        }

        //GetParentUrl
        public static string GetParentUrl(object NodeId)
        {
            TreeProvider tree = new TreeProvider(MembershipContext.AuthenticatedUser);
            TreeNode node = tree.SelectSingleNode(ValidationHelper.GetInteger(NodeId, 0));
            if (node != null)
            {
                return TreePathUtils.GetDocumentUrl(node.Parent.DocumentID);
            }
            return "";
        }

        //GetParentUrl
        public static string GetParentDocumentName(object NodeId)
        {
            TreeProvider tree = new TreeProvider(MembershipContext.AuthenticatedUser);
            TreeNode node = tree.SelectSingleNode(ValidationHelper.GetInteger(NodeId, 0));
            if (node != null)
            {
                return (string.IsNullOrEmpty(node.Parent.DocumentMenuCaption)) ? node.Parent.DocumentName : node.Parent.DocumentMenuCaption;
            }
            return "";
        }

        public static bool IsMenuItemHasChild(object NodeId, string culture, string pageTypes = null)
        {
            TreeProvider tree = new TreeProvider(MembershipContext.AuthenticatedUser);
            TreeNode node = tree.SelectSingleNode(ValidationHelper.GetInteger(NodeId, 0));
            if (node.NodeHasChildren)
            {
                if (pageTypes == null)
                {
                    var pages = tree.SelectNodes()
                            .Path(node.NodeAliasPath, PathTypeEnum.Children)
                            .OnCurrentSite()
                            .Culture(culture)
                            .Published()
                            .Where("DocumentMenuItemHideInNavigation=0");
                    if (!DataHelper.DataSourceIsEmpty(pages))
                    {
                        return true;
                    }
                }
                else
                {
                    var pages = tree.SelectNodes()
                            .Path(node.NodeAliasPath, PathTypeEnum.Children)
                            .OnCurrentSite()
                            .Culture(culture)
                            .Published()
                            .Types(pageTypes)
                            .Where("DocumentMenuItemHideInNavigation=0");
                    if (!DataHelper.DataSourceIsEmpty(pages))
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        public static bool GetUnifyEcommerceMenuShowMegaMenu(object NodeId)
        {
            TreeProvider tree = new TreeProvider(MembershipContext.AuthenticatedUser);
            TreeNode node = tree.SelectSingleNode(ValidationHelper.GetInteger(NodeId, 0));
            return false;
        }

        public static bool GetUnifyEcommerceMenuIsMegaMenuItem(object NodeId)
        {
            TreeProvider tree = new TreeProvider(MembershipContext.AuthenticatedUser);
            TreeNode node = tree.SelectSingleNode(ValidationHelper.GetInteger(NodeId, 0));
            return false;
        }

        public static string GetUnifyEcommerceMenuLinkStyles(object NodeId)
        {
            TreeProvider tree = new TreeProvider(MembershipContext.AuthenticatedUser);
            TreeNode node = tree.SelectSingleNode(ValidationHelper.GetInteger(NodeId, 0));

            string isMegaItem = "d-block g-color-text g-color-primary--hover g-text-underline--none--hover g-py-5";

            string result = null;

            if (node != null)
            {
                return result;
            }
            else
            {
                return null;
            }
        }

        #endregion Navigation
    }
}