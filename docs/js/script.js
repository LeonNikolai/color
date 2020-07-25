var myWorker = new Worker('worker.js');
const out = document.getElementById('output')
myWorker.onmessage = e => {
	out.innerHTML = ""
	// sh.setAttribute("style", `background-color: rgb(${e.data[0][1][0]},${e.data[0][1][1]},${e.data[0][1][2]})`); 
	const inn = sh.value.charAt(0).toUpperCase() +  sh.value.slice(1);
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
				const g = document.createElement("span")
				g.textContent = elm
				tags.appendChild(g)
			}
			item.appendChild(tags)
		}
		
		if (el[1]) {
			const rgb = document.createElement("button")
			rgb.className = "rgb"
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
}
const getdata = e => {
	const r = e.target.getAttribute("c")
	myWorker.postMessage([r])
	sh.value = ""
	sh.placeholder = r
}

const sh = document.getElementById('searchfield')
const re = document.getElementById('red')
const gr = document.getElementById('green')
const bl = document.getElementById('blue')

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
	console.log()
	if(v_old.slice(0,4) == "rgb(" && v_old.slice(-1) == ")" && v.slice(0,3) == "rgb" &&v.slice(3,4) != "(")  {e.target.value = "rgb"}
	
	e.target.placeholder = "Search Colors"; 
	myWorker.postMessage([v]);
	e.target.oldvalue = e.target.value; 
})
sh.addEventListener('focus', e => { 
	if(e.target.value[0] == " ") {
		e.target.value = e.target.value.slice(1);
		e.target.placeholder = "Search Colors"; 
	}
	if(e.target.placeholder.slice(0,4) == "rgb(")  {
		e.target.value = e.target.placeholder; 
		e.target.setSelectionRange(4,e.target.value.length-1);
	}

	myWorker.postMessage([e.target.value]);
})
sh.addEventListener('submit', e => { 
	// e.preventDefault();
	console.log("form submitted");
})


document.getElementById("clr-search").addEventListener("submit", e => {
	e.preventDefault()
    out.firstChild.lastChild.click()
});
let colorr = [0,0,0]

const setColorr = (r,g,b) => {
	colorr = [r,g,b]
	const string = `rgb(${r},${g},${b})`
	sh.value = ""
	sh.placeholder = string
	myWorker.postMessage([string])
}
re.addEventListener('input',e => setColorr(e.target.value,colorr[1],colorr[2]))
gr.addEventListener('input',e => setColorr(colorr[0],e.target.value,colorr[2]))
bl.addEventListener('input',e => setColorr(colorr[0],colorr[1],e.target.value))



const D65 = [95.047, 100, 108.883]
function rgbToXyz(rgb) {
	const [r,g,b] = rgb.map(x=>x/255)
	
    let x =  0.4124 * r + 0.3576 * g + 0.1805 * b;
    let y =  0.2126 * r + 0.7152 * g + 0.0722 * b;
	let z =  0.0193 * r + 0.1192 * g + 0.9505 * b;
	
	[x, y, z] = [x,y,z].map(_ => _ * 100);
	
	[x, y, z] = [x, y, z].map((v, i) => {
		v = v / D65[i]
		return v > 0.008856 ? Math.pow(v, 1 / 3) : v * 7.787 + 16 / 116 
	})
	const l = 116 * y - 16
	const a = 500 * (x - y)
	const b2 = 200 * (y - z)
	return [l, a, b2]
}
const hexToRgb = hex => [parseInt(hex.slice(0,2), 16),parseInt(hex.slice(2,4), 16),parseInt(hex.slice(4,6), 16)]
