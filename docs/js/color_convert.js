const rgb2hue = (r,g,b,c,v) => {
    h  =  c == 0 ? 0
        : v==r ? ((g-b)/c)%6
        : v==g ? ( b-r)/c+2
        : ( r-g)/c+4;
    h+=h<0?6:0
	return h
}
// whiteness, hsv.val ,blackness & key, hsv.sat, hsl.sat, hsl.light, cyan, magenta, yellow

const rgb2all = (red,green,blue) => {
	red/=255,green/=255,blue/=255
	
	const	min = Math.min(red,green,blue),
			max = Math.max(red,green,blue)
	const	chrome	= max-min,
			key     = 1-max;
	const	saturationHSL = chrome === 0 ? 0 : chrome / (1 - Math.abs(max+min-1)),
			saturationHSV = chrome === 0 ? 0 : (chrome)/max;

	let hue =  chrome === 0     ? 0
		  	:  max    === red   ? ((green-blue)/chrome)%6
			:  max    === green ? (blue-red)  /chrome+2
			:                     (red-green)/chrome+4;
	hue += hue < 0 ? 6 : 0;

	const D65 = [95.047, 100, 108.883]
	let x =	.4124 * red + .3576 * green + .1805 * blue,
		y =	.2126 * red + .7152 * green + .0722 * blue,
		z =	.0193 * red + .1192 * green + .9505 * blue;

	[x, y, z] = [x, y, z].map((v, i) => {
		v = v * 100 / D65[i]
		return v > 0.008856 ? Math.pow(v, 1 / 3) : v * 7.787 + 16 / 116 
	})

	
	return [
		key*100, 			    	//cmyk-key
		(1-red-key)/(1-key)*100,  	//cmyk-cyan
		(1-green-key)/(1-key)*100,  //cmyk-magenta
		(1-blue-key)/(1-key)*100,  	//cmyk-yellow
		hue*60,			    		//hsx-hue
		saturationHSL*100,		    //hsl-saturation
		(min+max)/2*100,    		//hsl-lightness
		saturationHSV*100,			//hsv-saturation
		max*100,					//hsv-value
		min*100,					//hwb-whiteness
		key*100,					//hwb-blackness

		116 * y - 16,				//lab-lightness
		500 * (x - y),				//lab-A
		200 * (y - z)				//lab-B2
	]
}

const rgb2hsl = (red,green,blue) => {
	red/=255,green/=255,blue/=255
	const min = Math.min(red,green,blue),
		  max = Math.max(red,green,blue);
	const chrome	= max-min
	const lightness = (min+max)/2*100
	if(chrome == 0) return [0,0,lightness];

	const saturation = chrome / (1 - Math.abs(max+min-1)) * 100;
	let hue = max    === red   ? ((green-blue)/chrome) %6
			: max    === green ? (blue-red)   /chrome + 2
			:                    (red-green)  /chrome + 4;
	hue += hue < 0 ? 6 : 0;
	hue *= 60;

	return [hue,saturation,lightness]
}

const hsl2all = (h,s,l) => {
	h /= 360
	s /= 100
	l /= 100

	let q = l < 0.5 ? l * (1 + s) : l + s - l * s,
	p = 2 * l - q;
	let sv=s*= l < .5 ?l : 1-l;
	return [
		hue2rgb(p, q, h + 1/3)*255, 							//red
		hue2rgb(p, q, h)*255,									//green
		hue2rgb(p, q, h - 1/3)*255, 							//blue
		sv === 0 ? 0 : 2 * sv / (l + sv)*100, 					//hsv-saturation
		(l+sv)*100,												//hsv-value
		sv === 0 ? 100-(1-(l+sv))*100 : (1-(2 * sv / (l + sv))) * (l+sv)*100, 	//whiteness
		(1-(l+sv))*100											//blackness
	]
}

