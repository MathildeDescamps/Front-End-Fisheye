//Html card is created for each photographer, to display their informations
function photographerFactory(data) {

    let { name, portrait, city, country, tagline, price, id } = data;

    let picture = `assets/photographers/${portrait}`;

    //Photographer's card creation
    function getUserCardDOM() {
        let link = document.createElement('a');
        let url = new URL(document.location.origin + '/photographer.html');
        url.searchParams.append("id", id);
        let linkUrl = url.href;
        link.setAttribute("href", linkUrl);
        let article = document.createElement( 'article' );
        let img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", 'Photo de ' + name);
        let h2 = document.createElement( 'h2' );
        h2.textContent = name;
        let paragraph1 = document.createElement('p');
        paragraph1.textContent = city + ',' + country;
        paragraph1.classList.add('location');
        let paragraph2 = document.createElement('p');
        paragraph2.textContent = tagline;
        paragraph2.classList.add('tagline');
        let paragraph3 = document.createElement('p');
        paragraph3.textContent = price + '€/jour';
        paragraph3.classList.add('price');
        link.appendChild(img);
        link.appendChild(h2);
        article.appendChild(link);
        article.appendChild(paragraph1);
        article.appendChild(paragraph2);
        article.appendChild(paragraph3);
        return (article);
    }

    //Photographer's card creation
    function getPhotographerPresentationDOM() {

        let photographerHeader = document.querySelector(".photographer-header");
        let headerLeft = document.createElement("div");
        headerLeft.setAttribute("class", "header-left");
        headerLeft.innerHTML = `
            <h2>${name}</h2>
            <p class="location">${city}, ${country}</p>
            <p class="tagline">${tagline}</p>
        `;
        let img = document.createElement( 'img' );
        img.setAttribute("src", picture);
        img.setAttribute("alt", 'Photo de ' + name);
        photographerHeader.appendChild(headerLeft);
        photographerHeader.appendChild(img);

        return (photographerHeader)
    }

    //We return the infos and the function, to be able to use them in pages/index.js
    return { name, picture, city, country, tagline, price, id, getUserCardDOM, getPhotographerPresentationDOM }
}
export default photographerFactory;