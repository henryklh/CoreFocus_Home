<section class="topblank">
    <cms:CMSWebPartZone runat="server" ZoneId="TopBlank" />
</section>
<div class="PageContainer ContentPage">
    <header class=" mb35">
        <nav class="breadcrumb">
            <div class="Content">
                <cms:CMSWebPartZone runat="server" ZoneId="Breadcrumb" />
            </div>
        </nav>
        <div class="PageHeadingWrapper bg-light-primary-2 mb35">
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

        <cms:CMSConditionalLayout runat="server" ID="ListLayout" GroupName="Product" Visible='<%# CurrentPageInfo.IsProductSection() %>'>
            <div class="ProductListSection">
                <cms:CMSWebPartZone ZoneId="ContentB01" runat="server" />
            </div>
        </cms:CMSConditionalLayout>

        <cms:CMSConditionalLayout runat="server" ID="DetailLayout" GroupName="Product">
            <div class="ProductSection">
                <div class="PageBody">
                    <div class="container" itemscope itemtype="http://schema.org/Product">

                        <cms:CMSWebPartZone ZoneId="ZoneF" runat="server" />

                        <div class="row">
                            <div class="ColumnRight col-sm-6">
                                <cms:CMSWebPartZone ZoneId="ZoneG" runat="server" />
                            </div>
                            <div class="col-sm-6">
                                <cms:CMSWebPartZone ZoneId="ZoneH" runat="server" />
                            </div>
                            <div class="clearfix visible-sm"></div>
                            <div class="ColumnRight col-md-6">
                                <cms:CMSWebPartZone ZoneId="ZoneI" runat="server" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="PageBody">
                <div class="container">
                    <div class="ProductInformation">

                        <nav class="navbar navbar-default visible-xs">
                            <div class="container-fluid">
                                <!-- Brand and toggle get grouped for better mobile display -->
                                <div class="navbar-header">
                                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                        <span class="sr-only">Toggle navigation</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                    <div class="navbar-brand">Product Information</div>
                                </div>

                                <!-- Collect the nav links, forms, and other content for toggling -->
                                <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                                    <ul class="nav navbar-nav">
                                        <li role="presentation" class="active"><a href="#Overview" aria-controls="Overview" role="tab" data-toggle="tab">Overview</a></li>
                                        <li role="presentation"><a href="#Detail" aria-controls="Detail" role="tab" data-toggle="tab">Detail &amp; Measurements</a></li>
                                        <li role="presentation"><a href="#Assembly" aria-controls="Assembly" role="tab" data-toggle="tab">Assembly</a></li>
                                        <li role="presentation"><a href="#Care" aria-controls="Care" role="tab" data-toggle="tab">Care</a></li>
                                        <li role="presentation"><a href="#Delivery" aria-controls="Delivery" role="tab" data-toggle="tab">Delivery Information</a></li>
                                    </ul>
                                </div>
                                <!-- /.navbar-collapse -->
                            </div>
                            <!-- /.container-fluid -->
                        </nav>
                        <!-- Nav tabs -->
                        <ul role="tablist" class="nav nav-tabs hidden-xs">
                            <li role="presentation" class="active"><a href="#Overview" aria-controls="Overview" role="tab" data-toggle="tab">Overview</a></li>
                            <li role="presentation"><a href="#Detail" aria-controls="Detail" role="tab" data-toggle="tab">Detail &amp; Measurements</a></li>
                            <li role="presentation"><a href="#Assembly" aria-controls="Assembly" role="tab" data-toggle="tab">Assembly</a></li>
                            <li role="presentation"><a href="#Care" aria-controls="Care" role="tab" data-toggle="tab">Care</a></li>
                            <li role="presentation"><a href="#Delivery" aria-controls="Delivery" role="tab" data-toggle="tab">Delivery Information</a></li>
                        </ul>
                        <!-- Tab panes -->
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane fade in active" id="Overview">
                                <cms:CMSWebPartZone ZoneId="ZoneJ" runat="server" />
                                <div class="row">
                                    <div class="col-sm-6">
                                        <cms:CMSWebPartZone ZoneId="ZoneK" runat="server" />
                                    </div>
                                    <div class="col-sm-6">
                                        <cms:CMSWebPartZone ZoneId="ZoneL" runat="server" />
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="Detail">
                                <cms:CMSWebPartZone ZoneId="ZoneM" runat="server" />
                                <div class="row">
                                    <div class="col-sm-6">
                                        <cms:CMSWebPartZone ZoneId="ZoneN" runat="server" />
                                    </div>
                                    <div class="col-sm-6">
                                        <cms:CMSWebPartZone ZoneId="ZoneO" runat="server" />
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="Assembly">
                                <cms:CMSWebPartZone ZoneId="ZoneP" runat="server" />
                                <div class="row">
                                    <div class="col-sm-6">
                                        <cms:CMSWebPartZone ZoneId="ZoneQ" runat="server" />
                                    </div>
                                    <div class="col-sm-6">
                                        <cms:CMSWebPartZone ZoneId="ZoneR" runat="server" />
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="Care">
                                <cms:CMSWebPartZone ZoneId="ZoneS" runat="server" />
                                <div class="row">
                                    <div class="col-sm-6">
                                        <cms:CMSWebPartZone ZoneId="ZoneT" runat="server" />
                                    </div>
                                    <div class="col-sm-6">
                                        <cms:CMSWebPartZone ZoneId="ZoneU" runat="server" />
                                    </div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane fade" id="Delivery">
                                <cms:CMSWebPartZone ZoneId="ZoneV" runat="server" />
                                <div class="row">
                                    <div class="col-sm-6">
                                        <cms:CMSWebPartZone ZoneId="ZoneW" runat="server" />
                                    </div>
                                    <div class="col-sm-6">
                                        <cms:CMSWebPartZone ZoneId="ZoneX" runat="server" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </cms:CMSConditionalLayout>
    </section>
    <section class="FeatureZone bg-light-primary-1">
        <div class="container-fluid Content">
            <div class="row">
                <div class="col-sm-6 col-md-4 itempaddingfix">
                    <cms:CMSWebPartZone ZoneId="ContentC01" runat="server" />
                </div>
                <div class="col-sm-6 col-md-4 itempaddingfix">
                    <cms:CMSWebPartZone ZoneId="ContentC02" runat="server" />
                </div>
                <div class="col-sm-6 col-md-4 itempaddingfix">
                    <cms:CMSWebPartZone ZoneId="ContentC03" runat="server" />
                </div>
            </div>
        </div>
    </section>
    <section class="Content">
        <cms:CMSWebPartZone ZoneId="ContentBottom" runat="server" />
    </section>
</div>
