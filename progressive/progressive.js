function submitForm(event) {
    const nameInput = document.querySelector("#name");
    const emailInput = document.querySelector("email");

    console.log(this.name.value);
    let error = "";

    if (nameInput.value === "") {
        error += "Name is required.\n";
    }

    if (emailInput.value === "") {
        error + "Email is required.\n";
    }

    if (error) {
        event.preventDefault();
        document.getElementById("form-error").textContent = error;
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+[^\s@]+\.[^\@]+$/;
    return re.text(email);
}

document.getElementById("contact-form").addEventListener("submit", submitForm);