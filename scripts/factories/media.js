import { openLightbox } from "../utils/lightBox.js";

function mediaFactory(data) {

    let { id, photographerId, title, image, video, likes, date, price } = data;

    let realisationsSection = document.querySelector(".photographer-realisations");

    let reaWrapper = document.createElement("div");
    reaWrapper.classList.add("realisation-wrapper");

    if(image){
        let src = `assets/medias/${image}`;
        reaWrapper.innerHTML = `
            <div style="background: url('${src}');" id="realisation-${id}" class="realisation realisation-image"></div>
        `;
    } 
    if(video){
        let src = `assets/medias/${video}`;
        reaWrapper.innerHTML = `
            <video id="realisation-${id}" class="realisation realisation-video" height="300px" controls>
                <source src=${src} type="video/mp4">
            </video>
        `;
    } 

    function test () {
        alert('liked !');
    }

    let reaInfos = document.createElement("div");
    reaInfos.setAttribute("class", "rea-infos");
    reaInfos.innerHTML = `
        <p class="rea-title">${title}</p>
        <div class="rea-likes">
            <span onclick="test()" class="likes-nb">${likes}</span>
            <svg class="likes-icon" width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 18.35L8.23125 17.03C3.725 12.36 0.75 9.28 0.75 5.5C0.75 2.42 2.8675 0 5.5625 0C7.085 0 8.54625 0.81 9.5 2.09C10.4537 0.81 11.915 0 13.4375 0C16.1325 0 18.25 2.42 18.25 5.5C18.25 9.28 15.275 12.36 10.7688 17.04L9.5 18.35Z" fill="#911C1C"/>
            </svg>
        </div>
    `;

    reaWrapper.appendChild(reaInfos);
    realisationsSection.appendChild(reaWrapper);

    let rea = document.querySelector(`.realisation-wrapper #realisation-${id}`);

    rea.addEventListener("click", function() {
        if(image) {
            openLightbox(id, photographerId, title, image);
        }
        else if (video) {
            openLightbox(id, photographerId, title, video);
        }
    });

    return { id, photographerId, title, image, likes, date, price };

}

export default mediaFactory;