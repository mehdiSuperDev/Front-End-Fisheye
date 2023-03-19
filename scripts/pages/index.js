import { getPhotographers } from './dataManager.js';
import { photographerFactory } from '../factories/photographer.js'

function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

async function init() {
    const photographers = await getPhotographers();

    displayData(photographers);
};

init();

