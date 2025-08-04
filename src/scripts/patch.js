import p5 from 'p5';


export function patch(p) {
    p5.prototype.orbitControl = p;
}