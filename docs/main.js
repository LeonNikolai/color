let rgb = {r:127.5, g:127.5, b:127.5, var:255},
	hsl = {h:0, s:0, l:50, w: 50, b:50, v:0, sv:0},
	hsv = {s:0, v:50},
	xyz = {x:0, y:0, z:0};

let active = 1
const 
	id = id =>document.getElementById(String(id)), 
	dom = {
		r : id("red"),
		g : id("green"),
		b : id("blue"),
		h : id("hue"),
		s : id("saturation"),
		l : id("lightness"),
		w : id("whiteness"),
		bl : id("blackness"),
		v : id("value"),
		sv : id("sv"),
		hex : id("hex")
	};
const init = () => {
	rgb.r			= Number(getparam("r"))
	rgb.g			= Number(getparam("g"))
	rgb.b			= Number(getparam("b"))
	uppdateRGB();
	uppdate();
};


function getparam (x) {
	let y = new URLSearchParams(document.location.search.substring(1)).get(x);
	if(y == null){
		return Math.random() * (255 - 0) + 0;
	} else {
		return Number(y);
	}
};

const uppdateRGB = () => {
	RGB_HSL(rgb.r,rgb.g,rgb.b);
	RGB_HWB(rgb.r,rgb.g,rgb.b);
	rgb2hsv(rgb.r,rgb.g,rgb.b);
};
const uppdateHBW = () => {
	let h = +(hsl.h)
	hwbToRgb(hsl.h,hsl.w,hsl.b);
	RGB_HSL(rgb.r,rgb.g,rgb.b);
	rgb2hsv(rgb.r,rgb.g,rgb.b);
	hsl.h = h;
};
const uppdateHSL = () => {
	hslToRgb(hsl.h,hsl.s,hsl.l);
	rgb2hsv(rgb.r,rgb.g,rgb.b);
	RGB_HWB(rgb.r,rgb.g,rgb.b);
};
const uppdate = (me) => {
	dom.hex.value = RGB_HEX(rgb.r,rgb.g,rgb.b);
	dom.r.value = dom.r.nextSibling.value = (rgb.r/255*rgb.var).toFixed(0)
	dom.g.value = dom.g.nextSibling.value = (rgb.g/255*rgb.var).toFixed(0)
	dom.b.value = dom.b.nextSibling.value = (rgb.b/255*rgb.var).toFixed(0)
	dom.h.value = dom.h.nextSibling.value = hsl.h.toFixed(0)
	dom.s.value = dom.s.nextSibling.value = hsl.s.toFixed(0)
	dom.l.value = dom.l.nextSibling.value = hsl.l.toFixed(0)
	dom.w.value = dom.w.nextSibling.value = hsl.w.toFixed(0)
	dom.bl.value = dom.bl.nextSibling.value = hsl.b.toFixed(0)
	dom.v.value  = dom.v.nextSibling.value  = hsl.v.toFixed(0)
	dom.sv.value = dom.sv.nextSibling.value = hsl.sv.toFixed(0)
	css_var("hue",hsl.h)
	css_var("saturation",hsl.s)
	css_var("lightness",hsl.l)
	css_var("red",rgb.r)
	css_var("green",rgb.g)
	css_var("blue",rgb.b)
	css_var("whiteness",hsl.w)
	css_var("blackness",hsl.b)
};

const setURL = () => history.replaceState(null, '', document.location.pathname + "?r=" + rgb.r.toFixed(0) + "&g=" + rgb.g.toFixed(0) + "&b=" + rgb.b.toFixed(0))
for (let i of document.getElementsByClassName("in")) {
	i.addEventListener("change",function() {
		setURL();
	  });
}
const css_var = (x,y) => document.documentElement.style.setProperty('--'+ String(x), String(y));

const RGB_HSL = (r,g,b) => {
	r /= 255
	g /= 255
	b /= 255
	let min = Math.min(r,g,b)	,
		max = Math.max(r,g,b)	,
		c	 = max - min		,
		h,s,l;

	h 	= c		== 0 ?	0
		: max	== r ?	((g - b) / c) % 6
		: max	== g ?	( b - r) / c  + 2
		: 				( r - g) / c  + 4;
	h = h * 60;
	if(h < 0) h += 360
	l = (max + min) / 2
	s = c == 0 ? 0 
	  : c / (1 - Math.abs(2 * l - 1));

	hsl.h = h
	hsl.s = s * 100
	hsl.l = l * 100

	hsl.v = max * 100
	hsl.sv = c/max * 100
}
const RGB_HWB= (r,g,b) => {
	hsl.w = (Math.min(r,g,b)/255*100)
	hsl.b = (100 - Math.max(r,g,b)/255*100)
}

