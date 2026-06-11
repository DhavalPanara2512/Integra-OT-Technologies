// ======================================
// NAVBAR SCROLL EFFECT
// ======================================

window.addEventListener("scroll", function () {

    const navbar = document.querySelector(".navbar");

    if (window.scrollY > 50) {

        navbar.style.background = "#111827";
        navbar.style.boxShadow = "0 5px 15px rgba(0,0,0,0.3)";

    }
    else {

        navbar.style.background = "rgba(5,10,20,0.95)";
        navbar.style.boxShadow = "none";

    }

});


// ======================================
// SMOOTH SCROLLING
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        e.preventDefault();

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// ======================================
// COUNTER ANIMATION
// ======================================

const counters = document.querySelectorAll(".stat-card h2");

function startCounter() {

    counters.forEach(counter => {

        const text = counter.innerText;

        let target = parseInt(text);

        if (isNaN(target)) return;

        let count = 0;

        let speed = target / 100;

        const updateCounter = () => {

            if (count < target) {

                count += speed;

                counter.innerText =
                    Math.ceil(count) + "+";

                requestAnimationFrame(updateCounter);

            }
            else {

                counter.innerText = target + "+";

            }

        };

        updateCounter();

    });

}

startCounter();


// ======================================
// FADE-IN ANIMATION
// ======================================

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform =
                    "translateY(0px)";

            }

        });

    },

    {
        threshold: 0.2
    }

);

document.querySelectorAll(".card").forEach(card => {

    card.style.opacity = "0";
    card.style.transform = "translateY(50px)";
    card.style.transition = "all 0.8s ease";

    observer.observe(card);

});


// ======================================
// HERO TEXT ANIMATION
// ======================================

window.addEventListener("load", () => {

    const heroTitle =
        document.querySelector(".hero h1");

    const heroText =
        document.querySelector(".hero p");

    if (heroTitle) {

        heroTitle.style.opacity = "0";
        heroTitle.style.transform =
            "translateY(40px)";

        setTimeout(() => {

            heroTitle.style.transition =
                "all 1s ease";

            heroTitle.style.opacity = "1";

            heroTitle.style.transform =
                "translateY(0px)";

        }, 300);

    }

    if (heroText) {

        heroText.style.opacity = "0";

        setTimeout(() => {

            heroText.style.transition =
                "all 1.2s ease";

            heroText.style.opacity = "1";

        }, 800);

    }

});


// ======================================
// CONSOLE MESSAGE
// ======================================

console.log(
    "Integra OT Technologies Website Loaded Successfully"
);
