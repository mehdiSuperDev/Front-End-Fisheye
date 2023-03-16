export function initContactForm(name) {
    const modal_title = document.querySelector("header h2");
    modal_title.textContent = `Contactez-moi ${name}`;
}

const body = document.querySelector("body");
const form = document.querySelector("form");

form.addEventListener("submit", function(event) {
    event.preventDefault();
})

function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
    body.style.overflow = "hidden";
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";

    body.style.overflow = "auto";
}

// Fonction pour récupérer les valeurs des champs et les afficher dans la console
function handleFormSubmit(event) {
    event.preventDefault();
  
    const prenom = document.getElementById("surname").value;
    const nom = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
  
    console.log("Prénom:", prenom);
    console.log("Nom:", nom);
    console.log("Email:", email);
    console.log("Message:", message);

    closeModal();
}

function setupEventListeners() {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
    });
  
    // Ajout d'un gestionnaire d'événements pour le bouton d'envoi
    document.querySelector(".send_button").addEventListener("click", handleFormSubmit);
  
    // Ajout d'un gestionnaire d'événements pour le bouton "Contactez-moi"
    document.querySelector(".contact_button").addEventListener("click", displayModal);

    // Ajout d'un gestionnaire d'événements pour la croix de la modale
    document.querySelector(".modal img").addEventListener("click", closeModal);
}
  
// Exécutez la fonction setupEventListeners lorsque le DOM est complètement chargé
document.addEventListener("DOMContentLoaded", setupEventListeners);