export function photographerFactory(data) {
    const {
        name,
        city,
        country,
        portrait,
        tagline,
        price,
        id
    } = data;

    console.log("photographerFactory: {data}");

    const picture = `assets/photographers/${portrait}`;

    function urlFactory(id) {
        let url = new URL("photographer.html", window.location.href);
        let params = new URLSearchParams(url.search);

        params.set("photographerId", id);
        url.search = params.toString();

        console.log(`url: ${url.toString()}`);

        return url.toString();
    }

    function getUserCardDOM() {
        const article = document.createElement("article");


        //Création lien vers page photographe
        const link = document.createElement("a");
        link.setAttribute("href", urlFactory(id));

        link.setAttribute("tabindex", 0);
        //description TA
        link.setAttribute("aria-label", `Accèdez à la page du photographe ${name}`);
        //info bulle
        link.setAttribute("title", name);

        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", "");
        img.setAttribute("role", "img");

        const h2 = document.createElement("h2");
        h2.textContent = name;

        //Créer img/h2 cliquable
        link.appendChild(img);
        link.appendChild(h2);

        article.appendChild(link);

        //Créer la localisation
        const p_localisation = document.createElement("p");
        p_localisation.textContent = `${country}, ${city}`;
        article.appendChild(p_localisation);

        //Créer la citation (tagline)
        const p_tagline = document.createElement("p");
        p_tagline.textContent = tagline;
        article.appendChild(p_tagline);

        //Créer le TJM (price)
        const p_price = document.createElement("p");
        p_price.textContent = `${price}€/jour`;
        article.appendChild(p_price);

        return (article);
    }
    return { name, picture, getUserCardDOM };
}