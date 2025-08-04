use std::vec;

use js_sys::{Boolean, WebAssembly::Tag};
use wasm_bindgen::{convert::IntoWasmAbi, prelude::*};

use crate::{alert, all_colors::{ALL_COLORS, COLORCOUNT}};
use serde::{Deserialize, Serialize};

type Flag = u16;
const FLAG_NONE: Flag = 0;
// const FLAG_ALL: Flag = !0;
pub const FLAG_BASIC: Flag = 1 << 0;
pub const FLAG_WEB: Flag = 1 << 1;
pub const FLAG_PANTONE: Flag = 1 << 2;
pub const FLAG_PANTONE_GFI: Flag = 1 << 3;
pub const FLAG_NBS: Flag = 1 << 4;
pub const FLAG_BS_4800: Flag = 1 << 5;
pub const FLAG_BS_381C: Flag = 1 << 6;
pub const FLAG_BS_2660: Flag = 1 << 7;
pub const FLAG_BS_5252: Flag = 1 << 8;
pub const FLAG_RAL_CLASSIC: Flag = 1 << 9;
pub const FLAG_RAL_DESIGN: Flag = 1 << 10;
pub const FLAG_RAL_EFFECT: Flag = 1 << 11;
pub const FLAG_RAL_PLASTIC_P1: Flag = 1 << 12;
pub const FLAG_RAL_PLASTIC_P2: Flag = 1 << 13;

#[derive(Serialize, Deserialize, Clone, Copy)]
pub struct Color {
    pub name: &'static str,
    pub rgb: [u8; 3],
    pub tags: u16,
}
enum ColorSearchType {
    RGB(u8, u8, u8),
    Name(String),
    None,
}

// STATIC STATE (CACHE RESULTS FOR SEARCHES)
static mut SEARCH_RESULT: [(usize, isize); crate::all_colors::COLORCOUNT] =
    [(0, 0); crate::all_colors::COLORCOUNT];
static mut OLDSEARCH: ColorSearchType = ColorSearchType::None;

pub fn edit_distance(a: &str, b: &str) -> usize {
    let len_a = a.chars().count();
    let len_b = b.chars().count();
    if len_a < len_b {
        return edit_distance(b, a);
    }
    if len_a == 0 {
        return len_b;
    } else if len_b == 0 {
        return len_a;
    }

    let len_b = len_b + 1;

    let mut pre;
    let mut tmp;
    let mut cur = vec![0; len_b];

    for i in 1..len_b {
        cur[i] = i;
    }

    for (i, ca) in a.chars().enumerate() {
        pre = cur[0];
        cur[0] = i + 1;
        for (j, cb) in b.chars().enumerate() {
            tmp = cur[j + 1];
            cur[j + 1] = std::cmp::min(
                tmp + 1,
                std::cmp::min(cur[j] + 1, pre + if ca == cb { 0 } else { 1 }),
            );
            pre = tmp;
        }
    }
    cur[len_b - 1]
}

pub fn search_rgb(r: u8, g: u8, b: u8, amount: u8, start: u32) -> Vec<Color> {
    let old_search = unsafe { &OLDSEARCH };
    match old_search {
        ColorSearchType::RGB(old_r, old_g, old_b) => {
            if old_r == &r && old_g == &g && old_b == &b {
                let start_index = start as usize;
                let end_index = (start_index + amount as usize).min(COLORCOUNT);
                return unsafe {
                    SEARCH_RESULT[start_index..end_index]
                        .iter()
                        .map(|(index, _)| ALL_COLORS[*index])
                        .collect()
                };
            }
        }
        _ => {}
    }

    for (index, color) in ALL_COLORS.iter().enumerate() {
        let distance = ((color.rgb[0] as i32 - r as i32).pow(2)
            + (color.rgb[1] as i32 - g as i32).pow(2)
            + (color.rgb[2] as i32 - b as i32).pow(2)) as isize;
        unsafe {
            SEARCH_RESULT[index] = (index, distance);
        }
    }
    // Sort results by distance
    unsafe {
        &SEARCH_RESULT.sort_by_key(|(_, dist)| *dist);
    }

    // Cache the results for the next search
    unsafe {
        OLDSEARCH = ColorSearchType::RGB(r, g, b);
    }

    // Limit the number of results from the start index and amount
    let start_index = start as usize;
    let end_index = (start_index + amount as usize).min(COLORCOUNT);

    let mut final_results: Vec<Color> = Vec::with_capacity(amount as usize);
    for (index, _) in unsafe { SEARCH_RESULT[start_index..end_index].iter() } {
        final_results.push(ALL_COLORS[*index]);
    }
    final_results
}

