/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
import data from "../../data/photographers.js";
import photographerFactory from "../factories/photographer.js";

// Data fetching
function getPhotographers() {
    const photographers = data.photographers;
    return ({
        photographers: [...photographers],
    });
}

// Data displaying
function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");
    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    const {photographers} = await getPhotographers();
    displayData(photographers);
};

init();
