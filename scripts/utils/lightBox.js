import { getMedias } from "../pages/photographer.js";

//DOM
let lightboxContainer = document.querySelector(".lightbox-container");
let closeBtn = document.querySelector(".lightbox-container .close");
let nextArrow = document.querySelector(".lightbox-container .controls .right");
let prevArrow = document.querySelector(".lightbox-container .controls .left");
let lightboxWrapper = document.querySelector(".lightbox-container .wrapper");

let medias = [];
let media;

export async function openLightbox(id, photographerId, title, clickedMedia) {

    //On récupère les médias du photographe
    medias = await getMedias(photographerId);

    //On récupère le média qui a été cliqué
    media = medias.find(media => media.id === id);

    //On récupère l'index du média cliqué dans le tableau des médias
    let index = medias.indexOf(media);

    //On affiche la photo/vidéo cliquée
    if(clickedMedia.includes('.mp4')) {
        lightboxWrapper.innerHTML = `
            <video class="video" id="${id}" controls>
                <source src="assets/medias/${clickedMedia}" type="video/mp4" >
            </video>
            <p class="title" >${title}</p>
        `;
    } else {
        lightboxWrapper.innerHTML = `
            <div class="image" id="${id}"  style="background: url('assets/medias/${clickedMedia}')"></div>
            <p class="title" >${title}</p>
        `;
    }

    //On ouvre la lightbox
    lightboxContainer.style.display = "flex";  

    //Naviguer dans la lightbox avec les flèches du clavier
    document.addEventListener('keydown', function(event) {
        if(lightboxContainer.style.display === "flex") {
            switch (event.key) {
                case "ArrowLeft":
                    showPrevMedia();
                break;
                case "ArrowRight":
                    showNextMedia();
                break;
                case "Escape":
                    lightboxContainer.style.display = "none";
                break;
            }
        }
    });

    //Au click sur la croix, on faire la lightbox
    closeBtn.addEventListener("click", function() {
        if(lightboxContainer.style.display === "flex") {
            lightboxContainer.style.display = "none";
        }
    })

}

async function showNextMedia() {
    let index = medias.indexOf(media);

    if(index === (medias.length -1)) {
        index = -1;
    }

    if(medias[index + 1].image) {   
        lightboxWrapper.innerHTML = `
            <div class="image" id="${medias[index + 1].id}" style="background: url('assets/medias/${medias[index + 1].image}')"></div>
            <p class="title" >${medias[index + 1].title}</p>
        `;
    } else if (medias[index + 1 ].video) {
        lightboxWrapper.innerHTML = `
            <video class="video" id="${medias[index + 1].id}" controls>
                <source src="assets/medias/${medias[index + 1].video}" type="video/mp4" >
            </video>
            <p class="title" >${medias[index + 1].title}</p>
        `;
    }
    media = medias[index + 1];
}

async function showPrevMedia() {

    let index = medias.indexOf(media);

    if(index - 1 === -1) {
        index = medias.length;
    }
    if(medias[index - 1].image) {   
        lightboxWrapper.innerHTML = `
            <div class="image" id="${medias[index - 1].id}" style="background: url('assets/medias/${medias[index - 1].image}')"></div>
            <p class="title" >${medias[index - 1].title}</p>
        `;
    } else if (medias[index - 1 ].video) {
        lightboxWrapper.innerHTML = `
            <video class="video" id="${medias[index - 1].id}" controls>
                <source src="assets/medias/${medias[index - 1].video}" type="video/mp4" >
            </video>
            <p class="title" >${medias[index - 1].title}</p>
        `;
    }
    media = medias[index - 1];

}

//Au click sur la flèche de droite
if(nextArrow) {
    nextArrow.addEventListener("click", showNextMedia);
}
//Au click sur la flèche de gauche
if(prevArrow) {
    prevArrow.addEventListener("click", showPrevMedia);
}