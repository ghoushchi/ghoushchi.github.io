// set the dimensions and margins of the graph
var margin = {top: 0, right: 10, bottom: 30, left: 30},
    width = 600 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");


var datayear_start = 1997
var datayear_end = 2021
var type = 1
var gg = 1
gg = d3.select("#inputGraph").property("value")
if( gg == 1){ update_graph_Energy(); }
if( gg == 2){ update_graph_Aperture(); }
if( gg == 3){ update_graph_Walden(); }
if( gg == 4){ update_graph_Schreier(); }
update();

// selct type event 
d3.select("#inputType").on("input", function() { update(); });

// selct graph event 
d3.select("#inputGraph").on("input", function() { 
  gg = +this.value
  if( gg == 1){ update_graph_Energy(); }
  if( gg == 2){ update_graph_Aperture(); }
  if( gg == 3){ update_graph_Walden(); }
  if( gg == 4){ update_graph_Schreier(); }
});

// when the input range changes update the circle
d3.select("#yrange_end").on("input", function() { 
  datayear_start = d3.select("#yrange_start").property("value")
  datayear_end = d3.select("#yrange_end").property("value")
  if (datayear_start > datayear_end){
    d3.select("#yrange_start").property("value" , datayear_end)
  }
  update(); });
  
d3.select("#yrange_start").on("input", function() { 
  datayear_start = d3.select("#yrange_start").property("value")
  datayear_end = d3.select("#yrange_end").property("value")
  if (datayear_start > datayear_end){
    d3.select("#yrange_end").property("value" , datayear_start)
  }
  update(); });

