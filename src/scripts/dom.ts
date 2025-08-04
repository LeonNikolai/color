export let dom = {
    message: document.getElementById("message"),
    red: document.getElementById("red") as HTMLInputElement,
    green: document.getElementById("green") as HTMLInputElement,
    blue: document.getElementById("blue") as HTMLInputElement,

    hue: document.getElementById("hue") as HTMLInputElement,

    saturationHsl: document.getElementById("saturation_1") as HTMLInputElement,
    lightness: document.getElementById("lightness") as HTMLInputElement,

    saturationHsv: document.getElementById("saturation_2") as HTMLInputElement,
    value: document.getElementById("value") as HTMLInputElement,

    blackness: document.getElementById("blackness") as HTMLInputElement,
    whiteness: document.getElementById("whiteness") as HTMLInputElement,

    cyan: document.getElementById("cyan") as HTMLInputElement,
    magenta: document.getElementById("magenta") as HTMLInputElement,
    yellow: document.getElementById("yellow") as HTMLInputElement,
    key: document.getElementById("key") as HTMLInputElement,
    colorswap: document.getElementById("colorswap") as HTMLInputElement,

    get rgb() {
        return [Number(this.red.value), Number(this.green.value), Number(this.blue.value)];
    },
    get cmyk() {
        return [Number(this.cyan.value), Number(this.magenta.value), Number(this.yellow.value), Number(this.key.value)];
    },
    get hsl() {
        return [Number(this.hue.value), Number(this.saturationHsl.value), Number(this.lightness.value)];
    },
    get hsb() {
        return [Number(this.hue.value), Number(this.saturationHsv.value), Number(this.value.value)];
    },
    get hwb() {
        return [Number(this.hue.value), Number(this.whiteness.value), Number(this.blackness.value)];
    },
    set cmyk(a: [number, number, number, number] | number[]) {
        (this.cyan.value = a[0] as any),
            (this.magenta.value = a[1] as any),
            (this.yellow.value = a[2] as any),
            (this.key.value = a[3] as any);
    },
    set rgb(a: [number, number, number, number] | number[]) {
        (this.red.value = a[0] as any), (this.green.value = a[1] as any), (this.blue.value = a[2] as any);
    },
    set hsl(a: [number, number, number, number] | number[]) {
        (this.hue.value = a[0] as any), (this.saturationHsl.value = a[1] as any), (this.lightness.value = a[2] as any);
    },
    set hsv(a: [number, number, number, number] | number[]) {
        (this.hue.value = a[0] as any), (this.saturationHsv.value = a[1] as any), (this.value.value = a[2] as any);
    },
    set hwb(a) {
        (this.hue.value = a[0] as any), (this.whiteness.value = a[1] as any), (this.blackness.value = a[2] as any);
    },
};
