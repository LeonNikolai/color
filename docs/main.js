let active =1
let clr = {
	get rgb() {return [this.red,this.green,this.blue]},
	red 			: 255,
	blue 			: 0,
	green 			: 0,
	set rgb(array) {
		this.red = array[0];
		this.green = array[1];
		this.blue = array[2];
	},
	get cmyk() {return [this.cyan,this.magenta,this.yellow,this.key]},
	cyan 			: 0,
	magenta 		: 0,
	yellow 			: 0,
	key 			: 0,
	set cmyk(array) {
		this.cyan 	 = array[0];
		this.magenta = array[1];
		this.yellow  = array[2];
		this.key 	 = array[3];
	},
	get hsl() {return [this.hue,this.saturationHsl,this.lightness]},
	hue 			: 0,
	saturationHsl 	: 100,
	lightness 		: 100,
	set hsl(array) {
		this.saturationHsl = array[0]
		this.lightness = array[1]
	},
	get hsv() {return [this.hue,this.saturationHsv,this.value]},
	saturationHsv	: 100,
	value 			: 100,
	set hsv(array) {
		this.saturationHsv = array[0]
		this.value = array[1]
	},
	get hwb() {return [this.hue,this.whiteness,this.blackness]},
	blackness 		: 0,
	whiteness 		: 0,
	set hwb(array) {
		this.whiteness = array[0]
		this.blackness = array[1]
	},
}
let old = 0
let swatch = [
	[Math.random() * 255,Math.random() * 255,Math.random() * 255],
	[Math.random() * 255,Math.random() * 255,Math.random() * 255],
	[Math.random() * 255,Math.random() * 255,Math.random() * 255],
	[Math.random() * 255,Math.random() * 255,Math.random() * 255],
	[Math.random() * 255,Math.random() * 255,Math.random() * 255],
	[Math.random() * 255,Math.random() * 255,Math.random() * 255],
	[Math.random() * 255,Math.random() * 255,Math.random() * 255],
	[Math.random() * 255,Math.random() * 255,Math.random() * 255],
	[Math.random() * 255,Math.random() * 255,Math.random() * 255],
	[Math.random() * 255,Math.random() * 255,Math.random() * 255]
]
const colorload = index => {
	swatch[old] = clr.rgb
	old = index
	clr.rgb = swatch[index]
	rgb2all(swatch[index][0],swatch[index][1],swatch[index][2])
	inputUppdate();
}
const RD = max =>  Math.floor(Math.random()*max)
const sitealert = message => {
	el = document.getElementById("notifications")
	if(el.classList.contains("active")) {} else {
		el.innerHTML = "🤪 " + message
		el.classList.add("active")
		setTimeout(() => el.innerHTML =  "🍆 " + message, 500);
		setTimeout(() => el.innerHTML =  "🤬 " + message, 1000);
		setTimeout(() => el.innerHTML =  "😂 " + message, 1500);
		setTimeout(() => el.innerHTML =  "⏰ " + message, 2500);
		setTimeout(() => el.classList.remove("active"), 3000);
	}
	console.log(message)
}

let dom = {
	red 			: document.getElementById("red"),
	green 			: document.getElementById("green"),
	blue 			: document.getElementById("blue"),
	
	hue 			: document.getElementById("hue"),

	saturationHsl 	: document.getElementById("saturation_1"),
	lightness 		: document.getElementById("lightness"),
	
	saturationHsv 	: document.getElementById("saturation_2"),
	value 			: document.getElementById("value"),

	blackness 		: document.getElementById("blackness"),
	whiteness 		: document.getElementById("whiteness"),

	cyan 			: document.getElementById("cyan"),
	magenta 		: document.getElementById("magenta"),
	yellow 			: document.getElementById("yellow"),
	key 			: document.getElementById("key"),

	get rgb() {return [	this.red, this.green, 		  this.blue		 ]},
	get cmyk() {return [ this.cyan, this.magenta, this.yellow,	 this.key		 ]},
	get hsl() {return [ this.hue, this.saturationHsl, this.lightness ]},
	get hsb() {return [ this.hue, this.saturationHsv, this.value	 ]},
	get hwb() {return [ this.hue, this.whiteness,	  this.blackness ]},
	set cmyk(a) {this.cyan.value = a[0], this.magenta.value = a[1], this.yellow.value = a[2],	 this.key.value = a[3]},
	set rgb(a) 	{this.red.value = a[0], this.blue.value = a[1], this.green.value = a[2]},
	set hsl(a) 	{this.saturationHsl.value = a[0], this.lightness.value = a[1]},
	set hsv(a) 	{this.saturationHsv.value = a[0], this.value.value = a[1]},
	set hwb(a) 	{this.whiteness.value = a[0], this.blackness.value = a[1]}
}

