const GRAPH_EXACT = 1;
const GRAPH_W0 = 2;
const GRAPH_W0_LO = 3;
const GRAPH_W0_HI = 4;
const GRAPH_W0_PEAK = 3;

const TMIN = -1; // Must be int
const TMAX = 5; // Must be int
const DT = 0.01;
const PPI = Math.round(1 / DT); // Points per interval of 1
const NUMPTS = (TMAX - TMIN) * PPI + 1;

var CI; // holds all pertinent information.

//Function name can only have letters, numbers and individual spaces.
var funcs = [
    new FuncObj('Unit Step', '&gamma;(t)', [],
        function (t) {
            return ((t >= 0) * 1.0);
        }),
    new FuncObj('1 Sec Pulse, 2 high', '2&middot;(&gamma;(t)-&gamma;(t-1))', [],
        function (t) {
            return (2.0 * ((t >= 0) - (t >= 1)));
        }),
    new FuncObj('2.5 Sec Pulse', '0.4 (&gamma;(t)-&gamma;(t-2.5))', [],
        function (t) {
            return (0.4 * ((t >= 0) - (t >= 2.5)));
        }),
    new FuncObj('2 Sec Pulse', '&gamma;(t)-&gamma;(t-2)', [],
        function (t) {
            return ((t >= 0) - (t >= 2));
        }),
    new FuncObj('Narrow Pulse', '4 (&gamma;(t)-&gamma;(t-0.25))', [],
        function (t) {
            return (4 * ((t >= 0) - (t >= .25)));
        }),
    new FuncObj('Exp', 'e<sup>-t</sup>', [],
        function (t) {
            return ((t >= 0) * Math.exp(-t));
        }),
    new FuncObj('Fast Exp', '3&middot;e<sup>-3t</sup>', [],
        function (t) {
            return ((t >= 0) * 3 * Math.exp(-3 * t));
        }),
    new FuncObj('Very Fast Exp', '10&middot;e<sup>-10t</sup>)', [],
        function (t) {
            return ((t >= 0) * 10 * Math.exp(-10 * t));
        }),
    new FuncObj('BiPhasic', '0.5 (&gamma;(t)-2&middot;&gamma;(t-1)+&gamma;(t-1)', [],
        function (t) {
            return (0.5 * ((t >= 0) - 2 * (t >= 1) + (t >= 2)));
        }),
    new FuncObj('Ramp', 't(&gamma;(t)-&gamma;(t-1))', [],
        function (t) {
            return (t * ((t >= 0) - (t >= 1)));
        }),
    new FuncObj('Inverse Ramp', '(1-t)&middot;(&gamma;(t)-&gamma;(t-1))', [],
        function (t) {
            return ((1 - t) * ((t >= 0) - (t >= 1)));
        }),
    new FuncObj('Triangle', 't&middot;&gamma;(t)-2&middot;(t-1)&middot;&gamma;(t-1)+(t-2)&middot;&gamma;(t-2)', [],
        function (t) {
            return 2 * ((t * (t >= 0) - 2 * (t - 1) * (t >= 1) + (t - 2) * (t >= 2)));
        }),
    new FuncObj('impulse', '&delta;(t)', [
            [0, 1]
        ],
        function (t) {
            return (0);
        }),
    new FuncObj('echo', '&delta;(t)+0.5&middot;&delta;(t-1)+0.25&middot;&delta;(t-2)', [
            [0, 1],
            [1, 0.5],
            [2, 0.25]
        ],
        function (t) {
            return (0);
        }),
    new FuncObj('pulse train', 'several impulses', [
            [0, 0.25],
            [0.25, 0.25],
            [0.5, 0.25],
            [0.75, 0.25],
            [1.0, 0.25],
            [1.25, 0.25],
            [1.5, 0.25],
            [1.75, 0.25]
        ],
        function (t) {
            return (0);
        }),
    new FuncObj('Damped Sine', '&gamma;(t)&middot;&radic(4/3)&middot;exp(-t/2)&middot(sin(sqrt(4/3)&middot;t))', [],
        function (t) {
            return ((t >= 0) * Math.sqrt(4 / 3) * Math.exp(-t / 2) * Math.sin(Math.sqrt(4 / 3) * t));
        }),
    new FuncObj('Oddball', '(t&middot;sin(t)+1)(&gamma;(t)-&gamma;(t-4))', [],
        function (t) {
            return ((t * Math.sin(t) + 1) * ((t >= 0) - (t >= 4)));
        })
];

