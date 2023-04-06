const footerArrow = document.querySelectorAll("footer .arrow");
const accountBox = qS(".account-box");
qS('.menu-box .close').addEventListener("click", ()=>{CloseBox('.menu-box')})
qSFE(['.menu-button','.menu-hover'], 'click', ()=>{OpenBox('.menu-box')})
const account_box = new Animate(
  "." + accountBox.className,
  [{ top: "-40%" }, { top: "16%" }],
  300
  );
const initialMenuBox = {
    width: "0px",
    padding: "0px",
    margin: "0px",
};
  
const finalMenuBox = {
    width: CheckWidth().get("BWidth"),
    padding: CheckWidth().get("padding"),
    // margin: CheckWidth().get(),
};
function Animate(cName, array, duration) {
  this.cName = cName;
  this.duration = duration;
  this.array = array;
  this.copyArray = this.array.slice().reverse();
  this.go = function () {
    let el = qS(this.cName);
    let s = el.animate(this.array, {
      duration: this.duration,
      iterations: 1,
      fill: "forwards",
    });
    // s.commitStyles();
    return s;
  };
  this.back = function () {
    let el = qS(this.cName);
    let s = el.animate(this.copyArray, {
      duration: this.duration,
      iterations: 1,
      fill: "forwards",
    });
    // s.commitStyles();
    return s;
  };
}
addEventListener("resize", Close);
addEventListener("load", Close);
addEventListener("load", () => {
  qSA("footer [class$='-click']").forEach((el) => {
    el.click();
  });
  accountBox.style.top = "-40%";
  accountBox.style.zIndex = "-1";
});
//=========================================================================================================================================
//--------------------------------------------------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


if (qS(".body").style.fontSize == "0px") {
  qS(".access-click").style.opacity = "0";
  qS(".access-click").style.fontSize = "0px";
  qS(".cloth-click").style.marginTop = "5px";
}
arrows.forEach((el) => {
  el.onclick = function () {
    let element = this.parentElement.nextElementSibling;
    // console.log(element.className)
    let arrowAnimator = new Animate(
      `.${element.className}`,
      [
        {
          margin: "0px",
          padding: "0px",
          fontSize: "0px",
        },
        {
          height: "100%",
          margin: "20px 0px 0px 0px",
          fontSize: CheckWidth().get("fontSize"),
        },
      ],
      300
    );
    if (element.style.fontSize == "0px") {
      arrowAnimator.go();
      this.style.transform = "rotate(90deg)";
      element.style.margin = "20px 0px 0px 0px";
      element.style.fontSize = CheckWidth().get("fontSize");
      element.style.height = "100%";
      element.querySelectorAll(`.${element.className} div`)
      .forEach((el) => (el.style.marginBottom = "4px"));
      if (qS(".body").style.fontSize != "0px") {
        qS(".access-click").style.opacity = "1";
        qS(".access").style.display = "block";
        qS(".access div").style.marginBottom = "6px";
        qS(".cloth-click").style.marginTop = "5px";
        qS(".access-click").style.fontSize = CheckWidth().get("fontSize");
      }
    } else {
      arrowAnimator.back();
      this.style.transform = "rotate(0deg)";
      element.style.fontSize = "0px";
      element.querySelectorAll(`.${element.className} div`)
      .forEach((el) => (el.style.marginBottom = "0px"));
      if (qS(".body").style.fontSize == "0px") {
        qS(".access-click").style.opacity = "0";
        qS(".access-click").style.fontSize = "0px";
        qS(".access").style.display = "none";
      }
    }
  };
});
function Close(e) {
  let footerEl = qSA("footer [class$='-click']");
  if (innerWidth <= 404) {
    footerEl.forEach((el) => {
      el.addEventListener("click", footerAnimate);
      if(e.type=='resize' && innerWidth==404){
        el.click()
      }
    });
    qS(".dep").style.fontSize = CheckWidth().get("Footer-font-Size");
    qS(".pro").style.fontSize = CheckWidth().get("Footer-font-Size");
    qS(".info").style.fontSize = CheckWidth().get("Footer-font-Size");
    qSA("footer svg").forEach((el) => {
      el.style.display = "none";
    });
    qSA("footer .arrow svg").forEach((el) => {
      el.style.display = "block";
      if (el.parentElement.style.transform === "rotate(90deg)") {
        footerEl.forEach((el) => el.click());
      }
    });
  } else {
    qSA("footer svg").forEach((el) => {
      el.style.display = "inline-block";
    });
    qSA("footer .arrow svg").forEach((el) => {
      el.style.display = "none";
      if (el.parentElement.style.transform === "rotate(0deg)") {
        footerEl.forEach((el) => el.click());
      }
    });
    footerEl.forEach((el) => {
      el.removeEventListener("click", footerAnimate);
    });
  }
}



