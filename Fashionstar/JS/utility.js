const price_array=[];
const INITIAL_PRODUCT_ARRAY=[];
const FILTER_FRM_SET=[];
const FILTER_BTN_SET=[];
const elId=el=>{let a= document.getElementById(el);return (a instanceof Element)?a:null};
const qS=el=>{let a= document.querySelector(el);return (a instanceof Element)?a:null};
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
function addEvent(el, type, callback){
  try {el.addEventListener(type, callback)} catch(err){};
}

function CheckWidth() {
    let m = new Map();
    m.set("fontSize", "16px");
    m.set("BWidth", "35%");
    m.set("height", "50%");
    m.set("Footer-font-Size", "14px");
    m.set("padding", "10px 5px 80px 20px");
    if (window.innerWidth < 780 && window.innerWidth > 460) {
      m.set("fontSize", "14px");
      m.set("BWidth", "50%");
      m.set("Footer-font-Size", "13px");
    } else if (window.innerWidth < 460 && window.innerWidth > 320) {
      m.set("fontSize", "12px");
      m.set("BWidth", "55%");
    } else if (window.innerWidth < 320 && window.innerWidth > 275) {
      m.set("fontSize", "14px");
      m.set("BWidth", "60%");
    } else if (window.innerWidth < 275) {
      m.set("fontSize", "14px");
      m.set("Footer-font-Size", "10px");
      m.set("BWidth", "80%");
    }
    return m;
  }

function WatchSlider() {
    if (parseInt(minVal.value) >= parseInt(maxVal.value)) {
      minVal.value = maxVal.value;
    }
    if (parseInt(maxVal.value) <= parseInt(minVal.value)) {
      maxVal.value = minVal.value;
    }
    elId("min-price-view").textContent = parseInt(minVal.value).toLocaleString('en-NG', {style: "currency",currency: "NGN"});
    elId("max-price-view").textContent = parseInt(maxVal.value).toLocaleString('en-NG', {style: "currency",currency: "NGN"});
}

function MobileFilterInput(){
  if (parseInt(rangeInput[0].value) >= parseInt(rangeInput[1].value)) {
    rangeInput[0].value = rangeInput[1].value;
  }
  if (parseInt(rangeInput[1].value) <= parseInt(rangeInput[0].value)) {
    rangeInput[1].value = rangeInput[0].value;
  }
  numberInput[0].value=parseInt(rangeInput[0].value).toLocaleString('en-NG', {
     style: "currency",
     currency: "NGN"
  });
  numberInput[1].value=parseInt(rangeInput[1].value).toLocaleString('en-NG', {
    style: "currency",
    currency: "NGN"
 });
}

function calculateDiscount(){
  let prod=qSA('main .product');
  prod.forEach(el=>{
    let div;
    let oldValue='';
    let currentValue='';
    let currentPrice=el.querySelector('.current-price').textContent;
    let oldPrice=el.querySelector('.old-price').textContent;
    let splitOld=oldPrice.split('');
    let splitCur=currentPrice.split('')
    if(oldPrice===''){
       return;
    }
    for(let i of splitOld){
      i=i.trim();
      if(!(i==='\u20A6'||i===',')){
        oldValue+=i;
      }
    }
    for(let i of splitCur){
      i=i.trim(); 
      if(!(i==='\u20A6'||i===',')){
        currentValue+=i;
      }
    }
    div=document.createElement('div');
    div.className='discount-percentage';
    let percent=Math.round(((parseFloat(oldValue)-parseFloat(currentValue))/parseFloat(oldValue))*100);
    div.textContent=`${percent}%`
    el.querySelector('main .product .product-image').before(div);
    if(percent>50){
      el.dataset.discount='50';
      return;
    }
    else if(percent>40){
      el.dataset.discount='40';
      return;
    }
    else if(percent>30){
      el.dataset.discount='30';
      return;
    }
    else if(percent>20){
      el.dataset.discount='20';
      return;
    }
    else if(percent>10){
      el.dataset.discount='10';
    }

  })
}

function AddRadioValue(form, box){
 form.forEach(el=>{
    el.value=el.nextElementSibling.textContent.toLowerCase();
  })
  box.forEach(el=>{
    el.value=el.textContent.toLowerCase();
})
}
function ClickRadio(){
   let div=document.createElement("div");
   div.className='active-filter'
   qS('#frmFilter').before(div);
   let buttons=qSA('.filter-box [data-role] button')
   let radios=qSA('#frmFilter [name*="rad"]');
   let url=new URLSearchParams(location.search);
   let price=url.get('price');
   if(price){
     price=price.split('-');
     minVal.value=price[0];
     maxVal.value=price[1];
     rangeInput[0].value=price[0];
     rangeInput[1].value=price[1];
   }
   radios.forEach((el)=>{
    addEvent(el, "click", function(){
      let radValue=el.value;
      let key=el.parentElement.parentElement.
      previousElementSibling.textContent.trim().toLowerCase();
      let url=new URLSearchParams(location.search);
      url.set(key, radValue)
      history.replaceState({}, '', `${location.pathname}?${url}`);
      readURL();
    })
   });
   buttons.forEach(el=>{
    addEvent(el, "click", function(){
      let radValue=el.value;
      let key=el.parentElement.
      previousElementSibling.textContent.trim().toLowerCase();
      let url=new URLSearchParams(location.search);
      url.set(key, radValue)
      history.replaceState({}, '', `${location.pathname}?${url}`);
      readURL();
    });
  })
}