var expCnv = ['Exp___1_Sec_Pulse,_2_high', 'Very_Fast_Exp___1_Sec_Pulse,_2_high',
    'Fast_Exp___1_Sec_Pulse,_2_high'
];

function FuncObj(name, strng, imps, func) {
    this.name = name;
    this.strng = strng;
    this.imps = imps;
    this.func = func;
}

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return (results == null ? null : results[1] || 0);
}

function CI_Init(hfunc, ffunc) {
    CI = new CI_obj('timePlot', 'lambdaPlot', 'convPlot', -2, 3);

    // Populate the dropdown boxes
    $.each(CI.funcs, function (i, func) {
        $('#h_of_t_dd')
            .append($('<option>')
                .attr("value", i)
                .text(func.name));

        $('#f_of_t_dd')
            .append($('<option>')
                .attr("value", i)

                .text(func.name));
    });

    $('#explain_dd')
        .append($('<option>')
            .attr("value", 0)
            .attr("disabled", true)
            .attr("selected", true)
            .text('Select one.'));
    $(expCnv).each(function (i) {
        var nms = this.split('___');
        var hFuncName = nms[0].replace(/_/g, ' ');
        var fFuncName = nms[1].replace(/_/g, ' ');
        $('#explain_dd')
            .append($('<option>')
                .attr("value", i + 1)
                .text(hFuncName + ' & ' + fFuncName));
    })

    // Select one function, by first deselcing all, then selecting chosen function.
    $('#h_of_t_dd option').removeAttr('selected').filter(function () {
        return (this.text == hfunc);
    }).prop('selected', true);

    $('#f_of_t_dd option').removeAttr('selected').filter(function () {
        return (this.text == ffunc);
    }).prop('selected', true);
    staticCalcs();

}

function chooseExplanation() {
    var nms = $('#explain_dd option:selected').text().split(' & ');
    hFuncName = nms[0];
    fFuncName = nms[1];

    // Select one function, by first deselcing all, then selecting chosen function.
    $('#h_of_t_dd option').removeAttr('selected').filter(function () {
        return (this.text == hFuncName);
    }).prop('selected', true);


    $('#f_of_t_dd option').removeAttr('selected').filter(function () {
        return (this.text == fFuncName);
    }).prop('selected', true);
    staticCalcs();
}

