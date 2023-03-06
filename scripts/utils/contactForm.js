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


//Titre Modal Dynamique
const modal_title = document.querySelector("header h2");
modal_title.textContent = 'Contactez-moi NOM PRENOM';