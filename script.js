// ✅ Fonction pour récupérer un cookie spécifique
function getCookie(name) {
    let cookieArr = document.cookie.split(";");
    for (let i = 0; i < cookieArr.length; i++) {
        let cookiePair = cookieArr[i].split("=");
        if (name === cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

// ✅ Fonction pour récupérer le token CSRF et le stocker dans un cookie sécurisé
async function getCSRFToken() {
    const response = await fetch("/api/csrf-token", { method: "GET", credentials: "include" });
    const data = await response.json();
    document.cookie = `csrfToken=${data.csrfToken}; Secure; SameSite=Strict; Path=/`;
}

// ✅ Vérification de la connexion utilisateur (affichage du bouton déconnexion)
function checkUserSession() {
    const token = getCookie("token");
    if (token) {
        document.getElementById("logoutBtn").style.display = "block";
    } else {
        document.getElementById("logoutBtn").style.display = "none";
    }
}

// ✅ Gestion de l'inscription
document.getElementById("registerBtn").addEventListener("click", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const csrfToken = getCookie("csrfToken");

    if (!email || !password) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const response = await fetch("/api/register", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken 
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    document.getElementById("authMessage").textContent = data.message || data.error;

    if (response.ok) {
        alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
    }
});

// ✅ Gestion de la connexion
document.getElementById("loginBtn").addEventListener("click", async function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const csrfToken = getCookie("csrfToken");

    const response = await fetch("/api/login", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken
        },
        credentials: "include",
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    document.getElementById("authMessage").textContent = data.message || data.error;

    if (response.ok) {
        alert("Connexion réussie !");
        checkUserSession();
        window.location.reload();
    }
});

// ✅ Gestion de la déconnexion
document.getElementById("logoutBtn").addEventListener("click", function() {
    document.cookie = "token=; Max-Age=0; Path=/; Secure; SameSite=Strict;";
    alert("Déconnexion réussie !");
    checkUserSession();
    window.location.href = "index.html";
});

// ✅ Charger le token CSRF et vérifier la session utilisateur au chargement de la page
getCSRFToken();
checkUserSession();


// ----------------------------------------
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
