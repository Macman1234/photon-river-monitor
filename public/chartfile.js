var labelsToUse = [];
var colorToUse = "";

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

var alert = '<div class="alert alert-warning alert-dismissible fade in" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button><strong>Warning!</strong> The value you selected was out of range.</div>';

var isfirst = true;

$(document).ready(function() {
    $.getJSON("data", function(data) {
        updateData(data[0], updateChart);
    });

    updateBar();
    $("#laser").on('click', function() {
        chartType = 'laser';
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

    var chart = Highcharts.stockChart('chart', {

        rangeSelector: {
            selected: 1
        },

        title: {
            text: ''
        },

        series: [{
            //gapSize: 4,
            name: '',
            data: 0,
            tooltip: {
                valueDecimals: 2
            }
        }]
    });

    var blankDataFormat = {
        laser: [],
        temp: [],
        batt: []
    };
    var chartData = blankDataFormat;

    function updateData(msg, callback) {
        msg.forEach(function(element) {
            if (element && element.name === 'distance') {
                if (element.data > 10 && element.data < 110) {
                    chartData.laser.push([new Date(element.published_at), 101 - element.data]);
                }
            }
            if (element && element.name === 'batteryLevel') {
                chartData.batt.push([new Date(element.published_at), element.data - 0]);
            }
            if (element && element.name === 'Temperature') {
                if (element.data > 10 && element.data < 100) {
                    chartData.temp.push([new Date(element.published_at), element.data - 0]);
                }
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
            labelsToUse = ['distance', 'inches from bottom of sensor'];
            colorToUse = '#4A5CA5';
        }
        if (chartType === 'batt') {
            chartData.current = chartData.batt;
            labelsToUse = ['battery level', 'volts'];
            colorToUse = '#F3A712';
        }
        if (chartType === 'temp') {
            chartData.current = chartData.temp;
            labelsToUse = ['temperature', 'degrees F'];
            colorToUse = '#E4572E';
        }

        if (isfirst) {
            $("#loading").remove();
            //var maxtimestamp = chartData.current[chartData.current.length - 1][0].getTime();
            //var weekagotimestamp = chartData.current[chartData.current.length - 1][0].getTime() - 604800000;
            isfirst = false;
        }
        var linesToPlot = [];
        //console.log(chart.closestPointRange);
        for (var i = 0; i < chartData.current.length - 1; i++) {
            //console.log(chartData.current[i + 1][0] - chartData.current[i][0]);
            if (chartData.current[i + 1][0] - chartData.current[i][0] > 86400000) {
                console.log("gap at  " + chartData.current[i][0]);
                linesToPlot.push({
                    value: chartData.current[i][0],
                    width: 1,
                    color: 'black',
                    dashStyle: 'dash',
                    label: {
                        text: 'gap'
                    }
                });
            }
        }


        chart.update({
            title: {
                text: labelsToUse[0]
            },
            series: [{
                name: labelsToUse[0],
                data: chartData.current,
                color: colorToUse
            }],
            xAxis: {
                plotLines: linesToPlot
            }

        });
    }
});