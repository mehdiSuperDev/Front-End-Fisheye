//Mettre le code JavaScript lié à la page photographer.html

// JSON
// "id": 75902334,
// "photographerId": 82,
// "title": "Art Mine",
// "image": "Art_Mine.jpg",
// "likes": 75,
// "date": "2019-11-25",
// "price": 55

//Comment utiliser la fonction du index.js directemment ?
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
//

async function getMedias(photographerId) {
    return fetch('data/photographers.json')
        .then(response => response.json())
        .then(data => {
            const medias = data.media;
            console.log(`medias: ${medias}`);

            const p = medias.filter(element => element.photographerId == photographerId);
            console.log(`p: ${p}`);

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
        id,
        photographerId,
        title,
        image,
        video,
        likes,
        date,
        price
    } = data;

    function getMediaElement() {
        if (image != undefined) {
            const img = document.createElement("img");
            img.setAttribute("src", `assets/images/${image}`);
            img.setAttribute("alt", title);
            img.setAttribute("role", "img");

            return img;
        } else {
            const video = document.createElement("video");
            video.setAttribute("src", `assets/images/${video}`);
            video.setAttribute("controls", "controls");
            video.setAttribute("autoplay", "autoplay");
            video.setAttribute("loop", "loop");
            video.setAttribute("muted", "muted");
            video.setAttribute("playsinline", "playsinline");

            return video;
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
        
        const p_likes = document.createElement("p");
        p_likes.textContent = `${likes} ♥️`;

        sectionFooter.appendChild(p_title);
        sectionFooter.appendChild(p_likes);

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
};

init();