pub fn search(input: &str, amount: u8, start: u32) -> Vec<Color> {
    let old_search = unsafe { &OLDSEARCH };
    match old_search {
        ColorSearchType::Name(name) => {
            if name == &input.trim() {
                let start_index = start as usize;
                let end_index = (start_index + amount as usize).min(COLORCOUNT);
                return unsafe {
                    SEARCH_RESULT[start_index..end_index]
                        .iter()
                        .map(|(index, _)| ALL_COLORS[*index])
                        .collect()
                };
            }
        }
        _ => {}
    }
    if input.starts_with("rgb(") {
        let rgb_str = input.trim_start_matches("rgb(").trim_end_matches(')');
        let rgb_parts: Vec<&str> = rgb_str.split(',').collect();

        match rgb_parts.len() {
            1 => {
                let rgb_value = rgb_parts[0].trim().parse::<u8>().unwrap_or(0u8);
                return search_rgb(rgb_value, rgb_value, rgb_value, amount, start);
            }
            2 => {
                let r = rgb_parts[0].trim().parse::<u8>().unwrap_or(0u8);
                let g = rgb_parts[1].trim().parse::<u8>().unwrap_or(0u8);
                return search_rgb(r, g, 0, amount, start);
            }
            3 => {
                let r = rgb_parts[0].trim().parse::<u8>().unwrap_or(0u8);
                let g = rgb_parts[1].trim().parse::<u8>().unwrap_or(0u8);
                let b = rgb_parts[2].trim().parse::<u8>().unwrap_or(0u8);
                return search_rgb(r, g, b, amount, start);
            }
            _ => {}
        }
    }

    if input.starts_with("#") || input.starts_with("0x") {
        let hex_str = input.trim_start_matches('#').trim_start_matches("0x");
        if hex_str.len() == 6 {
            let r = u8::from_str_radix(&hex_str[0..2], 16).unwrap_or(0);
            let g = u8::from_str_radix(&hex_str[2..4], 16).unwrap_or(0);
            let b = u8::from_str_radix(&hex_str[4..6], 16).unwrap_or(0);
            return search_rgb(r, g, b, amount, start);
        }
        if hex_str.len() == 3 {
            let r = u8::from_str_radix(&hex_str[0..1].repeat(2), 16).unwrap_or(0);
            let g = u8::from_str_radix(&hex_str[1..2].repeat(2), 16).unwrap_or(0);
            let b = u8::from_str_radix(&hex_str[2..3].repeat(2), 16).unwrap_or(0);
            return search_rgb(r, g, b, amount, start);
        }
    }
    
    
    
    
    let input: String = input
    .trim()
        .to_lowercase()
        .chars()
        .filter(|c| c.is_ascii())
        .collect();
    let mut input = input.as_str();
    let split_input: Vec<&str> = input.split_whitespace().collect();
    
    // DETECT AND STRIP FILTER DATA
    let mut tag_priority = FLAG_NONE;
    if input.starts_with("basic:") {
        tag_priority |= FLAG_BASIC;
        input = input.trim_start_matches("basic:").trim();
    } else if input.starts_with("web:") {
        tag_priority |= FLAG_WEB;
        input = input.trim_start_matches("Web:").trim();
    } else if input.starts_with("pantone:") {
        tag_priority |= FLAG_PANTONE;
        input = input.trim_start_matches("pantone:").trim();
    } else if input.starts_with("nbs:") {
        tag_priority |= FLAG_NBS;
        input = input.trim_start_matches("nbs:").trim();
    } else if input.starts_with("bs 4800:") {
        tag_priority |= FLAG_BS_4800;
        input = input.trim_start_matches("bs 4800:").trim();
    } else if input.starts_with("bs 381C:") {
        tag_priority |= FLAG_BS_381C;
        input = input.trim_start_matches("bs 381C:").trim();
    } else if input.starts_with("bs 2660:") {
        tag_priority |= FLAG_BS_2660;
        input = input.trim_start_matches("bs 2660:").trim();
    } else if input.starts_with("bs 5252:") {
        tag_priority |= FLAG_BS_5252;
        input = input.trim_start_matches("bs 5252:").trim();
    } else if input.starts_with("ral effect:") {
        tag_priority |= FLAG_RAL_EFFECT;
        input = input.trim_start_matches("ral effect:").trim();
    } else if input.starts_with("ral design:") {
        tag_priority |= FLAG_RAL_DESIGN;
        input = input.trim_start_matches("ral design:").trim();
    } else if input.starts_with("ral classic:") {
        tag_priority |= FLAG_RAL_CLASSIC;
        input = input.trim_start_matches("ral classic:").trim();
    } else if input.starts_with("ral p1:") {
        tag_priority |= FLAG_RAL_PLASTIC_P1;
        input = input.trim_start_matches("ral p1:").trim();
    } else if input.starts_with("ral p2:") {
        tag_priority |= FLAG_RAL_PLASTIC_P2;
        input = input.trim_start_matches("ral p2:").trim();
    }

    
    for (index, color) in ALL_COLORS.iter().enumerate() {
        let clr = color.name.to_lowercase();
        let clr = clr.as_str();
        let mut distance = edit_distance(input, clr) as isize;
        let split_color: Vec<&str> = clr.split_whitespace().collect();

        // boost for each char match right position
        let mut matching_chars = 0;
        for (i, c) in input.chars().enumerate() {
            if i < clr.len() && clr.chars().nth(i) == Some(c) {
                distance -= 10; // Boost for each character match
                matching_chars += 1;
            }
        }
        // Boost for each tag match
        if tag_priority != FLAG_NONE  {
            if color.tags & tag_priority != 0 {
                distance -= 10000; // Boost for matching tags
            } else {
                distance += 100; // Penalty for not matching tags
            }
        }

        // foreach word in split_input
        let mut add: isize = 0;
        for word in split_input.iter() {
            add += edit_distance(word, clr) as isize;
        }
        add /= split_input.len() as isize;
        distance += add as isize;
        add = 0;
        // foreach word in split_color
        for word in split_color.iter() {
            add += edit_distance(word, input) as isize;
        }
        add /= split_color.len() as isize;

        distance += add as isize;
        // Boost exact matches
        if color.name == input {
            distance -= 1000;
        }
        // boost with substring matches
        if input.contains(clr) || clr.contains(input) {
            distance -= 1000;
        } else {
            distance += 10 * clr.len() as isize; // Penalty for longer names
        }
        if matching_chars < 3 {
            distance += 50; // Penalty for fewer matching characters
        }
        // penalty for char length difference
        let len_diff = (clr.len() as isize - input.len() as isize).abs();
        if len_diff > 0 {
            distance += len_diff * 5; // Penalty for length difference
        }

        unsafe {
            SEARCH_RESULT[index] = (index, distance);
        }
    }

    // Sort results by distance
    unsafe {
        &SEARCH_RESULT.sort_by_key(|(_, dist)| *dist);
    }

    // Cache the results for the next search
    unsafe {
        OLDSEARCH = ColorSearchType::Name(input.to_string());
    }

    // Limit the number of results from the start index and amount
    let start_index = start as usize;
    let end_index = (start_index + amount as usize).min(COLORCOUNT);
    let mut final_results: Vec<Color> = Vec::with_capacity(amount as usize);
    for (index, _) in unsafe { SEARCH_RESULT[start_index..end_index].iter() } {
        final_results.push(ALL_COLORS[*index]);
    }
    // Return the final results
    final_results
}

