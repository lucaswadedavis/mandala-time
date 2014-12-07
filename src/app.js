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
  var d=new Date();
  var chnc = new Chance(d.toDateString() );
  //var chnc = new Chance();
	// Create an empty project and a view for the canvas:
	paper.setup(canvas);
	
	// Now I'll create a circle function that takes an x, y, and r
	var circle=function(x,y,r){
		var path = new paper.Path.Circle({
    	//center: paper.view.center,
    	center:[x,y],
    	radius: r,
    	strokeColor:"#fff",
    	strokeWidth:2
    });
		  
	};
	
	var diamond=function(x,y,l,w1,w2){
    var p=new paper.Path;
    p.strokeColor="#fff";
    p.add([x,y]);
    p.add([x+(l/2),y-(l/2)]);
    p.add([x+l,y]);
    p.add([x+(l/2),y+(l/2)]);
    p.add([x,y]);
    return p;
	};
	
	var petal=function(x,y,l,w1,w2){
    var p=new paper.Path;
    var w1=w1||2;
    p.add([x+l,y]);
    p.add(new paper.Segment(
      new paper.Point([x,y]),
      new paper.Point([0,-l/w1]),
      new paper.Point([0,l/w1])
      )
    );
    p.add([x+l,y]);
    p.strokeColor="#fff";
    return p;
	};

  var orbits=24;
  var r=0;
  var planets=60;
  var theta_interval=360/planets;
  for (var i=0;i<orbits;i++){
    r+=20;
    var planetRadius=chnc.integer({min:2,max:30});
    var w1=chnc.integer({min:1,max:3});
    var ringType=chnc.pick(["petal","petal","circle","diamond"]);
    for (var j=0;j<planets;j++){
      var theta=j*theta_interval;
      var position=geo.getPoint(paper.view.bounds.centerX,paper.view.bounds.centerY,r,theta);
      if (ringType=="circle"){
        circle(position.x2,position.y2,planetRadius);   
      }else if (ringType=="diamond"){
        diamond(
          paper.view.bounds.centerX+r,
          paper.view.bounds.centerY,
          planetRadius,
          w1
          ).rotate(theta,paper.view.center);
        
      }else{
        petal(
          paper.view.bounds.centerX+r,
          paper.view.bounds.centerY,
          planetRadius,
          w1
          ).rotate(theta,paper.view.center);
      }            
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
  //d+="<div id='yesterday'>Yesterday's Mandalla Clock</div>";
  //d+="<div id='tomorrow'>Tomorrow's Mandalla Clock</div>";
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
        "border":"0",
        "position":"fixed"
      },
      "canvas#paper":{
        "z-index":"-1"
      },
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