const uppdate = ()=> {
	
}
const setURL = () => history.replaceState({}, '', document.location.pathname + "?r=" + clr.red + "&g=" + clr.green + "&b=" + clr.blue)
const changeinput = (classname,type) => {
	x = document.getElementsByClassName(classname)
	for (i = 0; i < x.length; i++) x[i].type = type
}
function geee(){}
window.onbeforeunload = function(){
	window.sessionStorage.setItem('rgb', clr.rgb);
 }
 
function getparam (x) {
	let y = new URLSearchParams(document.location.search.substring(1)).get(x);
	if(y == null){
		return Math.random() * (255 - 0) + 0;
	} else {
		return Number(y);
	}
};
window.onload = (event) =>{
	if (/Edge/.test(navigator.userAgent)) {
		alert('this website works better when using google chrome')
		sitealert('this website works better when using google chrome')
	}
	if(window.sessionStorage.rgb) {
		clr.rgb = eval("["+window.sessionStorage.rgb+"]")
		clr.rgb = [Number(getparam("r")), Number(getparam("g")), Number(getparam("b"))]

	} else {
		clr.rgb = [Number(getparam("r")), Number(getparam("g")), Number(getparam("b"))]
		rgb2all(clr.red, 		clr.green,			clr.blue)
	}

	document.getElementById("color-1").style.background = "rgb(" + swatch[1][0] + "," + swatch[1][1] +"," + swatch[1][2] + ")"
	document.getElementById("color-2").style.background = "rgb(" + swatch[2][0] + "," + swatch[2][1] +"," + swatch[2][2] + ")"
	document.getElementById("color-3").style.background = "rgb(" + swatch[3][0] + "," + swatch[3][1] +"," + swatch[3][2] + ")"
	document.getElementById("color-4").style.background = "rgb(" + swatch[4][0] + "," + swatch[4][1] +"," + swatch[4][2] + ")"
	document.getElementById("color-5").style.background = "rgb(" + swatch[5][0] + "," + swatch[5][1] +"," + swatch[5][2] + ")"


	document.getElementsByClassName("")
	dom.red.addEventListener("input", 	(e) => {
		clr.red = e.target.value
		rgb2all(e.target.value, 		clr.green,			clr.blue)
	})
	dom.green.addEventListener("input", (e) => {
		clr.green = e.target.value
		rgb2all(clr.red, 			e.target.value,			clr.blue)
	})
	dom.blue.addEventListener("input", 	(e) => {
		clr.blue = e.target.value
		rgb2all(clr.red, 			clr.green, 				e.target.value)
	})
	dom.hue.addEventListener("input", 	(e)	=> {
		clr.hue = e.target.value
		hue2all( e.target.value,		clr.saturationHsl,		clr.lightness)
	})

	dom.cyan.addEventListener("input", 		(e) => {
		clr.cyan = e.target.value
		cmyk2all(e.target.value,	clr.magenta,	clr.yellow,		clr.key)
	})
	dom.magenta.addEventListener("input", 	(e) => {
		clr.magenta = e.target.value
		cmyk2all(clr.cyan, 		e.target.value,	clr.yellow,		clr.key)
	})
	dom.yellow.addEventListener("input", 	(e)	=> {
		clr.yellow = e.target.value
		cmyk2all(clr.cyan,		clr.magenta, 	e.target.value,	clr.key)
	})
	dom.key.addEventListener("input", 		(e)	=> {
		clr.key = e.target.value
		cmyk2all(clr.cyan,		clr.magenta,	clr.yellow, e.target.value)
	})

	dom.saturationHsv.addEventListener("input", 	(e)	=> {
		clr.saturationHsv = e.target.value
		hsv2all( clr.hue,		e.target.value,		clr.value)
	});
	dom.value.addEventListener("input",(e)	=> {
		clr.value = e.target.value
		hsv2all( clr.hue,		clr.saturationHsv,		e.target.value)
	});
	dom.saturationHsl.addEventListener("input", 	(e)	=> {
		clr.saturationHsl = e.target.value
		hsl2all( clr.hue,		e.target.value,		clr.lightness)
	});
	dom.lightness.addEventListener("input",(e)	=> {
		clr.lightness = e.target.value
		hsl2all( clr.hue,		clr.saturationHsl,		e.target.value)
	});
	dom.whiteness.addEventListener("input", 	(e)	=> {
		clr.whiteness = e.target.value
		hwb2all( clr.hue,		e.target.value,		clr.blackness)
	});
	dom.blackness.addEventListener("input",(e)	=> {
		clr.blackness = e.target.value
		hwb2all( clr.hue,		clr.whiteness,		e.target.value)
	});

	for (let i of document.getElementsByClassName("clr-in")) {
		i.addEventListener("change",function() {
			inputUppdate();
		  });
	}
	let favicon = document.createElement("link")
	favicon.rel = "icon" 
	favicon.sizes = "any" 
	favicon.type = "image/svg+xml"
	favicon.id = "favicon"
	favicon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 130'%3E%3Ccircle fill='rgb(" + clr.red + "," + clr.green + "," + clr.blue + ")' cx='64' cy='64' r='64'/%3E%3C/svg%3E"
	document.getElementsByTagName('head')[0].appendChild(favicon)
	document.getElementById("tittle").innerHTML = "#" + rgb2hex(clr.red,clr.green,clr.blue);
	
}

