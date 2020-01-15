export {};
let rgb 	=	JSON.parse(	`{"r":0,"g":0,"b":0}`		);
let cmyk 	=	JSON.parse(	`{"c":0,"m":0,"y":0,"k":0}`	);
let hsl 	=	JSON.parse(	`{"h":0,"s":0,"l":0}`		);
let hwb 	=	JSON.parse(	`{"h":0,"w":0,"b":0}`		);
let s_decimal = false;

const id = me =>document.getElementById(me);
let input = {
	r: document.getElementById('r'),
	g: document.getElementById('g'),
	b: document.getElementById('b')
}
let output = {
	r:		document.getElementById('r_'),
	g:		document.getElementById('g_'),
	b:		document.getElementById('b_'),
	r_p:	document.getElementById('r_p'),
	g_p:	document.getElementById('g_p'),
	b_p:	document.getElementById('b_p'),
	hex:	document.getElementById('hex'),
	h:		document.getElementById('h_'),
	s:		document.getElementById('s_'),
	l:		document.getElementById('l_')
}
let canvas = {
	red_face:		document.getElementById('green-blue'),
	green_face:		document.getElementById('blue-red'),
	blue_face:		document.getElementById('red-green'),
}


function uppdate() {
	let variable = document.documentElement.style
    variable.setProperty('--rgb-r', rgb.r);
    variable.setProperty('--rgb-g', rgb.g);
    variable.setProperty('--rgb-b', rgb.b);
	if (s_decimal == false) {
		output.r_p.value = Math.round(rgb.r / 255 * 100)
		output.g_p.value = Math.round(rgb.g / 255 * 100)
		output.b_p.value = Math.round(rgb.b / 255 * 100)
		output.r.value	 = Math.round(rgb.r)
		output.g.value	 = Math.round(rgb.g)
		output.b.value	 = Math.round(rgb.b)
		RGBToHSL(rgb.r,rgb.g,rgb.b)
		output.h.value	 = Math.round(hsl.h)
		output.s.value	 = Math.round(hsl.s)
		output.l.value	 = Math.round(hsl.l)
	} else {
		output.r_p.value = rgb.r / 255 * 100
		output.g_p.value = rgb.g / 255 * 100
		output.b_p.value = rgb.b / 255 * 100
		output.r.value	 = rgb.r
		output.g.value	 = rgb.g
		output.b.value	 = rgb.b
		RGBToHSL(rgb.r,rgb.g,rgb.b)
		output.h.value	 = hsl.h
		output.s.value	 = hsl.s
		output.l.value	 = hsl.l
	}
	output.hex.value	= rgb_hex(rgb.r,rgb.g,rgb.b)
}
window.addEventListener('resize', function(event){
	resizeCanvas(document.documentElement.clientWidth/2, document.documentElement.clientWidth/2.5);
  });
function onload(){
	rgb.r			= Number(getparam("r"))
	rgb.g			= Number(getparam("g"))
	rgb.b			= Number(getparam("b"))
	input.r.value	= rgb.r;
	input.g.value	= rgb.g;
	input.b.value	= rgb.b;
	input.r.nextSibling.value = rgb.r;
	input.g.nextSibling.value = rgb.g;
	input.b.nextSibling.value = rgb.b;
	
	uppdate()
}
const rgb_hex = (r,g,b) => {
	r = Math.round(r).toString(16).toUpperCase()
	g = Math.round(g).toString(16).toUpperCase()
	b = Math.round(b).toString(16).toUpperCase()
	if (r.length == 1) r = '0' + r
	if (g.length == 1) g = '0' + g
	if (b.length == 1) b = '0' + b
	let x = ['00','11','22','33','44','55','66','77','88','99','AA','BB','CC','DD','EE','FF']
	if (x.indexOf(r) !== -1){
	if (x.indexOf(g) !== -1) {
	if (x.indexOf(b) !== -1)  {
		r = String(r).slice(0, -1)
		g = String(g).slice(0, -1)
		b = String(b).slice(0, -1)
	}}}
	return r + g + b;
};
function RGBToHSL(r,g,b) {
	r /= 255;
	g /= 255;
	b /= 255;
  
	let cmin = Math.min(r,g,b),
		cmax = Math.max(r,g,b),
		c = cmax - cmin,
		h = 0,
		s = 0,
		l = 0;

	if (c == 0)
	  h = 0;
	else if (cmax == r)
	  h = ((g - b) / c) % 6;
	else if (cmax == g)
	  h = (b - r) / c + 2;
	else
	  h = (r - g) / c + 4;
	h = h * 60;
	if (h < 0)
		h += 360;

	l = (cmax + cmin) / 2;
	s = c == 0 ? 0 : c / (1 - Math.abs(2 * l - 1));
  
	s = s * 100;
	l = l * 100;
  
	hsl.h = h
	hsl.s = s
	hsl.l = l
	// return hsl.h + " " + hsl.s + " " + hsl.l
  }
