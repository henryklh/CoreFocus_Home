using System;

using CMS.OutputFilter;
using CMS.Base;

/// <summary>
/// Custom Module Class for Custom Macros. Partial class ensures correct registration. For adding new methods, modify SampleModule inner class.
/// </summary>
[CustomMacroLoader]
public partial class CMSModuleLoader
{

    /// <summary>
    /// Attribute class ensuring correct initialization of custom macro methods and output filter substitutions.
    /// </summary>
    private class CustomMacroLoader : CMSLoaderAttribute
    {
        /// <summary>
        /// Registers module methods.
        /// </summary>
        public override void Init()
        {
            // -- Custom string macro methods
            Extend<string>.With<CustomMacroMethods>();

            // -- Custom output substitution resolving
            // ResponseOutputFilter.OnResolveSubstitution += OutputFilter_OnResolveSubstitution;
        }
    }
}

