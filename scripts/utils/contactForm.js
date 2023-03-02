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