const inputUppdate = () => {
	document.getElementById("favicon").href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 130'%3E%3Ccircle fill='rgb(" + clr.red + "," + clr.green + "," + clr.blue + ")' cx='64' cy='64' r='64'/%3E%3C/svg%3E"
	document.getElementById("tittle").innerHTML = "#" + rgb2hex(clr.red,clr.green,clr.blue);
	setURL();
}
const css_var = (x,y) => document.documentElement.style.setProperty('--'+ String(x), String(y));

const rgb2hue = (r,g,b,c,v) => {
    h  =  c == 0 ? 0
        : v==r ? ((g-b)/c)%6
        : v==g ? ( b-r)/c+2
        : ( r-g)/c+4;
    h+=h<0?6:0
	return h
}
// whiteness, hsv.val ,blackness & key, hsv.sat, hsl.sat, hsl.light, cyan, magenta, yellow

const rgb2hsx = (r,g,b) => {
	r/=255,g/=255,b/=255
	const	min = r<g && r<b ? r : g<b ? g : b,
			max = r>g && r>b ? r : g>b ? g : b;
	const	c	= max-min,
			k   = 1-max;
	const	satL = c === 0 ? 0 : c / (1 - Math.abs(max+min-1)),
			satV = max === min ? 0 : (c)/max;

	let hue =    c === 0 ? 0
		  	:  max === r ? ((g-b)/c)%6
			:  max === g ? (b-r)/c+2
			:              (r-g)/c+4;
	hue += hue < 0 ? 6 : 0;

	dom.hue.value = clr.hue = hue*60;

	dom.saturationHsl.value	    = clr.saturationHsl = satL*100;
	dom.lightness.value 		= clr.lightness		= (min+max)/2*100;
	dom.saturationHsv.value	    = clr.saturationHsv = satV*100;
	dom.value.value 			= clr.value 		= max*100;
	dom.whiteness.value 		= clr.whiteness 	= min*100;
	dom.blackness.value 		= clr.blackness 	= k*100;
	
	css_var("red", clr.red)
	css_var("green", clr.green)
	css_var("blue", clr.blue)
	css_var("hue", clr.hue)
	css_var("saturation",clr.saturationHsl)
	css_var("lightness", clr.lightness)
	css_var("blackness", clr.blackness)
	css_var("whiteness", clr.whiteness)
	setcurrentswatch()
}

