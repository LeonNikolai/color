import { html, render } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";



function InitalizeVirtualList() {
    let list = document.querySelector(".list-virtual") as HTMLUListElement;
    let content = list.querySelector(".list-virtual-content") as HTMLDivElement;
    let scrollarea = list.querySelector(".list-virtual-scrollarea") as HTMLDivElement;
    
    
    let items = Array.from({ length: 10000000 }, (_, i) => `Item ${i + 1}`);
    let itemHeight = 48; // Height of each item in pixels
    let totalHeight = items.length * itemHeight;
    scrollarea.style.height = `${totalHeight}px`;
    
    
    let visibleCount = Math.ceil(list.clientHeight / itemHeight);
    let startIndex = 0;
    let endIndex = Math.min(visibleCount, items.length);
    let offset = 0;
    
    
    let oldstartIndex = startIndex;
    list.addEventListener("scroll", () => {
        let scrollTop = list.scrollTop;
        startIndex = Math.floor(scrollTop / itemHeight);
        endIndex = Math.min(startIndex + visibleCount, items.length);
        offset = Math.floor(scrollTop / itemHeight) * itemHeight;
        if (oldstartIndex != startIndex) {
            oldstartIndex = startIndex;
            renderList();
        }
    }, { passive: true });
    
    let renderList = () => {
        let visibleItems = items.slice(startIndex, endIndex);
        let itemElements = visibleItems.map(item => html`<div class="list-virtual-item" style="height:${itemHeight}px">${unsafeHTML(item)}</div>`);
        content.style.transform = `translateY(${offset}px)`;
        render(itemElements, content);
    };
    
    renderList();
}

InitalizeVirtualList();