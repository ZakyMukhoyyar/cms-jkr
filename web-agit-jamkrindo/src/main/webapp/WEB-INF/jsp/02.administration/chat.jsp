<!DOCTYPE HTML>
<html>
    <head>  
        <script type="text/javascript">
            window.onload = function () {
                var chart = new CanvasJS.Chart("chartContainer",
                        {
                            title: {
                                text: "A Multi-series Column Chart"

                            },
                            data: [{
                                    type: "column",
                                    dataPoints: [
                                        {x: 10, y: 171},
                                        {x: 20, y: 155},
                                        {x: 30, y: 150},
                                        {x: 40, y: 165},
                                        {x: 50, y: 195},
                                        {x: 60, y: 168},
                                        {x: 70, y: 128},
                                        {x: 80, y: 134},
                                        {x: 90, y: 114}
                                    ]
                                },
                                {
                                    type: "column",
                                    dataPoints: [
                                        {x: 10, y: 71},
                                        {x: 20, y: 55},
                                        {x: 30, y: 50},
                                        {x: 40, y: 65},
                                        {x: 50, y: 95},
                                        {x: 60, y: 68},
                                        {x: 70, y: 28},
                                        {x: 80, y: 34},
                                        {x: 90, y: 14}
                                    ]
                                }
                            ]
                        });

                chart.render();
            }
        </script>
    </head>
    <body>
        <div class="row">
            <div class="col-md-9">
                <div id="chartContainer" style="height: 300px; width: 100%;">
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
            </div>
        </div>
    </body>
</html>