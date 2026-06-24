/* ═══════════════════════════════════════════════════
   INTEGRA OT — MASTER INTERACTIVE LOGIC INFRASTRUCTURE
   ═══════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", function() {
    
    // 1. MOBILE MENU MANAGER
    const menuToggle = document.getElementById("mobile-menu");
    const navbar = document.getElementById("navbar");

    if(menuToggle) {
        menuToggle.addEventListener("click", function() {
            navbar.classList.toggle("active");
            menuToggle.textContent = navbar.classList.contains("active") ? "✕" : "☰";
        });
    }

    const navLinks = document.querySelectorAll("#navbar a");
    navLinks.forEach(function(link) {
        link.addEventListener("click", function() {
            navbar.classList.remove("active");
            if(menuToggle) { menuToggle.textContent = "☰"; }
        });
    });

    // 2. SCROLL PROGRESS BAR & BACK TO TOP VISIBILITY
    const progressBar = document.getElementById("progress-bar");
    const topBtn = document.getElementById("topBtn");

    window.addEventListener("scroll", function() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        if (progressBar && docHeight > 0) {
            const progressPct = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${progressPct}%`;
        }

        if (topBtn) {
            if (scrollTop > 300) {
                topBtn.classList.add("show");
            } else {
                topBtn.classList.remove("show");
            }
        }
    });

    if (topBtn) {
        topBtn.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 3. STORAGE LIGHT / DARK TOGGLE ROUTINE
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
    updateToggleIcon(currentTheme);

    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", function() {
            const activeTheme = document.documentElement.getAttribute("data-theme");
            const targetTheme = activeTheme === "dark" ? "light" : "dark";
            
            document.documentElement.setAttribute("data-theme", targetTheme);
            localStorage.setItem("theme", targetTheme);
            updateToggleIcon(targetTheme);
            
            if (window.ApexCharts) { initDashboardMockupCharts(); }
        });
    }

    function updateToggleIcon(theme) {
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = theme === "dark" ? "☀️" : "🌙";
        }
    }

    // 4. OBSERVER FOR ANIMATING STATS COUNTERS
    const counters = document.querySelectorAll(".counter");
    if (counters.length > 0) {
        const runCounterAnimation = function(counterElement) {
            const target = +counterElement.getAttribute("data-target");
            const count = +counterElement.innerText;
            const speed = target / 60;

            if (count < target) {
                counterElement.innerText = Math.ceil(count + speed);
                setTimeout(() => runCounterAnimation(counterElement), 16);
            } else {
                counterElement.innerText = target + (counterElement.dataset.suffix || "");
            }
        };

        const observerOptions = { threshold: 0.15, triggerOnce: true };
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runCounterAnimation(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        counters.forEach(counter => observer.observe(counter));
    }

    // 5. APEXCHARTS LOADER
    initDashboardMockupCharts();

    // 6. NATIVE PARTICLES GENERATION HOOK
    if (document.getElementById("particles-js") && window.particlesJS) {
        particlesJS("particles-js", {
            particles: {
                number: { value: 40, density: { enable: true, value_area: 800 } },
                color: { value: "#0088cc" },
                shape: { type: "circle" },
                opacity: { value: 0.25, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#0088cc", opacity: 0.08, width: 1 },
                move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false }
            },
            interactivity: { detect_on: "canvas", events: { resize: true } },
            retina_detect: true
        });
    }
});

function initDashboardMockupCharts() {
    const trendChartContainer = document.querySelector("#kpi-trend-chart");
    if (!trendChartContainer) return;

    trendChartContainer.innerHTML = ""; 
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";

    const chartOptions = {
        series: [{
            name: "Asset Efficiency",
            data: [76, 81, 84, 82, 89, 93, 95]
        }],
        chart: {
            height: 280,
            type: "area",
            toolbar: { show: false }
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth", width: 3, colors: ["#0088cc"] },
        fill: {
            type: "gradient",
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.45,
                opacityTo: 0.05,
                stops: [0, 90, 100]
            }
        },
        xaxis: {
            categories: ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00"],
            labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } }
        },
        yaxis: {
            labels: { style: { colors: isDark ? "#cbd5e1" : "#64748b" } }
        },
        grid: { borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" },
        theme: { mode: isDark ? "dark" : "light" }
    };

    const chart = new ApexCharts(trendChartContainer, chartOptions);
    chart.render();
}