const rgb2all = (r,g,b) => {
	dom.red.value = clr.red     = r
	dom.green.value = clr.green = g
	dom.blue.value = clr.blue   = b
	r/=255,g/=255,b/=255
	const	min = r<g && r<b ? r : g<b ? g : b,
			max = r>g && r>b ? r : g>b ? g : b;
	const	c	= max-min,
			k   = 1-max;
	const	satL = c === 0 ? 0 : c / (1 - Math.abs(max+min-1)),
			satV = max === min ? 0 : (c)/max;

	let hue =    c === 0 ? 0
		  	:  max === r ? ((g-b)/c)%6
			:  max === g ? (b-r)/c+2
			:              (r-g)/c+4;
	hue += hue < 0 ? 6 : 0;

	dom.key.value = clr.key 		= k*100
	dom.cyan.value = clr.cyan 		= (1-r-k)/(1-k)*100
	dom.magenta.value = clr.magenta = (1-g-k)/(1-k)*100
	dom.yellow.value = clr.yellow 	= (1-b-k)/(1-k)*100

	dom.hue.value = clr.hue = hue*60;

	dom.saturationHsl.value	= clr.saturationHsl = satL*100;
	dom.lightness.value 		= clr.lightness		= (min+max)/2*100;
	
	dom.saturationHsv.value	= clr.saturationHsv = satV*100;
	dom.value.value 			= clr.value 		= max*100;
	
	dom.whiteness.value 		= clr.whiteness 	= min*100;
	dom.blackness.value 		= clr.blackness 	= k*100;


	css_var("red", clr.red)
	css_var("green", clr.green)
	css_var("blue", clr.blue)
	css_var("hue", clr.hue)
	css_var("saturation",clr.saturationHsl)
	css_var("lightness", clr.lightness)
	css_var("blackness", clr.blackness)
	css_var("whiteness", clr.whiteness)

    setcurrentswatch()
	
}

const setcurrentswatch = () => {
	switch(old) {
		case 1:
			document.getElementById("color-1").style.background = "rgb(" + clr.red + "," + clr.green +"," + clr.blue + ")"
		break;
		case 2:
			document.getElementById("color-2").style.background = "rgb(" + clr.red + "," + clr.green +"," + clr.blue + ")"
		break;
		case 3:
			document.getElementById("color-3").style.background = "rgb(" + clr.red + "," + clr.green +"," + clr.blue + ")"
		break;
		case 4:
			document.getElementById("color-4").style.background = "rgb(" + clr.red + "," + clr.green +"," + clr.blue + ")"
		break;
		case 5:
			document.getElementById("color-5").style.background = "rgb(" + clr.red + "," + clr.green +"," + clr.blue + ")"
		break;
		default:
			document.getElementById("color-0").style.background = "rgb(" + clr.red + "," + clr.green +"," + clr.blue + ")"
		break;
	}
}
const hue2all = (h,s,l) => {
	clr.hue = h
	h /= 360
	s /= 100
	l /= 100
	const	q = l < 0.5 ? l * (1 + s) : l + s - l * s,
			p = 2 * l - q;
	dom.red.value = clr.red     = hue2rgb(p, q, h + 1/3)*255
	dom.green.value = clr.green = hue2rgb(p, q, h)*255
	dom.blue.value = clr.blue   = hue2rgb(p, q, h - 1/3)*255

	css_var("red", clr.red)
	css_var("green", clr.green)
	css_var("blue", clr.blue)
	css_var("hue", clr.hue)
	setcurrentswatch()
} 

