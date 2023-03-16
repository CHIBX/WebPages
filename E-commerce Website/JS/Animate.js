function Animate(cName, array, duration) {
      this.cName = cName;
      this.duration = duration;
      this.array = array;
      this.copyArray = this.array.slice().reverse();
   this.go=function() {
      let el = qS(this.cName);
      let s = el.animate(this.array, {
         duration: this.duration,
         iterations: 1,
         fill: 'forwards'
      });
      s.commitStyles();
      return s;
   }
   this.back=function() {
      let el = qS(this.cName);
      let s = el.animate(this.copyArray, {
         duration: this.duration,
         iterations: 1,
         fill: 'forwards'
      })
      s.commitStyles();
      return s;
   }
}
//=========================================================================================================================================
//--------------------------------------------------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
let initialMenuBox = {
   width: '0px',
   padding: '0px',
   margin: '0px',
}
let initialAccountBox = {
   width: '0px',
   padding: '0px',
   margin: '0px',
}

let finalAccountBox = {
   width: CheckWidth().get('BWidth'),
   padding: CheckWidth().get('padding'),
   // margin: CheckWidth().get()
}
let finalMenuBox = {
   width: CheckWidth().get('BWidth'),
   padding: CheckWidth().get('padding'),
   // margin: CheckWidth().get(),
}

// function Mb() {
//    let boxAnimator = new Animate('.menu-box', [initialMenuBox, finalMenuBox], 400)
// }

function CheckWidth() {
   let map = new Map();
   map.set('fontSize', '18px');
   map.set('BWidth', '35%');
   map.set('padding','10px 5px 80px 20px')
   if (window.innerWidth < 780 && window.innerWidth > 460) {
      map.set('fontSize', '14px');
      map.set('BWidth', '50%');
   } else if (window.innerWidth < 460 && window.innerWidth > 320) {
      map.set('fontSize', '12px');
      map.set('BWidth', '55%');
   } else if (window.innerWidth < 320 && window.innerWidth > 275) {
      map.set('fontSize', '14px');
      map.set('BWidth', '60%');
   } else if (window.innerWidth < 275) {
      map.set('fontSize', '14px');
      map.set('BWidth', '80%');
   }
   return map;
}
if (qS('.body').style.fontSize == '0px') {
   qS('.access-click').style.opacity = '0';
   qS('.access-click').style.fontSize = '0px';
   qS('.cloth-click').style.marginTop = '5px';
}
arrows.forEach(el => {
   el.onclick = function () {
      let element = this.parentElement.nextElementSibling;
      console.log(element.className)
      let arrowAnimator = new Animate(`.${element.className}`, [{
         margin: '0px',
         padding: '0px',
         fontSize: '0px'
      }, {
         height: getStyles(`.${element.className}`, 'height'),
         margin: getStyles(`.${element.className}`, 'margin'),
         padding: getStyles(`.${element.className}`, 'padding'),
         fontSize: CheckWidth().get('fontSize')
      }], 300);
      if (element.style.fontSize == '0px') {
         arrowAnimator.go();
         this.style.transform = 'rotate(90deg)'
         element.style.margin = getStyles(`.${element.className}`, 'margin');
         element.style.fontSize = CheckWidth().get('fontSize');
         element.style.height = '100%'
         if (qS('.body').style.fontSize != '0px') {
            qS('.access-click').style.opacity = '1';
            qS('.access').style.display = 'block';
            qS('.cloth-click').style.marginTop = '0px';
            qS('.access-click').style.fontSize = CheckWidth().get('fontSize')
         }
      } else {
         arrowAnimator.back();
         this.style.transform = 'rotate(0deg)';
         element.style.fontSize = '0px';
         if (qS('.body').style.fontSize == '0px') {
            qS('.access-click').style.opacity = '0';
            qS('.access-click').style.fontSize = '0px';
            qS('.access').style.display = 'none';
            qS('.cloth-click').style.marginTop = '5px';
         }
      }
   }
})
let BoxArr=['.menu-box', '.account-box', '.filter-box'];
function OpenBox(className){
   qS('.modal').style.display='block';
   let child=qS(className).firstElementChild;
   let Opener=new Animate(className, [initialMenuBox, finalMenuBox], 300);
   child.style.display='none';
   let onGoing=Opener.go();
   onGoing.onfinish=()=>{
      child.style.display='block';
      child.style.opacity='1';
   }
}
function CloseBox(className){
   let child=qS(className).firstElementChild;
   let Opener=new Animate(className, [finalMenuBox, initialMenuBox], 500);
   child.style.display='none';
   let onGoing=Opener.go();
   onGoing.onfinish=()=>{
      qS('.modal').style.display='none';
   }
}