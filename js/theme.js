// =====================================================
// GVA GLOBAL THEME CONTROLLER
// =====================================================

const themeToggle =
    document.getElementById("themeToggle");

const root =
    document.documentElement;


// Get saved theme
const savedTheme =
    localStorage.getItem("gva-theme");


// If visitor has already selected a theme,
// use that preference.
if (savedTheme) {

    root.setAttribute(
        "data-theme",
        savedTheme
    );

} else {

    // Otherwise follow the visitor's
    // operating system preference.

    const prefersLight =
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches;

    root.setAttribute(
        "data-theme",
        prefersLight
            ? "light"
            : "dark"
    );
}


// Update button icon
function updateThemeIcon() {

    if (!themeToggle) {
        return;
    }

    const currentTheme =
        root.getAttribute("data-theme");

    if (currentTheme === "light") {

        // Clicking this will switch to dark
        themeToggle.textContent = "🌙";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

    } else {

        // Clicking this will switch to light
        themeToggle.textContent = "☀️";

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );
    }
}


updateThemeIcon();


// Theme button click
if (themeToggle) {

    themeToggle.addEventListener(
        "click",
        () => {

            const currentTheme =
                root.getAttribute(
                    "data-theme"
                );

            const newTheme =
                currentTheme === "light"
                    ? "dark"
                    : "light";


            root.setAttribute(
                "data-theme",
                newTheme
            );


            // Remember selection
            localStorage.setItem(
                "gva-theme",
                newTheme
            );


            updateThemeIcon();
        }
    );
}