mod utils;
mod colors;
mod all_colors;
mod color_type;
use colors::{search, search_rgb};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    pub fn alert(s: &str);
}

#[wasm_bindgen]
pub fn do_search_rgb(r:f64,g:f64,b:f64, start:u32,amount:u8) -> Result<JsValue, JsValue> {
    let r = r.clamp(0.0, 255.0) as u8;
    let g = g.clamp(0.0, 255.0) as u8;
    let b = b.clamp(0.0, 255.0) as u8;


    let val =   search_rgb(r, g, b,amount,start);
    Ok(serde_wasm_bindgen::to_value(&val)?)
}


#[wasm_bindgen]
pub fn do_search(searchQuery:&str,start:u32,amount:u8) -> Result<JsValue, JsValue> {
    let val = search(searchQuery, amount,start);
    Ok(serde_wasm_bindgen::to_value(&val)?)
}
// #[wasm_bindgen]
// pub fn de_duplicate(searchQuery:&str) -> Result<JsValue, JsValue> {
//     let val = RemoveDuplicatesFromData();
//     Ok(serde_wasm_bindgen::to_value(&val)?)
// }