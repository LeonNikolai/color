let active =1
let clr = {
    get rgb() {return [this.red,this.green,this.blue]},
    red             : 255,
    green             : 0,
    blue             : 0,
    set rgb(arr) {
        [
            this.key,
            this.cyan,
            this.magenta,
            this.yellow,
            this.hue,
            this.saturationHsl,
            this.lightness,
            this.saturationHsv,
            this.value,
            this.whiteness,
            this.blackness
        ] = rgb2all(arr[0],arr[1],arr[2]);
        this.red = arr[0];
        this.green = arr[1];
        this.blue = arr[2];
    },
    get cmyk() {return [this.cyan,this.magenta,this.yellow,this.key]},
    cyan             : 0,
    magenta         : 0,
    yellow             : 0,
    key             : 0,
    set cmyk(arr) {
        this.rgb = cmyk2rgb(arr[0],arr[1],arr[2],arr[3]);
        this.cyan      = arr[0]
        this.magenta = arr[1]
        this.yellow  = arr[2]
        this.key      = arr[3]

    },
    get hsl() {return [this.hue,this.saturationHsl,this.lightness]},
    hue             : 0,
    saturationHsl     : 100,
    lightness         : 100,
    set hsl(arr) {
        [
            this.red,
            this.green,
            this.blue,
            this.saturationHsv,
            this.value,
            this.whiteness,
            this.blackness
        ] = hsl2all(arr[0],arr[1],arr[2]);
        this.hue = arr[0];
        this.saturationHsl = arr[1];
        this.lightness = arr[2];
    },
    get hsv() {return [this.hue,this.saturationHsv,this.value]},
    saturationHsv    : 100,
    value             : 100,
    set hsv(arr) {
        [
            this.red,
            this.green,
            this.blue,
            this.saturationHsl,
            this.lightness,
            this.whiteness,
            this.blackness
        ] = hsv2all(arr[0],arr[1],arr[2]);
        this.hue = arr[0];
        this.saturationHsv = arr[1];
        this.value = arr[2];
    },
    get hwb() {return [this.hue,this.whiteness,this.blackness]},
    blackness         : 0,
    whiteness         : 0,
    set hwb(arr) {
        [
            this.red,
            this.green,
            this.blue,
            this.saturationHsv,
            this.value,
            this.saturationHsl,
            this.lightness
        ] = hwb2all(arr[0],arr[1],arr[2]);
        this.hue        = arr[0];
        this.whiteness = arr[1];
        this.blackness = arr[2];
    },
}
let dom = {
    red             : document.getElementById("red"),
    green           : document.getElementById("green"),
    blue            : document.getElementById("blue"),
    
    hue             : document.getElementById("hue"),

    saturationHsl     : document.getElementById("saturation_1"),
    lightness         : document.getElementById("lightness"),
    
    saturationHsv     : document.getElementById("saturation_2"),
    value             : document.getElementById("value"),

    blackness         : document.getElementById("blackness"),
    whiteness         : document.getElementById("whiteness"),

    cyan            : document.getElementById("cyan"),
    magenta         : document.getElementById("magenta"),
    yellow          : document.getElementById("yellow"),
    key             : document.getElementById("key"),

    get rgb()   {return [ this.red, this.green,         this.blue        ]},
    get cmyk()  {return [ this.cyan,this.magenta,        this.yellow,    this.key ]},
    get hsl()   {return [ this.hue, this.saturationHsl, this.lightness    ]},
    get hsb()   {return [ this.hue, this.saturationHsv, this.value         ]},
    get hwb()   {return [ this.hue, this.whiteness,          this.blackness     ]},
    set cmyk(a) {this.cyan.value = a[0], this.magenta.value = a[1], this.yellow.value = a[2],     this.key.value = a[3]},
    set rgb(a)  {this.red.value = a[0], this.green.value = a[1], this.blue.value = a[2]},
    set hsl(a)  {this.hue.value = a[0],this.saturationHsl.value = a[1], this.lightness.value = a[2]},
    set hsv(a)  {this.hue.value = a[0],this.saturationHsv.value = a[1], this.value.value = a[2]},
    set hwb(a)  {this.hue.value = a[0],this.whiteness.value = a[1], this.blackness.value = a[2]}
}
const domuppdate = () => {
	dom.rgb  = clr.rgb
    dom.hsl  = clr.hsl
    dom.hsv  = clr.hsv
    dom.hwb  = clr.hwb
    dom.cmyk = clr.cmyk
    css_var("red",       clr.red)
    css_var("green",     clr.green)
    css_var("blue",      clr.blue)
    css_var("hue",       clr.hue)    
    css_var("saturation",clr.saturationHsl)
    css_var("lightness", clr.lightness)
    css_var("blackness", clr.blackness)
    css_var("whiteness", clr.whiteness)
	setcurrentswatch()
}