// update the elements
function update() {

  type = d3.select("#inputType").property("value")
  datayear_start = d3.select("#yrange_start").property("value")
  datayear_end = d3.select("#yrange_end").property("value")

  // adjust the text on the range slider
  d3.select("#range-text").property("value", datayear_start+ ' --> ' +datayear_end);

  // updat scater
  
  svg.selectAll("circle").style("visibility", "hidden");


      
    svg.selectAll("circle")
      .filter(function() {
        if (type == 1){
          if (d3.select(this).attr("year") <= datayear_end){if (d3.select(this).attr("year") >= datayear_start) {return d3.select(this) ; }}
        }
        if (type == 2){
          if (d3.select(this).attr("year") <= datayear_end){if (d3.select(this).attr("year") >= datayear_start) { if (d3.select(this).attr("type") == "NQ"){return d3.select(this) ; }}}
        }
        if (type == 3){
          if (d3.select(this).attr("year") <= datayear_end){if (d3.select(this).attr("year") >= datayear_start) { if (d3.select(this).attr("type") == "OS"){return d3.select(this) ; }}}
        }
        if (type == 2){
          if (d3.select(this).attr("year") <= datayear_end){if (d3.select(this).attr("year") >= datayear_start) { if (d3.select(this).attr("type") == "NQ/OS"){return d3.select(this) ; }}}
        }
      }).style("visibility", "visible");
  

}


  
// Energy graph update  /////////////////////////////////////////////////////////////////
function update_graph_Energy() {
    svg.selectAll("*").remove();

    d3.csv("data/data.csv", function(data) {


        // Add X axis
        var hh = height -30
        var xmin = 10
        var xmax = 120
        var x = d3.scaleLinear()
            .domain([xmin, xmax])
            .range([ 0, width-30 ]);
        svg.append("g")
            .attr("transform", "translate(30," + hh + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var ww = 30
        var ymin = 0.1
        var ymax = 100000000
        var y = d3.scaleLog()
            .domain([ymin, ymax])
            .range([ height-30, 0]);
        svg.append("g")
        .attr("transform", "translate(" + ww + ",0)")
        .call(d3.axisLeft(y));

        // Color scale: give me a specie name, I return a color
        var color = d3.scaleOrdinal()
          .domain(["ISSCC", "VLSI"])
          .range([ "#ff0000ff", "#0000ffff"])

        // Highlight the specie that is hovered
        var highlight = function(d){
        
          selected_Conference = d.Conference
        
          d3.selectAll(".dot")
              .transition()
              .duration(200)
              // .style("fill", "lightgrey")
              .attr("r", 3)
        
          d3.selectAll("." + selected_Conference)
              .transition()
              .duration(200)
              .style("fill", color(selected_Conference))
              .attr("r", 7)
        }

        // Highlight the specie that is hovered
        var doNotHighlight = function(){
          d3.selectAll(".dot")
              .transition()
              .duration(200)
              // .style("fill", "lightgrey")
              .attr("r", 5 )
        }

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "dot " + d.Conference } )
            .attr("cx", function (d) { return x(d.SNDR_plot_dB); } )
            .attr("cy", function (d) { return y(d.P_fsnyq_pJ); } )
            .attr("r", 5)
            .attr("year", function (d) { return d.YEAR })
            .attr("type", function (d) { return d.TYPE })
            .attr("ARCHITECTURE", function (d) { return d.ARCHITECTURE })
            .attr("TECHNOLOGY", function (d) { return d.TECHNOLOGY })
            .attr("AREA", function (d) { return d.AREA })
            .attr("TITLE", function (d) { return d.TITLE })
            .attr("ABSTRACT", function (d) { return d.ABSTRACT })
            .attr("AUTHORS", function (d) { return d.AUTHORS })
            .style("fill", function (d) { return color(d.Conference) })
            .style("stroke", "#000000" )
            .style("stroke-width", 1)
            .on("mouseover", highlight)
            .on("mouseleave", doNotHighlight )
            .on("click", function(d){
        
              d3.select('#info_TYPE').text(d.TYPE) 
              d3.select('#info_ARCHITECTURE').text(d.ARCHITECTURE) 
              d3.select('#info_TECHNOLOGY').text(d.TECHNOLOGY) 
              d3.select('#info_AREA').text(d.AREA+" [mm^2]") 
              d3.select('#info_TITLE').text(d.TITLE) 
              d3.select('#info_AUTHORS').text(d.AUTHORS) 
              d3.select('#info_ABSTRACT').text(d.ABSTRACT)
    
              d3.selectAll(".dot").style("fill", function (d) { return color(d.Conference) })

              d3.selectAll(".dot").filter(function() {
                return d3.select(this).attr("TITLE") == d.TITLE;
              }).style("fill", "#ffff00").attr("r", 8)
       
            })


          // Add the line 1
          svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "#00FF00")
            .attr("stroke-width", 3)
            .attr("d", d3.line()
            .x(function(d) { return x(d.sndr_a) })
            .y(function(d) { return y(d.p_fs_pJ_a) })
            )

            // Add the line 2
          svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "#FFCA61")
          .attr("stroke-width", 3)
          .attr("d", d3.line()
          .x(function(d) { return x(d.sndr_b) })
          .y(function(d) { return y(d.p_fs_pJ_b) })
          )


            var legendRectSize = 15
            var legendSpacing = 1
        
            var legend = svg.selectAll('.legend')                     
              .data(color.domain())                                   
              .enter()                                                
              .append('g')                                            
              .attr('class', 'legend')                                
              .attr('transform', function(d, i) {                     
                if (i==0) {var horz = 50; var vert = 0;}
                if (i==1) {var horz = 150; var vert = 0;}
                // if (i==2) {var horz = 300; var vert = 0;}
                // if (i==3) {var horz = 200; var vert = 20;}
                                  
                return 'translate(' + horz + ',' + vert + ')';
                        
              });                                                     
        
            legend.append('rect')                                     
              .attr('width', legendRectSize)                          
              .attr('height', legendRectSize)                         
              .style('fill', color)                                   
              .style('stroke', color);                                
              
            legend.append('text')                                     
              .attr('x', legendRectSize + legendSpacing)              
              .attr('y', legendRectSize - legendSpacing)              
              .text(function(d) { return d; }); 

              svg.append("text")
              .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", width*2/3)
              .attr("y", height + 20)
              .text("SNDR @ f_in,hf  [dB]");

          
              svg.append("text")
              .attr("class", "y label")
              .attr("text-anchor", "end")
              .attr("x", -height/3)
              .attr("y", -25)
              .attr("dy", ".75em")
              .attr("transform", "rotate(-90)")
              .text("P/fsnyq [pJ]");

              svg.append("rect")
              .attr("width", 15)
              .attr("height", 15)
              .attr("x", 250)
              .attr("y", 1)
              .attr("fill", "#00FF00")

              svg.append("text")
              // .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", 420)
              .attr("y", 15)
              .attr("fill", "#000000")
              .text("FOMW=1fJ/conv-step");

              svg.append("rect")
              .attr("width", 15)
              .attr("height", 15)
              .attr("x", 450)
              .attr("y", 1)
              .attr("fill", "#FFCA61")

              svg.append("text")
              // .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", 565)
              .attr("y", 15)
              .attr("fill", "#000000")
              .text("FOMS=185dB");

              update();
    })
    
}

