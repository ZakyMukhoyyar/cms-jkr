<!DOCTYPE html>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<html>
    <head>
        <Title>Menu | Administration</Title>
        <script type="text/javascript">
            $(document).ready(function () {
//                var oTable = $("#dataTable").dataTable({
//                    "sAjaxSource": "${pageContext.request.contextPath}/administration/menu/search",
//                    "sServerMethod": "POST",
////                    "scrollX": true,
////                    "fnServerData": function (sSource, aoData, fnCallback) {
////                        var value = $.trim($("#searchMenuName").val());
////                        aoData.push({"name": "name", "value": value});
////                        jQuery.ajax({
////                            "dataType": 'json',
////                            "type": "POST",
////                            "url": sSource,
////                            "data": aoData,
////                            "success": fnCallback
////                        });
////                    },
////                    "aoColumns": [
////                        {"mDataProp": "name"},
////                        {"mDataProp": "description"},
////                        {"mDataProp": "url"},
////                        {"mDataProp": "enabled"},
////                        {"mDataProp": fnBlank, "bSortable": false}
////                    ],
//                    "aoColumnDefs": [
//                        {
//                            className: "text-center",
//                            "mRender": StatusFormatter,
//                            "aTargets": [3]
//                        },
//                        {
//                            class: "text-center",
//                            "mRender": function (data, type, row) {
//                                return '<a href="${pageContext.request.contextPath}/administration/menu/edit/' + row.id + '"><span class="btn btn-danger btn-sm" type="button"><i class="fa fa-pencil-square-o"></i>Lihat Mitra</span></a>';
//                            },
//                            "aTargets": [3]
//                        }
//                    ]
//                });

                $("#btn-reset").click(function () {
                    $('#searchMenuName').val("");

                    oTable.fnDraw();
                });

                $("#btn-search").click(function () {
                    oTable.fnDraw();
                });
            });
        </script>
    </head>
    <body>
        <div class="content">
            <div class="row">
                <div class="col-lg-4 ">
                    <div class="main-header">
                        <ul class="breadcrumb">
                            <li><i class="fa fa-home"></i></li>
                            <li><a href="${pageContext.request.contextPath}/administration/dashboard/">Administrator</a></li>
                            <li><a href="${pageContext.request.contextPath}/administration/dashboard/">Dashboard</a></li>
                            <li class="active"><a href="${pageContext.request.contextPath}/administration/debitur-detail/">List Mitra</a></li>
                        </ul>
                        <!--<h3> Detail Debitur </h3>-->
                    </div>
                </div>
<!--                <div class="col-lg-8 ">
                    <div class="top-content">
                        <ul class="list-inline quick-access">
                            <li>
                                <a href="${pageContext.request.contextPath}/administration/menu/create">
                                    <div class="quick-access-item bg-color-blue">
                                        <i class="fa fa-plus"></i>
                                        <h5>New Menu</h5>
                                        <em>add new Menu data</em>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>-->
            </div>
            <!-- main -->
            <div class="main-content">
                <div class="widget widget-table">
                    <div class="widget-header">
                        <h3 style="
                            color: white;
                            font-size: 20px"><i class="fa fa-table"></i> Daftar Mitra</h3>
                    </div>
                    <div class="widget-content">
                        <div class="row">
                            <div class="col-sm-6">
                                <div class="form-group">
                                    <input type="text" id="searchMenuName" class="form-control" placeholder="Search ...">
                                </div>
                            </div>
                            <div class="col-sm-9">
                                <div class="form-group">
                                    <a id="btn-search" class="btn btn-primary" type="button"><i class="fa fa-search"></i> Search</a>
                                    <a id="btn-reset" class="btn btn-default" type="button"><i class="fa fa-refresh"></i> Reset</a>
                                </div>
                            </div>
                        </div>
                        <div class="table-responsive">
                            <table id="dataTable" class="table table-striped table-hover table-bordered datatable">
                                <thead>
                                    <tr>
                                        <th style="text-align: center">MITRA/PENJAMIN</th>
                                        <th style="text-align: center">JUMLAH DEBITUR</th>
                                        <th style="text-align: center">JUMLAH KLAIM</th>
                                        <th width="5%">ACTIONS</th>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center"><img src="${pageContext.request.contextPath}/assets/img/logo-bank/bri.png" height="30px" alt="logo" /> Bank BRI</td>
                                        <td style="text-align: center">595</td>
                                        <td style="text-align: center">5.569.090.000</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center"><img src="${pageContext.request.contextPath}/assets/img/logo-bank/jatim.png" height="30px" alt="logo" /> Bank Jatim</td>
                                        <td style="text-align: center">390</td>
                                        <td style="text-align: center">5.569.090.000</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center"><img src="${pageContext.request.contextPath}/assets/img/logo-bank/bni.png" height="30px" alt="logo" /> Bank BNI</td>
                                        <td style="text-align: center">210</td>
                                        <td style="text-align: center">5.569.090.000</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center"><img src="${pageContext.request.contextPath}/assets/img/logo-bank/ntb.png" height="30px" alt="logo" /> Bank NTB</td>
                                        <td style="text-align: center">100</td>
                                        <td style="text-align: center">5.569.090.000</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center"><img src="${pageContext.request.contextPath}/assets/img/logo-bank/bri.png" height="30px" alt="logo" /> Bank BRI</td>
                                        <td style="text-align: center">400</td>
                                        <td style="text-align: center">5.569.090.000</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center"><img src="${pageContext.request.contextPath}/assets/img/logo-bank/bni.png" height="30px" alt="logo" /> Bank BNI</td>
                                        <td style="text-align: center">379</td>
                                        <td style="text-align: center">5.569.090.000</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center"><img src="${pageContext.request.contextPath}/assets/img/logo-bank/jatim.png" height="30px" alt="logo" /> Bank Jatim</td>
                                        <td style="text-align: center">200</td>
                                        <td style="text-align: center">5.569.090.000</td>
                                    </tr>
                                    <tr>
                                        <td style="text-align: center"><img src="${pageContext.request.contextPath}/assets/img/logo-bank/ntb.png" height="30px" alt="logo" /> Bank NTB</td>
                                        <td style="text-align: center">190</td>
                                        <td style="text-align: center">5.569.090.000</td>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </body>
</html>