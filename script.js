let colorSwitcherIcon = document.querySelector(".color-switcher-icon"),
    colorSwitcherDropdown = document.querySelector(".color-switcher-dropdown");

colorSwitcherIcon.addEventListener("click", () => {
    colorSwitcherDropdown.classList.toggle("open");
});

let btns = document.querySelectorAll(".color");
let root = document.querySelector(":root");

for(let btn of btns){
    btn.addEventListener("click", (e) => {
        let target = e.target;
        let open = document.querySelector(".open");

        if(open) open.classList.remove("open");

        document.querySelector(".active").classList.remove("active");
        target.classList.add("active");

        let dataColor = target.getAttribute("data-colors");
        let color = dataColor.split(" ");

        root.style.setProperty("--white", color[0]);
        root.style.setProperty("--light", color[1]);
        root.style.setProperty("--dark", color[2]);
        root.style.setProperty("--hover", color[3]); 
    })
}

let darkTheme = ["grey", "grey", "grey", "grey"];

let themeSwitcherIcon = document.querySelector(".theme-switcher-icon");

themeSwitcherIcon.addEventListener("click", () => {
    themeSwitcherIcon.classList.toggle("dark");

    if(document.querySelector(".dark")) {
        root.style.setProperty("--white", darkTheme[0]);
        root.style.setProperty("--light", darkTheme[1]);
        root.style.setProperty("--dark", darkTheme[2]);
        root.style.setProperty("--hover", darkTheme[3]); 
    } else document.querySelector(".color.blue").click();
});