function staticCalcs() {
    // CI.t0 = 0.0;
    CI.timeCtrl.setValue(0);

    var vMax = 0; // this will hold the max for the vertical axis of top two graphs
    var vMin = 0; // this will hold the min.
    var cMax = 0; // Max value of convolution graph.
    var cMin = 0; // Min

    var t = CI.t;

    // Delete impulses.
    for (i = 0; typeof CI.timeChart.get('impf' + i) != 'undefined'; i++) {
        CI.timeChart.get('impf' + i).remove();
        CI.lambdaChart.get('impf' + i).remove();
    }
    for (i = 0; typeof CI.timeChart.get('imph' + i) != 'undefined'; i++) {
        CI.timeChart.get('imph' + i).remove();
        CI.lambdaChart.get('imph' + i).remove();
    }
    for (i = 0; typeof CI.lambdaChart.get('impfh' + i) != 'undefined'; i++) {
        CI.lambdaChart.get('impfh' + i).remove();
    }


    var hText = $('#h_of_t_dd option:selected').text();
    CI.h_of_t = CI.funcs.find(function (func) {
        return (func.name == hText);
    });

    var fText = $('#f_of_t_dd option:selected').text();
    CI.f_of_t = CI.funcs.find(function (func) {
        return (func.name == fText);
    });

    if ((CI.h_of_t.imps.length != 0) && (CI.f_of_t.imps.length != 0)) {
        $('#bothImpulseFuncs').show();
        fText = 'Unit Step';
        $('#f_of_t_dd option').removeAttr('selected').filter(function () {
            return (this.text == fText);
        }).prop('selected', true);
        CI.f_of_t = CI.funcs.find(function (func) {
            return (func.name == fText);
        });
    } else {
        $('#bothImpulseFuncs').hide();
    }

    $('#h_of_t_text').html(CI.h_of_t.strng);
    $('#f_of_t_text').html(CI.f_of_t.strng);

    for (i = 0; i < t.length; i++) {
        CI.hVals[i] = [t[i], CI.h_of_t.func(t[i])];
        CI.fVals[i] = [t[i], CI.f_of_t.func(t[i])];
        vMax = Math.max(vMax, CI.hVals[i][1]);
        vMin = Math.min(vMin, CI.hVals[i][1]);
        vMax = Math.max(vMax, CI.fVals[i][1]);
        vMin = Math.min(vMin, CI.fVals[i][1]);
    }
    CI.impDX = (TMAX - TMIN) / 100.0;
    CI.impDY = (vMax - vMin) / 20.0;

    CI.timeChart.series[0].setData(CI.hVals, true, false, false);
    CI.timeChart.series[1].setData(CI.fVals, true, false, false);
    CI.timeChart.yAxis[0].setExtremes(vMin - 0.1, vMax + 0.1);

    // Calculate the convolution without any impulses
    //    for (var j = 0; j < -TMIN * PPI; j++) {
    for (var j = 0; j < NUMPTS; j++) {
        CI.yVals[j] = [t[j], 0];
    }

    //Add in impulses
    for (i = 0; i < CI.f_of_t.imps.length; i++) {
        CI.timeChart.addSeries(fSeries({
            name: 'impf' + i,
            id: 'impf' + i,
            showInLegend: false,
            type: 'scatter',
            data: impulseArray(CI.f_of_t.imps[i], false, 0)
        }));
        CI.lambdaChart.addSeries(fSeries({
            name: 'impf' + i,
            id: 'impf' + i,
            showInLegend: false,
            type: 'scatter',
            data: impulseArray(CI.f_of_t.imps[i], false, 0)
        }));

        let fhImpT = CI.f_of_t.imps[i][0];
        let fhImpAmp = CI.f_of_t.imps[i][1] * CI.h_of_t.func(fhImpT);
        CI.lambdaChart.addSeries(fhSeries({
            name: 'impfh' + i,
            id: 'impfh' + i,
            showInLegend: false,
            type: 'scatter',
            lineWidth: 4,
            data: impulseArray([fhImpT, fhImpAmp], false, 0)
        }));

        // add in impulse.
        for (j = 0; j < NUMPTS; j++) {
            CI.yVals[j][1] += CI.f_of_t.imps[i][1] * CI.h_of_t.func(t[j] - fhImpT);;
        }
    }

    for (i = 0; i < CI.h_of_t.imps.length; i++) {
        CI.timeChart.addSeries(hSeries({
            name: 'imph' + i,
            id: 'imph' + i,
            showInLegend: false,
            type: 'scatter',
            data: impulseArray(CI.h_of_t.imps[i], false, 0)
        }));
        CI.lambdaChart.addSeries(hSeries({
            name: 'imph' + i,
            id: 'imph' + i,
            showInLegend: false,
            type: 'scatter',
            data: impulseArray(CI.h_of_t.imps[i], true, 0)
        }));

        let fhImpT = -CI.h_of_t.imps[i][0];
        let fhImpAmp = CI.h_of_t.imps[i][1] * CI.f_of_t.func(fhImpT);
        CI.lambdaChart.addSeries(fhSeries({
            name: 'impfh' + i,
            id: 'impfh' + i,
            showInLegend: false,
            type: 'scatter',
            lineWidth: 4,
            data: impulseArray([fhImpT, fhImpAmp], false, 0)
        }));

        // add in impulse.
        for (j = 0; j < NUMPTS; j++) {
            CI.yVals[j][1] += CI.h_of_t.imps[i][1] * CI.f_of_t.func(t[j] + fhImpT);;
        }
    }

    for (var j = -TMIN * PPI; j < NUMPTS; j++) { // Start at t=0
        c = 0;
        for (i = -TMIN * PPI; i < j; i++) {
            var prod = CI.fVals[i][1] * CI.hVals[j - i - TMIN * PPI][1];
            c += prod;
            vMax = Math.max(vMax, prod);
            vMin = Math.min(vMin, prod);
        }

        CI.yVals[j] = [t[j], CI.yVals[j][1] + c * DT]; // only do mult by DT/2 once.
        cMax = Math.max(cMax, CI.yVals[j][1]);
        cMin = Math.min(cMin, CI.yVals[j][1]);
    }

    CI.lambdaChart.series[1].setData(CI.fVals, true, false, false);
    CI.lambdaChart.yAxis[0].setExtremes(vMin - 0.1, vMax + 0.1);

    CI.convChart.yAxis[0].setExtremes(cMin - 0.1, cMax + 0.1);

    var s = hText.replace(/ /g, '_') + '___' + fText.replace(/ /g, '_');
    if (expCnv.includes(s)) {
        s = 'explain/' + s + '.html #explainDiv';
        $('#explainConvolution').load(s, function () {
            MathJax.Hub.Queue(["Typeset", MathJax.Hub, "explainConvolution"])
        });
    } else {
        $('#explainConvolution').load('explain/defaultExplain.html #explainDiv');
    }

    dynamicCalcs();
}