const hsv2all = (h,s,v) => {
	h /= 60
	s /= 100
	v /= 100
	const 	l = v*(1-s/2),
	s2 = l == 0 || l == 1 ? 0 : l < .5 ? s * v / (l * 2) : s * v / (2 - l * 2),
	f= (n,k=(n+h)%6) => (v - v*(s)*Math.max(Math.min(k,4-k,1),0))*255;
	
	return [
		f(5), 			//red
		f(3), 			//green
		f(1), 			//blue
		s2*100,			//hsl-Saturation
		l*100,			//hsl-Lightness
		(1-s) * v *100, //hwb-whiteness
		(1-v)*100		//hwb-blackness
	]


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
	return [
		(hue2rgb(0, 1, h + 1.0/3.0)*l+w)*255, 	//red
		(hue2rgb(0, 1, h)*l+w)*255, 			//green
		(hue2rgb(0, 1, h - 1.0/3.0)*l+w)*255, 	//blue
		(max-min)/max*100, 						//hsv-saturation
		v*100, 									//hsv-value
		(max-min)/(1-Math.abs(max+min-1))*100,	//hsl-saturation
		(max+min)/2*100						//hsl-lightness
	]
}

const cmyk2all = (c, m, y, k) => {
	[dom.red.value, dom.green.value, dom.blue.value] = clr.rgb = cmyk2rgb(c,m,y,k);
	rgb2hsx(clr.red,clr.green,clr.blue)
}

const hue2all = (h,s,l) => {
	clr.hue = h
	h /= 360
	s /= 100
	l /= 100
	const	q = l < 0.5 ? l * (1 + s) : l + s - l * s,
			p = 2 * l - q;
	clr.hue = h

	return [
		hue2rgb(p, q, h + 1/3)*255,
		hue2rgb(p, q, h)*255,
		hue2rgb(p, q, h - 1/3)*255
	]
} 

const rgb2hue2 = (r,g,b)=> {
	r/=255,g/=255,b/=255
	return Math.atan(
		Math.sqrt(3*(g-b)) /
		((r-g)+(r-b))
	)
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

	dom.saturationHsl.value	    = clr.saturationHsl = satL * 100;
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

const cmyk2rgb = (c, m, y, k) => [(1-((c/100)*(1-(k/=100))+k))*255,(1-((m/100)*(1-k)+ k))*255,(1-((y/100)*(1-k)+ k))*255]


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
function hwb2Rgb(h,wh,bl) {
	h /= 360
	wh /= 100
	bl /= 100
	const ratio = wh + bl;
	let f;
	if (ratio > 1) {
		wh /= ratio;
		bl /= ratio;
	}

	const i = Math.floor(6 * h);
	const v = 1 - bl;
	f = 6 * h - i;

	if ((i & 0x01) !== 0) {
		f = 1 - f;
	}

	const n = wh + f * (v - wh);

	let r,g,b;
	
	switch (i) {
		default:
		case 6:
		case 0: r = v;  g = n;  b = wh; break;
		case 1: r = n;  g = v;  b = wh; break;
		case 2: r = wh; g = v;  b = n; break;
		case 3: r = wh; g = n;  b = v; break;
		case 4: r = n;  g = wh; b = v; break;
		case 5: r = v;  g = wh; b = n; break;
	}
	return [r * 255, g * 255, b * 255];
};



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

function rgbToXyz(r,g,b) {
	r/=255,g/=255,b/=255;
	const D65 = [95.047, 100, 108.883]
	let x =	.4124 * r + .3576 * g + .1805 * b,
		y =	.2126 * r + .7152 * g + .0722 * b,
		z =	.0193 * r + .1192 * g + .9505 * b;

	[x, y, z] = [x, y, z].map((v, i) => {
		v = v * 100 / D65[i]
		return v > 0.008856 ? Math.pow(v, 1 / 3) : v * 7.787 + 16 / 116 
	})
	const l = 116 * y - 16
	const a	= 500 * (x - y)
	const b2 = 200 * (y - z)
	return [l, a, b2]
}