// Aperture graph update  /////////////////////////////////////////////////////////////////
function update_graph_Aperture() {
    svg.selectAll("*").remove();

    d3.csv("data/data.csv", function(data) {

        // Add X axis
        var hh = height -30
        var x = d3.scaleLinear()
            .domain([10, 120])
            .range([ 0, width-30 ]);
        svg.append("g")
            .attr("transform", "translate(30," + hh + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var ww = 30
        var y = d3.scaleLog()
            .domain([10, 1000000000000])
            .range([ height-30, 0]);
        svg.append("g")
            .attr("transform", "translate(" + ww + ",0)")
            .call(d3.axisLeft(y));

          // Add the line 1
          svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", "#00FF00")
          .attr("stroke-width", 3)
          .attr("d", d3.line()
          .x(function(d) { return x(d.SNR_a) })
          .y(function(d) { return y(d.f_a) })
          )

          // Add the line 2
        svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#FFCA61")
        .attr("stroke-width", 3)
        .attr("d", d3.line()
        .x(function(d) { return x(d.SNR_b) })
        .y(function(d) { return y(d.f_b) })
        )

        // Color scale: give me a specie name, I return a color
        var color = d3.scaleOrdinal()
          .domain(["ISSCC", "VLSI"])
          .range([ "#ff0000ff", "#0000ffff"])

        // Highlight the specie that is hovered
        var highlight = function(d){
                
          selected_Conference = d.Conference

          d3.selectAll(".dot")
              .transition()
              .duration(200)
              // .style("fill", "lightgrey")
              .attr("r", 3)

          d3.selectAll("." + selected_Conference)
              .transition()
              .duration(200)
              .style("fill", color(selected_Conference))
              .attr("r", 7)
        }

        // Highlight the specie that is hovered
        var doNotHighlight = function(){
          d3.selectAll(".dot")
              .transition()
              .duration(200)
              // .style("fill", "lightgrey")
              .attr("r", 5 )
        }

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "dot " + d.Conference } )
            .attr("cx", function (d) { return x(d.SNDR_plot_dB); } )
            .attr("cy", function (d) { return y(d.fin_hf_Hz); } )
            .attr("r", 5)
            .attr("year", function (d) { return d.YEAR })
            .attr("type", function (d) { return d.TYPE })
            .attr("ARCHITECTURE", function (d) { return d.ARCHITECTURE })
            .attr("TECHNOLOGY", function (d) { return d.TECHNOLOGY })
            .attr("AREA", function (d) { return d.AREA })
            .attr("TITLE", function (d) { return d.TITLE })
            .attr("ABSTRACT", function (d) { return d.ABSTRACT })
            .attr("AUTHORS", function (d) { return d.AUTHORS })
            .style("fill", function (d) { return color(d.Conference) })
            .style("stroke", "#000000" )
            .style("stroke-width", 1)
            .on("mouseover", highlight)
            .on("mouseleave", doNotHighlight )
            .on("click", function(d){
        
              d3.select('#info_TYPE').text(d.TYPE) 
              d3.select('#info_ARCHITECTURE').text(d.ARCHITECTURE) 
              d3.select('#info_TECHNOLOGY').text(d.TECHNOLOGY) 
              d3.select('#info_AREA').text(d.AREA+" [mm^2]") 
              d3.select('#info_TITLE').text(d.TITLE) 
              d3.select('#info_AUTHORS').text(d.AUTHORS) 
              d3.select('#info_ABSTRACT').text(d.ABSTRACT)
    
              d3.selectAll(".dot").style("fill", function (d) { return color(d.Conference) })

              d3.selectAll(".dot").filter(function() {
                return d3.select(this).attr("TITLE") == d.TITLE;
              }).style("fill", "#ffff00").attr("r", 8)
       
            })


            var legendRectSize = 15
            var legendSpacing = 1
        
            var legend = svg.selectAll('.legend')                     
              .data(color.domain())                                   
              .enter()                                                
              .append('g')                                            
              .attr('class', 'legend')                                
              .attr('transform', function(d, i) {                     
                if (i==0) {var horz = 50; var vert = 0;}
                if (i==1) {var horz = 150; var vert = 0;}
                // if (i==2) {var horz = 40; var vert = 20;}
                // if (i==3) {var horz = 200; var vert = 20;}
                                  
                return 'translate(' + horz + ',' + vert + ')';
                        
              });                                                     
        
            legend.append('rect')                                     
              .attr('width', legendRectSize)                          
              .attr('height', legendRectSize)                         
              .style('fill', color)                                   
              .style('stroke', color);                                
              
            legend.append('text')                                     
              .attr('x', legendRectSize + legendSpacing)              
              .attr('y', legendRectSize - legendSpacing)              
              .text(function(d) { return d; }); 

              svg.append("text")
              .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", width*2/3)
              .attr("y", height + 20)
              .text("SNDR @ f_in,hf  [dB]");
          
              svg.append("text")
              .attr("class", "y label")
              .attr("text-anchor", "end")
              .attr("x", -height/3)
              .attr("y", -25)
              .attr("dy", ".75em")
              .attr("transform", "rotate(-90)")
              .text("f_in,hf [Hz]");
              
              svg.append("rect")
              .attr("width", 15)
              .attr("height", 15)
              .attr("x", 250)
              .attr("y", 1)
              .attr("fill", "#00FF00")

              svg.append("text")
              // .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", 360)
              .attr("y", 15)
              .attr("fill", "#000000")
              .text("Jitter=1psrms");

              svg.append("rect")
              .attr("width", 15)
              .attr("height", 15)
              .attr("x", 450)
              .attr("y", 1)
              .attr("fill", "#FFCA61")

              svg.append("text")
              // .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", 575)
              .attr("y", 15)
              .attr("fill", "#000000")
              .text("Jitter=0.1psrms");

              update();
    })
    
}

