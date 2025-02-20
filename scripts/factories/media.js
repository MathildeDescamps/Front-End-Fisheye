/* eslint-disable brace-style */
/* eslint-disable keyword-spacing */
/* eslint-disable max-len */
/* eslint-disable prefer-const */
/* eslint-disable indent */
/* eslint-disable padded-blocks */
/* eslint-disable require-jsdoc */
/* eslint-disable quotes */
/* eslint-disable object-curly-spacing */
import { openLightbox } from "../utils/lightBox.js";

function mediaFactory(data) {

    let { id, photographerId, title, image, video, likes, date, price } = data;

    let realisationsSection = document.querySelector(".photographer-realisations");

    let reaWrapper = document.createElement("div");
    reaWrapper.classList.add("realisation-wrapper");

    // If the media is an image, we display an image
    if(image) {
        let src = `assets/medias/${image}`;
        reaWrapper.innerHTML = `
            <div style="background: url('${src}');" id="realisation-${id}" class="realisation realisation-image" aria-label='${title}, closeup view' tabindex="0"></div>
        `;
    }
    // If the media is a video, we display a video thumbnail
    if(video) {
        let src = `assets/medias/${video}`;
        reaWrapper.innerHTML = `
            <video id="realisation-${id}" class="realisation realisation-video" height="300px" aria-label='${title}, closeup view' tabindex="0">
                <source src=${src} type="video/mp4">
            </video>
        `;
    }

    // We create the title + likes block
    let reaInfos = document.createElement("div");
    reaInfos.setAttribute("class", "rea-infos");
    reaInfos.innerHTML = `
        <p class="rea-title">${title}</p>
        <div class="rea-likes">
            <span onclick="test()" class="likes-nb">${likes}</span>
            <svg class="likes-icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="likes" tabindex="0">
                <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
            </svg>
        </div>
    `;

    reaWrapper.appendChild(reaInfos);
    realisationsSection.appendChild(reaWrapper);

    let rea = document.querySelector(`.realisation-wrapper #realisation-${id}`);

    // If the user clicks on a media, the lightbox opens
    rea.addEventListener("click", function() {
        if(image) {
            openLightbox(id, photographerId, title, image);
        }
        else if (video) {
            openLightbox(id, photographerId, title, video);
        }
    });
    // Same thing for keyboard navigation
    document.addEventListener('keypress', function(e) {
        if(rea === document.activeElement) {
            if (e.key === 'Enter') {
                if(image) {
                    openLightbox(id, photographerId, title, image);
                }
                else if (video) {
                    openLightbox(id, photographerId, title, video);
                }
            }
        }
    });

    return { id, photographerId, title, image, likes, date, price };

}

export default mediaFactory;
