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

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function formatDate(d) {
    var yy = d.getFullYear(),
        MM = d.getMonth(),
        dd = d.getDate(),
        mm = d.getMinutes(),
        hh = d.getHours();
    if (hh > 11) {
        m = "PM";
    } else {
        m = "AM";
    }
    if (hh > 13 && hh) {
        hh = hh - 12;
    }
    if (hh < 1) {
        hh = 12;
    }
    mm = pad(mm, 2);
    hh = pad(hh, 2);
    return hh + ":" + mm + " " + m + " " + MM + "/" + dd + "/" + yy;
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

    var g = new Dygraph(
        document.getElementById("div_g"), [
            [0, 0]
        ], {
            //labels: ['test', 'test'],
            drawPoints: true,
            legend: 'always',
            showRangeSelector: true,
            //title: '',
            color: '#F3A712',
            labelsDiv: document.getElementById('legend'),
            strokeWidth: 1.5,
            rollPeriod: 5,
            axes: {
                x: {
                    valueFormatter: function(ms) {
                        return formatDate(new Date(ms));
                    },
                }

            }
        }
    );

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
            var maxtimestamp = chartData.current[chartData.current.length - 1][0].getTime();
            var weekagotimestamp = chartData.current[chartData.current.length - 1][0].getTime() - 604800000;
            g.updateOptions({
                'file': chartData.current,
                'color': colorToUse,
                'labels': labelsToUse,
                'dateWindow': [weekagotimestamp, maxtimestamp]
            });
            isfirst = false;
        }

        g.updateOptions({
            'file': chartData.current,
            'color': colorToUse,
            'labels': labelsToUse
        });

    }
});