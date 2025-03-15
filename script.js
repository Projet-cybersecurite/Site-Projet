 ----------------------------------------
// 🚀 ANIMATIONS & INTERACTIONS UI
// ----------------------------------------

// Animation de fondu (Fade-in) pour les sections
const sections = document.querySelectorAll('section, .welcome-section, .main-content, .image-section, .team-section, .cv-section, .contact-section');

function checkVisibility() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        if (sectionTop < window.innerHeight && sectionBottom > 0) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }
    });
}

window.addEventListener('scroll', checkVisibility);
window.addEventListener('load', checkVisibility);

// Animation de rotation au survol pour l'icône dans la bannière
const rotatingIcon = document.querySelector('.icon-large');

rotatingIcon.addEventListener('mouseenter', () => {
    rotatingIcon.style.transform = 'rotate(360deg)';
});

rotatingIcon.addEventListener('mouseleave', () => {
    rotatingIcon.style.transform = 'rotate(0deg)';
});

// Bouton "Retour en haut"
window.onscroll = function() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("back-to-top").style.display = "block";
    } else {
        document.getElementById("back-to-top").style.display = "none";
    }
};

document.getElementById("back-to-top").addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ----------------------
// 🚀 GESTION DU MENU BURGER
// ----------------------
document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.getElementById("burger-menu");
    const nav = document.getElementById("main-nav");

    if (burgerMenu && nav) {
        burgerMenu.addEventListener("click", function() {
            nav.classList.toggle("active");
        });
    }
});

// ----------------------
// 🚀 GESTION DU CARROUSEL DANS PORTFOLIO
// ----------------------
function nextSlide(member) {
    const slides = document.getElementById(`${member}-slides`).querySelectorAll('.slide');
    let activeIndex = 0;

    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            slide.classList.remove('active');
            activeIndex = index;
        }
    });

    const nextIndex = (activeIndex + 1) % slides.length;
    slides[nextIndex].classList.add('active');
}

function prevSlide(member) {
    const slides = document.getElementById(`${member}-slides`).querySelectorAll('.slide');
    let activeIndex = 0;

    slides.forEach((slide, index) => {
        if (slide.classList.contains('active')) {
            slide.classList.remove('active');
            activeIndex = index;
        }
    });

    const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
    slides[prevIndex].classList.add('active');
}
const API_URL = "http://localhost:3000"; // 🔥 Remplace par ton serveur local

document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const email = document.getElementById("loginEmail").value;
            const password = document.getElementById("loginPassword").value;

            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                alert("Connexion réussie !");
                window.location.href = "admin.html"; // Redirige vers l'admin
            } else {
                alert(data.error);
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", async function(event) {
            event.preventDefault();
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;

            const response = await fetch(`${API_URL}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                alert("Inscription réussie ! Connecte-toi.");
            } else {
                alert(data.error);
            }
        });
    }
});

