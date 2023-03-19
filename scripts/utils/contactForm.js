let previousActiveElementContact;

export function initContactForm(name) {
    const modal_title = document.querySelector("header h2");
    modal_title.textContent = `Contactez-moi ${name}`;
}

const body = document.querySelector("body");
const form = document.querySelector("form");
const contactModal = document.getElementById("contact_modal");

form.addEventListener("submit", function(event) {
    event.preventDefault();
})

function displayModal() {
    previousActiveElementContact = document.activeElement;

    contactModal.style.display = "block";
    body.style.overflow = "hidden";

    contactModal.querySelector("input").focus(); // Mettre le focus sur le premier champ du formulaire
}

function closeModal() {
    contactModal.style.display = "none";

    body.style.overflow = "auto";

    previousActiveElementContact.focus(); // Remettre le focus sur l'élément actif précédent
}

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

function handleEscapeKeyContact(event) {
    if (event.key === "Escape") {
        closeModal();
    }
}

function handleTabKeyContact(event) {
    if (event.key === "Tab") {
        const focusableElements = contactModal.querySelectorAll(
            'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'
        );
        const firstFocusableElement = focusableElements[0];
        const lastFocusableElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstFocusableElement) {
            event.preventDefault();
            lastFocusableElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
            event.preventDefault();
            firstFocusableElement.focus();
        }
    }
}

function setupEventListeners() {
    form.addEventListener("submit", function(event) {
      event.preventDefault();
    });
  
    document.querySelector(".send_button").addEventListener("click", handleFormSubmit);
  
    document.querySelector(".contact_button").addEventListener("click", displayModal);

    document.querySelector(".modal img").addEventListener("click", closeModal);

    contactModal.addEventListener("keydown", handleEscapeKeyContact); // Ajout d'un écouteur d'événements pour fermer la modale avec la touche Échap
    contactModal.addEventListener("keydown", handleTabKeyContact);
}
  
document.addEventListener("DOMContentLoaded", setupEventListeners);
