import data from "../../data/photographers.js";
import photographerFactory from "../factories/photographer.js";
import mediaFactory from "../factories/media.js";

let currentPhotographer;
let photographerMedias = [];

//Find clicked photographer's infos
 async function getPhotographerData() {

    let currentUrl = new URL(document.location.href);
    let id = currentUrl.searchParams.get("id");

    data.photographers.forEach(photographer => {
        if(photographer.id == id) {
            currentPhotographer = photographer;
        }
    });

    return currentPhotographer;

 }

//Get photographer's medias
export async function getMedias(){

    data.media.forEach((media) => {
        if((media.photographerId === currentPhotographer.id) && (!photographerMedias.includes(media))) {
            photographerMedias.push(media);
        }
    })
    return photographerMedias;

}

//Data displaying
async function displayData(photographer) {
    let photographerModel = photographerFactory(photographer);
    photographerModel.getPhotographerPresentationDOM();
    //Pour chaque média ayant photographerId == id, on appelle mediaFactory.
    photographerMedias.forEach(media => {
        mediaFactory(media); 
    });
};

async function init() {
    let photographer = await getPhotographerData();
    await getMedias(photographer);
    displayData(photographer);
};

init();