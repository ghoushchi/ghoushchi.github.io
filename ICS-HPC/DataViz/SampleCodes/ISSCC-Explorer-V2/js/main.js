// set the dimensions and margins of the graph
var width = 900
var height = 500

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
  .attr("width", width)
  .attr("height", height)

svg.append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "white")
  .attr("stroke", "steelblue");


function ShapeGenerator(ratio, cx, cy) {

  var linner = d3.line()
    .x(function (d) {
      return ratio * d[0] + cx
    })
    .y(function (d) {
      return ratio * d[1] + cy
    });

  var points = [
    [12.37201365, 24.95726496],
    [11.34812287, 24.95726496],
    [10.23890785, 24.78632479],
    [9.300341297, 24.61538462],
    [8.020477816, 24.18803419],
    [6.825938567, 23.67521368],
    [5.802047782, 23.07692308],
    [4.692832765, 22.30769231],
    [3.583617747, 21.28205128],
    [2.559726962, 20.08547009],
    [1.791808874, 18.97435897],
    [1.194539249, 17.94871795],
    [0.767918089, 16.92307692],
    [0.341296928, 15.55555556],
    [0.085324232, 14.18803419],
    [0, 13.07692308],
    [0, 11.70940171],
    [0.170648464, 10.25641026],
    [0.682593857, 8.290598291],
    [1.194539249, 7.094017094],
    [2.04778157, 5.555555556],
    [2.901023891, 4.358974359],
    [4.010238908, 3.162393162],
    [5.460750853, 2.051282051],
    [7.081911263, 1.111111111],
    [8.703071672, 0.512820513],
    [10.66552901, 0.085470085],
    [12.37201365, -0.085470085],
    [13.8225256, 0],
    [15.10238908, 0.256410256],
    [16.38225256, 0.598290598],
    [17.66211604, 1.111111111],
    [19.19795222, 1.88034188],
    [20.05119454, 2.564102564],
    [21.16040956, 3.504273504],
    [22.35494881, 4.786324786],
    [23.37883959, 6.41025641],
    [24.14675768, 7.863247863],
    [24.57337884, 9.316239316],
    [24.82935154, 10.85470085],
    [24.91467577, 12.05128205],
    [24.91467577, 13.67521368],
    [24.65870307, 15.04273504],
    [24.23208191, 16.66666667],
    [23.63481229, 18.03418803],
    [23.03754266, 19.14529915],
    [22.18430034, 20.34188034],
    [21.33105802, 21.36752137],
    [19.96587031, 22.47863248],
    [18.51535836, 23.41880342],
    [16.38225256, 24.44444444],
    [14.84641638, 24.78632479],
    [13.99317406, 24.87179487],
    [13.3105802, 24.95726496],
    [12.62798635, 24.95726496],
    [12.62798635, 22.56410256],
    [13.48122867, 22.47863248],
    [13.99317406, 22.30769231],
    [14.41979522, 21.96581197],
    [14.67576792, 21.62393162],
    [14.76109215, 21.11111111],
    [14.76109215, 18.29059829],
    [15.44368601, 17.94871795],
    [16.2116041, 17.43589744],
    [16.89419795, 16.83760684],
    [17.49146758, 16.15384615],
    [18.00341297, 15.2991453],
    [18.3447099, 14.35897436],
    [18.60068259, 13.41880342],
    [18.68600683, 12.64957265],
    [19.70989761, 12.64957265],
    [19.70989761, 13.24786325],
    [23.12286689, 13.24786325],
    [23.12286689, 11.70940171],
    [19.70989761, 11.70940171],
    [19.70989761, 12.30769231],
    [18.68600683, 12.30769231],
    [18.60068259, 11.53846154],
    [18.43003413, 10.76923077],
    [18.00341297, 9.829059829],
    [17.49146758, 8.888888889],
    [16.97952218, 8.205128205],
    [17.66211604, 7.606837607],
    [18.0887372, 8.034188034],
    [20.39249147, 5.726495726],
    [19.45392491, 4.700854701],
    [17.06484642, 7.008547009],
    [17.40614334, 7.435897436],
    [16.80887372, 8.034188034],
    [16.2116041, 7.521367521],
    [15.44368601, 7.008547009],
    [14.41979522, 6.581196581],
    [13.65187713, 6.324786325],
    [13.05460751, 6.324786325],
    [12.54266212, 6.239316239],
    [12.54266212, 5.384615385],
    [13.22525597, 5.384615385],
    [13.22525597, 2.051282051],
    [11.6894198, 2.051282051],
    [11.6894198, 5.384615385],
    [12.28668942, 5.384615385],
    [12.37201365, 6.239316239],
    [11.4334471, 6.324786325],
    [10.66552901, 6.581196581],
    [9.897610922, 6.837606838],
    [9.129692833, 7.264957265],
    [8.447098976, 7.777777778],
    [8.105802048, 8.11965812],
    [7.508532423, 7.521367521],
    [7.849829352, 7.008547009],
    [5.546075085, 4.615384615],
    [4.5221843, 5.726495726],
    [6.825938567, 8.034188034],
    [7.337883959, 7.606837607],
    [7.935153584, 8.205128205],
    [7.508532423, 8.803418803],
    [6.911262799, 9.572649573],
    [6.655290102, 10.25641026],
    [6.399317406, 11.11111111],
    [6.313993174, 11.88034188],
    [6.228668942, 12.39316239],
    [5.375426621, 12.39316239],
    [5.375426621, 11.79487179],
    [2.04778157, 11.79487179],
    [2.133105802, 13.16239316],
    [5.375426621, 13.24786325],
    [5.460750853, 12.64957265],
    [6.228668942, 12.73504274],
    [6.313993174, 13.5042735],
    [6.56996587, 14.35897436],
    [6.996587031, 15.47008547],
    [7.679180887, 16.41025641],
    [8.703071672, 17.43589744],
    [9.556313993, 17.94871795],
    [10.06825939, 18.37606838],
    [10.06825939, 20.85470085],
    [10.15358362, 21.36752137],
    [10.40955631, 21.96581197],
    [10.92150171, 22.30769231],
    [11.51877133, 22.47863248],
    [12.28668942, 22.47863248]
  ];

  return linner(points);
}





