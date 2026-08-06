const toggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("gva-theme");

if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
}

function updateIcon() {

    const theme =
        document.documentElement.getAttribute("data-theme");

    toggle.textContent = theme === "light" ? "🌙" : "☀️";
}

updateIcon();

toggle.addEventListener("click", () => {

    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    const newTheme =
        currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute(
        "data-theme",
        newTheme
    );

    localStorage.setItem("gva-theme", newTheme);

    updateIcon();
});