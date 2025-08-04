import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";
import { setup, draw, UpdateCanvas, SetRenderColor, LastEdited, SetLastEdited, SetLastEditedHSL } from "./test";

import { rgb2all, rgb2hex, cmyk2rgb, hsv2rgb, hwb2Rgb, hsl2all, hsv2all, hwb2all, hex2rgb } from "./color-convert.js";
import init, { do_search, do_search_rgb } from "../../src-search-worker/pkg/color_search_worker.js";
import { dom } from "./dom.ts";
import { isFunctionOrConstructorTypeNode } from "typescript";
let active = 1;
let lastSearchQuery = "";
export let clr = {
    get rgb() {
        return [this.red, this.green, this.blue];
    },
    red: 255,
    green: 0,
    blue: 0,
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
            this.blackness,
        ] = rgb2all(arr[0], arr[1], arr[2]);
        this.red = arr[0];
        this.green = arr[1];
        this.blue = arr[2];
        this.hex = rgb2hex(this.red, this.green, this.blue);
        SetRenderColor(clr.rgb);
    },
    get cmyk() {
        return [this.cyan, this.magenta, this.yellow, this.key];
    },
    cyan: 0,
    magenta: 0,
    yellow: 0,
    key: 0,
    set cmyk(arr) {
        this.rgb = cmyk2rgb(arr[0], arr[1], arr[2], arr[3]);
        this.cyan = arr[0];
        this.magenta = arr[1];
        this.yellow = arr[2];
        this.key = arr[3];
    },
    get hsl() {
        return [this.hue, this.saturationHsl, this.lightness];
    },
    hue: 0,
    saturationHsl: 100,
    lightness: 100,
    set hsl(arr) {
        [this.red, this.green, this.blue, this.saturationHsv, this.value, this.whiteness, this.blackness] = hsl2all(
            arr[0],
            arr[1],
            arr[2]
        );
        this.hue = arr[0];
        this.saturationHsl = arr[1];
        this.lightness = arr[2];
    },
    get hsv() {
        return [this.hue, this.saturationHsv, this.value];
    },
    saturationHsv: 100,
    value: 100,
    set hsv(arr) {
        [this.red, this.green, this.blue, this.saturationHsl, this.lightness, this.whiteness, this.blackness] = hsv2all(
            arr[0],
            arr[1],
            arr[2]
        );
        this.hue = arr[0];
        this.saturationHsv = arr[1];
        this.value = arr[2];
    },
    get hwb() {
        return [this.hue, this.whiteness, this.blackness];
    },
    blackness: 0,
    whiteness: 0,
    set hwb(arr) {
        [this.red, this.green, this.blue, this.saturationHsv, this.value, this.saturationHsl, this.lightness] = hwb2all(
            arr[0],
            arr[1],
            arr[2]
        );
        this.hue = arr[0];
        this.whiteness = arr[1];
        this.blackness = arr[2];
    },
};

function doBlack(r, g, b) {
    const contrast = (r * 299 + g * 587 + b * 114) / 1000;
    return contrast > 125 ? true : false;
}
function componentToHex(c) {
    var hex = c.toString(16).toUpperCase();
    return hex.length == 1 ? "0" + hex : hex;
  }