// A scale that gives a X target position for each group
var x = d3.scaleOrdinal()
  .domain([0, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
  .range([150, 160, 188, 232, 288, 350, 412, 468, 512, 540, 550, 540, 512, 468, 412, 350, 288, 232, 188, 160, 225, 242, 287, 350, 413, 458, 475, 458, 413, 350, 287, 242, 300, 325, 375, 400, 375, 325])

// A scale that gives a Y target position for each group
var y = d3.scaleOrdinal()
  .domain([0, 37, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1])
  .range([200, 262, 318, 362, 390, 400, 390, 362, 318, 262, 200, 138, 82, 38, 10, 0, 10, 38, 82, 138, 200, 263, 308, 325, 308, 263, 200, 137, 92, 75, 92, 138, 200, 243, 243, 200, 157, 157])



// A color scale
var color = d3.scaleOrdinal()
  .domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39])
  .range(["#cccccc", "#Ff6419", "#6BF178", "#E8AE68", "#EDFF86", "#FF8966", "#dd7596", "#c1df1f", "#FFD3E8", "#03F7EB",
    "#ff70a6", "#DBF4A7", "#56a3a6", "#f9dc5c", "#3185fc", "#efbcd5", "#564592", "#FB4D3D", "#96C5F7", "#e84855",
    "#c0d8e0", "#FF2E00", "#E40066", "#52FFB8", "#C0FDFB", "#F1C40F", "#8E7DBE", "#f46036", "#FF8811", "#1EFC1E",
    "#cc4bc2", "#35A7FF", "#fc7753", "#66d7d1", "#00CC66", "#dbd56e", "#D52941", "#75FFBA", "#FD7EB9", "#00BFB3"
  ])

var year = 2022
var paper = 0
var author = 0
var affiliation = 0
var Session = 0
// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
var radius = (Math.min(width, height) / 2) - 20





