
function Slider(){
  let slider=this
  let slides=qSA('.product-modal .prd-slide');
  let slideContainer=qS('.product-modal .m-grid');
  let isDragging=false,
  prevTranslate=0,
  curTranslate=0,
  startPos,
  curIndex=0,
  ID;

  function setPositionByIndex(){
    curTranslate=curIndex * -slideContainer.clientWidth;
    prevTranslate=curTranslate;
    setPosition();
  }

  function moveElement(){
    setPosition()  
    if(isDragging){
      requestAnimationFrame(moveElement)
    }
  }

  function getPosition(e){
    return (e.type.includes('mouse'))?e.clientX:e.touches[0].pageX
  }

  function setPosition(){
    slideContainer.style.transform=`translateX(${curTranslate}px)`;
  }

  slider.go=function(index){
    return function(e){
      curIndex=index;
      startPos=getPosition(e);
      isDragging=true;
      if(slides.length>1){
        ID=requestAnimationFrame(moveElement)
      }      
    }
  }
 
  slider.move=function(e){
    if(isDragging){
      const currentPosition=getPosition(e);
      curTranslate=prevTranslate + currentPosition - startPos;
     if((curIndex===0 && curTranslate>prevTranslate) || (curIndex===slides.length-1 && curTranslate<prevTranslate)){
        curTranslate=prevTranslate;
        cancelAnimationFrame(ID)
     }
    } 
  }
  slider.stop=function(e){
    isDragging=false;
    cancelAnimationFrame(ID);
      const movedBy=curTranslate-prevTranslate;
      if(movedBy < -slideContainer.clientWidth*0.3 && curIndex < slides.length-1){
       curIndex+=1;
      }
      if(movedBy> slideContainer.clientWidth*0.3 && curIndex > 0){
        curIndex-=1;
      }
      setPositionByIndex();   
  }
  slider.start=function(){
    slides.forEach((el, index)=>{
      // Touch Events 
      addEvent(el,'touchstart', slider.go(index));
      addEvent(el,'touchmove', slider.move);
      addEvent(el,'touchend', slider.stop);
  
      // Mouse Events
      addEvent(el,'mousedown', slider.go(index));
      addEvent(el,'mousemove', slider.move);
      addEvent(el,'mouseup', slider.stop);
      addEvent(el,'mouseleave', slider.stop);
      addEvent(el,'dragstart', (e)=>e.preventDefault()) 
  })
  }
}