const RGB_HEX = (r,g,b) => ((1 << 24) + (r << 16) + (g << 8) + parseInt(b)).toString(16).slice(1).toUpperCase();

const minmaxsnap = (v) => v.value	= Number(v.value) > Number(v.max)   ? v.max
									: Number(v.min)   > Number(v.value) ? v.min
									: Number(v.value);


const hwbToRgb = (h, w, b) => {
	h /= 360,w /= 100,b /= 100
	let tot = w + b,l;
	if (tot > 1) {
	  w /= tot;
	  b /= tot;
	}
	l=(1-w-b)
	rgb.r = (hue2rgb(0, 1, h + 1.0/3.0)*l+w)*255
	rgb.g = (hue2rgb(0, 1, h)          *l+w)*255
	rgb.b = (hue2rgb(0, 1, h - 1.0/3.0)*l+w)*255
}


const hue2rgb = (p, q, t) => { 

	// switch (region)
    // {
    //     case 0:
    //         rgb.r = hsv.v; rgb.g = t; rgb.b = p;
    //         break;
    //     case 1:
    //         rgb.r = q; rgb.g = hsv.v; rgb.b = p;
    //         break;
    //     case 2:
    //         rgb.r = p; rgb.g = hsv.v; rgb.b = t;
    //         break;
    //     case 3:
    //         rgb.r = p; rgb.g = q; rgb.b = hsv.v;
    //         break;
    //     case 4:
    //         rgb.r = t; rgb.g = p; rgb.b = hsv.v;
    //         break;
    //     default:
    //         rgb.r = hsv.v; rgb.g = p; rgb.b = q;
    //         break;
    // }
	if(t < 0.0) t += 1.0;
	if(t > 1.0) t -= 1.0;
	if(t < 1.0/6.0) return p + (q - p) * 6.0 * t;
	if(t < 1.0/2.0) return q;
	if(t < 2.0/3.0) return p + (q - p) * (2.0/3.0 - t) * 6.0;
					return p;
	}

const hslToRgb = (h, s, l) => {
	h /= 360
	s /= 100
	l /= 100
	let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
	p = 2 * l - q;
	rgb.r = hue2rgb(p, q, h + 1.0/3.0)*255;
	rgb.g = hue2rgb(p, q, h)*255;
	rgb.b = hue2rgb(p, q, h - 1.0/3.0)*255;
}
function hexToRgb(hex) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
	  return r + r + g + g + b + b;
	});
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	  rgb.r = parseInt(result[1], 16);
	  rgb.g = parseInt(result[2], 16);
	  rgb.b = parseInt(result[3], 16);
  }




  function rgb2hsv (r,g,b) {
	
	r/=255; g/=255; b/=255;
	var min = Math.min(r,g,b);
	var max = Math.max(r,g,b);
	hsl.sv = (max - min)/max*100;
	hsl.v = max*100;
   }





window.addEventListener('resize', function (event) {
resizeCanvas(Math.min(document.documentElement.clientHeight, document.documentElement.clientHeight), Math.min(document.documentElement.clientHeight, document.documentElement.clientHeight));
camera(500, -500, 500, 0, 0, 0, 0, 1, 0);
});

