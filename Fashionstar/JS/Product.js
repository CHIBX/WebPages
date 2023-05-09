let gcol;
const imgArr=['images/1 (1).jpeg','images/1 (14).jpeg', 'images/1 (21).jpeg'];
function ProductPopUp() {
  const slides=[];
  let image = null;
  let link = null;
  let name = null;
  let oldPrice = 0;
  let currentPrice = 0;
  let description = null;
  let selector;
  const div = document.createElement("div");
  div.className = "product-modal";
  qS("footer.footer").after(div);
  if (this instanceof HTMLImageElement || this instanceof HTMLAnchorElement) {
    selector = this.parentElement.parentElement.parentElement;
    image = this.src || selector.querySelector(".product-image img").src;
    link = selector.querySelector(".product-name a").href;
    name = selector.querySelector(".product-name a").textContent;
    oldPrice = selector.querySelector(".product-price .old-price").textContent;
    currentPrice = selector.querySelector(
      ".product-price .current-price"
    ).textContent;
  }
  const short_desc=`Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, ut aliquid. Animi soluta ipsam, commodi, officiis omnis incidunt modi eius iusto necessitatibus eaque blanditiis quidem architecto qui laborum quaerat vero!
 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, ut aliquid. Animi soluta ipsam, commodi, officiis omnis incidunt modi eius iusto necessitatibus eaque blanditiis quidem architecto qui laborum quaerat vero!
 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt, ut aliquid. Animi soluta ipsam, commodi, officiis omnis incidunt modi eius iusto necessitatibus eaque blanditiis quidem architecto qui laborum quaerat vero!`;
 let src=imgArr.slice();
 src.unshift(image);
  src.forEach(el=>{
    slides.push(crt('div', [['className', 'prd-slide']]).addEl(crt('img', [['src', el], ['alt', name]])))
  })
  qS(".product-modal").append(
     crt('div', [['className', 'details']]).
     addEl(crt('div').addEl(crt('span', [['className', 'close'], ['textContent', '\u00D7']])),
     crt('div', [['className', 'product-popup']]).addEl(crt('div', [['className', 'popup-image']]).
     addEl(crt('div', [['className', 'm-grid']]).
     addEl(...slides)
      ),
      crt('div', [['className', 'popup-details']]).addEl(
        crt('div', [['className', 'name']]).addEl(crt('span', [['textContent', name]])),
        crt('div', [['className', 'price']]).addEl(crt('span', [['className', 'current'],['textContent', currentPrice]]), 
                                                    crt('span', [['className', 'old'],['textContent', oldPrice]])),
        crt('div', [['className', 'description']]).addEl(crt('div').addEl(crt('h5', [['textContent', 'Description']]),
                                                                              crt('p', [['textContent', short_desc]])))
      )
    ),
      crt('div', [['className', 'controls']]).addEl(
        crt('span', [['id', 'menu']]).addEl(crt('i', [['className', 'fa-solid fa-ellipsis-vertical']])),
        crt('menu', [['className', 'pd-menu']]).addEl(
          crt('li', [['textContent', 'Add to Cart']]),
          crt('li', [['textContent', 'Add to Wishlist']]),
          crt('li', [['textContent', 'Go to Page'], ['onclick', ()=>{location.href=link}]])
        )
      )
   )
 ) 
  
  qS(".product-modal .m-grid").style.setProperty(
    "--gcol",
    qSA(".m-grid .prd-slide").length
  );
  addEvent(qS(".product-modal"), "click", showMenu);
  showPopup();
  addEvent(qS(".product-modal .popup-image"), "contextmenu", function (e) {
    e.preventDefault();
  });
}

function showPopup() {
  let details = qS(".product-modal");
  qS("body").style.overflow = "hidden";
  let animate = details.animate(
    [{ transform: "scale(0)" }, { transform: "scale(1)" }],
    {
      duration: 300,
      fill: "forwards",
    }
  );
  animate.onfinish = () => {
    animate.commitStyles();
    addEvent(details.querySelector(".close"), "click", function () {
      closePopUp(this);
    });
  };
  let slider = new Slider();
  slider.start();
}

function showMenu(e) {
  e.stopPropagation();
  let a = qSA(".product-modal .pd-menu li");
  addEvent(a[0], "click", function () {
    AddToCart(this);
  });
  addEvent(a[1], "click", function () {
    wishList(this);
  });

  if (e.target.id === "menu" || e.target.parentElement.id==='menu') {
    console.log("yo");
    qS(".product-modal .pd-menu").style.display = "block";
  } else {
    qS(".product-modal .pd-menu").style.display = "none";
  }
}
function closePopUp(el) {
  let t = el.parentElement.parentElement.parentElement;
  let a = t.animate([{ transform: "scale(1)" }, { transform: "scale(0)" }], {
    duration: 250,
  });
  a.onfinish = () => {
    t.remove();
    qS("body").style.overflow = "auto";
  };
}

