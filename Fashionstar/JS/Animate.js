const footerArrow = qSA('footer .arrow');
const accountBox = qS(".account-box");
addEvent(qS(".menu-box .close"),"click", () => {
  CloseBox(".menu-box");
});
qSFE([".menu-hover"], "click", () => {
  OpenBox(".menu-box");
});
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
};
const filterBox = new Animate(
  `.filter-box .container`,
  [
    {
      transform: "translateY(100%)",
    },
    {
      transform: "translateY(0%)",
    },
  ],
  300
);
function Animate(cName, array, duration) {
  this.cName = cName;
  this.duration = duration;
  this.array = array;
  this.copyArray = this.array.slice().reverse();
  let el = qS(this.cName);
  this.go = function (duration = this.duration) {
    let s = el.animate(this.array, {
      duration: duration,
      iterations: 1,
      fill: "both",
    });
    return s;
  };
  this.back = function (duration = this.duration) {
    let s = el.animate(this.copyArray, {
      duration: duration,
      iterations: 1,
      fill: "forwards",
    });
    // s.commitStyles();
    return s;
  };
}
addEvent(this,"resize", Close);
addEvent(this,"load", Close);
addEvent(this,"load", () => {
  qSA("footer [class$='-click']").forEach((el) => {
    el.click();
  });
  accountBox.style.top = "-55%";
  accountBox.style.zIndex = "-1";
});
//=========================================================================================================================================
//--------------------------------------------------------------------------------------------------------------------------------------------
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

arrows.forEach((el) => {
  el.onclick = function () {
    let element = this.parentElement.nextElementSibling;
    // console.log(element.className)
    const arrowAnimator = new Animate(
      `.${element.className}`,
      [
        {
          margin: "0px",
          padding: "0px",
          fontSize: "0px",
        },
        {
          height: "100%",
          margin: "10px 0px 0px 0px",
          fontSize: CheckWidth().get("fontSize"),
        },
      ],
      300
    );
    if (element.style.fontSize == "0px") {
      arrowAnimator.go();
      this.style.transform = "rotate(90deg)";
      element.style.margin = "10px 0px 0px 0px";
      element.style.fontSize = CheckWidth().get("fontSize");
      element.style.height = "100%";
      element
        .querySelectorAll('div')
        .forEach((el) => (el.style.marginBottom = "4px"));
    } else {
      arrowAnimator.back(100);
      this.style.transform = "rotate(-90deg)";
      element.style.fontSize = "0px";
      element
        .querySelectorAll(`div`)
        .forEach((el) => (el.style.marginBottom = "0px"));
    }
  };
});
function Close(e) {
  let footerEl = qSA("footer [class$='-click']");
  if (innerWidth <= 404) {
    footerEl.forEach((el) => {
      addEvent(el,"click", footerAnimate);
      if (e.type === "resize" && innerWidth == 404) {
        el.click();
      }
      if (e.type === "load") {
        el.click();
      }
    });
    qS(".dep").style.fontSize = CheckWidth().get("Footer-font-Size");
    qS(".pro").style.fontSize = CheckWidth().get("Footer-font-Size");
    qS(".info").style.fontSize = CheckWidth().get("Footer-font-Size");
    qSA("footer .arrow").forEach((el) => {
      el.style.display = "block";
      if (el.parentElement.style.transform === "rotate(90deg)") {
        footerEl.forEach((el) => el.click());
      }
    });
  } else {
    qSA("footer .arrow").forEach((el) => {
      el.style.display = "none";
      if (el.parentElement.style.transform === "rotate(-90deg)") {
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
    el.click()
  });
}
addEvent(qS(".account-button"),"click", showAccountBox);
addEvent(qS(".user-hover"),"click", showAccountBox);
addEvent(qS(".account-box .close"),"click", () => {
  accountBox.style.zIndex = "-1";
  let a = account_box.back();
  a.onfinish = () => {
    accountBox.style.top = "-55%";
  };
});
function showAccountBox() {
  if (accountBox.style.top === "-55%") {
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
    100
  );
  if (element.style.fontSize === "0px") {
    marginFDivs.forEach((el) => {
      el.style.marginBottom = "5px";
    });
    let go = arrowAnimator.go();
    this.querySelector(".arrow").style.transform = "rotate(90deg)";
    element.style.fontSize = CheckWidth().get("Footer-font-Size");
    go.onfinish = () => {
      qSA(`.${this.parentElement.className} `).forEach((el) => {
        el.style.display = "inline-block";
      });
    };
  } else {
    arrowAnimator.back(50);
    this.querySelector(".arrow").style.transform = "rotate(-90deg)";
    marginFDivs.forEach((el) => {
      el.style.marginBottom = "0px";
    });
    element.style.fontSize = "0px";
  }
  this.querySelector(".arrow").style.display = "block";
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