function update() {

  let uniqueListOfNames = []
  d3.json("json/ISSCC" + year + "_modified.json", function (data) {


    const listOfNames = []

    for (const row of data.slice().sort((a, b) => d3.ascending(a.cat_num, b.cat_num))) {
            listOfNames.push(row.cat_title)
    }

    uniqueListOfNames = d3.set(listOfNames).values()
    // console.log(uniqueListOfNames)
    // console.log(uniqueListOfNames.length)

    var space = (height - 50) / (uniqueListOfNames.length - 1);
    var j = 0;

    for (const row of uniqueListOfNames) {
      // console.log(row)
      svg.append("circle")
        .attr("r", 5)
        .attr("cx", 20)
        .attr("cy", 20 + j * space)
        .attr("cat_title", row)
        .attr("fill", function (d) {
          return color(j);
        });

      svg.append("text")
        .attr("x", 30)
        .attr("y", 24.5 + j * space)
        .attr("cat_num", j)
        .attr("cat_title", row)
        .text(row)
        .style("fill", "black")
        .style("font-size", "12px")
        .attr("font-weight", 300)
        .attr('font-family', 'Calibri, sans-serif')
      // .attr("textLength", "150");


      j = j + 1;
    }

    svg.selectAll("text")
      .on("mouseover", function (d) {

        d3.selectAll("text").style("fill", "#dddddd");
        d3.selectAll("circle").style("fill-opacity", 0.1);

        d3.select(this)
          .style("font-size", "20px")
          // .style("fill", function(d) { return color(d3.select(this).attr("cat_num")); })
          .style("fill", "black")
          .attr("font-weight", 1000);

        var cat = d3.select(this).attr("cat_title")
        console.log(cat)

        svg.selectAll("path").style("fill-opacity", 0.1);

        svg.selectAll("path")
          .filter(function () {
            if (d3.select(this).attr("cat_title") == cat) {
              return d3.select(this);
            }
          }).style("fill-opacity", 1);

        svg.selectAll("circle")
          .filter(function () {
            if (d3.select(this).attr("cat_title") == cat) {
              return d3.select(this);
            }
          }).attr("r", 10).style("fill-opacity", 1);

      })
      .on("mouseleave", function (d) {

        d3.selectAll("text").style("fill", "black");
        d3.selectAll("circle").style("fill-opacity", 1);

        d3.select(this).style("font-size", "12px").style("fill", "black").attr("font-weight", 300)

        svg.selectAll("path").style("fill-opacity", 1);
        svg.selectAll("circle").attr("r", 5);


      });




  });

  if (d3.select("#select_view").property("value") == 'pie') {

    d3.json("json/ISSCC" + year + "_modified.json", function (data) {

      var pie = d3.pie().value(1);

      var arc = svg.selectAll("arc")
        .data(pie(data.slice().sort((a, b) => d3.ascending(a.cat_num, b.cat_num))))
        .enter();

      var path = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);

      arc.append("path")
        .attr("d", path)
        .attr("class", "pie_style")
        .attr("cat_title", function (d) {
          return d.data.cat_title
        })
        .attr("cat_num", function (d) {
          return d.data.cat_num
        })
        .attr("doi", function (d) {
          return d.data.doi
        })
        .attr("article_number", function (d) {
          return d.data.article_number
        })
        .attr("title", function (d) {
          return d.data.title
        })
        .attr("volume", function (d) {
          return d.data.volume
        })
        .attr("authors", function (d) {
          return d.data.authors.authors
        })
        .attr("abstract", function (d) {
          return d.data.abstract
        })
        .attr("html_url", function (d) {
          return d.data.html_url
        })
        .attr("publication_year", function (d) {
          return d.data.publication_year
        })
        .attr("key_words", function (d) {
          return d.data.index_terms.ieee_terms
        });

      svg.selectAll("path")
        .attr("transform", "translate(" + (200 + width / 2) + "," + (0 + height / 2) + ")")
        .attr("fill", function (d) {
          return color(d.data.cat_num);
        })
        .style("stroke-width", 0)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
        .on("click", function (d) {

          svg.selectAll("path").style("stroke-width", 0)
          svg.selectAll("path").attr("class", "pie_style")

          // svg.selectAll("path")
          // .filter(function() {
          //   if (d3.select(this).attr("title") == 'user_selected'){return d3.select(this) ; }
          // }).attr("d", ShapeGenerator(1.1,d.x,d.y)).style('fill', color(d.cat_num));

          d3.select(this).attr("class", "pie_style_stroke").style("stroke-width", 5)

          // svg.selectAll("path")
          //     .filter(function() {
          //       if (d3.select(this).attr("title") == 'user_selected_pad'){return d3.select(this) ; }
          //     }).attr("d", ShapeGenerator(1.5,d.x-1,d.y-1));

          d3.select('#CATEGORY').text(d.data.cat_title)
          d3.select('#info_TITLE').html('<a href="' + d.data.html_url + '" target="_blank">' + d.data.title + '</a>')
          d3.select('#info_AUTHORS').text(d.data.authors)
          d3.select('#info_ABSTRACT').text(d.data.abstract)

        });

    });
  

  }


  if (d3.select("#select_view").property("value") == 'dot') {

    // Initialize the circle: all located at the center of the svg area
    d3.json("json/ISSCC" + year + "_modified.json", function (data) {
      var node = svg.append("g")
        .selectAll("path")
        .data(data)
        .enter()
        .append("path")
        .attr("class", "freeline")
        .attr("d", ShapeGenerator(1.1, width / 2, height / 2))
        // .attr("r", 12)
        // .attr("cx", width / 2)
        // .attr("cy", height / 2)
        .attr("cat_title", function (d) {
          return d.cat_title
        })
        .attr("cat_num", function (d) {
          return d.cat_num
        })
        .attr("doi", function (d) {
          return d.doi
        })
        .attr("article_number", function (d) {
          return d.article_number
        })
        .attr("title", function (d) {
          return d.title
        })
        .attr("volume", function (d) {
          return d.volume
        })
        .attr("authors", function (d) {
          return d.authors.authors
        })
        .attr("abstract", function (d) {
          return d.abstract
        })
        .attr("html_url", function (d) {
          return d.html_url
        })
        .attr("publication_year", function (d) {
          return d.publication_year
        })
        .attr("key_words", function (d) {
          return d.index_terms.ieee_terms
        })
        .style("fill", function (d) {
          return color(d.cat_num)
        })
        .style("fill-opacity", 1)
        .style("stroke-width", 0)
        // .call(d3.drag() // call specific function when circle is dragged
        //    .on("start", dragstarted)
        //    .on("drag", dragged)
        //    .on("end", dragended))

        .on("click", function (d) {

          svg.selectAll("path").style("stroke-width", 0)
          svg.selectAll("path").attr("class", "freeline")

          // svg.selectAll("path")
          // .filter(function() {
          //   if (d3.select(this).attr("title") == 'user_selected'){return d3.select(this) ; }
          // }).attr("d", ShapeGenerator(1.1,d.x,d.y)).style('fill', color(d.cat_num));

          d3.select(this).attr("class", "freeline_stroke").style("stroke-width", 5)

          // svg.selectAll("path")
          //     .filter(function() {
          //       if (d3.select(this).attr("title") == 'user_selected_pad'){return d3.select(this) ; }
          //     }).attr("d", ShapeGenerator(1.5,d.x-1,d.y-1));

          d3.select('#CATEGORY').text(d.cat_title)
          d3.select('#info_TITLE').html('<a href="' + d.html_url + '" target="_blank">' + d.title + '</a>')
          d3.select('#info_AUTHORS').text(d.authors)
          d3.select('#info_ABSTRACT').text(d.abstract)

        })

        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave);



      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
      simulation
        .nodes(data)
        .on("tick", function (d) {
          node
            // .attr("cx", function(d){ return d.x; })
            // .attr("cy", function(d){ return d.y; })
            .attr("d", function (d) {
              return ShapeGenerator(1.1, d.x, d.y);
            })
        });



    });
  }
  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
    .force("x", d3.forceX().strength(0.5).x(function (d) {
      return x(d.cat_num)
    }))
    .force("y", d3.forceY().strength(2).y(function (d) {
      return y(d.cat_num)
    }))
    .force("center", d3.forceCenter().x((width / 2) + 100).y((height / 2) - 20)) // Attraction to the center of the svg area
    .force("charge", d3.forceManyBody().strength(1)) // Nodes are attracted one each other of value is > 0
    .force("collide", d3.forceCollide().strength(1).radius(14).iterations(1)) // Force that avoids circle overlapping


  // Sonstructs the suggestion engine
  paper = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('title'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function (obj) {
      return obj.title;
    },
    prefetch: 'json/ISSCC' + year + '_modified.json'
  });

  // Sonstructs the suggestion engine
  author = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('full_name'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function (obj) {
      return obj.full_name;
    },
    prefetch: 'json/ISSCC' + year + '_authors.json'
  });

  // Sonstructs the suggestion engine 
  affiliation = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('affiliation'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function (obj) {
      return obj.affiliation;
    },
    prefetch: 'json/ISSCC' + year + '_authors.json'
  });

  // Sonstructs the suggestion engine 
  Session = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace('cat_title'),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    identify: function (obj) {
      return obj.cat_title;
    },
    prefetch: 'json/ISSCC' + year + '_modified.json'
  });

}



