export class PhotographerService {
    async getPhotographers() {
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
}