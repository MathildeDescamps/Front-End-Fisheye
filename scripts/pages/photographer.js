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
export async function getMedias(photographer){

    data.media.forEach((media) => {
        if(media.photographerId === currentPhotographer.id) {
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
        let realisationModel = mediaFactory(media); 
    });
};

async function init() {
    let photographer = await getPhotographerData();
    let medias = await getMedias(photographer);
    displayData(photographer);
};

init();