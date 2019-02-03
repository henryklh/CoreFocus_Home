using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.IO;
using System.Data;
using System.Text;
using System.Xml.Serialization;
using System.Xml;
using Microsoft.CSharp;
using System.CodeDom.Compiler;

using CMS.CustomTables;
using CMS.Helpers;
using CMS.DataEngine;
using CMS.SettingsProvider;
using CMS.FormEngine;
using CMS.DocumentEngine;
using CMS.Membership;
using CMS.SiteProvider;
using CMS.MediaLibrary;

namespace AlykaImportHelper
{
    public class Helpers
    {
        /// <summary>
        /// Handles importing of files into media library, returns the media library path that can be used in URL selectors
        /// </summary>
        /// <param name="inputFile">The local filepath to import the file from</param>
        /// <param name="mediaLibraryRootFolder">The relative folder path - for example /FHBD/media/</param>
        /// <param name="library">The library to import the file into</param>
        /// <param name="folder">The folder in the library to import the file into</param>
        /// <returns></returns>
        public static string UploadFileToLibrary(string inputFile, string mediaLibraryRootFolder, string library, string folder)
        {
            // Get the media file
            var checkForFile = folder.TrimStart('/') + Path.GetFileName(inputFile).Replace(" ", "-");
            MediaFileInfo foundFile = MediaFileInfoProvider.GetMediaFileInfo(SiteContext.CurrentSiteName, checkForFile, library);
            if (foundFile != null)
            {
                // Stop! File already exists in library!
                return mediaLibraryRootFolder + library + "/" + foundFile.FilePath;
            }
            else
            {
                // File not found in library. Proceed with import.
                //Media Library Info - takes Media Library Name and Website Name
                MediaLibraryInfo libraryInfo = MediaLibraryInfoProvider.GetMediaLibraryInfo(library, SiteContext.CurrentSiteName);
                //Folder in Media Library where Item will be Inserted
                string mediaLibraryFolder = folder;
                //Absolute Path to File
                //string filePath = inputFile;
                var copyPath = MediaLibraryHelper.GetMediaRootFolderPath(SiteContext.CurrentSiteName) + library  + folder.Replace("/", @"\") + Path.GetFileName(inputFile).Replace(" ", "-");
                File.Copy(inputFile, copyPath, true);
                // Get Relative Path to File
                //string path = MediaLibraryHelper.EnsurePhysicalPath(copyPath);
                //create media file info item - takes the relative path to the document, the library ID, and the folder name where the document will be located within the media library
                MediaFileInfo fileInfo = new MediaFileInfo(copyPath, libraryInfo.LibraryID, mediaLibraryFolder);
                //set the title to something nice
                fileInfo.FileTitle = Path.GetFileNameWithoutExtension(inputFile).Replace(" ", "-");
                //set the description to something useful
                fileInfo.FileDescription = "";
                // Save media file info
                try
                {
                    MediaFileInfoProvider.ImportMediaFileInfo(fileInfo);
                }
                catch (Exception ex)
                {
                    if (ex.Message.Contains("already exists in the database"))
                    {
                        return mediaLibraryRootFolder + library + "/" + fileInfo.FilePath;
                    }
                    else
                    {
                        throw ex;
                    }
                }
                return mediaLibraryRootFolder + library + "/" + fileInfo.FilePath;
            }
        }
    }

    public class CustomCodeResult
    {
        public string Result { get; set; }
        public TreeNode NewParentNode { get; set; }
        public event EventHandler AfterImport;

        public virtual void OnAfterImport(EventArgs e)
        {
            if (AfterImport != null)
                AfterImport(this, e);
        }
    }
}
