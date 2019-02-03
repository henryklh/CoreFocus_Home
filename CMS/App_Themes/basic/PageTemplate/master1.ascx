<link href="/app_themes/basic/color/orange.css" rel="stylesheet" />
<script src="/app_themes/basic/corescript.min.js"></script>
<script src="/app_themes/basic/init.js" defer></script>
<div class="Wrapper">
    <header class="Header">
        <div class="Top">
            <cms:CMSWebPartZone ZoneId="Header01" runat="server" />
        </div>
        <div class="Bottom">
            <cms:CMSWebPartZone ZoneId="Header02" runat="server" />
        </div>
        <section class="Navigation hidden-sm hidden-xs">
            <cms:CMSWebPartZone ZoneId="Navigation01" runat="server" />
        </section>
    </header>
    <cms:CMSWebPartZone ZoneId="zoneContent" runat="server" />
    <footer class="Footer">
        <div class="FootPanel">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-4">
                        <cms:CMSWebPartZone ZoneId="Footer01" runat="server" />
                    </div>
                    <div class="col-md-4">
                        <cms:CMSWebPartZone ZoneId="Footer02" runat="server" />
                    </div>
                    <div class="col-md-4">
                        <cms:CMSWebPartZone ZoneId="Footer03" runat="server" />
                    </div>
                </div>
            </div>
        </div>
        <div class="Copyright">
            <cms:CMSWebPartZone ZoneId="Copyright" runat="server" />
        </div>
    </footer>
</div>
<cms:CMSWebPartZone ZoneId="JavaScript" runat="server" />