const setColorr = (r,g,b) => {
	colorr = [r,g,b]
	const string = `rgb(${r},${g},${b})`
	sh.value = ""
	sh.placeholder = string
	myWorker.postMessage([string])
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
    domuppdate();
    inputUppdate();
    setColorr(clr.red,clr.green,clr.blue);
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

const setURL = () => history.replaceState({ color: clr }, '', document.location.pathname + "?r=" + Number(clr.red).toFixed()+ "&g=" + Number(clr.green).toFixed() + "&b=" + Number(clr.blue).toFixed())
const changeinput = (classname,type) => {
    x = document.getElementsByClassName(classname)
    for (i = 0; i < x.length; i++) x[i].type = type
}


 
function getparam (x) {
    let y = new URLSearchParams(document.location.search.substring(1)).get(x);
    if(y == null){
        return Math.random() * (255 - 0) + 0;
    } else {
        return Number(y);
    }
};

let inputstate = "rgb"

window.onbeforeunload = () => window.sessionStorage.setItem('rgb', clr.rgb);
window.onload = (event) => {
    document.getElementById("color-1").style.background = "rgb(" + swatch[1][0] + "," + swatch[1][1] +"," + swatch[1][2] + ")"
    document.getElementById("color-2").style.background = "rgb(" + swatch[2][0] + "," + swatch[2][1] +"," + swatch[2][2] + ")"
    document.getElementById("color-3").style.background = "rgb(" + swatch[3][0] + "," + swatch[3][1] +"," + swatch[3][2] + ")"
    document.getElementById("color-4").style.background = "rgb(" + swatch[4][0] + "," + swatch[4][1] +"," + swatch[4][2] + ")"
    document.getElementById("color-5").style.background = "rgb(" + swatch[5][0] + "," + swatch[5][1] +"," + swatch[5][2] + ")"
    if (/Edge/.test(navigator.userAgent)) {
        alert('this website works better when using google chrome')
        sitealert('this website works better when using google chrome')
    }

    const url = new URLSearchParams(document.location.search)
    clr.rgb = url.has('r') === true && url.has('g') === true && url.has('b') === true ? [Number(getparam("r")), Number(getparam("g")), Number(getparam("b"))]
            : window.sessionStorage.rgb ? eval("["+window.sessionStorage.rgb+"]") 
            : window.localStorage .rgb ? eval("["+window.localStorage.rgb+"]") 
            : [Math.random() * 255,Math.random() * 255,Math.random() * 255];

    dom.red.addEventListener            ("input", (e) => clr.rgb  = [e.target.value, clr.green, clr.blue])
    dom.green.addEventListener            ("input", (e) => clr.rgb  = [clr.red, e.target.value, clr.blue])
    dom.blue.addEventListener            ("input", (e) => clr.rgb  = [clr.red, clr.green, e.target.value])
    dom.hue.addEventListener            ("input", (e) => clr.hsl  = [e.target.value, clr.saturationHsl , clr.lightness])
    dom.cyan.addEventListener            ("input", (e) => clr.cmyk = [e.target.value , clr.magenta, clr.yellow, clr.key])
    dom.magenta.addEventListener        ("input", (e) => clr.cmyk = [clr.cyan, e.target.value, clr.yellow, clr.key])
    dom.yellow.addEventListener            ("input", (e) => clr.cmyk = [clr.cyan, clr.magenta, e.target.value, clr.key])
    dom.key.addEventListener            ("input", (e) => clr.cmyk = [clr.cyan, clr.magenta, clr.yellow, e.target.value])
    dom.saturationHsv.addEventListener    ("input", (e) => clr.hsv  = [clr.hue, e.target.value, clr.value])
    dom.value.addEventListener            ("input", (e) => clr.hsv  = [clr.hue, clr.saturationHsv, e.target.value])
    dom.saturationHsl.addEventListener    ("input", (e) => clr.hsl  = [clr.hue, e.target.value, clr.lightness])
    dom.lightness.addEventListener        ("input", (e) => clr.hsl  = [clr.hue, clr.saturationHsl, e.target.value])
    dom.whiteness.addEventListener        ("input", (e) => clr.hwb  = [clr.hue, e.target.value, clr.blackness])
    dom.blackness.addEventListener        ("input", (e) => clr.hwb  = [clr.hue, clr.whiteness, e.target.value])

    for (let i of document.getElementsByClassName("clr-in")) {
        i.addEventListener("input", ()=> requestAnimationFrame(()=>{domuppdate();setColorr((clr.red>>0),(clr.green>>0),(clr.blue>>0))}));
        i.addEventListener("change", inputUppdate);
    }

    let favicon = document.createElement("link")
    favicon.rel = "icon" 
    favicon.sizes = "any" 
    favicon.type = "image/svg+xml"
    favicon.id = "favicon"
    favicon.href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 130'%3E%3Ccircle fill='rgb(" + clr.red + "," + clr.green + "," + clr.blue + ")' cx='64' cy='64' r='64'/%3E%3C/svg%3E"
    document.getElementsByTagName('head')[0].appendChild(favicon)
    document.getElementById("tittle").innerHTML = "#" + rgb2hex(clr.red,clr.green,clr.blue);
	domuppdate();
	setColorr((clr.red>>0),(clr.green>>0),(clr.blue>>0))
	document.getElementById("tittle").innerHTML = 'RGB.codes | Color Tools'
}

const inputUppdate = () => {
    document.getElementById("favicon").href = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 130'%3E%3Ccircle fill='rgb(" + clr.red + "," + clr.green + "," + clr.blue + ")' cx='64' cy='64' r='64'/%3E%3C/svg%3E"
    document.getElementById("tittle").innerHTML = "#" + rgb2hex(clr.red,clr.green,clr.blue);
    setURL();
        
}
const css_var = (x,y) => document.documentElement.style.setProperty('--'+ String(x), String(y));



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



let stat = 0;
let stat2;
let myWorker = new Worker('js/worker.js');
const sh = document.getElementById('searchfield')
const out = document.getElementById('output')
sh.addEventListener('input', e => { 
	let v = e.target.value || ''; 
	let v_old = e.target.oldvalue || ''; 
	e.target.value 	= v[0] == " " ? v.slice(1) 
					: v == "rgb(" && v_old.slice(0,4) != "rgb(" ? "rgb()"
					: v; 
	if(e.target.value == "rgb()") {e.target.setSelectionRange(4,4);}
	if(e.target.value == "rgb)")  {e.target.value= "rgb"}
	if(v_old == "rgb()" && e.target.value == "rgb(")  {e.target.value= "rgb"}
	if(v_old.slice(0,4) == "rgb(" && e.target.value.slice(-2,-1) == ")")  {e.target.value = "rgb(" + e.target.value.slice(4,-2) + ")"}

	if(v_old.slice(0,4) == "rgb(" && v_old.slice(-1) == ")" && v.slice(0,3) == "rgb" &&v.slice(3,4) != "(")  {e.target.value = "rgb"}
	
	e.target.placeholder = "Search Colors"; 
	if(stat == 0) {stat = 1; myWorker.postMessage([v]);} else {stat2 = v; stat=2;}
	e.target.oldvalue = e.target.value; 
})
sh.addEventListener('focus', e => { 
	if(e.target.value[0] == " ") {
		e.target.value = e.target.value.slice(1);
		e.target.placeholder = "Search Colors"; 
	}
	if(e.target.placeholder.slice(0,4) == "rgb(")  {
		e.target.value = e.target.placeholder; 
		e.target.setSelectionRange(0,-1);
		myWorker.postMessage([e.target.placeholder]);
	} else {
		myWorker.postMessage([e.target.value]);
	}

})
sh.addEventListener('submit', e => { 
	e.preventDefault();
	console.log("form submitted");
})

document.getElementById("clr-search").addEventListener("submit", e => {
	e.preventDefault()
    out.firstChild.lastChild.click()
});


myWorker.onmessage = e => {
	out.innerHTML = ""
	const inn = sh.value.charAt(0).toUpperCase() +  sh.value.slice(1);
	if(clr.rgb.map(e => e >>0) != e.data[0][1] && e.data[0][1] && stat == 1) {
		clr.rgb = e.data[0][1];
		domuppdate();
	}
	e.data.forEach(el => {
		const item = document.createElement("li");
		const preview = document.createElement("div")
		if (el[1]) {
			preview.setAttribute("style", `background-color: rgb(${el[1][0]},${el[1][1]},${el[1][2]})`); 
		}
		preview.className = "preview"
		item.appendChild(preview)
		
		"".toLowerCase
		const name = document.createElement("div"); 

		let inn2 = ""
		for (var i = 0; i < Math.max(el[0].length,inn.length); i++) {
			if(i < Math.min(el[0].length,inn.length)) {
				inn2 = el[0][i] == inn[i] || el[0][i] == inn[i+1] || el[0][i] == inn[i-1] ? inn2 + `<b>${el[0][i]}</b>` : inn2 + el[0][i];
			} else {
				inn2 = inn2 + (el[0][i] || "")
			}
		}
		name.innerHTML = inn2
		name.className = "name"
		item.appendChild(name)

		if (el[2]) {
			const tags = document.createElement("div")
			tags.className = "tags"
			for (let index = 0; index < el[2].length; index++) {
				const elm = el[2][index];
				const g = document.createElement("button")
				g.textContent = elm;
				g.setAttribute("c",`${elm}`)
				g.addEventListener("click", getdataTag);
				// g.addEventListener("click", () => out.value=);
				tags.appendChild(g)
			}
			item.appendChild(tags)
		}
		
		if (el[1]) {
			const rgb = document.createElement("button")
			rgb.className = "numbers"
			rgb.setAttribute("c",`rgb(${el[1][0]},${el[1][1]},${el[1][2]})`)
			rgb.addEventListener("click", getdata);
			const r = document.createElement("span")
			const g = document.createElement("span")
			const b = document.createElement("span")
			r.textContent = el[1][0]
			g.textContent = el[1][1]
			b.textContent = el[1][2]
			r.setAttribute("c",`rgb(${el[1][0]},${el[1][1]},${el[1][2]})`)
			g.setAttribute("c",`rgb(${el[1][0]},${el[1][1]},${el[1][2]})`)
			b.setAttribute("c",`rgb(${el[1][0]},${el[1][1]},${el[1][2]})`)
			rgb.appendChild(r)
			rgb.appendChild(g)
			rgb.appendChild(b)
			item.appendChild(rgb)
		}
	

		out.appendChild(item); 
	});

	if(stat == 2) {myWorker.postMessage([stat2]); console.log(stat,stat2); out.setAttribute("test","1")} else {out.setAttribute("test", "0")}
	stat = 0;
}
const getdata = e => {
	const r = e.target.getAttribute("c")
	myWorker.postMessage([r])
	sh.value = ""
	sh.placeholder = r
}
const getdataTag = e => {
	const r = e.target.getAttribute("c")
	myWorker.postMessage([r])
	sh.value = r + ":"
	sh.focus();
	// sh.setSelectionRange(-1);
	sh.placeholder = r
}