// Walden graph update /////////////////////////////////////////////////////////////////
function update_graph_Walden() {
    svg.selectAll("*").remove();

    d3.csv("data/data.csv", function(data) {

        // Add X axis
        var hh = height -30
        var x = d3.scaleLog()
            .domain([1, 100000000000])
            .range([ 0, width-30 ]);
        svg.append("g")
            .attr("transform", "translate(30," + hh + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var ww = 30
        var y = d3.scaleLog()
            .domain([0.1, 10000000])
            .range([ height-30, 0]);
        svg.append("g")
            .attr("transform", "translate(" + ww + ",0)")
            .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#000000")
        .attr("stroke-width", 3)
        .attr("d", d3.line()
        .x(function(d) { return x(d.ff) })
        .y(function(d) { return y(d.Envelope_a) })
        )

        // Color scale: give me a specie name, I return a color
        var color = d3.scaleOrdinal()
          .domain(["ISSCC", "VLSI"])
          .range([ "#ff0000ff", "#0000ffff"])

        // Highlight the specie that is hovered
        var highlight = function(d){
        
          selected_Conference = d.Conference
        
          d3.selectAll(".dot")
              .transition()
              .duration(200)
              // .style("fill", "lightgrey")
              .attr("r", 3)
        
          d3.selectAll("." + selected_Conference)
              .transition()
              .duration(200)
              .style("fill", color(selected_Conference))
              .attr("r", 7)
        }

        // Highlight the specie that is hovered
        var doNotHighlight = function(){
          d3.selectAll(".dot")
              .transition()
              .duration(200)
              // .style("fill", "lightgrey")
              .attr("r", 5 )
        }

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "dot " + d.Conference } )
            .attr("cx", function (d) { return x(d.fsnyq_Hz); } )
            .attr("cy", function (d) { return y(d.FOMW_hf_fJ__conv_step); } )
            .attr("r", 5)
            .attr("year", function (d) { return d.YEAR })
            .attr("type", function (d) { return d.TYPE })
            .attr("ARCHITECTURE", function (d) { return d.ARCHITECTURE })
            .attr("TECHNOLOGY", function (d) { return d.TECHNOLOGY })
            .attr("AREA", function (d) { return d.AREA })
            .attr("TITLE", function (d) { return d.TITLE })
            .attr("ABSTRACT", function (d) { return d.ABSTRACT })
            .attr("AUTHORS", function (d) { return d.AUTHORS })
            .style("fill", function (d) { return color(d.Conference) })
            .style("stroke", "#000000" )
            .style("stroke-width", 1)
            .on("mouseover", highlight)
            .on("mouseleave", doNotHighlight )
            .on("click", function(d){
        
              d3.select('#info_TYPE').text(d.TYPE) 
              d3.select('#info_ARCHITECTURE').text(d.ARCHITECTURE) 
              d3.select('#info_TECHNOLOGY').text(d.TECHNOLOGY) 
              d3.select('#info_AREA').text(d.AREA+" [mm^2]") 
              d3.select('#info_TITLE').text(d.TITLE) 
              d3.select('#info_AUTHORS').text(d.AUTHORS) 
              d3.select('#info_ABSTRACT').text(d.ABSTRACT)
    
              d3.selectAll(".dot").style("fill", function (d) { return color(d.Conference) })

              d3.selectAll(".dot").filter(function() {
                return d3.select(this).attr("TITLE") == d.TITLE;
              }).style("fill", "#ffff00").attr("r", 8)
       
            })

            var legendRectSize = 15
            var legendSpacing = 1
        
            var legend = svg.selectAll('.legend')                     
              .data(color.domain())                                   
              .enter()                                                
              .append('g')                                            
              .attr('class', 'legend')                                
              .attr('transform', function(d, i) {                     
                if (i==0) {var horz = 100; var vert = 0;}
                if (i==1) {var horz = 200; var vert = 0;}
                // if (i==2) {var horz = 40; var vert = 20;}
                // if (i==3) {var horz = 200; var vert = 20;}
                                  
                return 'translate(' + horz + ',' + vert + ')';
                        
              });                                                     
        
            legend.append('rect')                                     
              .attr('width', legendRectSize)                          
              .attr('height', legendRectSize)                         
              .style('fill', color)                                   
              .style('stroke', color);                                
              
            legend.append('text')                                     
              .attr('x', legendRectSize + legendSpacing)              
              .attr('y', legendRectSize - legendSpacing)              
              .text(function(d) { return d; }); 

              svg.append("text")
              .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", width*2/3)
              .attr("y", height + 20)
              .text("f_snyq [Hz]");
          
              svg.append("text")
              .attr("class", "y label")
              .attr("text-anchor", "end")
              .attr("x", -height/3)
              .attr("y", -25)
              .attr("dy", ".75em")
              .attr("transform", "rotate(-90)")
              .text("FOM_W,hf [fJ/conv-step]");
    
              svg.append("rect")
              .attr("width", 15)
              .attr("height", 15)
              .attr("x", 300)
              .attr("y", 1)
              .attr("fill", "#000000")

              svg.append("text")
              // .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", 380)
              .attr("y", 15)
              .attr("fill", "#000000")
              .text("Envelope");

              update();
      })
    
}

