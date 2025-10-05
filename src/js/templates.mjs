function getMailingAddress(addresses) {
    const mailing = addresses.find((address) => address.type === "Mailing");
    return mailing;
}
function getVoicePhone(numbers) {
    const voice = numbers.find((number) => number.type === "Voice");
    return voice ? voice.phoneNumber : 'N/A';
}

export function parkInfoTemplate(info) {
    return `<a href="/" class="hero-banner__title">${info.fullName}</a>
    <p class="hero-banner__subtitle">
        <span>${info.designation}</span>
        <span>${info.states}</span>
    </p>`;
}

export function mediaCardTemplate(info) {
    return `<div class="media-card">
        <a href="${item.link}">
            <img src="${item.image}" alt="${item.name}" class="media-card__img">
            <h3>${item.name}</h3>
        </a>
        <p>${item.description}</p>
            </div>`;
}

export function footerTemplate(info) {
    const mailing = getMailingAddress(info.addresses);
    const voice =  getVoicePhone(info.contacts.phoneNumbers);

    return `<section class="contact">
        <h3>Contact Info</h3>
        <h4>Mailing Address:</h4>
        <div><p>${mailing.line1}</p>
        <p>${mailing.city}, ${mailing.stateCode} ${mailing.postalCode}</p></div>
        <h4>Phone:</h4>
        <p>${voice}</p>
        `;
}