function readURL(){
  let url=new URLSearchParams(location.search);
  let searchParams= Array.from(url.entries());
  for(const i of searchParams){
    readRadioURL(i[0], i[1]);
    readBtnURL(i[0], i[1]);
    if(i[0]==='price'){
        let price=i[1];
        if(price){
          price=price.split('-');
          minVal.value=parseInt(price[0]);
          maxVal.value=parseInt(price[1]);
          rangeInput[0].value=parseInt(price[0]);
          rangeInput[1].value=parseInt(price[1]);
          filterByPrice(price[0], price[1])
        }
      }
      else{
        SortProduct(i[0], i[1]);
      }
      if(qSA('main .product').length===0){
        qS('div.product-not-found').style.display='block';
       }
       else{
        qS('div.product-not-found').style.display='none';
       }
    }


}

function readRadioURL(i, j){
  let radios=qSA('#frmFilter [name*="rad"]');
  let url=new URLSearchParams(location.search);
    radios.forEach((el)=>{
      let key=el.parentElement.parentElement.
      previousElementSibling.textContent.trim().toLowerCase();
      if(key===i&&el.value===j){
        let div=document.createElement('div');
        div.innerHTML='<span>'+j.charAt(0).toUpperCase()+j.substring(1)+'</span><span class="close">&times;</span>';
        div.dataset.value=i;
        let curr=qS(`.side div.active-filter [data-value="${i}"]`)
        if(curr){
          qS('.side div.active-filter').replaceChild(div, curr)
        }
      if(!qS('.side .active-filter-header')){
        let h4=document.createElement('h4');
        h4.textContent='Active Filters';
        h4.className='active-filter-header';
        qS('.side div.active-filter').append(h4);
      }
      let dataRole=qSA('.side [data-role]');
      dataRole.forEach(el=>{
        if(el.dataset.role.toLowerCase()===i.toLowerCase()){
          el.remove();
        }
      });
      qS('.side div.active-filter').append(div);
      qSA('.side div.active-filter .close').forEach(el=>addEvent(el, 'click', deleteRadioQuery));
    }
  })
 }
function readBtnURL(i, j){
  let buttons=qSA(`.filter-box button`);
  buttons.forEach(el=>{
      let key=el.parentElement.
        previousElementSibling.textContent.trim().toLowerCase();
        if(key===i&&el.value===j){
          let div=document.createElement('div');
          div.innerHTML='<span>'+j.charAt(0).toUpperCase()+j.substring(1)+'</span><span class="close">&times;</span>';
          div.dataset.value=i;
          let curr=qS(`.filter-box div.active-filter [data-value="${i}"]`)
          if(curr){
            qS('.filter-box div.active-filter').replaceChild(div, curr)
          }
        if(!qS('.filter-box .active-filter-header')){
          let h4=document.createElement('h4');
          h4.textContent='Active Filters';
          h4.className='active-filter-header';
          qS('.filter-box div.active-filter').append(h4);
        }
        let dataRole=qSA('.filter-box [data-role]');
        dataRole.forEach(el=>{
          if(el.dataset.role.toLowerCase()===i.toLowerCase()){
            el.remove();
          }
        });
        qS('.filter-box div.active-filter').append(div);
        qSA('.filter-box div.active-filter .close').forEach(el=>addEvent(el, 'click', deleteBtnQuery));
      }
      if(qSA('main .product').length===0){
        qS('div.product-not-found').style.display='block';
        qS('main').style.paddingBottom="100px"
       }
       else{
        qS('div.product-not-found').style.display='none';
        qS('main').style.paddingBottom="30px"
       }
    })
  }
