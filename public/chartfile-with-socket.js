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

var alert = '<div class="alert alert-warning alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert"><span>&times;</span></button><strong>Warning!</strong> The value you selected was out of range.</div>';

var pickedmin;
var pickedmax;

var isfirst = true;

$(document).ready(function() {
    $('#minpicker').datetimepicker();
    $('#maxpicker').datetimepicker({
        useCurrent: false //Important! See issue #1075
    });
    $("#minpicker").on("dp.change", function(e) {
        $('#maxpicker').data("DateTimePicker").minDate(e.date);
        pickedmin = e.date;
        if (!isfirst) {
            updateChart();
        }
    });
    $("#maxpicker").on("dp.change", function(e) {
        $('#minpicker').data("DateTimePicker").maxDate(e.date);
        pickedmax = e.date;
        if (!isfirst) {
            updateChart();
        }
    });
    $("#minpicker").on("dp.error", function(e) {
        $("#alerter").append(alert);
    });
    $("#maxpicker").on("dp.error", function(e) {
        $("#alerter").append(alert);
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
                backgroundColor: '#1375d0',
                borderColor: '#1375d0'
            }]
        },
        options: {
            scales: {
                xAxes: [{
                    type: "time",
                    time: {
                        format: 'MM/DD/YYYY hh:mm a',
                        tooltipFormat: 'll hh:mm a'
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
            console.log(data);
            data = JSON.parse(data);
            updateData(data, updateChart);
        });

        socket.on('update', function(msg) {
            console.log('an update happened');
        });
    });

    function updateData(msg, callback) {
        msg.forEach(function(element) {
            //console.log("--->" + element + "<----");

            if (element && element.name === 'distance') {
                chartData.laser.times.push(moment(element.published_at));
                chartData.laser.data.push(element.data);
            }
            if (element && element.name === 'batteryLevel') {
                chartData.batt.times.push(moment(element.published_at));
                chartData.batt.data.push(element.data);
            }
            if (element && element.name === 'Temperature') {
                chartData.temp.times.push(moment(element.published_at));
                chartData.temp.data.push(element.data);
            }
            if (element && element.name === 'rotary') {
                chartData.rotary.times.push(moment(element.published_at));
                chartData.rotary.data.push(element.data);
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
            myChart.data.datasets[0].backgroundColor = '#4A5CA5';
            myChart.data.datasets[0].borderColor = '#4A5CA5';
        }
        if (chartType === 'batt') {
            chartData.current = chartData.batt;
            labelsToUse = ['battery level', 'volts'];
            myChart.data.datasets[0].backgroundColor = '#F3A712';
            myChart.data.datasets[0].borderColor = '#F3A712';
        }
        if (chartType === 'temp') {
            chartData.current = chartData.temp;
            labelsToUse = ['tempurature', 'degrees F'];
            myChart.data.datasets[0].backgroundColor = '#E4572E';
            myChart.data.datasets[0].borderColor = '#E4572E';
        }
        if (chartType === 'rotary') {
            chartData.current = chartData.rotary;
            labelsToUse = ['rotary sensor', 'angle in degrees'];
            myChart.data.datasets[0].backgroundColor = '#4A5CA5';
            myChart.data.datasets[0].borderColor = '#4A5CA5';
        }

        if (isfirst) {
            $('#minpicker').data("DateTimePicker").date(moment.min(chartData.current.times));
            $('#maxpicker').data("DateTimePicker").date(moment.max(chartData.current.times));
            $("#chartholder").removeClass("loading");
            isfirst = false;
        }

        $('#minpicker').data("DateTimePicker").minDate(moment.min(chartData.current.times).subtract(1, 'minutes'));
        $('#maxpicker').data("DateTimePicker").maxDate(moment.max(chartData.current.times));

        myChart.options.scales.xAxes[0].time.min = pickedmin;
        myChart.options.scales.xAxes[0].time.max = pickedmax;

        myChart.data.labels = chartData.current.times;
        myChart.data.datasets[0].data = chartData.current.data;
        myChart.data.datasets[0].label = labelsToUse[0];
        myChart.options.scales.yAxes[0].scaleLabel.labelString = labelsToUse[1];
        myChart.update();
    }
});