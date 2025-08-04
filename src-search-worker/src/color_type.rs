
pub enum ColorModel {
    Rgb(Rgb, RgbColorSpace, WhitePoint),
    Hsl(Hsl),
    Hsv(Hsv),
    Xyz(Xyz, XyzWhitePoint),
}

pub struct Xyz {
    pub x: f32, // (0.0-100.0)
    pub y: f32, // (0.0-100.0)
    pub z: f32, // (0.0-100.0)
}
pub enum XyzWhitePoint {
    D65,
    D50,
    Custom(f32, f32, f32), // x, y, z coordinates
}
pub enum WhitePoint {
    D65,
    D50,
    Custom(f32, f32), // x, y coordinates
}
pub enum RgbColorSpace {
    Srgb,
    LinearRgb,
    ProPhotoRgb,
    AdobeRgb,
    DisplayP3,
    Rec2020,
    a998Rgb,
}
pub enum HslColorSpace {
    Hsl,
    Hsluv,
    Hslok,
    Hsli,
}
pub struct Rgb {
    pub r: u8,
    pub g: u8,
    pub b: u8,
}

pub struct Hsl {
    pub hue: f32, // (0-360)
    pub saturation: f32, // (0.0-1.0)
    pub lightness: f32, // (0.0-1.0)
}

pub struct Hsv {
    pub hue: f32, // (0-360)
    pub saturation: f32, // (0.0-1.0)
    pub value: f32, // (0.0-1.0)
}
pub struct Cmyk {
    pub cyan: f32, // (0.0-1.0)
    pub magenta: f32, // (0.0-1.0)
    pub yellow: f32, // (0.0-1.0)
    pub black: f32, // (0.0-1.0)
}
pub struct Lab {
    pub l: f32, // (0.0-100.0)
    pub a: f32, // (-128.0 to 127.0)
    pub b: f32, // (-128.0 to 127.0)
}