<%-- 
    Document   : pending-proses-klaim
    Created on : Aug 14, 2018, 9:02:44 AM
    Author     : BayuHS
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>

        <script type="text/javascript">
            new Chart(document.getElementById("doughnut-chart"), {
                type: 'doughnut',
                data: {
                    labels: ["Pending proses klaim", "Keseluruhan klaim mitra"],
                    datasets: [
                        {
                            label: "Population (millions)",
                            backgroundColor: ["#3e95cd", "#8e5ea2"],
                            data: [2478, 5267]
                        }
                    ]
                },
                options: {
                    title: {
                        display: true,
                        text: 'Presentase'
                    }
                }
            });



        </script>
    </head>
    <body>
        <div>
            <h2>Status Klaim - Pending proses klaim</h2>
        </div>
        <div class="row">
            <div class="col-lg-5 ">
                <div class="main-header">
                    <ul class="breadcrumb">
                        <li><i class="fa fa-home"></i></li>
                        <li><a href="${pageContext.request.contextPath}/administration/dashboard/">Administrator</a></li>
                        <li><a href="${pageContext.request.contextPath}/administration/dashboard/">Dashboard</a></li>
                        <li class="active"><a href="${pageContext.request.contextPath}/administration/debitur-detail/">Pending Proses Klaim</a></li>
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

        <div class="row">
            <div class="col-md-4">
                <div class="col-lg-7 ">
                    <div class="top-content">
                        <ul class="list-inline quick-access">
                            <li>
                                <a>
                                    <div class="quick-access-item bg-color-blue">
                                        <i class="fa fa-clock-o"></i>
                                        <h5>Rata-rata proses bulan ini</h5>
                                        <em style="font-size: 25px;">6 hari 16 jam</em>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-lg-7 ">
                    <div class="top-content">
                        <ul class="list-inline quick-access">
                            <li>
                                <a>
                                    <div class="quick-access-item bg-color-green">
                                        <i class="fa fa-address-book-o"></i>
                                        <h5>Jumlah debitur bulan ini</h5>
                                        <em style="font-size: 25px;">620 Orang</em>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="col-lg-7 ">
                    <div class="top-content">
                        <ul class="list-inline quick-access">
                            <li>
                                <a>
                                    <div class="quick-access-item">
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
            <div class="col-md-4" style="background-color: white">
                <canvas id="doughnut-chart" width="800" height="600" ></canvas>
            </div>
            <div class="col-md-7" style="background-color: white; float: right; width: 800px; height: 600px ">
                <div class="table-responsive">
                    <div style="float: left">
                        <h2>Daftar Produk</h2>
                    </div>
                    <div style="float: right; margin-top: 20px">
                        <input style="font-style: italic" 
                               placeholder="Cari berdasarkan produk"
                               size="30"/>
                    </div>
                    <table id="dataTable" class="table table-striped table-hover table-bordered datatable">
                        <thead>
                            <tr>
                                <th>NAMA PRODUK</th>
                                <th>MITRA</th>
                                <th>JUMLAH DEBITUR</th>
                                <th>POKOK</th>
                                <th>KLAIM</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
        </div>

    </body>
</html>
