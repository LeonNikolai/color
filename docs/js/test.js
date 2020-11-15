function setup() {
  smooth();
  let view = document.getElementById("viewrgb")
  createCanvas(view.clientWidth,view.clientWidth, WEBGL).parent('viewrgb');
  colorMode(RGB, 1);
  angleMode(DEGREES);
  camera(400, -400, 400, 0, 0, 0, 0, 1, 0);
//   noLoop();
};

window.addEventListener('resize', function (event) {
    let view = document.getElementById("viewrgb")
    resizeCanvas(view.clientWidth,view.clientWidth);
    camera(400, -400, 400, 0, 0, 0, 0, 1, 0);
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
let RenderColor = [0,0,0]
let active = 1;
let mode = 1;

function draw() {
  const x = RenderColor[0] / 255;
  const y = RenderColor[1] / 255;
  const z = RenderColor[2] / 255;
  orbitControl(7, 7, 0)
  background([0.1,0.1,0.1]);
  scale(Math.min(document.documentElement.clientHeight, document.documentElement.clientHeight)/3);
  if (mode == 1) {
    const rgb_vertex = (a, b, c) => { fill(a, b, c); vertex(a, b, c); };
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
