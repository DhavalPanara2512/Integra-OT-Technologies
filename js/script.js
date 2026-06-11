document.addEventListener("DOMContentLoaded", function(){

const menuToggle =
document.getElementById("mobile-menu");

const navbar =
document.getElementById("navbar");

if(menuToggle){

menuToggle.addEventListener("click", function(){

navbar.classList.toggle("active");

});

}

// Auto close menu on mobile after click

const navLinks =
document.querySelectorAll("#navbar a");

navLinks.forEach(function(link){

link.addEventListener("click", function(){

navbar.classList.remove("active");

});

});

});