const rgb2hue2 = (r,g,b)=> {
	r/=255,g/=255,b/=255
	return Math.atan(
		Math.sqrt(3*(g-b)) /
		((r-g)+(r-b))
	)
}
const hsv2all = (h,s,v) => {
	h /= 60
	s /= 100
	v /= 100
	const 	l = v*(1-s/2),
	s2 = l == 0 || l == 1 ? 0 : l < .5 ? s * v / (l * 2) : s * v / (2 - l * 2),
	f= (n,k=(n+h)%6) => (v - v*(s)*Math.max(Math.min(k,4-k,1),0))*255;       
	dom.red.value = clr.red = f(5)
	dom.green.value = clr.green = f(3)
	dom.blue.value = clr.blue = f(1)  
	 
	dom.saturationHsl.value	= clr.saturationHsl = s2*100 
	dom.lightness.value 		= clr.lightness		= l*100

	dom.whiteness.value 		= clr.whiteness 	=  (1-s) * v *100
	dom.blackness.value 		= clr.blackness 	=  (1-v)*100

	css_var("red", clr.red)
	css_var("green", clr.green)
	css_var("blue", clr.blue)
	css_var("saturation",clr.saturationHsl)
	css_var("lightness", clr.lightness)
	css_var("blackness", clr.blackness)
	css_var("whiteness", clr.whiteness)
	setcurrentswatch()
}



const hsl2all = (h,s,l) => {
	h /= 360
	s /= 100
	l /= 100

	let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
	p = 2 * l - q;
	dom.red.value = clr.red   = hue2rgb(p, q, h + 1/3)*255
	dom.green.value = clr.green = hue2rgb(p, q, h)*255
	dom.blue.value = clr.blue  = hue2rgb(p, q, h - 1/3)*255
	let sv=s*= l < .5 ?l : 1-l;
	dom.saturationHsv.value	= clr.saturationHsv = sv === 0 ? 0 : 2 * sv / (l + sv) *100
	dom.value.value 		= clr.value			= (l+sv) *100
	
	dom.whiteness.value 		= clr.whiteness 	=  sv === 0 ? 0 : (1-(2 * sv / (l + sv))) * (l+sv) *100
	dom.blackness.value 		= clr.blackness 	=  (1-(l+sv))*100
	css_var("red", clr.red)
	css_var("green", clr.green)
	css_var("blue", clr.blue)
	css_var("saturation",clr.saturationHsl)
	css_var("lightness", clr.lightness)
	css_var("blackness", clr.blackness)
	css_var("whiteness", clr.whiteness)
	setcurrentswatch()
}

const hwb2all = (h, w, b) => {
	h /= 360,w /= 100,b /= 100
	let tot = w + b,l;
	min = w
	max = v = 1-b
	if (tot > 1) {
	  w /= tot;
	  b /= tot;
	}
	l=(1-w-b)
	dom.value.value	= clr.value = v*100
	dom.saturationHsv.value	= clr.saturationHsv = (max-min)/max*100
	dom.saturationHsl.value	= clr.saturationHsl = (max-min)/(1-Math.abs(max+min-1))*100
	dom.lightness.value 	= clr.lightness		= (max+min)/2*100
	dom.red.value = clr.red = (hue2rgb(0, 1, h + 1.0/3.0)*l+w)*255
	dom.green.value = clr.green = (hue2rgb(0, 1, h)*l+w)*255,
	dom.blue.value = clr.blue = (hue2rgb(0, 1, h - 1.0/3.0)*l+w)*255
	css_var("red", clr.red)
	css_var("green", clr.green)
	css_var("blue", clr.blue)
	css_var("saturation",clr.saturationHsl)
	css_var("lightness", clr.lightness)
	css_var("blackness", clr.blackness)
	css_var("whiteness", clr.whiteness)
	setcurrentswatch()
}