function renderColorList(colorlist) {
    let i = scrollStartIndex;
    const listrender = colorlist.map((el) => {
        const tag = el.tags;
        let eltags = [];
        if (tag & (1 << 0)) eltags.push("Basic");
        if (tag & (1 << 1)) eltags.push("Web");
        if (tag & (1 << 2)) eltags.push("Pantone");
        if (tag & (1 << 3)) eltags.push("Pantone");
        if (tag & (1 << 4)) eltags.push("NSB");
        if (tag & (1 << 5)) eltags.push("BS 4800");
        if (tag & (1 << 6)) eltags.push("BS 381C");
        if (tag & (1 << 7)) eltags.push("BS 2660");
        if (tag & (1 << 8)) eltags.push("BS 5252");
        if (tag & (1 << 9)) eltags.push("RAL Classic");
        if (tag & (1 << 10)) eltags.push("RAL Design");
        if (tag & (1 << 11)) eltags.push("RAL Effect");
        if (tag & (1 << 12)) eltags.push("RAL P1");
        if (tag & (1 << 13)) eltags.push("RAL P2");

        const [r, g, b] = el.rgb;
        const excactmatch = r == (clr.red >>0) && g == (clr.green >> 0) && b == (clr.blue >> 0);
        const color = doBlack(r, g, b) ? "black;" : "white";
        const tags = eltags.map((tag) => html`<button @click=${getdataTag} c=${tag}>${tag}</button>`);

        return html` <li class="color-item ${excactmatch ? "active" : ""}">
            <button @click=${getdata} c="${r},${g},${b}" class="colortest">
                <div style="--textColor:var(--${color}); background:rgb(${r},${g},${b})" class="preview"></div>
                <div class="name">
                    <span>${unsafeHTML(el.name)}</span
                    ><span class="numbers"><span>#</span><span>${componentToHex(r)}</span><span>${componentToHex(g)}</span><span>${componentToHex(b)}</span></span>
                </div>
            </button>
            <div class="tags">${tags}</div>
        </li>`;
    });
    render(listrender, out_content);
}
const domuppdate = () => {
    dom.rgb = clr.rgb;
    dom.hsl = clr.hsl;
    dom.hsv = clr.hsv;
    dom.hwb = clr.hwb;
    dom.cmyk = clr.cmyk;
    const hsvVal = hsv2rgb(clr.hue, clr.saturationHsv, 100);
    css_var(
        "value",
        `
    linear-gradient(to right, 
        rgb(0,0,0),
        rgb(${hsv2rgb(clr.hue, clr.saturationHsv, 100).join(",")})
    )`
    );

    css_var(
        "saturation2",
        `	
    linear-gradient(to right, 
        rgb(${hsv2rgb(clr.hue, 0, clr.value).join(",")}),
        rgb(${hsv2rgb(clr.hue, 100, clr.value).join(",")})
    )`
    );

    css_var(
        "whiteness",
        `	
    linear-gradient(to right, 
        rgb(${hwb2Rgb(clr.hue, 0, clr.blackness).join(",")}),
        rgb(${hwb2Rgb(clr.hue, 100 - clr.blackness, clr.blackness).join(",")}) ${100 - clr.blackness}%,
        rgb(${hwb2Rgb(clr.hue, 100, clr.blackness).join(",")})
    )`
    );
    css_var(
        "blackness",
        `linear-gradient(to right, 
        rgb(${hwb2Rgb(clr.hue, clr.whiteness, 0).join(",")}),
        rgb(${hwb2Rgb(clr.hue, clr.whiteness, 100 - clr.whiteness).join(",")}) ${100 - clr.whiteness}%,
        rgb(${hwb2Rgb(clr.hue, clr.whiteness, 100).join(",")}) 100%
    )`
    );

    if (doBlack(clr.red, clr.green, clr.blue)) {
        css_var("textColor", "var(--black)");
    } else {
        css_var("textColor", "var(--white)");
    }
    css_var("red", clr.red);
    css_var("green", clr.green);
    css_var("blue", clr.blue);
    css_var("hue", clr.hue);
    css_var("saturation", clr.saturationHsl);
    css_var("lightness", clr.lightness);
    setcurrentswatch();

    let word = html`
        <span class="bold">#${rgb2hex(clr.red, clr.green, clr.blue)}</span><br />
        <div class="grid">
            <div>
                <span class="prefix">rgb</span>
                <span class="digit">${clr.red | 0} ${clr.green | 0} ${clr.blue | 0}</span>
            </div>
            <div>
                <span class="prefix">cmyk</span>
                <span class="digit"
                    >${(clr.cyan | 0) + "%"} ${(clr.magenta | 0) + "%"} ${(clr.yellow | 0) + "%"}
                    ${(clr.key | 0) + "%"}</span
                >
            </div>
            <div>
                <span class="prefix">hsl</span>
                <span class="digit"
                    >${(clr.hue | 0) + "°"} ${(clr.saturationHsl | 0) + "%"} ${(clr.lightness | 0) + "%"}</span
                >
            </div>
            <div>
                <span class="prefix">hsv</span>
                <span class="digit"
                    >${(clr.hue | 0) + "°"} ${(clr.saturationHsv | 0) + "%"} ${(clr.value | 0) + "%"}</span
                >
            </div>
            <div>
                <span class="prefix">hwb</span>
                <span class="digit"
                    >${(clr.hue | 0) + "°"} ${(clr.whiteness | 0) + "%"} ${(clr.blackness | 0) + "%"}</span
                >
            </div>
        </div>
    `;

    lastSearchQuery = "";
    RefreshList();
    render(word, document.getElementById("test"));
};

