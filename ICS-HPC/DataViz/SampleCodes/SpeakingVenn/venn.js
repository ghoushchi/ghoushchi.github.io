var complete=1;
let features;
d3.csv('ascii_table.csv')
  .then(data => {
  	features = data;
   	console.log(features[0].link);
  });

function handleClick(event){
  	vali = document.getElementById("myVal").value;
    console.log(vali);
  	if (vali!="" && complete==1)
    {
      complete=0;
    	draw(vali);
    }
    return false;
}

function draw(val) {
  var a = ""
  d3.select("body").select("#texti")
  .text("")
  document.getElementById("imgi").src="";
  data = val.split("")
	ii = val.split("").length
  firsti=1;
  myLoop (ii);
  
  
  function myLoop (i) {
    
     setTimeout(function () {
       
       	firsti=0;
        x = data[ii-i];
        console.log(x);
        a += " " + x + ":" + x.charCodeAt(0);
        linki = features[x.charCodeAt(0)].link;
		linki = "./Venn_Pictures/"+linki;
        document.getElementById("imgi").src=linki;
        fadeIn(document.getElementById("imgi"), 500);
       	d3.select("body").select("#texti")
        .text(a)
             
        if (--i) myLoop(i);
        else complete=1;
     }, firsti ? 0 : 500)
	}
  
}

function fadeIn(el, time) {
     el.style.opacity = 0;
     el.style.display = "block";

     var last = +new Date();
     var tick = function() {
          el.style.opacity = +el.style.opacity + (new Date() - last) / time;
          last = +new Date();

          if (+el.style.opacity < 1) {
               (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
          }
     };
     tick();
}

