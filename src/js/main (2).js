import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

// Update link disclaimer area
const disclaimerLink = document.querySelector(".disclaimer a");
disclaimerLink.href = parkData.url;
disclaimerLink.textContent = parkData.fullName;

//Update page title
document.querySelector("title").textContent = parkData.fullName;

//Update hero banner img
const heroImage = document.querySelector(".hero-banner img");
heroImage.src = parkData.images[0].url;
heroImage.alt = parkData.images[0].altText;

//Update name, designation, and states in hero
const heroContent = document.querySelector("hero-banner__content");

function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner__title">${info.fullName}</a>
    <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <spand>${info.states}</span>
    </p>`;
}

heroContent.innerHTML = parkInfoTemplate(parkData);