/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
/* eslint-disable quotes */
import {getMedias} from "../pages/photographer.js";

// DOM
const lightboxContainer = document.querySelector(".lightbox-container");
const closeBtn = document.querySelector(".lightbox-container .close");
const nextArrow = document.querySelector(".lightbox-container .controls .right");
const prevArrow = document.querySelector(".lightbox-container .controls .left");
const lightboxWrapper = document.querySelector(".lightbox-container .wrapper");

let medias = [];
let media;

export async function openLightbox(id, photographerId, title, clickedMedia) {
  // On récupère les médias du photographe
  medias = await getMedias(photographerId);

  // On récupère le média qui a été cliqué
  media = medias.find((media) => media.id === id);

  // On affiche la photo/vidéo cliquée
  if (clickedMedia.includes('.mp4')) {
    lightboxWrapper.innerHTML = `
            <video class="video" id="${id}" controls aria-label='${title}'>
                <source src="assets/medias/${clickedMedia}" type="video/mp4" >
            </video>
            <p class="title" >${title}</p>
        `;
  } else {
    lightboxWrapper.innerHTML = `
            <div class="image" id="${id}"  style="background: url('assets/medias/${clickedMedia}')" aria-label='${title}'></div>
            <p class="title" >${title}</p>
        `;
  }

  // On ouvre la lightbox
  lightboxContainer.style.display = "flex";
  prevArrow.focus();


  // Naviguer dans la lightbox avec les flèches du clavier
  document.addEventListener('keydown', function(event) {
    if (lightboxContainer.style.display === "flex") {
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

  // Au click sur la croix, on ferme la lightbox
  closeBtn.addEventListener("click", function() {
    if (lightboxContainer.style.display === "flex") {
      lightboxContainer.style.display = "none";
    }
  });
  document.addEventListener('keypress', function(e) {
    if (closeBtn === document.activeElement) {
      if (e.key === 'Enter') {
        if (lightboxContainer.style.display === "flex") {
          lightboxContainer.style.display = "none";
        }
      }
    }
  });
}

async function showNextMedia() {
  let index = medias.indexOf(media);

  if (index === (medias.length -1)) {
    index = -1;
  }

  if (medias[index + 1].image) {
    lightboxWrapper.innerHTML = `
            <div class="image" id="${medias[index + 1].id}" style="background: url('assets/medias/${medias[index + 1].image}')" aria-label='${medias[index + 1].title}'></div>
            <p class="title" >${medias[index + 1].title}</p>
        `;
  } else if (medias[index + 1].video) {
    lightboxWrapper.innerHTML = `
            <video class="video" id="${medias[index + 1].id}" controls aria-label='${medias[index + 1].title}'>
                <source src="assets/medias/${medias[index + 1].video}" type="video/mp4" >
            </video>
            <p class="title" >${medias[index + 1].title}</p>
        `;
  }
  media = medias[index + 1];
}

async function showPrevMedia() {
  let index = medias.indexOf(media);

  if (index - 1 === -1) {
    index = medias.length;
  }
  if (medias[index - 1].image) {
    lightboxWrapper.innerHTML = `
            <div class="image" id="${medias[index - 1].id}" style="background: url('assets/medias/${medias[index - 1].image}')" aria-label='${medias[index - 1].title}'></div>
            <p class="title" >${medias[index - 1].title}</p>
        `;
  } else if (medias[index - 1].video) {
    lightboxWrapper.innerHTML = `
            <video class="video" id="${medias[index - 1].id}" controls aria-label='${medias[index - 1].title}' >
                <source src="assets/medias/${medias[index - 1].video}" type="video/mp4" >
            </video>
            <p class="title" >${medias[index - 1].title}</p>
        `;
  }
  media = medias[index - 1];
}

// Au click sur la flèche de droite
if (nextArrow) {
  nextArrow.addEventListener("click", showNextMedia);
  document.addEventListener('keypress', function(e) {
    if (nextArrow === document.activeElement) {
      if (e.key === 'Enter') {
        showNextMedia();
      }
    }
  });
}
// Au click sur la flèche de gauche
if (prevArrow) {
  prevArrow.addEventListener("click", showPrevMedia);
  document.addEventListener('keypress', function(e) {
    if (prevArrow === document.activeElement) {
      if (e.key === 'Enter') {
        showPrevMedia();
      }
    }
  });
}
