function photographerFactory(data) {
    const { 
        name,
        city,
        country, 
        portrait,
        tagline,
        price
    } = data;

    console.log(`photographerFactory: {data}`);

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture);

        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);

        //Créer la localisation
        const p_localisation = document.createElement('p');
        p_localisation.textContent = `${country}, ${city}`;
        article.appendChild(p_localisation);

        //Créer la citation (tagline)
        const p_tagline = document.createElement('p');
        p_tagline.textContent = tagline;
        article.appendChild(p_tagline);

        //Créer le TJM (price)
        const p_price = document.createElement('p');
        p_price.textContent = `${price}€/jour`;
        article.appendChild(p_price);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}