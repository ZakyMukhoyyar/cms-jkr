<!DOCTYPE HTML>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
    <head>  
    </head>
    <body>
        <div class="row">
            <div class="col-md-9">
                <div class="widget">
                    <div class="widget-header">
                        <h3>
                            <i class="fa fa-bar-chart-o"></i> Jumlah pengajuan vs pengajuan disetujui
                        </h3>
                    </div>
                    <div class="widget-content">
                        <div class="demo-flot-chart" id="demo-vertical-bar-chart"
                             data-ctype="#year"></div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="col-lg-7 ">
                    <div class="top-content">
                        <ul class="list-inline quick-access">
                            <li>
                                <a>
                                    <div class="quick-access-item bg-color-blue">
                                        <i class="fa fa-plus"></i>
                                        <h5>Rata-rata proses bulan ini</h5>
                                        <em>6 hari 16 jam</em>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-7 ">
                    <div class="top-content">
                        <ul class="list-inline quick-access">
                            <li>
                                <a>
                                    <div class="quick-access-item bg-color-green">
                                        <i class="fa fa-plus"></i>
                                        <h5>Jumlah debitur bulan ini</h5>
                                        <em>6 hari 16 jam</em>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-lg-7 ">
                    <div class="top-content">
                        <ul class="list-inline quick-access">
                            <li>
                                <a>
                                    <div class="quick-access-item">
                                        <i class="fa fa-plus"></i>
                                        <h5>Total pengajuan bulan ini</h5>
                                        <em>6 hari 16 jam</em>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <script src="${pageContext.request.contextPath}/assets/js/jquery/jquery-2.1.0.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/plugins/modernizr/modernizr.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/plugins/bootstrap-tour/bootstrap-tour.custom.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/king-common.js"></script>
        <script src="${pageContext.request.contextPath}/assets/demo-style-switcher/assets/js/deliswitch.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/plugins/stat/flot/jquery.flot.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/plugins/stat/flot/jquery.flot.resize.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/plugins/stat/flot/jquery.flot.time.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/plugins/stat/flot/jquery.flot.pie.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/plugins/stat/flot/jquery.flot.orderBars.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/plugins/stat/flot/jquery.flot.tooltip.min.js"></script>
        <script src="${pageContext.request.contextPath}/assets/js/king-chart-stat.js"></script>
    </body>
</html>