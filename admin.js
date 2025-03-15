const ADMIN_PASSWORD = "Password123"; 

// Vérifier si l'administrateur est déjà connecté
window.onload = function () {
    if (localStorage.getItem("isAdmin") === "true") {
        showAdminPanel();
    }
};

// Fonction pour vérifier le mot de passe
function checkPassword() {
    const inputPassword = document.getElementById("password").value;
    
    if (inputPassword === ADMIN_PASSWORD) {
        localStorage.setItem("isAdmin", "true"); // Stocker la session
        showAdminPanel();
    } else {
        document.getElementById("error-message").style.display = "block";
    }
}

// Afficher le panneau admin et masquer le formulaire de connexion
function showAdminPanel() {
    document.getElementById("login-form").style.display = "none";
    document.getElementById("admin-content").style.display = "block";
}

// Déconnexion (supprimer la session)
function logout() {
    localStorage.removeItem("isAdmin");
    location.reload(); // Recharger la page
}