function hex_rgb(hex){
	hex = '0x' + hex
	let result = {
	  r: (hex >> 16) & 0xFF,
	  g: (hex >> 8) & 0xFF,  
	  b: hex & 0xFF,
	}
	return result
};

const minmaxsnap = me => me.value	=	Number(me.value) > Number(me.max)	? me.max
									:	Number(me.min)	 > Number(me.value)	? me.min
									:	me.value;

function getparam (x) {
	let y = new URLSearchParams(document.location.search.substring(1)).get(x);
	if(y == null){
		return Math.random() * (255 - 0) + 0;
	} else {
		return y;
	}
};

function pantonematch {
	let temp = []
	array = UncoatedPantone;
	for (index = 0; index < array.length; index++) {
		temp.push(array[index].rgb);
	}
	return temp
}


function coatedtest () {
	rgb.r = Math.round(rgb.r)
	rgb.g = Math.round(rgb.g)
	rgb.b = Math.round(rgb.b)
	for (var i=0;i<pms_coated.length; i++){
		if(rgb == pms_coated[i].rgb) {console.log(pms_coated[i].code)}
	}
}
function saturation(rgb, s) {
    var min = rgb.indexOf(Math.min.apply(null, rgb)), // index of min
        max = rgb.indexOf(Math.max.apply(null, rgb)), // index of max
        mid = [0, 1, 2].filter(function (i) {return i !== min && i !== max;})[0],
        a = rgb[max] - rgb[min],
        b = rgb[mid] - rgb[min],
        x = rgb[max],
        arr = [x, x, x];
    if (min === max) {
        min = 2; // both max = min = 0, => mid = 1, so set min = 2
        a = 1;   // also means a = b = 0, don't want division by 0 in `b / a`
    }

    arr[max] = x;
    arr[min] = Math.round(x * (1 - s));
    arr[mid] = Math.round(x * ((1 - s) + s * b / a));

    return arr;
}

let xmag, ymag = 0;
let newXmag, newYmag = 0; 

function setup() {
  createCanvas(document.documentElement.clientWidth/2, document.documentElement.clientWidth/2.5, WEBGL).parent('viewrgb');
  colorMode(RGB, 1); 
  angleMode(DEGREES)

};
let mode = 0