// return an array that defines outline of an impulse function
function impulseArray(imps, inv, tOffset) {
    let x = (inv ? -imps[0] : imps[0]) + tOffset;
    let y = imps[1];
    return ([
        [x, 0],
        [x, y],
        [x - CI.impDX, y - CI.impDY * Math.sign(y)],
        [x + CI.impDX, y - CI.impDY * Math.sign(y)],
        [x, y]
    ])
}

function dynamicCalcs() {
    var t = CI.t;
    CI.t0 = CI.timeCtrl.getValue();
    CI.t0 = Math.round(CI.t0 / DT) * DT; // Get value of t0 close to one of the values of t.
    for (var i = 0; i < t.length; i++) {
        CI.h_tmlVals[i] = [t[i], CI.h_of_t.func(CI.t0 - t[i])];
        CI.fhVals[i] = [t[i], CI.fVals[i][1] * CI.h_tmlVals[i][1]];
    }

    //Add impulses to product if the impulses are in f(t)
    for (i = 0; i < CI.f_of_t.imps.length; i++) {
        let fhImpT = CI.f_of_t.imps[i][0];
        let fhImpAmp = CI.f_of_t.imps[i][1] * CI.h_of_t.func(CI.t0 - fhImpT);
        CI.lambdaChart.get('impfh' + i).setData(impulseArray([fhImpT, fhImpAmp], false, 0), true, false, false);;
    }

    //Add impulses to product if the impulses are in h(t)
    for (i = 0; i < CI.h_of_t.imps.length; i++) {
        let fhImpT = CI.t0 - CI.h_of_t.imps[i][0];
        let fhImpAmp = CI.h_of_t.imps[i][1] * CI.f_of_t.func(fhImpT);
        CI.lambdaChart.get('impfh' + i).setData(impulseArray([fhImpT, fhImpAmp], false, 0), true, false, false);;
    }



    CI.lambdaChart.series[0].setData(CI.h_tmlVals, true, false, false);
    for (let i = 0; i < CI.h_of_t.imps.length; i++) {
        CI.lambdaChart.get('imph' + i).setData(impulseArray(CI.h_of_t.imps[i], true, CI.t0), true, false, false);
    }

    CI.lambdaChart.series[2].setData(CI.fhVals, true, false, false);
    CI.lambdaChart.series[3].setData([
        [CI.t0, 0]
    ], true, false, false);

    var tInd = CI.yVals.findIndex(function (x) {
        return (x[0] >= CI.t0);
    });

    if ($('#showSoln').prop('checked')) {
        CI.convChart.series[0].setData(CI.yVals, true, false, false);
    } else {
        yShowVals = new Array(tInd).fill(new Array(2));;
        for (var i = 0; i < tInd; i++) {
            yShowVals[i] = CI.yVals[i];
        }
        CI.convChart.series[0].setData(yShowVals, true, false, false);
    };

    CI.convChart.series[1].setData([
        [CI.yVals[tInd][0], CI.yVals[tInd][1]]
    ], true, false, false);


    $('#t0Text').val(CI.t0.toFixed(2));
    $('#y_t0Text').html(CI.t0.toFixed(2));
    $('#dispConvValue').html(CI.yVals[tInd][1].toFixed(2));

}

