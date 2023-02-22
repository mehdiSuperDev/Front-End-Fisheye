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

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const photographers = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
