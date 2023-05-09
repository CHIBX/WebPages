const minVal = elId("min-value");
const maxVal = elId("max-value");
const numberInput = qSA('.filter-box .price-view input[type="text"]');
const rangeInput = qSA('.filter-box .price-slider input[type="range"]');
qSA(".product img").forEach((el) => {
  addEvent(el, "dragstart", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
});

addEvent(this, "DOMContentLoaded", () => {
  setTimeout(() => {
    qS("body").style.overflow = "visible";
    let u = qS(".page-preloader").animate(
      [{ opacity: "1" }, { opacity: "0" }],
      { duration: 500, fill: "backwards" }
    );
    u.onfinish = () => {
      u.commitStyles();
      qS(".page-preloader img").remove();
      qS("body").removeChild(qS(".page-preloader"));
    };
  }, 2500);
  if (innerWidth > 780) {
    let sideWidth = qS(".side").clientWidth;
    qS("div.product-not-found").style.left = sideWidth + 10 + "px";
    qS("div.product-not-found").style.width =
      "calc(100% - " + (sideWidth + 10) + "px)";
  } else {
    qS("div.product-not-found").style.width = "100%";
  }
  console.log("I am true");
});
onresize = () => {
  if (innerWidth > 780) {
    let sideWidth = qS(".side").clientWidth;
    qS("div.product-not-found").style.left = sideWidth + 10 + "px";
    qS("div.product-not-found").style.width =
      "calc(100% - " + (sideWidth + 10) + "px)";
  } else {
    qS("div.product-not-found").style.width = "100%";
    qS("div.product-not-found").style.left = "0px";
  }
};
qSA("main .product").forEach((el) => {
  INITIAL_PRODUCT_ARRAY.push(el);
});
qSA("#frmFilter [data-role]").forEach((el) => {
  FILTER_FRM_SET.push(el);
});
qSA(".filter-box [data-role]").forEach((el) => {
  FILTER_BTN_SET.push(el);
});
addEvent(qS(".filter-button"), "click", () => {
  qS(".filter-box").style.display = "block";
  filterBox.go();
});
addEvent(qS(".filter-box .close"), "click", () => {
  let s = filterBox.back();
  s.onfinish = () => {
    qS(".filter-box").style.display = "none";
  };
});
// Price Slider
let prod_price = qSA(".product .current-price");
prod_price.forEach((el) => {
  let price = el.textContent;
  let res_string = "";
  for (let i of price) {
    i = i.trim();
    if (!(i === "\u20A6" || i === ",")) {
      res_string += i;
    }
  }
  price_array.push(parseFloat(res_string));
});
price_array.sort((a, b) => b - a);
elId("min-price-view").textContent = parseInt(minVal.value).toLocaleString(
  "en-NG",
  { style: "currency", currency: "NGN" }
);
elId("max-price-view").textContent = parseInt(
  price_array[price_array.length - 1]
).toLocaleString("en-NG", { style: "currency", currency: "NGN" });
minVal.max = price_array[0];
maxVal.max = price_array[0];
rangeInput[0].max = price_array[0];
rangeInput[1].max = price_array[0];
addEvent(document, "load", WatchSlider);
addEvent(document, "load", MobileFilterInput);
addEvent(maxVal, "input", WatchSlider);
addEvent(minVal, "input", WatchSlider);
addEvent(maxVal, "change", function () {
  filterByPrice(minVal.value, this.value);
});
addEvent(minVal, "change", function () {
  filterByPrice(this.value, maxVal.value);
});
maxVal.value = price_array[price_array.length - 1];
rangeInput[1].value = price_array[price_array.length - 1];
addEvent(rangeInput[0], "input", MobileFilterInput);
addEvent(rangeInput[1], "input", MobileFilterInput);
addEvent(rangeInput[0], "change", function () {
  filterByPrice(this.value, rangeInput[1].value);
});
addEvent(rangeInput[1], "change", function () {
  filterByPrice(rangeInput[0].value, this.value);
});
// End of Price Slider----------------------------------------------------------->
qSA(".product").forEach((el) => {
  let a = el.querySelector(".product-name a");
  let imgA = el.querySelector(".product-image a");
  imgA.title = a.textContent;
  a.title = a.textContent;
});
calculateDiscount();
AddRadioValue(qSA('#frmFilter [name*="rad"]'), qSA(".filter-box button"));
ClickRadio();
onload = function () {
  let url = new URLSearchParams(location.search);
  let price = url.get("price");
  if (price) {
    price = price.split("-");
    elId("min-price-view").textContent = parseInt(price[0]).toLocaleString(
      "en-NG",
      { style: "currency", currency: "NGN" }
    );
    elId("max-price-view").textContent = parseInt(price[1]).toLocaleString(
      "en-NG",
      { style: "currency", currency: "NGN" }
    );
    numberInput[0].value = parseInt(price[0]).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
    });
    numberInput[1].value = parseInt(price[1]).toLocaleString("en-NG", {
      style: "currency",
      currency: "NGN",
    });
    filterByPrice(price[0], price[1]);
  }
};
qSA(".product a").forEach((el) => {
  addEvent(el, "click", (e) => {
    e.preventDefault();
  });
});
qSA(".product .product-image img").forEach((el) =>
  addEvent(el, "click", ProductPopUp)
);
qSA(".product .product-name a").forEach((el) =>
  addEvent(el, "click", ProductPopUp)
);
