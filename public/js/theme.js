// =====================================================
// GVA EDITORIAL THEME CONTROLLER
// Lightweight, accessible theme switcher with localStorage persistence
// =====================================================

(function () {
    const root = document.documentElement;
    const themeToggle = document.getElementById("themeToggle");

    // Retrieve stored theme or default to system preference (or 'light' for warm editorial baseline)
    function getInitialTheme() {
        const savedTheme = localStorage.getItem("gva-theme");
        if (savedTheme === "dark" || savedTheme === "light") {
            return savedTheme;
        }
        // Default to light mode (warm ivory editorial palette) unless explicit OS dark mode
        if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
            return "dark";
        }
        return "light";
    }

    function applyTheme(theme) {
        root.setAttribute("data-theme", theme);
        updateToggleButton(theme);
    }

    function updateToggleButton(currentTheme) {
        if (!themeToggle) return;
        const iconSpan = themeToggle.querySelector(".theme-icon");
        const textSpan = themeToggle.querySelector(".theme-text");

        if (currentTheme === "dark") {
            if (iconSpan) iconSpan.textContent = "☼";
            if (textSpan) textSpan.textContent = "Light";
            themeToggle.setAttribute("aria-label", "Switch to light theme");
        } else {
            if (iconSpan) iconSpan.textContent = "☾";
            if (textSpan) textSpan.textContent = "Dark";
            themeToggle.setAttribute("aria-label", "Switch to dark theme");
        }
    }

    // Initialize theme immediately
    const initialTheme = getInitialTheme();
    applyTheme(initialTheme);

    // Event listener
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = root.getAttribute("data-theme") || "light";
            const nextTheme = currentTheme === "dark" ? "light" : "dark";
            applyTheme(nextTheme);
            localStorage.setItem("gva-theme", nextTheme);
        });
    }

    // Watch OS color scheme changes if user hasn't explicitly set a preference
    if (window.matchMedia) {
        window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
            if (!localStorage.getItem("gva-theme")) {
                applyTheme(e.matches ? "dark" : "light");
            }
        });
    }
})();