if (innerWidth < 404) {
  qSA("footer [class$='-click']").forEach((el) => {
    el.click();
    el.click();
  });
}
qS(".account-button").addEventListener("click", showAccountBox);
qS(".user-hover").addEventListener("click", showAccountBox);
qS(".account-box .close").addEventListener("click", () => {
  accountBox.style.zIndex = "-1";
  let a = account_box.back();
  a.onfinish = () => {
    accountBox.style.top = "-40%";
  };
});
function showAccountBox() {
  if (accountBox.style.top === "-40%") {
    let a = account_box.go();
    a.onfinish = () => {
      accountBox.style.top = "16%";
      accountBox.style.zIndex = "5";
    };
  }
}

function footerAnimate() {
  let element = this.nextElementSibling;
  // console.log(element.className)
  let marginFDivs = qSA(`.${element.className} div`);
  let arrowAnimator = new Animate(
    `.${element.className}`,
    [
      {
        fontSize: "0px",
      },
      {
        fontSize: CheckWidth().get("Footer-font-Size"),
      },
    ],
    50
  );
  if (element.style.fontSize === "0px") {
    marginFDivs.forEach((el) => {
      el.style.marginBottom = "5px";
    });
    let go = arrowAnimator.go();
    this.querySelector(".arrow").style.transform = "rotate(90deg)";
    element.style.fontSize = CheckWidth().get("Footer-font-Size");
    go.onfinish = () => {
      qSA(`.${this.parentElement.className} svg`).forEach((el) => {
        el.style.display = "inline-block";
      });
    };
  } else {
    qSA(`.${this.parentElement.className} svg`).forEach((el) => {
      el.style.display = "none";
    });
    arrowAnimator.back();
    this.querySelector(".arrow").style.transform = "rotate(0deg)";
    marginFDivs.forEach((el) => {
      el.style.marginBottom = "0px";
    });
    element.style.fontSize = "0px";
  }
  this.querySelector(".arrow svg").style.display = "block";
}
function OpenBox(className) {
  let child = qS(className).firstElementChild;
  let Opener = new Animate(className, [initialMenuBox, finalMenuBox], 400);
  if (child.style.display !== "block") {
    qS(".modal").style.display = "block";
    child.style.display = "none";
    let onGoing = Opener.go();
    document.body.style.overflow = "hidden";
    qS(className).style.overflow = "auto";
    onGoing.onfinish = () => {
      child.style.display = "block";
      child.style.opacity = "1";
    };
  }
}
function CloseBox(className) {
  let child = qS(className).firstElementChild;
  let Opener = new Animate(className, [finalMenuBox, initialMenuBox], 400);
  child.style.display = "none";
  let onGoing = Opener.go();
  onGoing.onfinish = () => {
    qS(".modal").style.display = "none";
    document.body.style.overflow = "auto";
    arrows.forEach((el) => {
      if (el.style.transform === "rotate(90deg)") {
        el.click();
      }
    });
  };
}

function showFilterBox(){

}