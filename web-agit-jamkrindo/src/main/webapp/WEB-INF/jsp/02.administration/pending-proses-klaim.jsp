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
            <div class="col-md-4">
                <canvas id="doughnut-chart" width="800" height="600"></canvas>
            </div>
        </div>
    </body>
</html>