impl std::cmp::PartialEq for Color {
    fn eq(&self, other: &Self) -> bool {
        self.rgb == other.rgb && self.name == other.name
    }
}

impl std::cmp::Eq for Color {}
impl std::hash::Hash for Color {
    fn hash<H: std::hash::Hasher>(&self, state: &mut H) {
        self.rgb.hash(state);
        self.name.hash(state);
    }
}

// pub fn RemoveDuplicatesFromData() -> String {
//     let mut seen: std::collections::HashSet<Color> = std::collections::HashSet::new();
//     for color in ALL_COLORS.iter() {
//         if seen.contains(color) {
//             // combine tags
//             let mut combined_tags = color.tags;
//             if let Some(existing_color) = seen.get(color) {
//                 combined_tags |= existing_color.tags;
//                 seen.remove(color);
//             }
//             seen.insert(Color {
//                 name: color.name,
//                 rgb: color.rgb,
//                 tags: combined_tags,
//             });
//         } else {
//             seen.insert(*color);
//         }
//     }
//     let mut output = String::new();

//     let mut pantone = String::new();
//     let mut ral = String::new();
//     let mut web = String::new();
//     let mut bs = String::new();
//     let mut nbs = String::new();
//     let mut other = String::new();

//     for color in seen.iter() {
//         let mut tag = "".to_string();
//         if color.tags & FLAG_BASIC != 0 {
//             tag.push_str("FLAG_BASIC | ");
//         }
//         if color.tags & FLAG_WEB != 0 {
//             tag.push_str("FLAG_WEB |");
//         }
//         if color.tags & FLAG_PANTONE != 0 {
//             tag.push_str("FLAG_PANTONE |");
//         }
//         // if color.tags & FLAG_RAL != 0 {
//         //     tag.push_str("FLAG_RAL_DESIGN |");
//         // }
//         if color.tags & FLAG_BS_4800 != 0 {
//             tag.push_str("FLAG_BS4800 |");
//         }
//         if color.tags & FLAG_NBS != 0 {
//             tag.push_str("FLAG_NBS |");
//         }
//         if color.tags & FLAG_BS_381C != 0 {
//             tag.push_str("FLAG_BS_381C |");
//         }
//         if color.tags & FLAG_BS_2660 != 0 {
//             tag.push_str("FLAG_BS_BS2660 |");
//         }
//         if color.tags & FLAG_BS_5252 != 0 {
//             tag.push_str("FLAG_BS_BS5252 |");
//         }

