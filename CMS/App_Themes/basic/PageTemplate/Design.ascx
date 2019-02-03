<section class="topblank">
    <cms:CMSWebPartZone runat="server" ZoneId="TopBlank" />
</section>
<div class="PageContainer Services">
    <cms:CMSConditionalLayout runat="server" ID="ConditionLayoutList" GroupName="PageType" VisibleForDocumentTypes="CMS.MenuItem" ActiveInDesignMode="True">
        <header class="mb35">
            <nav class="breadcrumb">
                <div class="Content">
                    <cms:CMSWebPartZone runat="server" ZoneId="Breadcrumb" />
                </div>
            </nav>
            <div class="PageHeadingWrapper bg-light-primary-2">
                <div class="PageHeading Content">
                    <cms:CMSWebPartZone ZoneId="PageHeadingA" runat="server" />
                    <div class="divider"></div>
                </div>
                <div class="Content">
                    <cms:CMSWebPartZone ZoneId="ContentA01" runat="server" />
                </div>
            </div>
        </header>
        <section class="Content ">
            <div class="container-fluid mb70">
                <div class="row">
                    <div class="col-lg-9 push-lg-3 col-xs-12">
                        <div class="column01">
                            <cms:CMSWebPartZone ZoneId="ContentB01" runat="server" />
                        </div>
                    </div>
                    <div class="col-lg-3 pull-lg-9 col-xs-12">
                        <div class="column02">
                            <cms:CMSWebPartZone ZoneId="ContentB02" runat="server" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </cms:CMSConditionalLayout>
    <cms:CMSConditionalLayout runat="server" ID="ConditionLayoutDetail" GroupName="PageType" VisibleForDocumentTypes="DEV.HomeDesign" ActiveInDesignMode="True">
        <header class="Service bg-light-primary-2">
            <nav class="breadcrumb">
                <div class="Content">
                    <cms:CMSWebPartZone runat="server" ZoneId="Breadcrumb" />
                </div>
            </nav>
        </header>
        <div class="HomeDesign bg-light-primary-2 ">
            <div class="Content container-fluid">
                <div class="row bottom-xs">
                    <div class="col-sm-8 ">
                        <cms:CMSWebPartZone ZoneId="ZoneImages" runat="server" />
                    </div>
                    <div class="col-sm-4 col-xs-12">
                        <cms:CMSWebPartZone ZoneId="ZoneBaseInfo" runat="server" />

                        <cms:CMSWebPartZone ZoneId="ZoneInfo" runat="server" />
                    </div>
                </div>
            </div>
        </div>
        <div class="HomeDesign bg-dark-primary-2 ">
            <div class="Content container-fluid">
                <div class="row">
                    <div class="col-sm-6 col-xs-12">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="PageHeading Content ">
                                    <cms:CMSWebPartZone ZoneId="ZoneBase" runat="server" />
                                    <div class="divider mb35"></div>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <cms:CMSWebPartZone ZoneId="ZoneDesign" runat="server" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-xs-12">
                                <cms:CMSWebPartZone ZoneId="ZoneBaseFeature" runat="server" />
                            </div>
                        </div>
                    </div>
                    <div class="col-sm-6 col-xs-12">
                        <div class="download">
                            <div class="row">
                                <div class="col-xs-12">
                                    <cms:CMSWebPartZone ZoneId="ZoneDownload" runat="server" />
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-6 col-xs-12">
                                    <cms:CMSWebPartZone ZoneId="ZoneDownload1" runat="server" />
                                </div>
                                <div class="col-sm-6 col-xs-12">
                                    <cms:CMSWebPartZone ZoneId="ZoneDownload2" runat="server" />
                                </div>
                            </div>
                        </div>
                        <div class="offer">
                            <div class="row">
                                <div class="col-xs-12">
                                    <cms:CMSWebPartZone ZoneId="ZoneOffer" runat="server" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="ZoneList">
                            <cms:CMSWebPartZone ZoneId="ZoneRelatedList" runat="server" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </cms:CMSConditionalLayout>
    <section class="FeatureZone bg-light-primary-1">
        <div class="Content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6 col-lg-4 itempaddingfix">
                        <cms:CMSWebPartZone ZoneId="ContentC01" runat="server" />
                    </div>
                    <div class="col-md-6 col-lg-4 itempaddingfix">
                        <cms:CMSWebPartZone ZoneId="ContentC02" runat="server" />
                    </div>
                    <div class="col-md-6 col-lg-4 itempaddingfix">
                        <cms:CMSWebPartZone ZoneId="ContentC03" runat="server" />
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="Content">
        <cms:CMSWebPartZone ZoneId="ContentBottom" runat="server" />
    </section>
</div>