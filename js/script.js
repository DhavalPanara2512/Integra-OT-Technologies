document.addEventListener("DOMContentLoaded", function(){

    const menuToggle = document.getElementById("mobile-menu");
    const navbar = document.getElementById("navbar");

    if(menuToggle){
        menuToggle.addEventListener("click", function(){
            navbar.classList.toggle("active");
            // FIXED: Uses browser-safe codes instead of text symbols to prevent '?' rules
            menuToggle.innerHTML = navbar.classList.contains("active") ? "&times;" : "&#9776;";
        });
    }

    // Auto close menu on mobile after click
    const navLinks = document.querySelectorAll("#navbar a");

    navLinks.forEach(function(link){
        link.addEventListener("click", function(){
            navbar.classList.remove("active");
            if(menuToggle) {
                menuToggle.innerHTML = "&#9776;"; // FIXED: Safely resets back to hamburger stack
            }
        });
    });

});
