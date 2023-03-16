let images = qSA('.product img');
let tool = qSA('.toolbox');
images.forEach(el => {
    el.addEventListener('dragstart', (event) => {
        event.preventDefault();
        event.stopPropagation();
    })
});

// Price Slider 
let minVal=elId('min-value');
let maxVal=elId('max-value');
function WathSlider(){
    if(parseInt(minVal.value)>=parseInt(maxVal.value)){
        minVal.value=maxVal.value;
    }
    if(parseInt(maxVal.value)<=parseInt(minVal.value)){
        maxVal.value=minVal.value;
    }
    elId('min-price-view').innerText=`\u20A6${minVal.value}`;
    elId('max-price-view').innerText=`\u20A6${maxVal.value}`;
}
document.body.onload=WathSlider;
maxVal.oninput=WathSlider;
minVal.oninput=WathSlider;
// End of Price Slider----------------------------------------------------------->

function getStyles(selectorText, propertyName) {
    // search backwards because the last match is more likely the right one
    for (var s= document.styleSheets.length - 1; s >= 0; s--) {
        var cssRules = document.styleSheets[s].cssRules ||
                document.styleSheets[s].rules || []; // IE support
        for (var c=0; c < cssRules.length; c++) {
            if (cssRules[c].selectorText === selectorText) 
                return cssRules[c].style[propertyName];
        }
    }
    return null;
 }
  