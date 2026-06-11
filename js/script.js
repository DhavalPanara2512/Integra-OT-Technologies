document.addEventListener("DOMContentLoaded", function(){

const menu =
document.getElementById("mobile-menu");

const navbar =
document.getElementById("navbar");

if(menu){

menu.addEventListener("click", function(){

navbar.classList.toggle("active");

});

}

});
