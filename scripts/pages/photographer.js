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
};

init();