function CI_obj(timeId, lambdaId, convId, fMin, fMax) {
    this.funcs = funcs;
    this.t = new Array(NUMPTS); // time vector.
    for (var i = 0; i < NUMPTS; i++) {
        // this will set a value of t exactly at every integer, where discontinuities are likely.
        this.t[i] = (TMIN * PPI + i) / PPI;
    }

    this.lambda = Array.from(this.t);

    this.f_of_t = new FuncObj(); // f(t) 
    this.h_of_t = new FuncObj(); // h(t)
    this.h_of_tml = new FuncObj(); // h(t-lambda)
    this.fh_of_lambda = new FuncObj(); // f(lambda)*h(t-lambda)
    this.y_of_t = new FuncObj(); // convolution

    this.vMax = 0.1; // this will hold the max for the vertical axis.
    this.vMin = -0.1; // this will hold the min.

    this.fVals = new Array(NUMPTS).fill(new Array(2)); // Create 2xNUMPTS array to hold plot data
    this.hVals = new Array(NUMPTS).fill(new Array(2));;
    this.h_tmlVals = new Array(NUMPTS).fill(new Array(2));;
    this.fhVals = new Array(NUMPTS).fill(new Array(2));;
    this.yVals = new Array(NUMPTS).fill(new Array(2));;

    this.t0 = 0; // constant value of t used in convolution integral

    this.impDX = 0;
    this.impDY = 0;

    //  this.explainId = '#defaultExplain';
    this.timeCtrl = new slideText('timeCtrl', 't (S)', TMIN, TMAX, 0.01, 0, dynamicCalcs);

    this.timeChart = makeTimeGraph(TMIN, TMAX, fMin, fMax, timeId);
    this.lambdaChart = makeLambdaGraph(TMIN, TMAX, fMin, fMax, lambdaId);
    this.convChart = makeconvGraph(TMIN, TMAX, fMin, fMax, convId);

}

/* 
This returns a series object.  
It takes as input an object with a required "name" property,
and optional "showInLegend", "data" and "type" properties
*/
function hSeries(o) {
    return $.extend({
        type: 'line',
        showInLegend: true,
        data: [
            [0, 2],
            [1, 1]
        ], //placeholder
        lineWidth: 1,
        color: 'rgba(255,0,0)',
        dashStyle: 'Dash',
        marker: {
            enabled: false
        }
    }, o);
}

function fSeries(o) {
    return $.extend({
        type: 'line',
        showInLegend: true,
        data: [
            [0, 2],
            [1, 1.5]
        ],
        lineWidth: 2,
        color: 'rgba(0,128,255,0.5)',
        marker: {
            enabled: false
        }
    }, o);
}

function fhSeries(o) {
    return $.extend({
        type: 'area',
        data: [
            [0, 2],
            [1, 2]
        ],
        lineWidth: 3,
        fillColor: 'rgba(255,0,255,0.2)',
        color: 'rgba(255,0,255,0.33)',
        marker: {
            enabled: false
        }
    }, o);
}


function makeTimeGraph(tMin, tMax, fMin, fMax, myId) {
    var timeChart;
    timeChart = Highcharts.chart(myId, {
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: 'transparent',
            plotBorderColor: '#888',
            plotBorderWidth: 2,
            animation: false,
            type: 'line',
            marginRight: 150
        },
        animation: false,
        title: {
            text: 'h(t), f(t) vs time'
        },
        xAxis: {
            title: {
                text: 't'
            },
            max: tMax,
            min: tMin,
            gridLineWidth: 2,
            minorTickInterval: 0.2,
            tickInterval: 1
        },
        yAxis: {
            title: {
                text: 'h(t), f(t)'
            },

            gridLineWidth: 2,
            min: -1,
            tickInterval: 1
        },

        plotOptions: {
            animation: false,
            line: {
                marker: {
                    enabled: false
                }
            },
            series: {
                marker: {
                    states: {
                        hover: {
                            enabled: false,
                        }
                    }
                }
            }
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 0,
            y: 100
        },
        series: [hSeries({
                name: 'h(t)'
            }),
            fSeries({
                name: 'f(t)'
            }),
        ]
    });
    return timeChart;
};

function makeLambdaGraph(tMin, tMax, fMin, fMax, myId) {
    var lambdaChart;
    lambdaChart = Highcharts.chart(myId, {
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: 'transparent',
            plotBorderColor: '#888',
            plotBorderWidth: 2,
            animation: false,
            marginRight: 150
        },
        animation: false,
        title: {
            text: $('<div>h(t-&lambda;), f(&lambda;), h(t-&lambda;)&middot;f(&lambda;) vs &lambda;</div>').html()
        },
        xAxis: {
            title: {
                text: $('<div>&lambda;</div>').html()
            },
            max: tMax,
            min: tMin,
            gridLineWidth: 2,
            minorTickInterval: 0.1,
            tickInterval: 1
        },
        yAxis: {
            title: {
                text: $('<div>h(t-&lambda;), f(&lambda;), h(t-&lambda;)&middot;f(&lambda;)</div>').html()
            },
            gridLineWidth: 2,
            min: -1,
            tickInterval: 1
        },

        plotOptions: {
            animation: false,
            line: {
                marker: {
                    enabled: false
                }
            },

            series: {
                marker: {
                    states: {
                        hover: {
                            enabled: false,
                        }
                    }
                }
            }
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 0,
            y: 100
        },
        series: [hSeries({
                name: $('<div>h(t-&lambda;)</div>').html()
            }),
            fSeries({
                name: $('<div>f(&lambda;)</div>').html()
            }),
            fhSeries({
                name: $('<div>h(t-&lambda;)&middot;f(&lambda;)</div>').html()
            }),
            {
                type: 'line',
                name: 't',
                data: [
                    [0, 0]
                ],
                lineWidth: 0,
                marker: {
                    enabled: true,
                    radius: 5,

                    symbol: 'circle'
                },

                color: 'black'

            }
        ]
    })
    return lambdaChart;
};

