// Link for topic map
var myMap = "https://lpsa.swarthmore.edu/TM/tmExplore/index.html?LPSA";
var myBase = "https://lpsa.swarthmore.edu/"

function LPSAPageInfo() {

    //Set document title to first H1
    var title = document.getElementsByTagName("H1")[0];
    if (title) document.title = title.innerHTML;

    var myBk = myBase + "images/previous.png"; //Links to images
    var myNx = myBase + "images/next.png";
    var myNxGray = myBase + "images/nextGray.png";
    var myMp = myBase + "images/map.png";
    var myMpGray = myBase + "images/mapGray.png";
    var myTp = myBase + "images/top.png";
    var mySc = myBase + "images/search.png";
    var myHp = myBase + "images/info.png";
    var mySrch = myBase + "LPSAHelp/LPSA_Search.html";
    var myHelp = myBase + "LPSAHelp/LPSA_Help.html"; //Links to help files

    //Create Navbar.  Only create myMap button if that variable was declared.
    document.writeln("<div class=\"topNavWidget\">"); // This requires LPSACommon.css
    document.write("<br /><a href=\"javascript:history.go(-1)\"><img src=" + myBk + " title=\"Back\"></a><br /><br />"); //Back button
    document.writeln("<a href=\"javascript:window.scrollTo(0,0)\"><img src=" + myTp + " title=\"Top\"></a><br /><br />"); //Top button
    // Next Button (if necessary)
    if (window.myNextLink) document.writeln("<a href=" + myNextLink + "><img src=" + myNx + " title=\"Next\"></a><br /><br />");
    else document.writeln("<img src=" + myNxGray + " title=\"unavailable\"></a><br /><br />");
    // Map Button (if necesary)
    if (window.myMapLink) document.writeln("<a href=" + myMap + "#" + myMapLink + "><img src=" + myMp + " title=\"Topic Map\"></a><br /><br />");
    else document.writeln("<img src=" + myMpGray + " title=\"unavailable\"></a><br /><br />");
    document.write("<a href=" + mySrch + "><img src=" + mySc + " title=\"Search\"></a><br /><br />"); //Search
    document.write("<a href=" + myHelp + "><img src=" + myHp + " title=\"Help\"></a><br /><br /></div>"); //Help

    //Create links
    document.write("<a href=\"mailto:echeeve1@swarthmore.edu?subject=");
    document.write(document.title);
    document.write(" (Comments)\">Comments?</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    document.write("<a href=\"mailto:echeeve1@swarthmore.edu?subject=");
    document.write(document.title);
    document.write(" (Questions)\">Questions?</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    document.write("<a href=\"mailto:echeeve1@swarthmore.edu?subject=");
    document.write(document.title);
    document.write(" (Suggestions)\">Suggestions?</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
    document.write("<a href=\"mailto:echeeve1@swarthmore.edu?subject=");
    document.write(document.title);
    document.write(" (Corrections)\">Corrections?</a><br>");

}


function dB(x) {
    return (20 * Math.log10(Math.abs(x)));
}

function from_dB(x) {
    return (Math.pow(10, x / 20));
}

function linspace(mn, mx, n) {
    var dl = (mx - mn) / (n - 1),
        ret = [n],
        i;
    for (i = 0; i < n; i++) {
        ret[i] = mn + i * dl;
    }
    return ret;
}

function logspace(mn, mx, n) {
    var logmn = Math.log(mn),
        logmx = Math.log(mx),
        dlog = (logmx - logmn) / (n - 1),
        ret = [n],
        i;
    for (i = 0; i < n; i++) {
        ret[i] = Math.exp(logmn + i * dlog);
    }
    return ret;
}

function inRange(x, mn, mx) {
    x = parseFloat(x);
    mn = parseFloat(mn);
    mx = parseFloat(mx);
    if (x < mn) x = mn;
    if (x > mx) x = mx;
    return x;
}

/*
slideText creates an object that is a combined slider and textbox to change
a value for a user interface.
The slider appears in the element with idName.  
stringName is the displayed string to describe the slider/textbox.
min, max and step, are min, max, and step values for slider.
val is the initial value of the variable.
CB is a callback function that passes idName as an argument. 
*/
function slideText(idName, stringName, min, max, step, val, CB) {
    this.idName = idName;
    this.stringName = stringName;
    this.min = min;
    this.max = max;
    this.step = step;
    this.val = val;
    this.CB = CB;

    $('#' + idName)
        .append(
            $('<input>', {
                type: 'text',
                id: 'q1-Text_' + idName,
                style: 'width:4em',
                value: val
            }))
        .append(
            $('<span>', {
                id: 'q1-stringName_' + idName,
                style: 'width:3em; text-align:center; display:inline-block;',
            }))
        .append(
            $('<span>', {
                id: 'q1-minText_' + idName,
                style: 'width:3em; text-align:right; display:inline-block;',
                text: min + ' '

            }))
        .append(
            $('<input>', {
                type: 'range',
                id: 'q1-Slider_' + idName,
                min: min,
                max: max,
                step: step,
                value: val
            }))
        .append(
            $('<span>', {
                id: 'q1-maxText_' + idName,
                style: 'width:8em;text-align:right',
                text: ' ' + max
            }));


    var stThis = this; // We need the slideText object in call backs.
    $('#q1-stringName_' + idName).html(stringName); // Name may need to be rendered as html

    $('#q1-Slider_' + idName).change(function () {
        let clipVal = inRange(this.value, this.min, this.max);

        $('#q1-Text_' + idName).val(clipVal);
        stThis.val = clipVal;
        CB(idName);
    });
    $('#q1-Slider_' + idName)[0].oninput = function () {
        let clipVal = inRange(this.value, this.min, this.max);

        $('#q1-Text_' + idName).val(clipVal);
        stThis.val = clipVal;
        CB(idName);
    };
    $('#q1-Text_' + idName).change(function () {
        $('#q1-Slider_' + idName).val(this.value);
        stThis.val = this.value;
        CB(idName);
    });

    this.setValue = function (x) {
        x3 = x == null ? null : x.toFixed(3);
        $('#q1-Text_' + this.idName).val(x3);
        $('#q1-Slider_' + this.idName).val(x);
        this.val = x;
    }

    this.getValue = function () {
        let q = $('#q1-Slider_' + this.idName).val();
        let xx = this.val == null ? '' : this.val;
        return (parseFloat(xx));

        // return $('#q1-Text_' + this.idName).val();
    }

    this.clip = function () {
        this.setValue(inRange(this.val, this.min, this.max));
    }

    this.setMinMaxStep = function (mn, mx, st) {
        $('#q1-Slider_' + this.idName).prop('min', mn);
        $('#q1-Slider_' + this.idName).prop('max', mx);
        $('#q1-Slider_' + this.idName).prop('step', st);

        $('#q1-minText_' + this.idName).text(' ' + mn);
        $('#q1-maxText_' + this.idName).text(' ' + mx);
    }

    this.setStringName = function (str) {
        $('#q1-stringName_' + this.idName).html(str);
    }

    this.hide = function () {
        $('#' + this.idName).hide();
    }

    this.show = function () {
        $('#' + this.idName).show();
    }

    this.getMin = function () {
        return (this.min);
    }

    this.getMax = function () {
        return (this.max);
    }

}
