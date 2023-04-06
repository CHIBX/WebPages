const elId=el=>document.getElementById(el);
const qS=el=>document.querySelector(el);
const qSA=el=>document.querySelectorAll(el);
const qSFE=(arr, ev, func)=>{
    for(let nodes of arr){
        try {
            qS(nodes).addEventListener(ev, func);
        } catch (e) {
            console.log(e)
        }
    }
}
function CheckWidth() {
    let map = new Map();
    map.set("fontSize", "18px");
    map.set("BWidth", "35%");
    map.set("height", "50%");
    map.set("Footer-font-Size", "16px");
    map.set("padding", "10px 5px 80px 20px");
    if (window.innerWidth < 780 && window.innerWidth > 460) {
      map.set("fontSize", "14px");
      map.set("BWidth", "50%");
    } else if (window.innerWidth < 460 && window.innerWidth > 320) {
      map.set("fontSize", "12px");
      map.set("BWidth", "55%");
    } else if (window.innerWidth < 320 && window.innerWidth > 275) {
      map.set("fontSize", "14px");
      map.set("BWidth", "60%");
    } else if (window.innerWidth < 275) {
      map.set("fontSize", "14px");
      map.set("Footer-font-Size", "14px");
      map.set("BWidth", "80%");
    }
    return map;
  }

  