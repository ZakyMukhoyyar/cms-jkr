<!DOCTYPE HTML>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
    <head>
        <style>
            .col-md-6
            {
                position: relative;
                min-height: 1px;
                padding-left: 0px;
                padding-right: 15px;
            }
        </style>
        <script type="text/javascript">
            $(document).ready(function () {
                var oTable = $("#dataTable").dataTable({
                    "sAjaxSource": "${pageContext.request.contextPath}/administration/dashboard/debitur-detail",
                    //                    "sServerMethod": "POST",
                    ////                    "scrollX": true,
                    //                    "fnServerData": function (sSource, aoData, fnCallback) {
                    //                        var value = $.trim($("#searchMenuName").val());
                    //                        aoData.push({"name": "name", "value": value});
                    //                        jQuery.ajax({
                    //                            "dataType": 'json',
                    //                            "type": "POST",
                    //                            "url": sSource,
                    //                            "data": aoData,
                    //                            "success": fnCallback
                    //                        });
                    //                    },
                    //                    "aoColumns": [
                    //                        {"mDataProp": "name"},
                    //                        {"mDataProp": "description"},
                    //                        {"mDataProp": "url"},
                    //                        {"mDataProp": "enabled"},
                    //                        {"mDataProp": fnBlank, "bSortable": false}
                    //                    ],
                    //                    "aoColumnDefs": [
                    //                        {
                    //                            className: "text-center",
                    //                            "mRender": StatusFormatter,
                    //                            "aTargets": [3]
                    //                        },
                    //                        {
                    //                            class: "text-center",
                    //                            "mRender": function (data, type, row) {
                    //                                return '<a href="${pageContext.request.contextPath}/administration/menu/edit/' + row.id + '"><span class="btn btn-danger btn-sm" type="button"><i class="fa fa-pencil-square-o"></i>Edit</span></a>';
                    //                            },
                    //                            "aTargets": [4]
                    //                        }
                    //                    ]
                });

                $("#btn-reset").click(function () {
                    $('#searchMenuName').val("");

                    oTable.fnDraw();
                });

                $("#btn-search").click(function () {
                    oTable.fnDraw();
                });
            });

            new Chart(document.getElementById("bar-chart-grouped"), {
                type: 'bar',
                data: {
                    labels: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
                    datasets: [
                        {
                            label: "Jumlah Pengajuan",
                            backgroundColor: "#49BE8B",
                            data: [203, 221, 783, 342, 321, 341, 342, 341, 445, 654, 312, 543]
                        }, {
                            label: "Pengajuan disetujui",
                            backgroundColor: "#59A7E1",
                            data: [408, 547, 675, 734, 456, 202, 432, 124, 543, 433, 54, 54]
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
        <div>
            <h2>Dashboard Klaim Mitra</h2>
        </div>
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
                                    <div class="quick-access-item bg-color-blue" style="width: 250px;height: 100px;">
                                        <i class="fa fa-clock-o"></i>
                                        <h5>Rata-rata proses bulan ini</h5>
                                        <em style="font-size: 25px;">6 hari 16 jam</em>
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
                                    <div class="quick-access-item bg-color-green" style="width: 250px;height: 100px;">
                                        <i class="fa fa-address-book-o"></i>
                                        <h5>Jumlah debitur bulan ini</h5>
                                        <em style="font-size: 25px;">620 Orang</em>
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
                                    <div class="quick-access-item" style="width: 250px;height: 100px;">
                                        <i class="fa fa-money"></i>
                                        <h5>Total pengajuan bulan ini</h5>
                                        <em style="font-size: 25px;">12.760.000.000</em>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9">
                <div class="widget-header">
                    <h3><i class="fa fa-tasks"></i> Status Klaim - Update per Juli 2018 Pukul 20.30 WIB</h3>
                </div>
                <ul class="task-list">
                    <div class="col-md-6">
                        <li>
                            <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/icon-status-klaim/ic_klaim dalam proses.png" height="50px" alt="logo" /></i>
                            <p>Klaim dalam proses <span class="label label-danger">120 klaim dari 900 klaim</span></p>
                            <div class="progress progress-xs">
                                <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="200" style="width:20%">
                                    <span class="sr-only">20% Complete</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/icon-status-klaim/ic_klaim register.png" height="50px" alt="logo" /></i>
                            <p>Klaim register <span class="label label-danger">120 klaim dari 900 klaim</span></p>
                            <div class="progress progress-xs">
                                <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="200" style="width:20%">
                                    <span class="sr-only">20% Complete</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/icon-status-klaim/ic_klaim dibayar.png" height="50px" alt="logo" /></i>
                            <p>Klaim dibayar <span class="label label-danger">120 klaim dari 900 klaim</span></p>
                            <div class="progress progress-xs">
                                <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="200" style="width:20%">
                                    <span class="sr-only">20% Complete</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/icon-status-klaim/ic_pending bayar klaim.png" height="50px" alt="logo" /></i>
                            <p>Pending bayar klaim <span class="label label-danger">120 klaim dari 900 klaim</span></p>
                            <div class="progress progress-xs">
                                <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="200" style="width:20%">
                                    <span class="sr-only">20% Complete</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/icon-status-klaim/ic_lain lain.png" height="50px" alt="logo" /></i>
                            <p>Lain lain <span class="label label-danger">120 klaim dari 900 klaim</span></p>
                            <div class="progress progress-xs">
                                <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="200" style="width:20%">
                                    <span class="sr-only">20% Complete</span>
                                </div>
                            </div>
                        </li>
                    </div>
                    <div class="col-md-6">
                        <li>
                            <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/icon-status-klaim/ic_pending proses klaim.png" height="50px" alt="logo" /></i>
                            <p><a href="${pageContext.request.contextPath}/administration/dashboard/pending-proses-klaim/">Pending proses klaim <span class="label label-danger">120 klaim dari 900 klaim</span></a></p>
                            <div class="progress progress-xs">
                                <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="200" style="width:20%">
                                    <span class="sr-only">20% Complete</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/icon-status-klaim/ic_hutang klaim.png" height="50px" alt="logo" /></i>
                            <p>Hutang klaim <span class="label label-danger">120 klaim dari 900 klaim</span></p>
                            <div class="progress progress-xs">
                                <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="200" style="width:20%">
                                    <span class="sr-only">20% Complete</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/icon-status-klaim/ic_selisih bayar.png" height="50px" alt="logo" /></i>
                            <p>Selisih bayar & banding klaim <span class="label label-danger">120 klaim dari 900 klaim</span></p>
                            <div class="progress progress-xs">
                                <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="200" style="width:20%">
                                    <span class="sr-only">20% Complete</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/icon-status-klaim/ic_klaim ditolak.png" height="50px" alt="logo" /></i>
                            <p>Klaim ditolak <span class="label label-danger">120 klaim dari 900 klaim</span></p>
                            <div class="progress progress-xs">
                                <div class="progress-bar" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="200" style="width:20%">
                                    <span class="sr-only">20% Complete</span>
                                </div>
                            </div>
                        </li>
                    </div>
                </ul>
            </div>
            <hr class="separator">
            <div class="col-md-3">
                <div class="widget-header">
                    <div class="col-md-9">
                        <div class="widget-header">
                            <h3><i class="fa fa-tasks"></i> Top 5 Mitra</h3>
                        </div>
                        <ul class="task-list">
                            <div class="tab-pane activity" id="activity-tab">
                                <ul class="list-unstyled activity-list">
                                    <li>
                                        <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/logo-bank/bri.png" height="30px" alt="logo" /></i>
                                        <p>
                                            <a>Bank BRI</a><a> 3.089.000.000</a><span class="timestamp">32 Debitur</span>
                                        </p>
                                    </li>
                                </ul>
                                <ul class="list-unstyled activity-list">
                                    <li>
                                        <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/logo-bank/bni.png" height="30px" alt="logo" /></i>
                                        <p>
                                            <a>Bank BNI</a><a> 3.089.000.000</a><span class="timestamp">32 Debitur</span>
                                        </p>
                                    </li>
                                </ul>
                                <ul class="list-unstyled activity-list">
                                    <li>
                                        <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/logo-bank/bca.png" height="30px" alt="logo" /></i>
                                        <p>
                                            <a>Bank BCA</a><a> 3.089.000.000</a><span class="timestamp">32 Debitur</span>
                                        </p>
                                    </li>
                                </ul>
                                <ul class="list-unstyled activity-list">
                                    <li>
                                        <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/logo-bank/ntb.png" height="30px" alt="logo" /></i>
                                        <p>
                                            <a>Bank NTB</a><a> 3.089.000.000</a><span class="timestamp">32 Debitur</span>
                                        </p>
                                    </li>
                                </ul>
                                <ul class="list-unstyled activity-list">
                                    <li>
                                        <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/logo-bank/jatim.png" height="30px" alt="logo" /></i>
                                        <p>
                                            <a>Bank Jatim</a><a> 3.089.000.000</a><span class="timestamp">32 Debitur</span>
                                        </p>
                                    </li>
                                </ul>
                        </ul>
                        <p class="text-center more"><a href="${pageContext.request.contextPath}/administration/dashboard/list-mitra/" class="btn btn-custom-primary">Lihat semua mitra</a></p>
                    </div>
                </div>
            </div>
        </div>
        <hr class="separator">
        <div class="row">
            <div class="col-md-9">
            </div>
            <div class="col-md-3">
                <div class="widget-header">
                    <div class="col-md-9">
                        <div class="widget-header">
                            <h3><i class="fa fa-tasks"></i> Top 5 Debitur</h3>
                        </div>
                        <ul class="task-list">
                            <div class="tab-pane activity" id="activity-tab">
                                <ul class="list-unstyled activity-list">
                                    <li>
                                        <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/logo-bank/bri.png" height="30px" alt="logo" /></i>
                                        <p>
                                            <a>Budi Karyudi</a><a> 3.089.000.000</a>
                                        </p>
                                    </li>
                                </ul>
                                <ul class="list-unstyled activity-list">
                                    <li>
                                        <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/logo-bank/bni.png" height="30px" alt="logo" /></i>
                                        <p>
                                            <a>Bank BNI</a><a> 3.089.000.000</a>
                                        </p>
                                    </li>
                                </ul>
                                <ul class="list-unstyled activity-list">
                                    <li>
                                        <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/logo-bank/bca.png" height="30px" alt="logo" /></i>
                                        <p>
                                            <a>Ivan Gunawan</a><a> 3.089.000.000</a>
                                        </p>
                                    </li>
                                </ul>
                                <ul class="list-unstyled activity-list">
                                    <li>
                                        <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/logo-bank/ntb.png" height="30px" alt="logo" /></i>
                                        <p>
                                            <a>Zakky M</a><a> 3.089.000.000</a>
                                        </p>
                                    </li>
                                </ul>
                                <ul class="list-unstyled activity-list">
                                    <li>
                                        <i class="pull-left"> <img src="${pageContext.request.contextPath}/assets/img/logo-bank/jatim.png" height="30px" alt="logo" /></i>
                                        <p>
                                            <a>Ridwan Sholeh</a><a> 3.089.000.000</a>
                                        </p>
                                    </li>
                                </ul>
                        </ul>
                        <p class="text-center more"><a href="${pageContext.request.contextPath}/administration/dashboard/debitur-detail/" class="btn btn-custom-primary">Lihat semua debitur</a></p>
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