p5.prototype.orbitControl = function(sensitivityX, sensitivityY, sensitivityZ) {
	this._assert3d('orbitControl');
	p5._validateParameters('orbitControl', arguments);
  
	// If the mouse is not in bounds of the canvas, disable all behaviors:
	const mouseInCanvas =
	  this.mouseX < this.width &&
	  this.mouseX > 0 &&
	  this.mouseY < this.height &&
	  this.mouseY > 0;
	if (!mouseInCanvas) return;
  
	const cam = this._renderer._curCamera;
  
	if (typeof sensitivityX === 'undefined') {
	  sensitivityX = 1;
	}
	if (typeof sensitivityY === 'undefined') {
	  sensitivityY = sensitivityX;
	}
	if (typeof sensitivityZ === 'undefined') {
	  sensitivityZ = 0.5;
	}
  
	// default right-mouse and mouse-wheel behaviors (context menu and scrolling,
	// respectively) are disabled here to allow use of those events for panning and
	// zooming
  
	// disable context menu for canvas element and add 'contextMenuDisabled'
	// flag to p5 instance
	if (this.contextMenuDisabled !== true) {
	  this.canvas.oncontextmenu = () => false;
	  this._setProperty('contextMenuDisabled', true);
	}
  
	// disable default scrolling behavior on the canvas element and add
	// 'wheelDefaultDisabled' flag to p5 instance
	if (this.wheelDefaultDisabled !== true) {
	  this.canvas.onwheel = () => false;
	  this._setProperty('wheelDefaultDisabled', true);
	}
  
	const scaleFactor = this.height < this.width ? this.height : this.width;
  
  
	if (this.mouseIsPressed) {
	  if (this.mouseButton === this.LEFT) {
		const deltaTheta =
		  -sensitivityX * (this.mouseX - this.pmouseX) / scaleFactor;
		const deltaPhi =
		  sensitivityY * (this.mouseY - this.pmouseY) / scaleFactor;
		this._renderer._curCamera._orbit(deltaTheta, deltaPhi, 0);
	  }
	}
	return this;
  };
  function setup() {
	  smooth();
	  createCanvas(Math.min(document.documentElement.clientHeight, document.documentElement.clientHeight),Math.min(document.documentElement.clientHeight, document.documentElement.clientHeight), WEBGL).parent('viewrgb');
	  colorMode(RGB, 1);
	  angleMode(DEGREES);
	  camera(500, -500, 500, 0, 0, 0, 0, 1, 0);
	}
	;
	let mode = 1;
	function draw() {
	  let x = rgb.r / 255;
	  let y = rgb.g / 255;
	  let z = rgb.b / 255;
	  orbitControl(7, 7, 0)
	  background([0.1,0.1,0.1]);
	  scale(Math.min(document.documentElement.clientHeight, document.documentElement.clientHeight)/3);
	  if (mode == 1) {
		let rgb_vertex = (a, b, c) => { fill(a, b, c); vertex(a, b, c); };
		let red = () => { rgb_vertex(1, 0, 0); };
		let green = () => { rgb_vertex(0, 1, 0); };
		let blue = () => { rgb_vertex(0, 0, 1); };
		let magenta = () => { rgb_vertex(1, 0, 1); };
		let yellow = () => { rgb_vertex(1, 1, 0); };
		let cyan = () => { rgb_vertex(0, 1, 1); };
		let white = () => { rgb_vertex(1, 1, 1); };
		let black = () => { rgb_vertex(0, 0, 0); };
		let rotation = 0
		let rotation2 = 0
		let type = y
		switch(active) {
			case 0:
				rotation = 90
				type = x
				red = () => { rgb_vertex(x, 0, 0); };
				magenta = () => { rgb_vertex(x, 0, 1); };
				yellow = () => { rgb_vertex(x, 1, 0); };
				white = () => { rgb_vertex(x, 1, 1); };
				break; 
			case 1:
				rotation = 0
				green = () => { rgb_vertex(0, y, 0); };
				yellow = () => { rgb_vertex(1, y, 0); };
				cyan = () => { rgb_vertex(0, y, 1); };
				white = () => { rgb_vertex(1, y, 1); };
				break; 
			case 3:
				rotation2 = 180
				type = 1-y
				black = () => { rgb_vertex(0, y, 0); };
				red = () => { rgb_vertex(1, y, 0); };
				magenta = () => { rgb_vertex(1, y, 1); };
				blue = () => { rgb_vertex(0, y, 1); };
				break;  
			case 2:
				rotation2 = 90
				rotation = 0
				type = z
				blue = () => { rgb_vertex(0, 0, z); };
				cyan = () => { rgb_vertex(0, 1, z); };
				magenta = () => { rgb_vertex(1, 0, z); };
				white = () => { rgb_vertex(1, 1, z); };
				break;  
			case 4:
				rotation = -90
				type = 1-x
				blue = () => { rgb_vertex(x, 0, 1); };
				cyan = () => { rgb_vertex(x, 1, 1); };
				green = () => { rgb_vertex(x, 1, 0); };
				black = () => { rgb_vertex(x, 0, 0); };
				break;  
		}
		push();
		beginShape(TRIANGLES);
		noStroke();
		white();red();magenta();
		white();red();yellow();
		white();green();cyan();
		white();green();yellow();
		white();blue();magenta();
		white();blue();cyan();
		black();cyan();blue();
		black();cyan(); green();
		black();yellow();green();
		black();yellow();red();
		black();magenta();red();
		black();magenta();blue();
		rotateX(90);
		translate(-0.5, -0.5, -0.5);
		endShape();
		pop();
		push();
		noFill();
		stroke(0.8, 0.8, 0.8);
		strokeWeight(1);
		if (Math.round(type * 100) / 100 == 1) {
			noStroke();
		}
		rotateY(rotation);
		rotateX(rotation2);
		translate(0, 0, type / 2);
		box(1, 1, 1 - type);
		pop();
		push();
		translate(x - 0.5, 1 - z - 0.5, y - 0.5);
		rotateX(90);
		translate(0, 0.006, 0);
		noStroke();
		fill(1, 1, 1);
		rotateZ(-rotation);
		rotateX(rotation2);
		if (rotation == 180) {translate(0,0.0012,0)}
		cylinder(0.1, 0.01);
		fill(x, y, z);
		translate(0, 0.01, 0);
		cylinder(0.08, 0.02);
		pop();
	  }
	  else if (mode == 0) {
		  push();
		  stroke(0.8, 0.8, 0.8);
		  noFill();
		  box(1);
		  pop();
		  push();
		  noStroke();
		  translate(0.5, 0.5, 0.5);
		  fill(1, 1, 0);
		  sphere(0.05);
		  translate(-1, 0, 0);
		  fill(0, 1, 0);
		  sphere(0.05);
		  translate(0, -1, 0);
		  fill(0, 1, 1);
		  sphere(0.05);
		  translate(1, 0, 0);
		  fill(1, 1, 1);
		  sphere(0.05);
		  translate(0, 0, -1);
		  fill(1, 0, 1);
		  sphere(0.05);
		  translate(0, 1, 0);
		  fill(1, 0, 0);
		  sphere(0.05);
		  translate(-1, 0, 0);
		  fill(0, 0, 0);
		  sphere(0.05);
		  translate(0, -1, 0);
		  fill(0, 0, 1);
		  sphere(0.05);
		  pop();
		  push();
		  fill(x, y, z);
		  noStroke();
		  translate(x - 0.5, 1 - z - 0.5, y - 0.5);
		  sphere(0.1);
		  pop();
		  push();
		  stroke(1, 0, 0);
		  line(0.5, 1 - z - 0.5, y - 0.5, -0.5, 1 - z - 0.5, y - 0.5);
		  stroke(0, 1, 0);
		  line(x - 0.5, 1 - z - 0.5, -0.5, x - 0.5, 1 - z - 0.5, 0.5);
		  stroke(0, 0, 1);
		  line(x - 0.5, -0.5, y - 0.5, x - 0.5, 0.5, y - 0.5);
		  stroke(1, 1, 1);
		  pop();
	  }
	  else {
		  push();
		  stroke(0.8, 0.8, 0.8);
		  noFill();
		  box(1);
		  pop();
		  push();
		  noStroke();
		  translate(0.5, 0.5, 0.5);
		  fill(1, 1, 0);
		  sphere(0.05);
		  translate(-1, 0, 0);
		  fill(0, 1, 0);
		  sphere(0.05);
		  translate(0, -1, 0);
		  fill(0, 1, 1);
		  sphere(0.05);
		  translate(1, 0, 0);
		  fill(1, 1, 1);
		  sphere(0.05);
		  translate(0, 0, -1);
		  fill(1, 0, 1);
		  sphere(0.05);
		  translate(0, 1, 0);
		  fill(1, 0, 0);
		  sphere(0.05);
		  translate(-1, 0, 0);
		  fill(0, 0, 0);
		  sphere(0.05);
		  translate(0, -1, 0);
		  fill(0, 0, 1);
		  sphere(0.05);
		  pop();
		  push();
		  fill(x, y, z);
		  noStroke();
		  translate(x - 0.5, 1 - z - 0.5, y - 0.5);
		  sphere(0.05);
		  pop();
		  push();
		  beginShape(TRIANGLES);
		  noStroke();
		  fill(1, y, z);
		  vertex(1, y, z);
		  fill(x, 1, z);
		  vertex(x, 1, z);
		  fill(x, y, 1);
		  vertex(x, y, 1);
		  fill(0, y, z);
		  vertex(0, y, z);
		  fill(x, 0, z);
		  vertex(x, 0, z);
		  fill(x, y, 0);
		  vertex(x, y, 0);
		  fill(1, y, z);
		  vertex(1, y, z);
		  fill(x, 0, z);
		  vertex(x, 0, z);
		  fill(x, y, 0);
		  vertex(x, y, 0);
		  fill(0, y, z);
		  vertex(0, y, z);
		  fill(x, 1, z);
		  vertex(x, 1, z);
		  fill(x, y, 0);
		  vertex(x, y, 0);
		  fill(0, y, z);
		  vertex(0, y, z);
		  fill(x, 0, z);
		  vertex(x, 0, z);
		  fill(x, y, 1);
		  vertex(x, y, 1);
		  fill(0, y, z);
		  vertex(0, y, z);
		  fill(x, 1, z);
		  vertex(x, 1, z);
		  fill(x, y, 1);
		  vertex(x, y, 1);
		  fill(1, y, z);
		  vertex(1, y, z);
		  fill(x, 0, z);
		  vertex(x, 0, z);
		  fill(x, y, 1);
		  vertex(x, y, 1);
		  fill(1, y, z);
		  vertex(1, y, z);
		  fill(x, 1, z);
		  vertex(x, 1, z);
		  fill(x, y, 0);
		  vertex(x, y, 0);
		  rotateX(90);
		  translate(-0.5, -0.5, -0.5);
		  endShape();
		  pop();
	  }
  }