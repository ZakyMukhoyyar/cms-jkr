<!DOCTYPE HTML>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
    <head>
        <script type="text/javascript">
            new Chart(document.getElementById("bar-chart-grouped"), {
                type: 'bar',
                data: {
                    labels: ["Januari", "Februari", "Maret", "April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"],
                    datasets: [
                        {
                            label: "Jumlah Pengajuan",
                            backgroundColor: "#5FC7A9",
                            data: [133, 221, 783, 342, 321, 341, 342, 341, 445, 654, 312, 543]
                        }, {
                            label: "Pengajuan disetujui",
                            backgroundColor: "#74ABC4",
                            data: [408, 547, 675, 734, 456, 232, 432, 124, 543, 433, 54, 54]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Jumlah Pengajuan vs Pengajuan disetujui'
                    }
                }
            });


        </script>
    </head>
    <body>
        <div class="row">
            <div class="col-md-9">
                <canvas id="bar-chart-grouped" width="800" height="450"></canvas>
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