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