// Schreier graph update /////////////////////////////////////////////////////////////////
function update_graph_Schreier () {
    svg.selectAll("*").remove();

    d3.csv("data/data.csv", function(data) {

        // Add X axis
        var hh = height -30
        var x = d3.scaleLog()
            .domain([1, 1000000000000])
            .range([ 0, width-30 ]);
        svg.append("g")
            .attr("transform", "translate(30," + hh + ")")
            .call(d3.axisBottom(x));

        // Add Y axis
        var ww = 30
        var y = d3.scaleLinear()
            .domain([100, 200])
            .range([ height-30, 0]);
        svg.append("g")
            .attr("transform", "translate(" + ww + ",0)")
            .call(d3.axisLeft(y));

        // Add the line
        svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#000000")
        .attr("stroke-width", 3)
        .attr("d", d3.line()
        .x(function(d) { return x(d.ff) })
        .y(function(d) { return y(d.Envelope_b) })
        )

        // Color scale: give me a specie name, I return a color
        var color = d3.scaleOrdinal()
          .domain(["ISSCC", "VLSI"])
          .range([ "#ff0000ff", "#0000ffff"])

        // Highlight the specie that is hovered
        var highlight = function(d){
        
          selected_Conference = d.Conference
        
          d3.selectAll(".dot")
              .transition()
              .duration(200)
              // .style("fill", "lightgrey")
              .attr("r", 3)
        
          d3.selectAll("." + selected_Conference)
              .transition()
              .duration(200)
              .style("fill", color(selected_Conference))
              .attr("r", 7)
        }

        // Highlight the specie that is hovered
        var doNotHighlight = function(){
          d3.selectAll(".dot")
              .transition()
              .duration(200)
              // .style("fill", "lightgrey")
              .attr("r", 5 )
        }

        // Add dots
        svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            .attr("class", function (d) { return "dot " + d.Conference } )
            .attr("cx", function (d) { return x(d.fsnyq_Hz); } )
            .attr("cy", function (d) { return y(d.FOMS_hf_dB); } )
            .attr("r", 5)
            .attr("year", function (d) { return d.YEAR })
            .attr("type", function (d) { return d.TYPE })
            .attr("ARCHITECTURE", function (d) { return d.ARCHITECTURE })
            .attr("TECHNOLOGY", function (d) { return d.TECHNOLOGY })
            .attr("AREA", function (d) { return d.AREA })
            .attr("TITLE", function (d) { return d.TITLE })
            .attr("ABSTRACT", function (d) { return d.ABSTRACT })
            .attr("AUTHORS", function (d) { return d.AUTHORS })
            .style("fill", function (d) { return color(d.Conference) })
            .style("stroke", "#000000" )
            .style("stroke-width", 1)
            .on("mouseover", highlight)
            .on("mouseleave", doNotHighlight )
            .on("click", function(d){
        
              d3.select('#info_TYPE').text(d.TYPE) 
              d3.select('#info_ARCHITECTURE').text(d.ARCHITECTURE) 
              d3.select('#info_TECHNOLOGY').text(d.TECHNOLOGY) 
              d3.select('#info_AREA').text(d.AREA+" [mm^2]") 
              d3.select('#info_TITLE').text(d.TITLE) 
              d3.select('#info_AUTHORS').text(d.AUTHORS) 
              d3.select('#info_ABSTRACT').text(d.ABSTRACT)
    
              d3.selectAll(".dot").style("fill", function (d) { return color(d.Conference) })

              d3.selectAll(".dot").filter(function() {
                return d3.select(this).attr("TITLE") == d.TITLE;
              }).style("fill", "#ffff00").attr("r", 8)
       
            })

            var legendRectSize = 15
            var legendSpacing = 1
        
            var legend = svg.selectAll('.legend')                     
              .data(color.domain())                                   
              .enter()                                                
              .append('g')                                            
              .attr('class', 'legend')                                
              .attr('transform', function(d, i) {                     
                if (i==0) {var horz = 100; var vert = 0;}
                if (i==1) {var horz = 200; var vert = 0;}
                // if (i==2) {var horz = 40; var vert = 20;}
                // if (i==3) {var horz = 200; var vert = 20;}
                                  
                return 'translate(' + horz + ',' + vert + ')';
                        
              });                                                     
        
            legend.append('rect')                                     
              .attr('width', legendRectSize)                          
              .attr('height', legendRectSize)                         
              .style('fill', color)                                   
              .style('stroke', color);                                
              
            legend.append('text')                                     
              .attr('x', legendRectSize + legendSpacing)              
              .attr('y', legendRectSize - legendSpacing)              
              .text(function(d) { return d; }); 

              svg.append("text")
              .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", width*2/3)
              .attr("y", height + 20)
              .text("f_snyq [Hz]");
          
              svg.append("text")
              .attr("class", "y label")
              .attr("text-anchor", "end")
              .attr("x", -height/3)
              .attr("y", -25)
              .attr("dy", ".75em")
              .attr("transform", "rotate(-90)")
              .text("FOM_S,hf [dB]");
    

              svg.append("rect")
              .attr("width", 15)
              .attr("height", 15)
              .attr("x", 300)
              .attr("y", 1)
              .attr("fill", "#000000")

              svg.append("text")
              // .attr("class", "x label")
              .attr("text-anchor", "end")
              .attr("x", 380)
              .attr("y", 15)
              .attr("fill", "#000000")
              .text("Envelope");

              
              update();
    })
    
}