var rgb = JSON.parse(`{"r":0,"g":0,"b":0}`);
let cmyk = JSON.parse(`{"c":0,"m":0,"y":0,"k":0}`);
let hsl = JSON.parse(`{"h":0,"s":0,"l":0}`);
let hwb = JSON.parse(`{"h":0,"w":0,"b":0}`);
let seti = 1;
let input_red = document.getElementById('r');
let input_green = document.getElementById('g');
let input_blue = document.getElementById('b');
let input_hex = document.getElementById('hex');
function onload() {
    rgb.r = getparam(rgb.r, "r");
    rgb.g = getparam(rgb.g, "g");
    rgb.b = getparam(rgb.b, "b");
    input_red.value = rgb.r;
    input_green.value = rgb.g;
    input_blue.value = rgb.b;
    input_red.nextSibling.value = rgb.r;
    input_green.nextSibling.value = rgb.g;
    input_blue.nextSibling.value = rgb.b;
    input_hex.value = rgb_hex(rgb.r, rgb.g, rgb.b);
}
const rgb_hex = (r, g, b) => {
    r = Math.round(r).toString(16);
    g = Math.round(g).toString(16);
    b = Math.round(b).toString(16);
    if (r.length == 1)
        r = '0' + r;
    if (g.length == 1)
        g = '0' + g;
    if (b.length == 1)
        b = '0' + b;
    let x = ['00', '11', '22', '33', '44', '55', '66', '77', '88', '99', 'aa', 'bb', 'cc', 'dd', 'ee', 'ff'];
    if (x.indexOf(r) !== -1) {
        if (x.indexOf(g) !== -1) {
            if (x.indexOf(b) !== -1) {
                r = String(r).slice(0, -1);
                g = String(g).slice(0, -1);
                b = String(b).slice(0, -1);
            }
        }
    }
    return r + g + b;
};
function hex_rgb(hex) {
    hex = '0x' + hex;
    let result = {
        r: (hex >> 16) & 0xFF,
        g: (hex >> 8) & 0xFF,
        b: hex & 0xFF,
    };
    return result;
}
;
const minmaxsnap = me => me.value = Number(me.value) > Number(me.max) ? me.max : Number(me.min) > Number(me.value) ? me.min : me.value;
function getparam(x, query) {
    let params = new URLSearchParams(document.location.search.substring(1));
    if (params.has(query)) {
        return String(params.get(query));
    }
}
;
let pg;
function setup() {
    if (document.getElementById('viewrgb')) {
        let width = document.getElementById('viewrgb').clientWidth;
        createCanvas(width, 600, WEBGL).parent('#viewrgb');
        pg = createGraphics(100, 100, P2D);
    }
}
window.addEventListener('resize', windowResized);
function windowResized() {
    resizeCanvas(document.getElementById('viewrgb').clientWidth, 600);
}
draw = () => {
    background(250);
    orbitControl(4, 4, 0);
    if (seti == 1) {
        strokeWeight(1);
        stroke(127.5, 127.5, 127.5);
        push();
        noFill();
        box(255, 255, 255);
        pop();
        fill(0, 0, 0);
        translate(rgb.r - 127.5, rgb.g - 127.5, rgb.b - 127.5);
        noStroke();
        fill(rgb.r, rgb.g, rgb.b);
        push();
        sphere(20);
        pop();
        push();
        strokeWeight(2);
        stroke(255, 0, 0, 75);
        line(255 - rgb.r, 0, 0, rgb.r * -1, 0, 0);
        stroke(0, 255, 0, 75);
        line(0, 255 - rgb.g, 0, 0, rgb.g * -1, 0);
        stroke(0, 0, 255, 75);
        line(0, 0, 255 - rgb.b, 0, 0, rgb.b * -1);
        pop();
    }
    else if (seti == 2) {
        orbitControl(4, 4, 0);
        noFill();
        stroke(255, 255, 255);
        strokeWeight(2);
        push();
        box(255, 255, 255);
        pop();
        translate(0, 0, -127.5 + rgb.b / 2);
        noStroke();
        fill(rgb.r, rgb.g, rgb.b);
        push();
        box(255, 255, rgb.b);
        pop();
        fill(255, 255, 255);
        translate(rgb.r - 127.5, rgb.g - 127.5, rgb.b / 2);
        push();
        sphere(20);
        pop();
    }
    else {
        background(255, 200, 200);
        cylinder(200, 250);
    }
};
