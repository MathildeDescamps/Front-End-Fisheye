/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
import data from "../../data/photographers.js";
import photographerFactory from "../factories/photographer.js";
import mediaFactory from "../factories/media.js";

let currentPhotographer;
const photographerMedias = [];

// Find clicked photographer's infos
async function getPhotographerData() {
    const currentUrl = new URL(document.location.href);
    const id = currentUrl.searchParams.get("id");

    data.photographers.forEach((photographer) => {
        if (photographer.id == id) {
            currentPhotographer = photographer;
        }
    });

    return currentPhotographer;
 }

// Get photographer's medias
export function getMedias() {
    if (document.querySelector("body#photographer-page")) {
        data.media.forEach((media) => {
            if ((media.photographerId === currentPhotographer.id) && (!photographerMedias.includes(media))) {
                photographerMedias.push(media);
            }
        });
        return photographerMedias;
    }
}

// Data displaying
async function displayData(photographer) {
    const photographerModel = await photographerFactory(photographer);
    photographerModel.getPhotographerPresentationDOM();
    photographerModel.getPhotographerTotalLikes();
    photographerMedias.sort(function(a, b) {
        if (a.likes > b.likes) {
            return -1;
        } else return 1;
    });
    photographerMedias.forEach((media) => {
        mediaFactory(media);
    });
};

async function init() {
    const photographer = await getPhotographerData();
    await getMedias(photographer);
    await displayData(photographer);
    handleLikes();
};
init();

/* GESTION DE LIKE */
function handleLikes() {
    const likeButtons = document.querySelectorAll(".likes-icon");
    likeButtons.forEach((likeBtn) => {
        let isLiked = false;
        likeBtn.addEventListener("click", function() {
            if (isLiked === false) {
                let totalLikes = parseInt(document.querySelector(".corner-insert .likes-wrapper .likes").innerText);
                totalLikes = totalLikes + 1;
                document.querySelector(".corner-insert .likes-wrapper .likes").innerHTML = `
                    ${totalLikes}
                `;
                const currentLikes = likeBtn.parentElement.getElementsByClassName('likes-nb')[0];
                currentLikes.innerText = parseInt(currentLikes.innerText) + 1;
                isLiked = true;
            } else if (isLiked === true) {
                let totalLikes = parseInt(document.querySelector(".corner-insert .likes-wrapper .likes").innerText);
                if (totalLikes > 0) {
                    totalLikes = totalLikes - 1;
                    document.querySelector(".corner-insert .likes-wrapper .likes").innerHTML = `
                        ${totalLikes}
                    `;
                    const currentLikes = likeBtn.parentElement.getElementsByClassName('likes-nb')[0];
                    if (parseInt(currentLikes.innerText) > 0) {
                        currentLikes.innerText = parseInt(currentLikes.innerText) - 1;
                    }
                    isLiked = false;
                }
            }
        });
        document.addEventListener('keypress', function(e) {
            if (likeBtn === document.activeElement) {
                if (e.key === 'Enter') {
                    if (isLiked === false) {
                        let totalLikes = parseInt(document.querySelector(".corner-insert .likes-wrapper .likes").innerText);
                        totalLikes = totalLikes + 1;
                        document.querySelector(".corner-insert .likes-wrapper .likes").innerHTML = `
                            ${totalLikes}
                        `;
                        const currentLikes = likeBtn.parentElement.getElementsByClassName('likes-nb')[0];
                        currentLikes.innerText = parseInt(currentLikes.innerText) + 1;
                        isLiked = true;
                    } else if (isLiked === true) {
                        let totalLikes = parseInt(document.querySelector(".corner-insert .likes-wrapper .likes").innerText);
                        if (totalLikes > 0) {
                            totalLikes = totalLikes - 1;
                            document.querySelector(".corner-insert .likes-wrapper .likes").innerHTML = `
                                ${totalLikes}
                            `;
                            const currentLikes = likeBtn.parentElement.getElementsByClassName('likes-nb')[0];
                            if (parseInt(currentLikes.innerText) > 0) {
                                currentLikes.innerText = parseInt(currentLikes.innerText) - 1;
                            }
                            isLiked = false;
                        }
                    }
                }
            }
        });
    });
}

/* FILTER */
const filter = document.getElementById('filter');
if (filter) {
    filter.addEventListener('change', function() {
    const realisations = document.querySelector(".photographer-realisations");
    realisations.innerHTML = "";
    if (this.value === "likes") {
        photographerMedias.sort(function(a, b) {
            if (a.likes > b.likes) {
                return -1;
            } else return 1;
        });
    } else if (this.value === "date") {
        photographerMedias.sort(function(a, b) {
            return new Date(b.date) - new Date(a.date);
        });
    } else if (this.value === "title") {
        photographerMedias.sort(function(a, b) {
            if (a.title < b.title) {
                return -1;
            } else if (a.title > b.title) {
                return 1;
            }
        });
    }
    photographerMedias.forEach((media) => {
        mediaFactory(media);
    });
    handleLikes();
});
}
