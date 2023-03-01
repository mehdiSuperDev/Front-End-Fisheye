//Mettre le code JavaScript lié à la page photographer.html

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

async function fillHeader(photographer) {
    const name = document.querySelector(".photograph-header h2");
    name.textContent = photographer.name;

    const localisation = document.querySelector(".photograph-header p:first-of-type");
    localisation.textContent = `${photographer.country}, ${photographer.city}`;

    const quote = document.querySelector(".photograph-header p:last-of-type");
    quote.textContent = photographer.tagline;

    const img = document.querySelector(".photograph-header img");
    const picture = `assets/photographers/${photographer.portrait}`;
    img.setAttribute("src", picture);
}

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
};

init();