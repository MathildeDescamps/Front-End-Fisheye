/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable quotes */
/* eslint-disable indent */
/* eslint-disable require-jsdoc */
// eslint-disable-next-line no-unused-vars

// The following function is called when a user clicks on the 'contact me' button, it opens the contact modal
function displayModal() {
    const modal = document.getElementById("contact_modal");
    const photographerName = document.querySelector(".photographer-header h1").innerText;
    const contactMeText = document.querySelector(".modal header h2");
    const closeBtn = document.querySelector("#contact_modal .modal img");
    contactMeText.innerHTML = `Contactez-moi <br/> ${photographerName}`;
    modal.setAttribute("aria-label", "Contact me "+ photographerName);
    const firstNameInput = document.querySelector("#contact_modal .modal form .firstname-input");
    modal.style.display = "flex";
    // When the contact modal opens, we set the focus on the first form field
    firstNameInput.focus();
    const btn = document.querySelector("#contact_modal .modal form .send");
    // On click on the 'send' button, the user's inputs are logged in the console
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
    // Close the contact modal, for keyboard navigation
    document.addEventListener('keypress', function(e) {
        if (closeBtn === document.activeElement) {
            if (e.key === 'Enter') {
                const modal = document.getElementById("contact_modal");
                modal.style.display = "none";
            }
        }
    });
}

// Close the contact modal on click on the cross icon
function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