function draw() {
	orbitControl(7, 7, 0);
	background(1,1,1);  
	
	let x = rgb.r/255
	let y = rgb.g/255
	let z = rgb.b/255

	if (mode == 1) {
	scale(document.documentElement.clientWidth/5.5);
	let rgb_vertex	= (a,b,c) => {fill(a, b, c); vertex( a, b, c)}
	let red			= () => {rgb_vertex(1, 0, 0)}
	let green		= () => {rgb_vertex(0, y, 0)}
	let blue		= () => {rgb_vertex(0, 0, 1)}
	let magenta		= () => {rgb_vertex(1, 0, 1)}
	let yellow		= () => {rgb_vertex(1, y, 0)}
	let cyan		= () => {rgb_vertex(0, y, 1)}
	let white		= () => {rgb_vertex(1, y, 1)}
	let black		= () => {rgb_vertex(0, 0, 0)}
	push(); 
	beginShape(TRIANGLES);
		noStroke();
		white()	red()		magenta()
		white()	red()		yellow()
		white()	green()		cyan()
		white()	green()		yellow()
		white()	blue()		magenta()
		white() blue()		cyan()
		black() cyan() 		blue()
		black() cyan()		green()
		black() yellow()	green()
		black() yellow()	red()
		black() magenta()	red()
		black() magenta()	blue()
		rotateX(90)
		translate(-0.5, -0.5, -0.5);
		endShape();
	pop(); 
	push(); 
	beginShape(TRIANGLES);
		noStroke();
		white()	red()		magenta()
		white()	red()		yellow()
		white()	green()		cyan()
		white()	green()		yellow()
		white()	blue()		magenta()
		white() blue()		cyan()
		black() cyan() 		blue()
		black() cyan()		green()
		black() yellow()	green()
		black() yellow()	red()
		black() magenta()	red()
		black() magenta()	blue()
		rotateX(90)
		translate(-0.5, -0.5, -0.5);
		endShape();
	pop(); 
	push();
		noFill()
		stroke(0.8,0.8,0.8)
		strokeWeight(1);
		if(Math.round(y*100)/100 == 1) {
			noStroke()
		}
		translate(0, 0, y/2);
		box(1,1,1-y)
	pop();
	push();
		translate(x-0.5, 1-z-0.5, y-0.5);
		rotateX(90)
		translate(0,0.006,0);
		noStroke()
		fill(1,1,1)
		cylinder(0.1, 0.01);
		fill(x,y,z)
		translate(0,0.01,0);
		cylinder(0.08, 0.02);
	pop();
	} else if (mode == 0) {
		scale(document.documentElement.clientWidth/5.5);
		push();
			stroke(0.8,0.8,0.8)
			noFill()
			box(1)
		pop();
		push();
			noStroke()
			translate(0.5,0.5,0.5);
			fill(1,1,0)
			sphere(0.05)
			translate(-1,0,0);
			fill(0,1,0)
			sphere(0.05)
			translate(0,-1,0);
			fill(0,1,1)
			sphere(0.05)
			translate(1,0,0);
			fill(1,1,1)
			sphere(0.05)
			translate(0,0,-1);
			fill(1,0,1)
			sphere(0.05)
			translate(0,1,0);
			fill(1,0,0)
			sphere(0.05)
			translate(-1,0,0);
			fill(0,0,0)
			sphere(0.05)
			translate(0,-1,0);
			fill(0,0,1)
			sphere(0.05)
		pop();
		push();
			fill(x,y,z)
			noStroke()
			translate(x-0.5,1-z-0.5,y-0.5);
			sphere(0.1)
			pop();
			push()
		stroke(1,0,0)
		line(0.5,1-z-0.5,y-0.5,-0.5,1-z-0.5,y-0.5)
		stroke(0,1,0)
		line(x-0.5,1-z-0.5,-0.5,x-0.5,1-z-0.5,0.5)
		stroke(0,0,1)
		line(x-0.5,-0.5,y-0.5,x-0.5,0.5,y-0.5)
		stroke(1,1,1)
		pop();
	}
	
	else {
		scale(document.documentElement.clientWidth/5.5);
		push();
			stroke(0.8,0.8,0.8)
			noFill()
			box(1)
		pop();
		push();
			noStroke()
			translate(0.5,0.5,0.5);
			fill(1,1,0)
			sphere(0.05)
			translate(-1,0,0);
			fill(0,1,0)
			sphere(0.05)
			translate(0,-1,0);
			fill(0,1,1)
			sphere(0.05)
			translate(1,0,0);
			fill(1,1,1)
			sphere(0.05)
			translate(0,0,-1);
			fill(1,0,1)
			sphere(0.05)
			translate(0,1,0);
			fill(1,0,0)
			sphere(0.05)
			translate(-1,0,0);
			fill(0,0,0)
			sphere(0.05)
			translate(0,-1,0);
			fill(0,0,1)
			sphere(0.05)
		pop();
		push();
			fill(x,y,z)
			noStroke()
			translate(x-0.5,1-z-0.5,y-0.5);
			sphere(0.05)
		pop();
		push();
		beginShape(TRIANGLES);
		noStroke();
		fill(1, y, z);	vertex(1, y, z)
		fill(x, 1, z);	vertex(x, 1, z)
		fill(x, y, 1);	vertex(x, y, 1)
	
		fill(0, y, z);	vertex(0, y, z)
		fill(x, 0, z);	vertex(x, 0, z)
		fill(x, y, 0);	vertex(x, y, 0)

		fill(1, y, z);	vertex(1, y, z)
		fill(x, 0, z);	vertex(x, 0, z)
		fill(x, y, 0);	vertex(x, y, 0)

		fill(0, y, z);	vertex(0, y, z)
		fill(x, 1, z);	vertex(x, 1, z)
		fill(x, y, 0);	vertex(x, y, 0)

		fill(0, y, z);	vertex(0, y, z)
		fill(x, 0, z);	vertex(x, 0, z)
		fill(x, y, 1);	vertex(x, y, 1)

		fill(0, y, z);	vertex(0, y, z)
		fill(x, 1, z);	vertex(x, 1, z)
		fill(x, y, 1);	vertex(x, y, 1)

		fill(1, y, z);	vertex(1, y, z)
		fill(x, 0, z);	vertex(x, 0, z)
		fill(x, y, 1);	vertex(x, y, 1)

		fill(1, y, z);	vertex(1, y, z)
		fill(x, 1, z);	vertex(x, 1, z)
		fill(x, y, 0);	vertex(x, y, 0)

		rotateX(90)
		translate(-0.5, -0.5, -0.5);
		endShape();
		pop();
	}
}