const hsi2rgb = (h,s,i) => {
	if (s<0 && i<0) {
		s=i=0
	}
	h/=60,s/=100,i/=100
	m = i*(1-s)
	z = 1-Math.abs(h%2-1)
	c = (3*i*s)/(1+z)
	x = c * z
	console.log(h,s,i)

	let [r,g,b] = h <= 1 ? [c,x,0]
				: h <= 2 ? [x,c,0]
				: h <= 3 ? [0,c,x]
				: h <= 4 ? [0,x,c]
				: h <= 5 ? [x,0,c]
				: h <= 6 ? [c,0,x]
				: 0;

	r = (r+m)*255			
	g = (g+m)*255		
	b =	(b+m)*255

	clr.red = Math.min(r,255)
	clr.green = Math.min(g,255)
	clr.blue = Math.min(b,255)

	dom.red.value  = r
	dom.green.value = g
	dom.blue.value = b
	css_var("red", clr.red)
	css_var("green", clr.green)
	css_var("blue", clr.blue)
	css_var("saturation",clr.saturationHsl)
	css_var("lightness", clr.lightness)
	css_var("blackness", clr.blackness)
	css_var("whiteness", clr.whiteness)
}

// function hsi2rgb(h, s, i) {
// 	s/=100,i/=100
// 	var r, g, b, z, x;
// 	z = (1 - s) /3;
// 	function cos(deg) {
// 		return Math.cos(deg / 180 * Math.PI);
// 	}
// 	function x(h) {
// 		return (1 + s * cos(h) / cos(60 - h)) / 3;
// 	}

// 	if (h < 0) {
// 		[r,g,b] = [0, 0, 0];
// 	}
// 	else if (h <= 120) {
// 		b = z;
// 		r = x(h);
// 		g = 1 - r - b;
// 	}
// 	else if (h <= 240) {
// 		g = x(h - 120);
// 		r = z;
// 		b = 1 - r - g;
// 	}
// 	else if (h <= 360) {
// 		b = x(h - 240);
// 		g = z;
// 		r= 1 - g - b;
// 	}
// 	else {
// 		r = g = b = 0;
// 	}

// 	dom.red.value = clr.red = (i * r * 765)
// 	dom.green.value = clr.green = (i * g * 765)
// 	dom.blue.value = clr.blue =  (i * b * 765)
// }
const cmyk2all = (c, m, y, k) => {
	[dom.red.value, dom.green.value, dom.blue.value] = clr.rgb = cmyk2rgb(c,m,y,k);
	rgb2hsx(clr.red,clr.green,clr.blue)
}
const cmyk2rgb = (c, m, y, k) => [(1-((c/100)*(1-(k/=100))+k))*255,(1-((m/100)*(1-k)+ k))*255,(1-((y/100)*(1-k)+ k))*255]

const rgb2hsl = (r,g,b) => {
	r/=255,g/=255,b/=255
	const w=Math.min(r,g,b),v=Math.max(r,g,b),c=v-w
	s = c == 0 ? 0 : c / (1 - Math.abs(v+w-1))
	l=(v+w)/2
    return [rgb2hue(r,g,b,c,v)*60,s*100,l*100]
}
const rgb2cmyk = (r,g,b) => {
	r/=255,g/=255,b/=255
	k = 1-Math.max(r,g,b)
	return [
		(1-r-k)/(1-k)*100,//cyan
		(1-g-k)/(1-k)*100,//magenta
		(1-b-k)/(1-k)*100, //yellow
		k*100
	]
}
const rgb2hsv = (r,g,b) => {
	r/=255,g/=255,b/=255
	const w=Math.min(r,g,b),v=Math.max(r,g,b),c=v-w
	s = v==w ? 0 :(v-w)/v
    return [rgb2hue(r,g,b,c,v)*60,s*100,v*100]
}
const rgb2hwb = (r,g,b) => {
	r/=255,g/=255,b/=255
	const w=Math.min(r,g,b),v=Math.max(r,g,b),c=v-w
    return [rgb2hue(r,g,b,c,v)*60,w*100,100-v*100]
}

