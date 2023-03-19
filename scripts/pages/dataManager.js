export async function getPhotographers() {
    return fetch("data/photographers.json")
        .then(response => response.json())
        .then(data => {
            const photographers = data.photographers;
            return photographers;
        })
        .catch(error => console.log(error));
}

export async function getMedias(photographerId) {
    return fetch("data/photographers.json")
        .then(response => response.json())
        .then(data => {
            const medias = data.media;
            
            return medias.filter(element => element.photographerId == photographerId);
        })
        .catch(error => console.log(error));
}