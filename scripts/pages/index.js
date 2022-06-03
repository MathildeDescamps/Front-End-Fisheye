import data from "../../data/photographers.js";
import photographerFactory from "../factories/photographer.js";

//Data fetching
async function getPhotographers() {
    let photographers = data.photographers;
    return ({
        photographers: [...photographers]
    })
}

//Data displaying
async function displayData(photographers) {
    let photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        let photographerModel = photographerFactory(photographer);
        let userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    let { photographers } = await getPhotographers();
    displayData(photographers);
};

init();