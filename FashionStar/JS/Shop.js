addEventListener('DOMContentLoaded', ()=>{
  setTimeout(()=>{
    qS('body').style.overflow="visible";
    qS('body').removeChild(qS('.page-preloader'));
  }, 2000)
  console.log('I am true')
})
let images = qSA(".product img");
let tool = qSA(".toolbox");
images.forEach((el) => {
  el.addEventListener("dragstart", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
});

// Price Slider
let minVal = elId("min-value");
let maxVal = elId("max-value");
function WathSlider() {
  if (parseInt(minVal.value) >= parseInt(maxVal.value)) {
    minVal.value = maxVal.value;
  }
  if (parseInt(maxVal.value) <= parseInt(minVal.value)) {
    maxVal.value = minVal.value;
  }
  elId("min-price-view").innerText = `\u20A6${minVal.value}`;
  elId("max-price-view").innerText = `\u20A6${maxVal.value}`;
}
document.body.onload = WathSlider;
maxVal.oninput = WathSlider;
minVal.oninput = WathSlider;
// End of Price Slider----------------------------------------------------------->

// function getStyles(selectorText, propertyName) {

//     for (var s= document.styleSheets.length - 1; s >= 0; s--) {
//         var cssRules = document.styleSheets[s].cssRules ||
//                 document.styleSheets[s].rules || [];
//         for (var c=0; c < cssRules.length; c++) {
//             if (cssRules[c].selectorText === selectorText)
//                 return cssRules[c].style[propertyName];
//         }
//     }
//     return null;
//  }