update();


// create a tooltip
var Tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px")
  .style("width", "400px")

// Three function that change the tooltip when user hover / move / leave a cell
var mouseover = function (d) {

  Tooltip
    .style("opacity", 1)


  if (d3.select("#select_view").property("value") == 'dot') {



    d3.select('#CATEGORY0').html("<b>SESSION: </b>" + d.cat_num + ' - ' + d.cat_title)

    d3.select(this)
      .style("stroke-width", 2)

    svg.selectAll("path")
      .filter(function () {
        if (d3.select(this).attr("class") == 'freeline_stroke') {
          return d3.select(this);
        }
      }).style("stroke-width", 5);

  }

  if (d3.select("#select_view").property("value") == 'pie') {

    d3.select('#CATEGORY0').html("<b>SESSION: </b>" + d.data.cat_num + ' - ' + d.data.cat_title)


    d3.select(this)
      .style("stroke-width", 2)

    svg.selectAll("path")
      .filter(function () {
        if (d3.select(this).attr("class") == 'pie_style_stroke') {
          return d3.select(this);
        }
      }).style("stroke-width", 5);

  }
}

var mousemove = function (d) {
  if (d3.select("#select_view").property("value") == 'dot') {

    Tooltip
      // .html("CATEGORY: "+d.cat_title+"<br>Title: " + d.title)
      .html(d.title)
      .style("left", (d3.mouse(this)[0] - 450) + "px")
      .style("top", (d3.mouse(this)[1]) + "px")
  }

  if (d3.select("#select_view").property("value") == 'pie') {

    Tooltip
      // .html("CATEGORY: "+d.cat_title+"<br>Title: " + d.title)
      .html(d.data.title)
      .style("left", (d3.mouse(this)[0] + 200) + "px")
      .style("top", (d3.mouse(this)[1] + height / 2) + "px")
  }
}


