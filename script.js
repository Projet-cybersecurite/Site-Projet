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

