import p5 from "p5";
import { rgb2hsl, hsl2all } from "./color-convert.js";
let RenderColor = [0, 0, 0];
let changedColor = false;
let _s = null;
let initalized = false
export function SetRenderColor(e) {
    changedColor = true;
    RenderColor = e;
}
export function UpdateCanvas() {
    if(!initalized) return;
    changedColor = true;
    if (_s != null && _s.resizeCanvas && _s.camera) {
        _s?.resizeCanvas(view.clientWidth, view.clientHeight);
        _s?.camera(400, -400, 400, 0, 0, 0, 0, 1, 0);
    }
}
export const LastEdited = {
    RGB: 1,
    HSL: 2,
    HSV: 3,
    HWB: 4,
};

let lastEdited = LastEdited.RGB;
let lastEditedHSL = 0;
export function SetLastEdited(e) {
    lastEdited = e;
}
export function SetLastEditedHSL(e) {
    lastEditedHSL = e;
}
let active = 1;
let mode = 0;
export function draw() {}
export function setup() {}
let view = document.getElementById("viewrgb");
const sketch = (s) => {
    _s = s;
    const smooth = s.smooth.bind(s);
    const createCanvas = s.createCanvas.bind(s);
    const colorMode = s.colorMode.bind(s);
    const angleMode = s.angleMode.bind(s);
    const camera = s.camera.bind(s);
    const WEBGL = s.WEBGL;
    const orbitControl = s.orbitControl.bind(s);
    const background = s.background.bind(s);
    const fill = s.fill.bind(s);
    const vertex = s.vertex.bind(s);
    const push = s.push.bind(s);
    const beginShape = s.beginShape.bind(s);
    const noStroke = s.noStroke.bind(s);
    const TRIANGLES = s.TRIANGLES;
    const rotateX = s.rotateX.bind(s);
    const translate = s.translate.bind(s);
    const endShape = s.endShape.bind(s);
    const pop = s.pop.bind(s);
    const noFill = s.noFill.bind(s);
    const cylinder = s.cylinder.bind(s);
    const strokeWeight = s.strokeWeight.bind(s);
    const stroke = s.stroke.bind(s);
    const rotateY = s.rotateY.bind(s);
    const box = s.box.bind(s);
    const sphere = s.sphere.bind(s);
    const line = s.line.bind(s);
    const scale = s.scale.bind(s);
    const rotateZ = s.rotateZ.bind(s);
    const loop = s.loop.bind(s);
    const noLoop = s.noLoop.bind(s);

    s.setup = () => {
        initalized = true;
        smooth();
        var canvas = createCanvas(view.clientWidth, view.clientHeight, WEBGL).parent("viewrgb");
        colorMode(s.RGB, 1);
        angleMode(s.DEGREES);
        camera(400, -400, 400, 0, 0, 0, 0, 1, 0);

        changedColor = true;
        window.addEventListener("resize", function (event) {
            changedColor = true;
            s.resizeCanvas(view.clientWidth, view.clientHeight);
            s.camera(400, -400, 400, 0, 0, 0, 0, 1, 0);
        });
    };
    const rgb_vertex = (a, b, c) => {
        fill(a, b, c);
        vertex(a, b, c);
    };

    let red = () => rgb_vertex(1, 0, 0);
    let green = () => rgb_vertex(0, 1, 0);
    let blue = () => rgb_vertex(0, 0, 1);
    let magenta = () => rgb_vertex(1, 0, 1);
    let yellow = () => rgb_vertex(1, 1, 0);
    let cyan = () => rgb_vertex(0, 1, 1);
    let white = () => rgb_vertex(1, 1, 1);
    let black = () => rgb_vertex(0, 0, 0);
    s.draw = () => {
        const x = RenderColor[0] / 255;
        const y = RenderColor[1] / 255;
        const z = RenderColor[2] / 255;
        orbitControl(7, 7, 0);
        if (!changedColor) return;
        changedColor = false;
        background([0.1, 0.1, 0.1]);
        const sc = Math.min(view.clientHeight, view.clientHeight) / 3;
        scale(sc);
        if (mode == 1 || lastEdited == LastEdited.RGB) {
            let rotation = 0;
            let rotation2 = 0;
            let type = y;
            switch (active) {
                case 0:
                    rotation = 90;
                    type = x;
                    red = () => rgb_vertex(x, 0, 0);
                    magenta = () => rgb_vertex(x, 0, 1);
                    yellow = () => rgb_vertex(x, 1, 0);
                    white = () => rgb_vertex(x, 1, 1);
                    break;
                case 1:
                    rotation = 0;
                    green = () => {
                        rgb_vertex(0, y, 0);
                    };
                    yellow = () => {
                        rgb_vertex(1, y, 0);
                    };
                    cyan = () => {
                        rgb_vertex(0, y, 1);
                    };
                    white = () => {
                        rgb_vertex(1, y, 1);
                    };
                    break;
                case 3:
                    rotation2 = 180;
                    type = 1 - y;
                    black = () => {
                        rgb_vertex(0, y, 0);
                    };
                    red = () => {
                        rgb_vertex(1, y, 0);
                    };
                    magenta = () => {
                        rgb_vertex(1, y, 1);
                    };
                    blue = () => {
                        rgb_vertex(0, y, 1);
                    };
                    break;
                case 2:
                    rotation2 = 90;
                    rotation = 0;
                    type = z;
                    blue = () => {
                        rgb_vertex(0, 0, z);
                    };
                    cyan = () => {
                        rgb_vertex(0, 1, z);
                    };
                    magenta = () => {
                        rgb_vertex(1, 0, z);
                    };
                    white = () => {
                        rgb_vertex(1, 1, z);
                    };
                    break;
                case 4:
                    rotation = -90;
                    type = 1 - x;
                    blue = () => {
                        rgb_vertex(x, 0, 1);
                    };
                    cyan = () => {
                        rgb_vertex(x, 1, 1);
                    };
                    green = () => {
                        rgb_vertex(x, 1, 0);
                    };
                    black = () => {
                        rgb_vertex(x, 0, 0);
                    };
                    break;
            }
            push();
            beginShape(TRIANGLES);
            noStroke();
            // colors
            white();
            red();
            magenta();
            white();
            red();
            yellow();
            white();
            green();
            cyan();
            white();
            green();
            yellow();
            white();
            blue();
            magenta();
            white();
            blue();
            cyan();
            black();
            cyan();
            blue();
            black();
            cyan();
            green();
            black();
            yellow();
            green();
            black();
            yellow();
            red();
            black();
            magenta();
            red();
            black();
            magenta();
            blue();
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
            if (rotation == 180) {
                translate(0, 0.0012, 0);
            }

            cylinder(0.1, 0.01);
            fill(x, y, z);
            translate(0, 0.01, 0);
            cylinder(0.08, 0.02);
            pop();
        } else if (mode == 0) {
            strokeWeight(1);
            push();
            stroke(0.8, 0.8, 0.8, 0.1);
            fill(0, 1, 0, 1);
            noFill();
            box(1);
            pop();

            switch (lastEdited) {
                case LastEdited.RGB:
                    {
                        push();
                        fill(x, y, z);
                        noStroke();
                        translate(x - 0.5, 1 - z - 0.5, y - 0.5);
                        sphere(0.05);
                        pop();
                        const r = x;
                        const g = y;
                        const b = z;
                        // interpolate red
                        for (let i = 0; i < 1; i += 0.01) {
                            push();
                            stroke(i, g, b);
                            line(i - 0.5, 1 - b - 0.5, g - 0.5, i + 0.01 - 0.5, 1 - b - 0.5, g - 0.5);
                            pop();
                        }
                        // interpolate green
                        for (let i = 0; i < 1; i += 0.01) {
                            push();
                            stroke(r, i, b);
                            line(r - 0.5, 1 - b - 0.5, i - 0.5, r - 0.5, 1 - b - 0.5, i + 0.01 - 0.5);
                            pop();
                        }
                        // interpolate blue
                        for (let i = 0; i < 1; i += 0.01) {
                            push();
                            stroke(r, g, i);
                            line(r - 0.5, 1 - i - 0.5, g - 0.5, r - 0.5, 1 - i + 0.01 - 0.5, g - 0.5);
                            pop();
                        }
                    }
                    break;
                case LastEdited.HSL: {
                    push();
                    fill(x, y, z);
                    noStroke();
                    translate(x - 0.5, 1 - z - 0.5, y - 0.5);
                    sphere(0.025);
                    pop();
                    let [r, g, b] = [x * 255, y * 255, z * 255];

                    let hsl = rgb2hsl(r, g, b);
                    const h = hsl[0];
                    const s = hsl[1];
                    const l = hsl[2];
                    strokeWeight(lastEditedHSL == 0 ? 3 : 1);
                    /// interpolate hue
                    for (let i = 0; i < 360 / 4; i++) {
                        let start = hsl2all(i * 4, s, l);
                        let next = hsl2all(i * 4 + 4, s, l);
                        start = [start[0] / 255, start[1] / 255, start[2] / 255];
                        next = [next[0] / 255, next[1] / 255, next[2] / 255];
                        push();
                        // line
                        stroke(start[0], start[1], start[2]);
                        line(
                            start[0] - 0.5,
                            1 - start[2] - 0.5,
                            start[1] - 0.5,
                            next[0] - 0.5,
                            1 - next[2] - 0.5,
                            next[1] - 0.5
                        );

                        pop();
                    }
                    strokeWeight(lastEditedHSL == 2 ? 3 : 1);
                    // interpolate lightness
                    for (let i = 0; i < 100; i += 5) {
                        let start = hsl2all(h, s, i);
                        let next = hsl2all(h, s, i + 5);
                        start = [start[0] / 255, start[1] / 255, start[2] / 255];
                        next = [next[0] / 255, next[1] / 255, next[2] / 255];
                        push();
                        // line

                        stroke(start[0], start[1], start[2]);
                        line(
                            start[0] - 0.5,
                            1 - start[2] - 0.5,
                            start[1] - 0.5,
                            next[0] - 0.5,
                            1 - next[2] - 0.5,
                            next[1] - 0.5
                        );
                        pop();
                    }

                    // interpolate saturation
                    strokeWeight(lastEditedHSL == 1 ? 3 : 1);
                    for (let i = 0; i < 100; i += 8) {
                        let start = hsl2all(h, i, l);
                        let next = hsl2all(h, i + 8, l);
                        start = [start[0] / 255, start[1] / 255, start[2] / 255];
                        next = [next[0] / 255, next[1] / 255, next[2] / 255];
                        push();
                        // line
                        stroke(start[0], start[1], start[2]);
                        line(
                            start[0] - 0.5,
                            1 - start[2] - 0.5,
                            start[1] - 0.5,
                            next[0] - 0.5,
                            1 - next[2] - 0.5,
                            next[1] - 0.5
                        );
                        pop();
                    }
                }
                default: {
                }
            }
        } else {
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
    };
};
let wasPressedOutside = false;
p5.prototype.orbitControl = function (sensitivityX, sensitivityY, sensitivityZ) {
    this._assert3d("orbitControl");
    const mouseInCanvas = this.mouseX < this.width && this.mouseX > 0 && this.mouseY < this.height && this.mouseY > 0;

    if (!mouseInCanvas) {
        wasPressedOutside = this.mouseIsPressed;
        return;
    }
    if (wasPressedOutside) {
        if (!this.mouseIsPressed) {
            wasPressedOutside = this.mouseIsPressed;
        }
        return;
    }

    const cam = this._renderer.states.curCamera;
    if (typeof sensitivityX === "undefined") {
        sensitivityX = 1;
    }
    if (typeof sensitivityY === "undefined") {
        sensitivityY = sensitivityX;
    }
    if (typeof sensitivityZ === "undefined") {
        sensitivityZ = 0.5;
    }
    if (this.contextMenuDisabled !== true) {
        this.canvas.oncontextmenu = () => false;
        this.contextMenuDisabled = true;
    }
    if (this.wheelDefaultDisabled !== true) {
        this.canvas.onwheel = () => false;
        this.wheelDefaultDisabled = true;
    }
    const scaleFactor = this.height < this.width ? this.height : this.width;
    if (this.mouseIsPressed) {
        if (this.mouseButton.left) {
            changedColor = true;
            const deltaTheta = (-sensitivityX * (this.mouseX - this.pmouseX)) / scaleFactor;
            const deltaPhi = (sensitivityY * (this.mouseY - this.pmouseY)) / scaleFactor;
            cam._orbit(deltaTheta, deltaPhi, 0);
        }
    }
    return this;
};
let v = new p5(sketch);
