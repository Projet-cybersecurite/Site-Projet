/* Style général */
body {
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    font-family: Arial, sans-serif; 
    color: #333;
    transition: background-color 0.5s ease; /* Transition pour le changement de fond */
}

/* Bannière avec dégradé */
.banner {
    background: linear-gradient(135deg, #6a5acd, #4a90e2);
    color: white;
    padding: 50px 20px;
    text-align: center;
    position: relative;
    animation: fadeInDown 1s ease-out;
    
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.banner h1 {
    font-size: 3em;
    margin: 0;
}

.banner p {
    font-size: 1.5em;
    margin: 10px 0 0;
}

/* Icônes */
.icon-large {
    font-size: 4em;
    margin-top: 20px;
    color: #ffdd57;
    transition: transform 0.5s ease; /* Transition pour la rotation */
}

.icon-large:hover {
    transform: rotate(360deg); /* Rotation au survol */
}

.icon-medium {
    font-size: 2.5em;
    margin: 20px 0;
    color: #4a90e2;
}

.icon-small {
    font-size: 1em;
    margin-left: 10px;
    color: #4a90e2;
}

/* Navigation */
.main-nav {
    text-align: center;
    background-color: #333;
    padding: 10px 0;
}

.main-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.main-nav li {
    display: inline;
    margin: 0 15px;
}

.main-nav a {
    color: white;
    text-decoration: none;
    font-size: 1.2em;
    transition: color 0.3s ease, transform 0.3s ease;
}

.main-nav a:hover {
    color: #4a90e2;
    transform: translateY(-3px);
}

/* Section de bienvenue */
.welcome-section {
    text-align: center;
    padding: 20px;
    opacity: 0; /* Initialement invisible */
    transform: translateY(20px); /* Décalage initial */
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.welcome-section h2 {
    font-size: 2em;
    color: #333;
}

.welcome-section p {
    font-size: 1.2em;
    color: #555;
}

.highlight {
    color: #6a5acd;
    font-weight: bold;
}

/* Section principale */
.main-content {
    padding: 20px;
    text-align: center;
    opacity: 0; /* Initialement invisible */
    transform: translateY(20px); /* Décalage initial */
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.main-content p {
    font-size: 1.1em;
    color: #333;
    line-height: 1.8;
    margin-bottom: 20px;
}

/* Section image */
.image-section {
    text-align: center;
    padding: 5px;
    opacity: 0; /* Initialement invisible */
    transform: translateY(20px); /* Décalage initial */
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.image-section img {
    max-width: 70%;
    height: 200px;
    border-radius: 10px;
}

/* Section des membres de l'équipe (dans Portfolio) */
.team-section {
    padding: 20px;
    text-align: center;
    opacity: 0; /* Initialement invisible */
    transform: translateY(20px); /* Décalage initial */
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.team-section h2 {
    font-size: 2em;
    color: #333;
    margin-bottom: 30px;
}

.team-member {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px auto;
    max-width: 600px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.team-member:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.team-member h3 {
    font-size: 1.5em;
    color: #4a90e2;
}

.team-member p {
    font-size: 1.1em;
    color: #555;
}

.team-member img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
    margin-top: 15px;
}

/* Section CV */
.cv-section {
    padding: 20px;
    text-align: left;
    max-width: 800px;
    margin: 0 auto;
    opacity: 0; /* Initialement invisible */
    transform: translateY(20px); /* Décalage initial */
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.cv-section h2 {
    font-size: 2.5em;
    color: #4a90e2;
    text-align: center;
    margin-bottom: 20px;
}

.cv-intro {
    font-size: 1.1em;
    color: #555;
    text-align: center;
    margin-bottom: 30px;
}

.cv-block {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin-bottom: 30px;
}

.cv-block h3 {
    font-size: 1.8em;
    color: #4a90e2;
    margin-bottom: 15px;
}

.cv-block ul {
    list-style-type: disc;
    margin-left: 20px;
}

.cv-block li {
    font-size: 1.1em;
    color: black;
    margin-bottom: 10px;
}

.cv-block a {
    color: #4a90e2;
    text-decoration: none;
}

.cv-block a:hover {
    text-decoration: underline;
}

.cv-block i {
    margin-right: 10px;
    color: #4a90e2;
}

/* Partie de contact */
.contact-section {
    padding: 20px;
    text-align: center;
    opacity: 0; /* Initialement invisible */
    transform: translateY(20px); /* Décalage initial */
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}

.contact-section h2 {
    font-size: 2em;
    color: #333;
    margin-bottom: 30px;
}

.contact-member {
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px auto;
    max-width: 600px;
    text-align: left;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.contact-member:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.contact-member h3 {
    font-size: 1.5em;
    color: #4a90e2;
    margin-bottom: 15px;
}

.contact-member p {
    font-size: 1.1em;
    color: #555;
    margin: 10px 0;
}

.contact-member a {
    color: #4a90e2;
    text-decoration: none;
}

.contact-member a:hover {
    text-decoration: underline;
}

.contact-member i {
    margin-right: 10px;
    color: #4a90e2;
}

/* Footer avec lien externe */
.external-link {
    text-align: center;
    padding: 20px;
    background-color: #333;
    color: white;
}

.external-link a {
    color: #4a90e2;
    text-decoration: none;
    font-size: 1.2em;
}

.external-link a:hover {
    text-decoration: underline;
}

/* Bouton Retour en haut */
#back-to-top {
    display: none;
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #4a90e2;
    color: white;
    border: none;
    border-radius: 50%;
    padding: 10px 15px;
    font-size: 1.5em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

#back-to-top:hover {
    background-color: #6a5acd;
}

/* Responsive Design */
@media (max-width: 768px) {
    .banner h1 {
        font-size: 2em;
    }

    .banner p {
        font-size: 1.2em;
    }

    .main-nav li {
        display: block;
        margin: 10px 0;
    }

    .team-member, .contact-member {
        padding: 15px;
        margin: 15px auto;
    }

    iframe {
        width: 100%;
        height: auto;
    }
}

/* Galerie Portfolio avec carrousels */
.portfolio-gallery {
    padding: 20px;
    text-align: center;
}

.portfolio-gallery h2 {
    font-size: 2em;
    color: #4a90e2;
    margin-bottom: 30px;
}

.carousel {
    margin-bottom: 40px;
}

.carousel h3 {
    font-size: 1.8em;
    color: #6a5acd;
    margin-bottom: 20px;
}

.carousel-container {
    position: relative;
    max-width: 800px;
    margin: 0 auto;
    overflow: hidden;
}

.slides {
    display: flex;
    transition: transform 0.5s ease;
}

.slide {
    min-width: 100%;
    box-sizing: border-box;
    padding: 20px;
    text-align: center;
    display: none; /* Masqué par défaut */
}

.slide.active {
    display: block; /* Affiche la diapositive active */
}

.slide h4 {
    font-size: 1.5em;
    color: #4a90e2;
    margin-bottom: 20px;
}

.slide iframe {
    width: 100%;
    height: 315px;
    border-radius: 10px;
    margin-bottom: 20px;
}

.slide p {
    font-size: 1em;
    color: #555;
}

/* Flèches de navigation */
.carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px;
    font-size: 2em;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.carousel-arrow:hover {
    background-color: rgba(0, 0, 0, 0.8);
}

.left-arrow {
    left: 10px;
}

.right-arrow {
    right: 10px;
}
