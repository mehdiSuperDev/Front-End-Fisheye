//Mettre le code JavaScript lié à la page photographer.html

// JSON
// "id": 75902334,
// "photographerId": 82,
// "title": "Art Mine",
// "image": "Art_Mine.jpg",
// "likes": 75,
// "date": "2019-11-25",
// "price": 55

//Foncitons liées à la lightbox
let mediaElements = [];

function displayMediaElementsArray() {
    mediaElements.forEach(m => console.dir(m));
}

//Doublon avec méthodes contactForm.js


var slideIndex = 0;
function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("slide");
    // console.log(`slides: ${slides.length}`);
    if (n > slides.length) { slideIndex = 0 };
    for(i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
}

function createSlides() {
    for (const element of mediaElements) {
        const div = document.createElement("div");
        div.onclick = function() {
            "clicked !!!";
        };
        div.classList.add("slide");

        div.style.width = "100%";
        div.style.height = "100%";

        //Ajouter element a div
        element.style.objectFit = "cover";
        element.style.width = "100%";
        element.style.maxWidth = "100%";
        element.style.height = "100%";
        div.appendChild(element);

        const lightboxContent = document.querySelector(".lightbox-content");
        console.dir(`LBC: ${lightboxContent}`);
        lightboxContent.appendChild(div);
    }
}

function openLightboxModal() {
    console.log(`slideIndex: ${slideIndex}`);
    // showSlides(slideIndex);

    const body = document.querySelector("body");
    document.getElementById("lightbox").style.display = "flex";
    body.style.overflow = "hidden";



    //test
    // displayMediaElementsArray();
}

function closeLightboxModal() {
    console.log("closeModal clicked");

    const body = document.querySelector("body");
    document.getElementById("lightbox").style.display = "none";
    body.style.overflow = "auto";
}

//END Foncitons liées à la lightbox


// Comment utiliser la fonction du index.js directemment ?
async function getPhotographers() {
    //Récupération des données depuis le json et affichage dans la console.
    return fetch('data/photographers.json')
        .then(response => response.json())
        .then(data => {
            const photographers = data.photographers;
            console.log(`Photograhers: ${JSON.stringify(photographers)}`)
            return photographers
        })
        .catch(error => console.log(error));
}


//Erreur d'exécution
// import { PhotographerService } from "./photographerService.js";
// import PhotographerService from './photographerService.js';

async function getMedias(photographerId) {
    return fetch('data/photographers.json')
        .then(response => response.json())
        .then(data => {
            const medias = data.media;
            
            // console.dir(`medias: ${medias}`);
            medias.forEach(m => console.dir(m));


            return medias.filter(element => element.photographerId == photographerId);
        })
        .catch(error => console.log(error));
}

async function fillHeader(photographer) {
    const name = document.querySelector(".photograph-header h2");
    name.textContent = photographer.name;

    const localisation = document.querySelector(".photograph-header p:first-of-type");
    localisation.textContent = `${photographer.country}, ${photographer.city}`;

    const quote = document.querySelector(".photograph-header p:last-of-type");
    quote.textContent = photographer.tagline;

    const img = document.querySelector(".photograph-header img");
    img.setAttribute("alt", photographer.name);
    img.setAttribute("role", "img");

    const picture = `assets/photographers/${photographer.portrait}`;
    img.setAttribute("src", picture);
}


function mediaFactory(data) {
    const {
        title,
        image,
        video,
        likes,
    } = data;

    function getMediaElement() {
        if (image != undefined) {
            const img = document.createElement("img");
            img.setAttribute("src", `assets/images/${image}`);
            img.setAttribute("alt", title);
            img.setAttribute("role", "img");

            mediaElements.push(img.cloneNode(true));
            //recuperer l'index du dernier element
            const lastIndex = mediaElements.length - 1;

            img.addEventListener('click', function(event) {
                console.log("click on image");
                // slideIndex = lastIndex;
                currentSlide(lastIndex);
                openLightboxModal();
            });

            return img;
        } else {
            // créer l'élément video
            const video_e = document.createElement('video');

            mediaElements.push(video_e.cloneNode(true));
            const lastIndex = mediaElements.length - 1;

            video_e.addEventListener('click', function(event) {
                console.log("video on image");
                currentSlide(lastIndex);
                openLightboxModal();
            });

            console.dir(`video: ${video}`);

            video_e.setAttribute("src", `assets/images/${video}`);
            video_e.controls = true;

            // ajouter la source mp4
            const sourceMp4 = document.createElement('source');
            sourceMp4.type = 'video/mp4';
            video_e.appendChild(sourceMp4);

            // ajouter le message d'erreur
            const errorMessage = document.createTextNode('Your browser does not support HTML video.');
            video_e.appendChild(errorMessage);

            return video_e;
        }
    }

    function getMediaCardDOM() {
        const userCardDOM = document.createElement("article");
        userCardDOM.setAttribute("tabindex", 0);
        userCardDOM.setAttribute("aria-label", `${title}`);
        userCardDOM.setAttribute("title", "title");

        // recuperer element renvoyer par la fonction getMediaElement
        const mediaElement = getMediaElement();

        const sectionFooter = document.createElement("div");
        sectionFooter.setAttribute("class", "medias_section__footer");

        const p_title = document.createElement("p");
        p_title.textContent = title;

        const b_likes = document.createElement("button");
        b_likes.textContent = `${likes} ❤️`;

        b_likes.addEventListener('click', () => {
            b_likes.textContent = `${likes + 1} ❤️`;
        })

        sectionFooter.appendChild(p_title);
        sectionFooter.appendChild(b_likes);

        userCardDOM.appendChild(mediaElement);
        userCardDOM.appendChild(sectionFooter);

        return userCardDOM;
    }
    return { getMediaCardDOM };
}

async function displayMedias(medias) {
    const mediasSection = document.querySelector(".medias_section");

    console.log(`mediaSection: ${mediasSection}`);

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDom = mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDom);
    });
};

async function init() {
    const photographers = await getPhotographers();
    // let photographerService = new PhotographerService();
    // const photographers = await photographerService.getPhotographers();

    //Récupérer l'id en paramètre
    const params = new URLSearchParams(window.location.search);
    const id = params.get("photographerId");

    console.log(`id: ${id}`);

    const isCurrentId = (element) => element.id == id;

    const index = photographers.findIndex(isCurrentId);

    console.log(`index: ${index}`);
    console.log(`name photographer: ${photographers[index].name}`);

    fillHeader(photographers[index]);

    const medias = await getMedias(photographers[index].id);

    console.log(`medias: ${medias}`);

    displayMedias(medias);

    //Ajout slide
    createSlides();
    // showSlides(2);

    // displayMediaElementsArray();
};

init();