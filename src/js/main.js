import { getParkData } from "./parkService.mjs";

const parkData = getParkData();

// Templates

//Hero banner content
function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner__title">${info.fullName}</a>
    <p class="hero-banner__subtitle">
    <span>${info.designation}</span>
    <spand>${info.states}</span>
    </p>`;
}

//Media card component
function mediaCardTemplate(info) {
    return `
      <div class="media-card">
      <a href="${info.link}">
      <img src="${info.image}" alt="${info.name}" class="media-card__img">
      <h3 class="media-card__title>${info.name}</h3>
      </a>
      <p>${info.description}</p>
      </div>`;
}

//For finding mailing address
function getMailingAddress(addresses) {
    // Array.find returns 1st object to fulfill the condition
    return addresses.find((address) => address.type === "Mailing");
}

//For finding voice phone number
function getVoicePhone(number) {
    const voice = numbers.find((number) => number.type === "Voice");
    // returns phone number
    return voice.phoneNumber;
}

//Simplified footer
function footerTemplate(info) {
    const mailing = getMailingAddress(info.addresses);
    const voice = getVoicePhone(info.contacts.phoneNumbers);

    return `<section class="contact">
    <h3>Contact Info</h3>
    <h4>Mailing Address:</h4>
    <div><p>${mailing.line1}</p>
    <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
    <h4>Phone:</h4>
    <p>${voice}</p>
    </section>`;
}

//Data for 3 middle array sections
const parkInfoLinks = [
    {
        name: "Current Conditions &#x203A;",
        link: "conditions.html",
        image: parkData.images[2].url,
        description: "See what conditions to expect in the park before leaving on your trip!"
    },
    {
        name: "Fees and Passes &#x203A;",
        link: "fees.html",
        image: parkData.images[3].url,
        description: "Learn about the fees and passes that are available."
    },
    {
        name: "Visitor Centers &#x203A;",
        link: "visitor_centers.html",
        image: parkData.images[9].url,
        description: "Learn about the visitor centers in the park."
    }
];

// Setter Functions

// set header and disclaimer content
function setHeaderInfo(data) {
    const disclaimer = document.querySelector(".disclaimer > a");
    disclaimer.href = data.url;
    disclaimer.innerHTML = data.fullName;

    document.querySelector("head > title").textContent = data.fullName;

    // set banner image
    const heroImage = document.querySelector(".hero-banner > img");
    heroImage.src = data.images[0].url;
    heroImage.alt = data.images[0].altText;

    // template function to set park specific info in header
    document.querySelector(".hero-banner__content").innerHTML = parkInfoTemplate(data);
}

// sets content for .intro section
function setParkIntro(data) {
    const introEl = document.querySelector(".intro");
    introEl.innerHTML = `<h1>${data.fullName}</h1><p>${data.description}</p>`;
}

// set content for .info links section
function setParkInfoLinks(data) {
    const infoEl = document.querySelector(".info");

    // use map to generate html string for links, then join them
    const html = parkInfoLinks.map(mediaCardTemplate);
}

// sets footer content
function setFooter(data) {
    const footerEl = document.querySelector("#park-footer");
    footerEl.innerHTML = footerTemplate(data);
}

// Execution
setHeaderInfo(parkData);
setParkIntro(parkData);
setParkInfoLinks(parkData);
setFooter(parkData);