var mouseleave = function (d) {
  if (d3.select("#select_view").property("value") == 'dot') {

    d3.select('#CATEGORY0').html("<b>SESSION: </b>")
    Tooltip
      .style("opacity", 0)

    svg.selectAll("path")
      .filter(function () {
        if (d3.select(this).attr("class") != 'freeline_stroke') {
          return d3.select(this);
        }
      }).style("stroke-width", 0);

  }

  if (d3.select("#select_view").property("value") == 'pie') {

    d3.select('#CATEGORY0').html("<b>SESSION: </b>")
    Tooltip
      .style("opacity", 0)

    svg.selectAll("path")
      .filter(function () {
        if (d3.select(this).attr("class") != 'pie_style_stroke') {
          return d3.select(this);
        }
      }).style("stroke-width", 0);

  }

}



$(document).ready(function () {

  // Initializing the typeahead with remote dataset
  $('#scrollable-dropdown-menu .typeahead').typeahead({
    hint: true,
    highlight: true
  }, {
    name: 'title',
    display: 'title',
    source: paper,
    limit: 100 /* Specify maximum number of suggestions to be displayed */
  });
});



function update_typeahead() {
  $('#scrollable-dropdown-menu .typeahead').typeahead('destroy');

  if (d3.select("#select_search").property("value") == 1) {
    // Initializing the typeahead with remote dataset
    $('#scrollable-dropdown-menu .typeahead').typeahead({
      hint: true,
      highlight: true
    }, {
      name: 'title',
      display: 'title',
      source: paper,
      limit: 100 /* Specify maximum number of suggestions to be displayed */
    });

  }

  if (d3.select("#select_search").property("value") == 2) {


    // Initializing the typeahead with remote dataset
    $('#scrollable-dropdown-menu .typeahead').typeahead({
      hint: true,
      highlight: true
    }, {
      name: 'full_name',
      display: 'full_name',
      source: author,
      limit: 100 /* Specify maximum number of suggestions to be displayed */
    });
  }

  if (d3.select("#select_search").property("value") == 3) {


    // Initializing the typeahead with remote dataset
    $('#scrollable-dropdown-menu .typeahead').typeahead({
      hint: true,
      highlight: true
    }, {
      name: 'affiliation',
      display: 'affiliation',
      source: affiliation,
      limit: 100 /* Specify maximum number of suggestions to be displayed */
    });
  }

  if (d3.select("#select_search").property("value") == 4) {


    // Initializing the typeahead with remote dataset
    $('#scrollable-dropdown-menu .typeahead').typeahead({
      hint: true,
      highlight: true
    }, {
      name: 'cat_title',
      display: 'cat_title',
      source: Session,
      limit: 100 /* Specify maximum number of suggestions to be displayed */
    });
  }
}