function makeconvGraph(tMin, tMax, fMin, fMax, myId) {
    var convChart;
    convChart = Highcharts.chart(myId, {
        legend: {
            enabled: false
        },
        tooltip: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        chart: {
            backgroundColor: 'transparent',
            plotBorderColor: '#888',
            plotBorderWidth: 2,
            animation: false,
            type: 'line',
            marginRight: 150
        },
        animation: false,
        title: {
            text: 'y(t)=<font color="#72B2F2">f(t)</font>*<font color="#FF0000"> h(t)</font>, convolution of <font color="#72B2F2">f(t)</font> and <font color="#FF0000"> h(t)</font>'
        },
        xAxis: {
            title: {
                text: 't'
            },
            max: tMax,
            min: tMin,
            gridLineWidth: 2,
            minorTickInterval: 0.2,
            tickInterval: 1
        },
        yAxis: {
            title: {
                text: 'y(t)'
            },

            gridLineWidth: 2,
            min: -1,
            tickInterval: 1
        },

        plotOptions: {
            animation: false,
            line: {
                marker: {
                    enabled: false
                }
            },
            series: {
                marker: {
                    states: {
                        hover: {
                            enabled: false,
                        }
                    }
                }
            }
        },
        legend: {
            align: 'right',
            verticalAlign: 'top',
            layout: 'vertical',
            x: 0,
            y: 100
        },
        series: [{
                name: 'y(t)',
                data: [
                    [0, 2],
                    [1, 1]
                ],
                lineWidth: 2,
                color: 'green'
            },
            {
                name: 't',
                data: [
                    [0, 0]
                ],
                lineWidth: 0,
                marker: {
                    enabled: true,
                    radius: 5,

                    symbol: 'circle'
                },

                color: 'black'

            }
        ]
    });
    return convChart;
};

$(function () {


    var hParam = $.urlParam('h');
    var hfunc = (hParam == null ? 'Fast Exp' : decodeURI(hParam));

    fParam = $.urlParam('f');
    var ffunc = (fParam == null ? '1 Sec Pulse' : decodeURI(fParam));

    CI_Init(hfunc, ffunc);

    $('#lambdaPlot').on('mousemove', function (e) {
        var chart = $(this).highcharts();
        e = chart.pointer.normalize(e);

        var inChart = chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop);
        if (e.buttons & inChart) {
            CI.timeCtrl.setValue(chart.xAxis[0].toValue(e.chartX));
            dynamicCalcs();
        }
    });

    $('#lambdaPlot').on('click', function (e) {
        var chart = $(this).highcharts();
        e = chart.pointer.normalize(e);
        var inChart = chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop);
        if (inChart) {
            CI.timeCtrl.setValue(chart.xAxis[0].toValue(e.chartX));
            dynamicCalcs();
        }
    });


    $('#convPlot').on('mousemove', function (e) {
        var chart = $(this).highcharts();
        e = chart.pointer.normalize(e);

        var inChart = chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop);
        if (e.buttons & inChart) {
            // CI.t0 = chart.xAxis[0].toValue(e.chartX);
            CI.timeCtrl.setValue(chart.xAxis[0].toValue(e.chartX));
            dynamicCalcs();
        }
    });

    $('#convPlot').on('click', function (e) {
        var chart = $(this).highcharts();
        e = chart.pointer.normalize(e);
        var inChart = chart.isInsidePlot(e.chartX - chart.plotLeft, e.chartY - chart.plotTop);
        if (inChart) {
            //CI.t0 = ;
            CI.timeCtrl.setValue(chart.xAxis[0].toValue(e.chartX));
            dynamicCalcs();
        }
    });



});