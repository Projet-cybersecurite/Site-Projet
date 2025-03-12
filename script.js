// Animation de fondu (Fade-in) pour les sections
const sections = document.querySelectorAll('section, .welcome-section, .main-content, .image-section, .team-section, .cv-section, .contact-section');

function checkVisibility() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;

        // Si la section est partiellement visible
        if (sectionTop < window.innerHeight && sectionBottom > 0) {
            section.style.opacity = 1;
            section.style.transform = 'translateY(0)';
        }
    });
}

// Écoute l'événement de défilement
window.addEventListener('scroll', checkVisibility);

// Déclenche la vérification au chargement de la page
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

// Fonction pour passer à la diapositive suivante
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

// Fonction pour revenir à la diapositive précédente
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

document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    // Construire l'URL mailto pour ouvrir le client de messagerie
    const mailtoLink = `mailto:tonemail@example.com?subject=Message de ${name}&body=${encodeURIComponent(message)}%0A%0ADe : ${name} (${email})`;

    // Ouvrir le client de messagerie
    window.location.href = mailtoLink;

    // Afficher un message de confirmation
    document.getElementById("formMessage").textContent = "Votre message a été envoyé avec succès !";
});

// Ajout de la gestion du menu burger
document.addEventListener("DOMContentLoaded", function() {
    const burgerMenu = document.getElementById("burger-menu");
    const nav = document.getElementById("main-nav");

    if (burgerMenu && nav) {
        burgerMenu.addEventListener("click", function() {
            nav.classList.toggle("active");
        });
    }
});
// US2 : Sécuriser l’authentification des utilisateurs
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // Vérification du format des champs
    if (!/^[a-zA-Z\s]+$/.test(name)) {
        alert("Le nom ne doit contenir que des lettres.");
        return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        alert("Adresse e-mail invalide !");
        return;
    }

    // Empêcher les attaques XSS
    function escapeHTML(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    const safeMessage = escapeHTML(message);

    // Envoi sécurisé
    const mailtoLink = `mailto:tonemail@example.com?subject=Message de ${name}&body=${encodeURIComponent(safeMessage)}%0A%0ADe : ${name} (${email})`;
    window.location.href = mailtoLink;

    document.getElementById("formMessage").textContent = "Votre message a été envoyé avec succès !";
});
// Générer un token CSRF aléatoire et l'ajouter au formulaire
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("csrfToken").value = Math.random().toString(36).substring(2);
});
// US5 : Journaliser les accès au site
let loginAttempts = 0;

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    if (loginAttempts >= 3) {
        alert("Trop de tentatives ! Réessayez plus tard.");
        return;
    }

    loginAttempts++;
    setTimeout(() => {
        loginAttempts = 0;
    }, 30000);
});
// Vérification du token CSRF et validation du formulaire
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page

    const csrfToken = document.getElementById("csrfToken").value;
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!csrfToken) {
        alert("Erreur CSRF : Token manquant !");
        return;
    }

    if (!name || !email || !message) {
        alert("Tous les champs sont obligatoires !");
        return;
    }

    function escapeHTML(str) {
        return str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }
    const safeMessage = escapeHTML(message);

    console.log("Token CSRF : " + csrfToken);
    console.log("Nom : " + name);
    console.log("Email : " + email);
    console.log("Message : " + safeMessage);

    document.getElementById("formMessage").textContent = "Votre message a été envoyé avec succès !";
});

// Modifier ton formulaire pour envoyer les données vers l’API
document.getElementById("contactForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
        alert("Tous les champs sont obligatoires !");
        return;
    }

    try {
        const response = await fetch("/api/saveMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, message }),
        });

        const result = await response.json();

        if (response.ok) {
            document.getElementById("formMessage").textContent = "Votre message a été enregistré avec succès !";
        } else {
            alert("Erreur : " + result.error);
        }

    } catch (error) {
        alert("Une erreur est survenue. Veuillez réessayer.");
    }
});