function deleteRadioQuery(){
  // console.log('Yo')
    FILTER_FRM_SET.forEach(el=>{
      let val=this.parentElement.dataset.value.toLowerCase();
      if(val===el.dataset.role.toLowerCase()){
        let url=new URLSearchParams(location.search);
        url.delete(el.dataset.role.toLowerCase());
        qSA('.filter-box div.active-filter [data-value='+val+'] span')[1].click();
        if(Array.from(url).length>0){
          history.replaceState({}, '', `${location.pathname}?${url}`);
        }
        else{
        history.replaceState({}, '', `${location.pathname.slice(0, location.pathname.length)}`);
        }
        qSA('main .product').forEach(el=>el.remove());
        INITIAL_PRODUCT_ARRAY.forEach(el=>{qS('main .space-bottom').append(el)});
        
         qSA('#frmFilter [data-role]').forEach(el=>el.remove());
         FILTER_FRM_SET.forEach(el=>qS('#frmFilter').append(el));
         readURL();
         qSA('#frmFilter [data-role='+el.dataset.role.toLowerCase()+'] [type="radio"]').forEach(el=>el.checked=false);
         this.parentElement.remove();
         if(qS('div.active-filter').children.length==1){
         qS('.active-filter-header').remove();
         }
         if(qSA('main .product').length===0){
          qS('div.product-not-found').style.display='block';
         }
         else{
          qS('div.product-not-found').style.display='none';
         }
         return;
      }
    })
}
function deleteBtnQuery(){
  FILTER_BTN_SET.forEach(el=>{
    let val=this.parentElement.dataset.value.toLowerCase();
    if(val===el.dataset.role.toLowerCase()){
      let url=new URLSearchParams(location.search);
      url.delete(el.dataset.role.toLowerCase());
      qSA('.side div.active-filter [data-value='+val+'] span')[1].click();
      if(Array.from(url).length>0){
        history.replaceState({}, '', `${location.pathname}?${url}`);
      }
      else{
      history.replaceState({}, '', `${location.pathname.slice(0, location.pathname.length)}`);
      }
      qSA('main .product').forEach(el=>el.remove());
      INITIAL_PRODUCT_ARRAY.forEach(el=>{qS('main .space-bottom').append(el)});
      
       qSA('.filter-box [data-role]').forEach(el=>el.remove());
       FILTER_BTN_SET.forEach(el=>qS('.filter-box .sub').append(el));
       readURL();
       this.parentElement.remove();
       if(qS('.filter-box div.active-filter').children.length==1){
       qS('.filter-box .active-filter-header').remove();
       }
       if(qSA('main .product').length===0){
        qS('div.product-not-found').style.display='block';
       }
       else{
        qS('div.product-not-found').style.display='none';
       }
       return;
      }
  })
  }
  
function SortProduct(dataset, filter){
   let products=qSA('main .product');
   products.forEach((el)=>{
    if(!el.dataset[dataset]){
      el.remove();
      return;
    } 
    if(dataset==="discount"){
      if(!el.dataset[dataset]){
        el.remove();
       
      }
      else{ 
      let discount=el.querySelector('.discount-percentage');
      let esp=parseInt(filter.slice(0, filter.indexOf("% up")));
      let amount=discount.textContent.slice(0, discount.textContent.indexOf("%"));
      let a=parseInt(amount);
      if(a <= esp){
         el.remove();
      }
     }
    } 
    else{
      if(el.dataset[dataset].toLowerCase()!==filter.toLowerCase()){
        el.remove();
      }
    }
 })
}

function filterByPrice(min=0, max=price_array[0]){
  qSA('main .product').forEach(el=>el.remove());
  INITIAL_PRODUCT_ARRAY.forEach(el=>{qS('main .space-bottom').append(el)});
  (function(mn, mx){
    let url=new URLSearchParams(location.search);
    qSA('main .product').forEach(el=>{
      let price='';
      let priceText=el.querySelector("div.product-price .current-price").textContent;
      for(let i of priceText){
        i=i.trim();
        if(!(i==='\u20A6'||i===',')){
           price+=i;
        }
      }
      price=parseInt(price)
      url.set('price', mn + '-' + mx);
      history.replaceState({}, '', `${location.pathname}?${url}`);
      if(!(price >= mn && price <= mx)){
        el.remove();
      }
    })
    if(qSA('main .product').length===0){
      qS('div.product-not-found').style.display='block';
      qS('main').style.paddingBottom="300px"
     }
     else{
      qS('div.product-not-found').style.display='none';
      qS('main').style.paddingBottom="30px"
     }
  })(parseInt(min), parseInt(max))
}

// Creating Elements without method application, only props & nested props with a single end value

function crt(el, arr=[]){
  const element=document.createElement(el);
  let acc=element;
  if(arr instanceof Array){
     arr.forEach(el=>{
      let keys=el[0].trim();
      let value=(el[1] instanceof String)?el[1].trim():el[1];
     if(value instanceof String){if(value.includes(',')) return;}
      if(keys.includes(',')){
         let keyArr=keys.split(',');
         keyArr=keyArr.map(el=>el.trim());
         keyArr.forEach((v,i)=>{if(i!==keyArr.length-1){acc=acc[v]}});
         acc=value;
      }
      else{
        acc[keys]=value;
      }
     })
  }
  return acc;
}
Element.prototype.addEl=function(...node){this.append(...node);return this};

function Wishlist(){}