d3.select("#select_search").on("change", function () {
  console.log('message1')
  console.log(d3.select("#select_search").property("value"))

  update_typeahead();

});


d3.select("#select_year").on("change", function () {
  console.log('message2')
  console.log(d3.select("#select_year").property("value"))

  year = d3.select("#select_year").property("value")

  svg.selectAll("path").remove()
  svg.selectAll("circle").remove()
  svg.selectAll("text").remove()

  update();
  update_typeahead();
  console.log(year)

  d3.select('#CATEGORY').html('<br>')
  d3.select('#info_TITLE').html('<br>')
  d3.select('#info_ABSTRACT').html('<br><br><br><br><br><br>')



});

d3.select("#select_view").on("change", function () {
  svg.selectAll("path").remove()
  svg.selectAll("circle").remove()
  svg.selectAll("text").remove()
  update();

});


d3.select("#x-button").on("click", function () {
  console.log('message3')
  $('#scrollable-dropdown-menu .typeahead').typeahead('val', '');
  svg.selectAll("path").style("fill-opacity", 1);
});

$('#scrollable-dropdown-menu .typeahead').bind('typeahead:select', function (ev, suggestion) {


  svg.selectAll("path").style("fill-opacity", 0.1);

  if (d3.select("#select_search").property("value") < 4) {

    svg.selectAll("path")
      .filter(function () {
        if (d3.select(this).attr("article_number") == suggestion.article_number) {
          return d3.select(this);
        }
      }).style("fill-opacity", 1);

  }

  if (d3.select("#select_search").property("value") == 4) {

    svg.selectAll("path")
      .filter(function () {
        if (d3.select(this).attr("cat_num") == suggestion.cat_num) {
          return d3.select(this);
        }
      }).style("fill-opacity", 1);

  }

  svg.selectAll("path")
    .filter(function () {
      if (d3.select(this).attr("title") == 'user_selected') {
        return d3.select(this);
      }
    }).style("fill-opacity", 1);

  svg.selectAll("path")
    .filter(function () {
      if (d3.select(this).attr("title") == 'user_selected_pad') {
        return d3.select(this);
      }
    }).style("fill-opacity", 1);


});