const hue2rgb = (p, q, t) => { 
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
	return [hue2rgb(p, q, h + 1/3)*255,hue2rgb(p, q, h)*255,hue2rgb(p, q, h - 1/3)*255]
}
const hsv2rgb = (h, s, v) => {
	v/=100
	let f= (n,k=(n+h/60)%6) => (v - v*(s/100)*Math.max(Math.min(k,4-k,1),0))*255;     
	return [f(5),f(3),f(1)];    
}

const hwb2Rgb = (h, w, b) => {
	h /= 360,w /= 100,b /= 100
	let tot = w + b,l;
	if (tot > 1) {
	  w /= tot;
	  b /= tot;
	}
	l=(1-w-b)
	return [(hue2rgb(0, 1, h + 1.0/3.0)*l+w)*255,(hue2rgb(0, 1, h)*l+w)*255,(hue2rgb(0, 1, h - 1.0/3.0)*l+w)*255]
}

function rgb2xyz(r, g, b) {
	[ r, b, g ] = [ r, g, b ].map(
		v => v > 4.045 ? pow((v + 5.5) / 105.5, 2.4) * 100 : v / 12.92
	);
	const [ x, y, z ] = matrix([ lr, lb, lg ], [
		[0.4124564, 0.3575761, 0.1804375],
		[0.2126729, 0.7151522, 0.0721750],
		[0.0193339, 0.1191920, 0.9503041]
	]);
	return [ x, y, z ];
}


const rgb2hex = (r,g,b) => ((1<<24)+(r<<16)+(g<<8)+Math.round(b)).toString(16).slice(1).toUpperCase();

//input value 0-16777215
//output values [red,green,blue] in the range 0-255
let bit2rgb = (b) => [b>>>16&0xFF,b>>>8&0xFF,b&0xFF]

//input value red,green and blue in the range 0-255
//output value 0-16777215
let rgb2bit = (r,g,b) => (r<<16)+(g<<8)+b





window.addEventListener('resize', function (event) {
	resizeCanvas(Math.min(document.documentElement.clientHeight, document.documentElement.clientHeight), Math.min(document.documentElement.clientHeight, document.documentElement.clientHeight));
	camera(500, -500, 500, 0, 0, 0, 0, 1, 0);
	});
	
	p5.prototype.orbitControl = function(sensitivityX, sensitivityY, sensitivityZ) {
		this._assert3d('orbitControl');
		p5._validateParameters('orbitControl', arguments);
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
		if (this.contextMenuDisabled !== true) {
		  this.canvas.oncontextmenu = () => false;
		  this._setProperty('contextMenuDisabled', true);
		}
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
		//   noLoop();
		};

		let mode = 1;
		function draw() {
		  let x = clr.red / 255;
		  let y = clr.green / 255;
		  let z = clr.blue / 255;
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


function rgb2lab(r,g,b){
	r/=255
	g/=255
	b/=255

	r = (r > .04045) ? Math.pow((r + .055) / 1.055, 2.4) : r / 12.92;
	g = (g > .04045) ? Math.pow((g + .055) / 1.055, 2.4) : g / 12.92;
	b = (b > .04045) ? Math.pow((b + .055) / 1.055, 2.4) : b / 12.92;

	let x = (r * .4124 + g * .3576 + b * .1805) / .95047,
		y = (r * .2126 + g * .7152 + b * .0722) / 1,
		z = (r * .0193 + g * .1192 + b * .9505) / 1.08883;

	x = (x > .008856) ? Math.pow(x, 1/3) : (7.787 * x) + 16/116;
	y = (y > .008856) ? Math.pow(y, 1/3) : (7.787 * y) + 16/116;
	z = (z > .008856) ? Math.pow(z, 1/3) : (7.787 * z) + 16/116;

	return [
		(116 * y) - 16,
		500 * (x - y),
		200 * (y - z)
	]
}