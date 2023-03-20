import { initContactForm } from "../utils/contactForm.js";
import { currentSlide, createSlides, openLightboxModal } from "./lightbox.js";
import { sortMedia, listenMenuEvent } from "./mediaSort.js";
import { getPhotographers, getMedias } from "./dataManager.js";

let mediaElements = [];

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

let totalLikesMedia = 0;

function fillMediaSectionInsert(medias) {
    const price = medias[0].price;

    let counter = 0;
    medias.forEach(function(media) {
        counter += media.likes;
    });
    totalLikesMedia = counter;

    const mediaSectionInsert = document.querySelector(".medias_section__insert");
    const likes = document.createElement("p");
    likes.classList.add("likesElement");
    likes.textContent = `${totalLikesMedia} 🖤`;

    const priceElement = document.createElement("p");
    priceElement.textContent = `${price}€/ jour`;

    mediaSectionInsert.appendChild(likes);
    mediaSectionInsert.appendChild(priceElement);
}

function mediaFactory(data) {
    const {
        title,
        image,
        video,
        likes,
        date,
    } = data;

    function mediaElementFactory() {
        if (image != undefined) {
            const img = document.createElement("img");
            img.setAttribute("src", `assets/images/${image}`);
            img.setAttribute("alt", `${title}`);
            img.setAttribute("role", "img");

            img.setAttribute("tabindex", 0);

            mediaElements.push(img.cloneNode(true));
            //recuperer l'index du dernier element
            const lastIndex = mediaElements.length - 1;

            img.addEventListener("click", function(event) {
                console.log("click on image");
                currentSlide(lastIndex);
                openLightboxModal();
            });

            return img;
        } else {
            // créer l'élément video
            const video_e = document.createElement("video");
            video_e.setAttribute("src", `assets/images/${video}`);
            video_e.setAttribute("alt", `${title}`);
            video_e.setAttribute("title", title);

            video_e.setAttribute("tabindex", 0);

            video_e.addEventListener("click", function(event) {
                console.log("video on image");
                currentSlide(lastIndex);
                openLightboxModal();
            });

            console.dir(`video: ${video}`);

            video_e.controls = true;

            // ajouter la source mp4
            const sourceMp4 = document.createElement("source");
            sourceMp4.type = "video/mp4";
            video_e.appendChild(sourceMp4);

            // ajouter le message d'erreur
            const errorMessage = document.createTextNode("Your browser does not support HTML video.");
            video_e.appendChild(errorMessage);

            mediaElements.push(video_e.cloneNode(true));
            const lastIndex = mediaElements.length - 1;

            return video_e;
        }
    }

    function getMediaCardDOM() {
        const userCardDOM = document.createElement("article");

        userCardDOM.setAttribute("tabindex", 0);
        userCardDOM.setAttribute("aria-label", `${title}`);

        userCardDOM.setAttribute("title", `${title}`);
        userCardDOM.setAttribute("date", date);
        userCardDOM.setAttribute("likes", likes);

        // recuperer element renvoyer par la fonction mediaElementFactory
        const mediaElement = mediaElementFactory();

        const sectionFooter = document.createElement("div");
        sectionFooter.setAttribute("class", "medias_section__footer");

        const p_title = document.createElement("p");
        p_title.textContent = title;

        const b_likes = document.createElement("button");
        b_likes.classList.add("button_like");
        b_likes.setAttribute("aria-label", "likes");
        b_likes.textContent = `${likes} ❤️`;

        let isLiked = false;
        b_likes.addEventListener("click", function() {
            if (!isLiked) {
                b_likes.textContent = `${likes + 1} ❤️`;
                totalLikesMedia++;
                document.querySelector(".likesElement").textContent = `${totalLikesMedia} ❤️`;
                isLiked = true;
            }
        });

        sectionFooter.appendChild(p_title);
        sectionFooter.appendChild(b_likes);

        userCardDOM.appendChild(mediaElement);
        userCardDOM.appendChild(sectionFooter);

        return userCardDOM;
    }
    return { getMediaCardDOM };
}

async function displayMedias(medias) {
    const mediasSection = document.querySelector(".medias_section__body");

    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const mediaCardDom = mediaModel.getMediaCardDOM();
        mediasSection.appendChild(mediaCardDom);
    });
};


async function init() {
    const photographers = await getPhotographers();

    // Récupérer l'id en paramètre
    const params = new URLSearchParams(window.location.search);
    const id = params.get("photographerId");

    const isCurrentId = (element) => element.id == id;

    const index = photographers.findIndex(isCurrentId);
    initContactForm(photographers[index].name);

    fillHeader(photographers[index]);

    const medias = await getMedias(photographers[index].id);

    sortMedia("popularité");

    displayMedias(medias);
    fillMediaSectionInsert(medias);

    listenMenuEvent();

    //Ajout slide pour la lightbox
    createSlides(mediaElements);
};

document.addEventListener("DOMContentLoaded", init);