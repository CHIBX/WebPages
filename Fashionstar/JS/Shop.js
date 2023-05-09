let tool = qSA(".toolbox");
async function AddToCart(){
   added_Slider();
}

function added_Slider(){
    if(!qS('div.added-to-cart')){
        let notifySlider=document.createElement('div');
        let span=document.createElement('span');
        let i=document.createElement('i');
        notifySlider.className='added-to-cart';
        i.className='confirm-tick';
        span.textContent=' Product added to cart successfully!';
        i.innerHTML=added_tick;
        notifySlider.append(...[i, span]);
        qS('body').append(notifySlider);
        let div=qS('.added-to-cart');
        let animate=div.animate([{left: "100%"}, {left: "0"}], {duration: 250, fill: "forwards"});
        animate.onfinish=()=>{
            animate.commitStyles();
           let b =div.animate([{left: "0"}, {left: "8%"}], {duration: 120});
           b.onfinish=()=>{ 
            b.commitStyles();
           let a=div.animate([{left: "8%"}, {left: "0"}], {duration: 120});
            a.onfinish=()=>{
                a.commitStyles();
                setTimeout(()=>{
                    let animate=div.animate([{left: "0"}, {left: "100%"}], {duration: 200});
                    animate.onfinish=()=>{div.remove();}
                }, 2000)
            }
        }
      }
    }
}