const setColorr = (r, g, b, amount = 32) => {
    // myWorker.postMessage([[r, g, b], "color", amount])
};
let old = 0;
let swatch = [
    [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    [Math.random() * 255, Math.random() * 255, Math.random() * 255],
    [Math.random() * 255, Math.random() * 255, Math.random() * 255],
];
const colorload = (index) => {
    swatch[old] = clr.rgb;
    old = index;
    clr.rgb = swatch[index];

    domuppdate();
    inputUppdate();
    setColorr(clr.red, clr.green, clr.blue);
};
const RD = (max) => Math.floor(Math.random() * max);
const sitealert = (message) => {
    el = document.getElementById("notifications");
    if (el.classList.contains("active")) {
    } else {
        el.innerHTML = "🤪 " + message;
        el.classList.add("active");
        setTimeout(() => (el.innerHTML = "🍆 " + message), 500);
        setTimeout(() => (el.innerHTML = "🤬 " + message), 1000);
        setTimeout(() => (el.innerHTML = "😂 " + message), 1500);
        setTimeout(() => (el.innerHTML = "⏰ " + message), 2500);
        setTimeout(() => el.classList.remove("active"), 3000);
    }
    console.log(message);
};

const setURL = () =>
    history.replaceState(
        { color: clr },
        "",
        document.location.pathname + "?color=" + rgb2hex(clr.red, clr.green, clr.blue)
    );
const changeinput = (classname, type) => {
    x = document.getElementsByClassName(classname);
    for (i = 0; i < x.length; i++) x[i].type = type;
};

function getparam(x) {
    let y = new URLSearchParams(document.location.search.substring(1)).get(x);
    return y;
}

let inputstate = "rgb";

window.onbeforeunload = (event) => {
    const hex = rgb2hex(clr.red, clr.green, clr.blue);
    window.sessionStorage.setItem("color", hex);
    window.localStorage.setItem("color", hex);
};

window.onload = async (event) => {
    if (/Edge/.test(navigator.userAgent)) {
        alert("this website works better when using google chrome");
        sitealert("this website works better when using google chrome");
    }
    await init();
    console.log(test);
    const url = new URLSearchParams(document.location.search);
    console.log(window.sessionStorage.getItem("color"));

    clr.rgb = url.has("color")
        ? hex2rgb(getparam("color"))
        : window.sessionStorage.getItem("color") != null
        ? hex2rgb(window.sessionStorage.getItem("color"))
        : window.localStorage.getItem("color") != null
        ? hex2rgb(window.localStorage.getItem("color"))
        : [(Math.random() * 255) | 0, (Math.random() * 255) | 0, (Math.random() * 255) | 0];

    dom.red.addEventListener("input", (e) => {
        SetLastEdited(LastEdited.RGB);
        clr.rgb = [e.target.value, clr.green, clr.blue];
    });
    dom.green.addEventListener("input", (e) => {
        SetLastEdited(LastEdited.RGB);
        clr.rgb = [clr.red, e.target.value, clr.blue];
    });
    dom.blue.addEventListener("input", (e) => {
        SetLastEdited(LastEdited.RGB);
        clr.rgb = [clr.red, clr.green, e.target.value];
    });
    dom.hue.addEventListener("input", (e) => {
        SetLastEdited(LastEdited.HSL);
        SetLastEditedHSL(0);
        clr.hsl = [e.target.value, clr.saturationHsl, clr.lightness];
    });
    dom.cyan.addEventListener("input", (e) => {
        clr.cmyk = [e.target.value, clr.magenta, clr.yellow, clr.key];
    });
    dom.magenta.addEventListener("input", (e) => {
        clr.cmyk = [clr.cyan, e.target.value, clr.yellow, clr.key];
    });
    dom.yellow.addEventListener("input", (e) => {
        clr.cmyk = [clr.cyan, clr.magenta, e.target.value, clr.key];
    });
    dom.key.addEventListener("input", (e) => {
        clr.cmyk = [clr.cyan, clr.magenta, clr.yellow, e.target.value];
    });
    dom.saturationHsv.addEventListener("input", (e) => {
        clr.hsv = [clr.hue, e.target.value, clr.value];
    });
    dom.value.addEventListener("input", (e) => {
        clr.hsv = [clr.hue, clr.saturationHsv, e.target.value];
    });
    dom.saturationHsl.addEventListener("input", (e) => {
        SetLastEdited(LastEdited.HSL);
        SetLastEditedHSL(1);
        clr.hsl = [clr.hue, e.target.value, clr.lightness];
    });
    dom.lightness.addEventListener("input", (e) => {
        SetLastEdited(LastEdited.HSL);
        SetLastEditedHSL(2);
        clr.hsl = [clr.hue, clr.saturationHsl, e.target.value];
    });
    dom.whiteness.addEventListener("input", (e) => {
        clr.hwb = [clr.hue, e.target.value, clr.blackness];
    });
    dom.blackness.addEventListener("input", (e) => {
        clr.hwb = [clr.hue, clr.whiteness, e.target.value];
    });

    for (let i of document.getElementsByClassName("clr-in")) {
        i.addEventListener("input", () => {
            sh.value = "";
            setColorr(clr.red >> 0, clr.green >> 0, clr.blue >> 0);
            sh.placeholder = "#" + rgb2hex(clr.red, clr.green, clr.blue);
            SetRenderColor(clr.rgb);
            domuppdate();
        });
        i.addEventListener("change", () => {
            inputUppdate();
            setColorr(clr.red >> 0, clr.green >> 0, clr.blue >> 0);
        });
    }

    let favicon = document.createElement("link");
    favicon.rel = "icon";
    favicon.sizes = "any";
    favicon.type = "image/svg+xml";
    favicon.id = "favicon";
    favicon.href =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 130'%3E%3Ccircle fill='rgb(" +
        clr.red +
        "," +
        clr.green +
        "," +
        clr.blue +
        ")' cx='64' cy='64' r='64'/%3E%3C/svg%3E";
    document.getElementsByTagName("head")[0].appendChild(favicon);
    document.getElementById("tittle").innerHTML = "#" + rgb2hex(clr.red, clr.green, clr.blue);
    document.getElementById("test").innerHTML = "";
    document.getElementById("test").innerHTML = "";
    out_content.innerHTML = "";
    domuppdate();
    setColorr(clr.red >> 0, clr.green >> 0, clr.blue >> 0);
    document.getElementById("tittle").innerHTML = "Color Tools";
    setup();
    draw(clr.red, clr.green, clr.blue);
    InitalizeVirtualList();
};

const inputUppdate = () => {
    document.getElementById("favicon").href =
        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 130 130'%3E%3Ccircle fill='rgb(" +
        clr.red +
        "," +
        clr.green +
        "," +
        clr.blue +
        ")' cx='64' cy='64' r='64'/%3E%3C/svg%3E";
    document.getElementById("tittle").innerHTML = "#" + rgb2hex(clr.red, clr.green, clr.blue);
    setURL();
};
const css_var = (x, y, z = document.documentElement) => z.style.setProperty("--" + String(x), String(y));

const setcurrentswatch = () => {
    switch (old) {
        case 1:
            document.getElementById("color-1").style.background =
                "rgb(" + clr.red + "," + clr.green + "," + clr.blue + ")";
            break;
        case 2:
            document.getElementById("color-2").style.background =
                "rgb(" + clr.red + "," + clr.green + "," + clr.blue + ")";
            break;
        case 3:
            document.getElementById("color-3").style.background =
                "rgb(" + clr.red + "," + clr.green + "," + clr.blue + ")";
            break;
        case 4:
            document.getElementById("color-4").style.background =
                "rgb(" + clr.red + "," + clr.green + "," + clr.blue + ")";
            break;
        case 5:
            document.getElementById("color-5").style.background =
                "rgb(" + clr.red + "," + clr.green + "," + clr.blue + ")";
            break;
        default:
            document.getElementById("color-0").style.background =
                "rgb(" + clr.red + "," + clr.green + "," + clr.blue + ")";
            break;
    }
};

const sh = document.getElementById("searchfield");
const out = document.getElementById("output");
const out_scroll = out.querySelector(".output-scroll");
const out_content = out.querySelector(".output-content");

let scrollStartIndex = 0;
let scrollCount = 0;
let shouldForceUpdateList = false;
function InitalizeVirtualList() {
    let list = out;
    let content = out_content;
    let scrollarea = out_scroll;

    let items = Array.from({ length: 7498 }, (_, i) => `Item ${i + 1}`);
    let itemHeight = 48; // Height of each item in pixels
    let totalHeight = items.length * itemHeight;
    scrollarea.style.height = `${totalHeight}px`;

    let visibleCount = Math.ceil(list.clientHeight / itemHeight);
    let startIndex = 0;
    let endIndex = Math.min(visibleCount, items.length);
    let offset = 0;

    window.addEventListener("resize", () => {
        visibleCount = Math.ceil(list.clientHeight / itemHeight);
        shouldForceUpdateList = true;
        renderVisibleItems()
    });

    on_tab.push(() => {
        visibleCount = Math.ceil(list.clientHeight / itemHeight);
        shouldForceUpdateList = true;
        renderVisibleItems()
    });

    window.addEventListener("orientationchange", () => {
        visibleCount = Math.ceil(list.clientHeight / itemHeight);
        shouldForceUpdateList = true;
        renderVisibleItems()
    });

    shouldForceUpdateList = true;

    let oldstartIndex = startIndex;
    function renderVisibleItems() {
        let scrollTop = list.scrollTop;
        startIndex = Math.floor(scrollTop / itemHeight);
        endIndex = Math.min(startIndex + visibleCount, items.length);
        offset = Math.floor(scrollTop / itemHeight) * itemHeight;
        if (startIndex - oldstartIndex >= 1 || startIndex - oldstartIndex <= -1 || shouldForceUpdateList) {
            oldstartIndex = startIndex;
            scrollStartIndex = startIndex;
            scrollCount = endIndex - startIndex;
            content.style.transform = `translateY(${offset}px)`;
            RefreshList();
        }
    }
    list.addEventListener("scroll", renderVisibleItems, { passive: true });
    renderVisibleItems()
}
function toAsciiOnly(str) {
    return str.replace(/[^\x00-\x7F]/g, "");
}
function removeEmojis(str) {
    // This removes surrogate pairs (emojis and other UTF-16 multi-units)
    return str.replace(/[\uD800-\uDFFF]/g, "");
}


function RefreshList() {
    if (lastSearchQuery !== "") {
        let charLimit = 32;
        var data = do_search(lastSearchQuery.slice(0, charLimit), scrollStartIndex, scrollCount);
        renderColorList(data);
    } else {
        var color = do_search_rgb(clr.red, clr.green, clr.blue, scrollStartIndex, scrollCount);
        renderColorList(color);
    }
}
sh.addEventListener("input", (e) => {
    let v = e.target.value || "";
    let v_old = e.target.oldvalue || "";
    if (v != v_old) {
        e.target.value = v[0] == " " ? v.slice(1) : v == "rgb(" && v_old.slice(0, 4) != "rgb(" ? "rgb()" : v;
        if (e.target.value == "rgb()") {
            e.target.setSelectionRange(4, 4);
        }
        if (e.target.value == "rgb)") {
            e.target.value = "rgb";
        }
        if (v_old == "rgb()" && e.target.value == "rgb(") {
            e.target.value = "rgb";
        }
        if (v_old.slice(0, 4) == "rgb(" && e.target.value.slice(-2, -1) == ")") {
            e.target.value = "rgb(" + e.target.value.slice(4, -2) + ")";
        }

        if (v_old.slice(0, 4) == "rgb(" && v_old.slice(-1) == ")" && v.slice(0, 3) == "rgb" && v.slice(3, 4) != "(") {
            e.target.value = "rgb";
        }

        e.target.placeholder = "Search Colors";

        v = removeEmojis(v);
        v = toAsciiOnly(v);
        lastSearchQuery = v.trim();
        RefreshList();
        inputUppdate();
    }
    e.target.oldvalue = e.target.value;
});
sh.addEventListener("focus", (e) => {
    if (e.target.value[0] == " ") {
        e.target.value = e.target.value.slice(1);
        e.target.placeholder = "Search Colors";
    }
    if (e.target.placeholder.slice(0, 4) == "rgb(") {
        e.target.value = e.target.placeholder;
        e.target.setSelectionRange(0, -1);
    } else {
    }
});
sh.addEventListener("submit", (e) => {
    e.preventDefault();
});

document.getElementById("clr-search").addEventListener("submit", (e) => {
    e.preventDefault();
    out_content.firstElementChild.lastElementChild.click();
});

const getdata = (e) => {
    const r = e.currentTarget.getAttribute("c");
    const t = r.split(",").map((e) => Number(e));
    sh.value = "";
    sh.placeholder = "#" + rgb2hex(t[0], t[1], t[2]);
    clr.rgb = t;
    domuppdate();
};
const getdataTag = (e) => {
    const r = e.currentTarget.getAttribute("c");
    sh.value = r + ":";
    sh.placeholder = r;
    sh.focus();
};
let on_tab = [];
const tabs = document.querySelector("#tabs");
const tabButtons = tabs.querySelector("#tab-buttons");
const tabContent = tabs.querySelectorAll("#tab-content > .tab");
tabContent.forEach((tab) => {
    const tabMame = tab.getAttribute("data-tab");
    const button = document.createElement("button");
    button.textContent = tabMame;
    button.addEventListener("click", () => {
        tabContent.forEach((t) => t.classList.remove("active"));
        tabButtons.querySelectorAll("button").forEach((b) => b.classList.remove("active"));
        tab.classList.add("active");
        button.classList.add("active");
        UpdateCanvas();
        on_tab.forEach((f) => f());
    });
    tabButtons.appendChild(button);
});
document.querySelectorAll("#tab-buttons button")[1].click();
