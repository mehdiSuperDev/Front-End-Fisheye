var slideIndex = 0;

export function plusSlides(n) {
  showSlides(slideIndex += n);
}

export function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    if (n > slides.length - 1) { slideIndex = 0; };
    if (n < 0) { slideIndex = slides.length - 1; };
    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

function setCaptionText(text) {
    const caption = document.querySelector("#caption");
    caption.textContent = text;
}

function createCaptionContainer() {
    const captionContainer = document.createElement("div");
    captionContainer.classList.add("caption-container");
    return captionContainer;
}

export function createSlides(mediaElements) {
    for (const element of mediaElements) {
        const div = document.createElement("div");
        div.classList.add("slide");

        div.style.width = "100%";
        div.style.height = "100%";

        //Ajouter element a div
        element.style.objectFit = "cover";
        element.style.width = "100%";
        element.style.maxWidth = "1200px";
        element.style.height = "100%";

        const captionContainer = createCaptionContainer();
        const caption = document.createElement("p");
        caption.textContent = element.alt ?? element.title;
        captionContainer.appendChild(caption);

        div.appendChild(element);
        div.appendChild(captionContainer);

        const lightboxContent = document.querySelector(".lightbox-content");
        lightboxContent.appendChild(div);
    }
}

function listenLightboxEvent() {
    document.querySelector(".close.cursor").addEventListener("click", closeLightboxModal);
    document.querySelector(".prev").addEventListener("click", () => plusSlides(-1));
    document.querySelector(".next").addEventListener("click", () => plusSlides(1));
}

export function openLightboxModal() {
    const body = document.querySelector("body");
    document.getElementById("lightbox").style.display = "flex";
    body.style.overflow = "hidden";

    document.addEventListener("keydown", listenArrowKeys);

    listenLightboxEvent();
}

function closeLightboxModal() {
    console.log("closeModal clicked");

    const body = document.querySelector("body");
    document.getElementById("lightbox").style.display = "none";
    body.style.overflow = "auto";

    document.removeEventListener("keydown", listenArrowKeys);
}

function listenArrowKeys(event) {
    if (event.key === "ArrowLeft") {
        plusSlides(-1);
    } else if (event.key === "ArrowRight") {
        plusSlides(1);
    }
}