$(document).ready(function(){
    app.c.init();
});

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

var app={};
app.m={};
app.v={};
app.c={};
app.t={};

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////

app.m.bounds=false;
app.m.paper=false;
app.m.appName="LongNow Chalk";

///////////////////////////////////////////////////////
///////////////////////////////////////////////////////begin controllers

app.c.init=function(){
  app.v.init();  
  app.v.listeners();
};

///////////////////////////////////////////////////////end controllers
///////////////////////////////////////////////////////begin views

app.v.init=function(){
    //app.m.bounds=app.v.initBounds();
    zi.css();
    $("body").html(app.t.layout() );
    app.m.paper=app.v.initPaper();
    app.v.initialReveal();
};

app.v.initBounds=function(){
	var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    y = w.innerHeight|| e.clientHeight|| g.clientHeight;
  var b={};
  b.right=x-20;
  b.left=0;
  b.top=0;
  b.bottom=y;
  b.centerX=b.right/2;
  b.centerY=b.bottom/2;
  b.width=b.right-b.left;
  b.height=b.bottom-b.top;

  return b;
};


app.v.initialReveal=function(){
};

app.v.initPaper=function(){
  var canvas = document.getElementById('paper');
		// Create an empty project and a view for the canvas:
		paper.setup(canvas);
		
		/*
		// Create a Paper.js Path to draw a line into it:
		var path = new paper.Path();
		// Give the stroke a color
		path.strokeColor = 'black';
		var start = new paper.Point(100, 100);
		// Move to start and draw a line from there
		path.moveTo(start);
		// Note that the plus operator on Point objects does not work
		// in JavaScript. Instead, we need to call the add() function:
		path.lineTo(start.add([ 200, -50 ]));
		*/
		// Now I'll create a circle function that takes an x, y, and r
		var circle=function(x,y,r){
  		var path = new paper.Path.Circle({
      	//center: paper.view.center,
      	center:[x,y],
      	radius: r,
      	strokeColor:"#fff",
      	strokeWidth:2
      });
		  
		}

    var orbits=24;
    var r=0;
    var planets=60;
    var theta_interval=360/planets;
    for (var i=0;i<orbits;i++){
      r+=20;
      for (var j=0;j<planets;j++){
        var theta=j*theta_interval;
        var position=geo.getPoint(paper.view.bounds.centerX,paper.view.bounds.centerY,r,theta)
        circle(position.x2,position.y2,_.random(2,4));
      }
    }

		// Draw the view now:
		paper.view.draw();
};

app.v.listeners=function(){

};

///////////////////////////////////////////////////////end views
///////////////////////////////////////////////////////begin templates

app.t.layout=function(){
  var d="";
  d+="<canvas id='paper' data-paper-resize='true'></canvas>";
  return d;
};

///////////////////////////////////////////////////////end templates
///////////////////////////////////////////////////////begin css

zi={};
zi.config=function(){
    var css={
      "body":{
        "padding":"0",
        "margin":"0",
        "border":"0",
        "background":"#555"
      },
      "canvas":{
        "margin":"0",
        "padding":"0",
        "border":"0"
      },
      "div#canvas":{
        "z-index":"-1",
        "position":"fixed",
        "top":"0px",
        "left":"0px",
        "width":"100%",
        "height":app.m.bounds.height+"px",
        "padding":"0",
        "margin":"0",
        "border":"0"
      },
      "div#tweetles":{
        "position":"absolute",
        "top":"0px",
        "left":"0px",
        "margin-right":"75px"
      },
      "div.tweetle":{
        "display":"none",
        "margin":"30px",
        "margin-right":"0px",
        "background":"#333",
        "font-family":"sans-serif",
        "color":"#fff",
        "padding":"10px",
        "border":"1px solid #333",
        "opacity": 0.8,
        "filter": "alpha(opacity=80)" /* For IE8 and earlier */
      },
      "div.tweetle div.created_at":{
        "text-align":"right",
        "font-size":"0.7em",
        "border-bottom":"1px solid #333"
      },
      "div.tweetle div.user":{
        "text-align":"right",
        "border-top":"1px solid #333",
        "cursor":"pointer"
      },
      "div.tweetle div.message":{
        "font-size":""+Math.max(1.5,(app.m.bounds.right/600))+"em"
      },
      "div#pseudomodal":{
        "display":"none",
        "position":"fixed",
        "width":app.m.bounds.right-120+"px",
        "top":Math.floor(app.m.bounds.bottom/3)+"px",
        "left":"0px",
        "padding":"0",
        "z-index":2,
        "opacity":0.9,
        "filter":"alpha(opacity=90)",
        "margin":"60px"
      },
      "div#pseudomodal input[type=text]":{
        "width":"100%",
        "border":"1px solid #000",
        "padding":"20px 0 20px 0",
        "font-size":""+Math.max(1.5,(app.m.bounds.right/400))+"em",
        "text-align":"center",
        "background":"#000",
        "color":"#fff"
      },
      "div#tweetles h1":{
        "display":"none"
      }
    };
    return css;
};
zi.transform=function(css){
    var c="";
    for (var selector in css){
        c+=selector+"{";
        for (var property in css[selector]){
            c+=property+" : "+css[selector][property]+";";
        }
        c+="}";
    }
    return c;
};
zi.css=function(){
    if ($("head#zi").length<1){
        $("head").append("<style type='text/css' id='zi'></style>");
    }
    $("head style#zi").html( this.transform( this.config() ) );
};
/////////////////////////////////////////////////////// end css section
///////////////////////////////////////////////////////