//         let tag = tag.trim_end_matches(" |");

//         let result = format!(
//             "name: \"{}\",\nrgb: {:?},\ntags: {},\n",
//             color.name, color.rgb, tag
//         );
//         let result = format!("Color {{{}}},", result);

//         let is_pantone = color.tags & FLAG_PANTONE != 0;
//         // let is_ral = color.tags & FLAG_RAL != 0;
//         let is_web = color.tags & FLAG_WEB != 0 || color.tags & FLAG_BASIC != 0;
//         let is_nbs = color.tags & FLAG_NBS != 0;
//         let is_bs = color.tags & FLAG_BS_4800 != 0
//             || color.tags & FLAG_BS_381C != 0
//             || color.tags & FLAG_BS_2660 != 0
//             || color.tags & FLAG_BS_5252 != 0;

//         if is_pantone && is_ral
//             || is_ral && is_bs
//             || is_bs && is_nbs
//             || is_nbs && is_web
//             || is_bs && is_pantone
//         {
//             other.push_str(&result);
//         } else if is_pantone {
//             pantone.push_str(&result);
//         } else if is_ral {
//             ral.push_str(&result);
//         } else if is_web {
//             web.push_str(&result);
//         } else if is_nbs {
//             nbs.push_str(&result);
//         } else if is_bs {
//             bs.push_str(&result);
//         } else {
//             other.push_str(&result);
//         }
//     }

//     output.push_str("pub const COLORS: [Color; 0] = [");
//     output.push_str("\n");
//     output.push_str("\n");
//     output.push_str("//////// Pantone Colors ////////\n\n");
//     output.push_str(&pantone);
//     output.push_str("\n");
//     output.push_str("\n");
//     output.push_str("//////// RAL Colors ////////\n\n");
//     output.push_str("\n");
//     output.push_str(&ral);
//     output.push_str("\n");
//     output.push_str("\n");
//     output.push_str("//////// Web Colors ////////\n\n");
//     output.push_str("\n");
//     output.push_str(&web);
//     output.push_str("\n");
//     output.push_str("\n");
//     output.push_str("//////// NBS Colors ////////\n\n");
//     output.push_str("\n");
//     output.push_str(&bs);
//     output.push_str("\n");
//     output.push_str("\n");
//     output.push_str("//////// NBS Colors ////////\n\n");
//     output.push_str("\n");
//     output.push_str(&nbs);
//     output.push_str("\n");
//     output.push_str("\n");
//     output.push_str("//////// Other Colors ////////\n\n");
//     output.push_str(&other);
//     output.push_str("];\n\n");

//     return output;
// }
