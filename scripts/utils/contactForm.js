/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const photographerName = document.querySelector(".photographer-header h1").innerText;
    const contactMeText = document.querySelector(".modal header h2");
    const closeBtn = document.querySelector("#contact_modal .modal img");
    contactMeText.innerHTML = `Contactez-moi <br/> ${photographerName}`;
    modal.setAttribute("aria-label", "Contact me "+ photographerName);
    const firstNameInput = document.querySelector("#contact_modal .modal form .firstname-input");
    modal.style.display = "flex";
    firstNameInput.focus();
    const btn = document.querySelector("#contact_modal .modal form .send");
    if (btn) {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            const firstName = document.querySelector("#contact_modal .modal form .firstname-input").value;
            const lastName = document.querySelector("#contact_modal .modal form .lastname-input").value;
            const email = document.querySelector("#contact_modal .modal form .email-input").value;
            const message = document.querySelector("#contact_modal .modal form .message-input").value;
            setTimeout(function() {
                console.log("Prénom : ", firstName);
                console.log("Nom : ", lastName);
                console.log("Email : ", email);
                console.log("Message : ", message);
            }, 2000);
        });
    }
    document.addEventListener('keypress', function(e) {
        if (closeBtn === document.activeElement) {
            if (e.key === 'Enter') {
                const modal = document.getElementById("contact_modal");
                modal.style.display = "none";
            }
        }
    });
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
