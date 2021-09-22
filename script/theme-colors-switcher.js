let colorSwitcherIcon = document.querySelector(".color-switcher-icon"),
  colorSwitcherDropdown = document.querySelector(".color-switcher-dropdown");

colorSwitcherIcon.addEventListener("click", () => {
  colorSwitcherDropdown.classList.toggle("open");
});

let btns = document.querySelectorAll(".color");
let root = document.querySelector(":root");

let darkTheme = [
  "#181818",
  "#222222",
  "#222222cc",
  "#1a1a1a",
  "#1a1a1a80",
  "#2e2e2e",
];

let themeSwitcherIcon = document.querySelector(".theme-switcher-icon");
let mainWrapper = document.querySelector(".main-wrapper");

for (let btn of btns) {
  btn.addEventListener("click", (e) => {
    let target = e.target;
    let open = document.querySelector(".open");

    if (open) open.classList.remove("open");

    document.querySelector(".active").classList.remove("active");
    target.classList.add("active");

    let dataColor = target.getAttribute("data-colors");
    let color = dataColor.split(" ");

    root.style.setProperty("--black", color[0]);
    root.style.setProperty("--main", color[1]);
    root.style.setProperty("--main-hover", color[2]);
    root.style.setProperty("--btn", color[3]);
    root.style.setProperty("--btn-hover", color[4]);
    root.style.setProperty("--light-bg", color[5]);

    themeSwitcherIcon.classList.remove("dark");
    mainWrapper.classList.remove("dark");
  });
}

themeSwitcherIcon.addEventListener("click", () => {
  themeSwitcherIcon.classList.toggle("dark");
  mainWrapper.classList.toggle("dark");

  if (document.querySelector(".dark")) {
    root.style.setProperty("--black", darkTheme[0]);
    root.style.setProperty("--main", darkTheme[1]);
    root.style.setProperty("--main-hover", darkTheme[2]);
    root.style.setProperty("--btn", darkTheme[3]);
    root.style.setProperty("--btn-hover", darkTheme[4]);
    root.style.setProperty("--light-bg", darkTheme[5]);
  } else {
    themeSwitcherIcon.classList.remove("dark");
    mainWrapper.classList.remove("dark");
    document.querySelector(".color.purple").click();
  }
});