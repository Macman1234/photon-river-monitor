var timeFormat = 'Do YYYY, h:mm:ss a';
var labelsToUse = [];

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
var chartType = getParameterByName('type');

var color = Chart.helpers.color;

var currentmin;
var currentmax;

$(document).ready(function() {
    $(function() {
        $('#datetimepicker1').datetimepicker();
    });

    updateBar();
    $("#laser").on('click', function() {
        chartType = 'laser';
        updateChart();
    });
    $("#rotary").on('click', function() {
        chartType = 'rotary';
        updateChart();
    });
    $("#temp").on('click', function() {
        chartType = 'temp';
        updateChart();
    });
    $("#batt").on('click', function() {
        chartType = 'batt';
        updateChart();
    });
    $("#multi").on('click', function() {
        chartType = 'multi';
        updateChart();
    });
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: [0],
            datasets: [{
                fill: false,
                label: "",
                data: [0],
                backgroundColor: '#ff6384',
                borderColor: '#ff6384'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: "time",
                    time: {
                        format: timeFormat,
                        tooltipFormat: 'll HH:mm'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }, ],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: ""
                    }
                }]
            },
        }
    });

    var chartData = {
        laser: {
            data: [],
            times: []
        },
        rotary: {
            data: [],
            times: []
        },
        temp: {
            data: [],
            times: []
        },
        batt: {
            data: [],
            times: []
        }
    };

    var socket = io.connect();
    socket.on('connect', function() {
        socket.on('begin', function(data) {
            updateData(data, updateChart);
        });

        socket.on('update', function(msg) {
            console.log('an update happened');
        });
    });

    function updateData(msg, callback) {
        msg.pop();
        msg.forEach(function(element) {
            //console.log("--->" + element + "<----");
            var vj = null; //vj for "valid json"
            try {
                vj = JSON.parse(element);
            } catch (err) {

            }

            if (vj && vj.name === 'distance') {
                chartData.laser.times.push(moment(vj.published_at));
                chartData.laser.data.push(vj.data);
            }
            if (vj && vj.name === 'batteryLevel') {
                chartData.batt.times.push(moment(vj.published_at));
                chartData.batt.data.push(vj.data);
            }
            if (vj && vj.name === 'Temperature') {
                chartData.temp.times.push(moment(vj.published_at));
                chartData.temp.data.push(vj.data);
            }
            if (vj && vj.name === 'rotary') {
                chartData.rotary.times.push(moment(vj.published_at));
                chartData.rotary.data.push(vj.data);
            }
        });
        callback();
    }

    function updateBar() {
        $('.selector').each(function(index) {
            if ($(this).hasClass('active') && $(this).children().attr('id') !== chartType) {
                $(this).removeClass('active');
            } else if (!$(this).hasClass('active') && $(this).children().attr('id') === chartType) {
                $(this).addClass('active');
            }
        });
    }

    function updateChart() {
        updateBar();
        if (chartType === 'laser') {
            chartData.current = chartData.laser;
            labelsToUse = ['distance', 'inches from top of sensor'];
        }
        if (chartType === 'batt') {
            chartData.current = chartData.batt;
            labelsToUse = ['battery level', 'volts'];
        }
        if (chartType === 'temp') {
            chartData.current = chartData.temp;
            labelsToUse = ['tempurature', 'degrees F'];
        }
        if (chartType === 'rotary') {
            chartData.current = chartData.rotary;
            labelsToUse = ['rotary sensor', 'angle in degrees'];
        }
        currentminallowed = moment.min(chartData.current.times);
        currentmaxallowed = moment.max(chartData.current.times);


        myChart.data.labels = chartData.current.times;
        myChart.data.datasets[0].data = chartData.current.data;
        myChart.data.datasets[0].label = labelsToUse[0];
        myChart.options.scales.yAxes[0].scaleLabel.labelString = labelsToUse[1];
        myChart.update();
        $("#loading").remove();
    }
});