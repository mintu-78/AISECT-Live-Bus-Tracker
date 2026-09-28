document.addEventListener("DOMContentLoaded", () => {

    const themeButton = document.querySelector(".fa-moon");

    if (!themeButton) return;

    const savedTheme = localStorage.getItem("aisect-theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        themeButton.classList.remove("fa-moon");
        themeButton.classList.add("fa-sun");
    }


    themeButton.parentElement.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");


        localStorage.setItem(
            "aisect-theme",
            isDark ? "dark" : "light"
        );


        if (isDark) {

            themeButton.classList.remove("fa-moon");
            themeButton.classList.add("fa-sun");

        } else {

            themeButton.classList.remove("fa-sun");
            themeButton.classList.add("fa-moon");

        }

    });

});