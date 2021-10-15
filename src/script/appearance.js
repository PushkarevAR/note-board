//-----------------------theme and colors changers-----------------------
const colorSwitcherIcon = document.querySelector(".color-switcher-icon");
const colorSwitcherDropdown = document.querySelector(".color-switcher-dropdown");

colorSwitcherIcon.addEventListener("click", () => {
  colorSwitcherDropdown.classList.toggle("open");
});

window.addEventListener("click", (e) => {
  // BAD code 0_o
  if (
    e.target == document.querySelector("main") &&
    document.querySelector(".open")
  ) {
    colorSwitcherDropdown.classList.remove("open");
  }
});

const btnColors = document.querySelectorAll(".color"),
  root = document.querySelector(":root");

const darkTheme = ["#1d1d1d", "#fcfcfc", "#181818", "rgb(43, 43, 43)"];
const lightTheme = ["#fff", "#252525", "#f7f7f7", "rgb(235, 235, 235)"];

const themeSwitcherIcon = document.querySelector(".theme-switcher-icon"),
  mainWrapper = document.querySelector(".main-wrapper");

for (let btn of btnColors) {
  btn.addEventListener("click", changeColor);
}

function changeColor(e) {
  let target = e.target;
  let open = document.querySelector(".open");

  if (open) open.classList.remove("open");

  document.querySelector(".active").classList.remove("active");
  target.classList.add("active");

  let dataColor = target.getAttribute("data-colors");
  let color = dataColor.split(" ");

  root.style.setProperty("--color", color[0]);
  root.style.setProperty("--color-hover", color[1]);
}

themeSwitcherIcon.addEventListener("click", () => {
  themeSwitcherIcon.classList.toggle("dark");

  if (document.querySelector(".dark")) {
    root.style.setProperty("--white", darkTheme[0]);
    root.style.setProperty("--black", darkTheme[1]);
    root.style.setProperty("--main", darkTheme[2]);
    root.style.setProperty("--grey", darkTheme[3]);
  } else {
    root.style.setProperty("--white", lightTheme[0]);
    root.style.setProperty("--black", lightTheme[1]);
    root.style.setProperty("--main", lightTheme[2]);
    root.style.setProperty("--grey", lightTheme[3]);
  }
});

//-----------------------Hide header on scroll-----------------------
(function () {
  const doc = document.documentElement,
    w = window;

  let prevScroll = w.scrollY || doc.scrollTop;
  let curScroll,
    direction = 0,
    prevDirection = 0;

  let header = document.querySelector("header");

  let checkScroll = function () {
    curScroll = w.scrollY || doc.scrollTop;

    if (curScroll > prevScroll) {
      direction = 2;
    } else if (curScroll < prevScroll) {
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };

  let toggleHeader = function (direction, curScroll) {
    if (direction === 2 && curScroll > 60) {
      header.classList.add("hide");
      prevDirection = direction;
    } else if (direction === 1) {
      header.classList.remove("hide");
      prevDirection = direction;
    }
  };

  window.addEventListener("scroll", checkScroll);
})();
