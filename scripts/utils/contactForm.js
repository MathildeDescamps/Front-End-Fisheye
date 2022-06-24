function displayModal() {
    let modal = document.getElementById("contact_modal");
    let photographerName = document.querySelector(".photographer-header h1").innerText;
    let contactMeText = document.querySelector(".modal header h2");
    let closeBtn = document.querySelector("#contact_modal .modal img");
    contactMeText.innerHTML = `Contactez-moi <br/> ${photographerName}`;
    modal.setAttribute("aria-label", "Contact me "+ photographerName);
    let firstNameInput = document.querySelector("#contact_modal .modal form .firstname-input");
	modal.style.display = "flex";
    firstNameInput.focus();
    let btn = document.querySelector("#contact_modal .modal form .send");
    if(btn) {
        btn.addEventListener("click", function(e) {
            e.preventDefault();
            let firstName = document.querySelector("#contact_modal .modal form .firstname-input").value;
            let lastName = document.querySelector("#contact_modal .modal form .lastname-input").value;
            let email = document.querySelector("#contact_modal .modal form .email-input").value;
            let message = document.querySelector("#contact_modal .modal form .message-input").value;
            setTimeout(function(){
                console.log("Prénom : ", firstName);
                console.log("Nom : ", lastName);
                console.log("Email : ", email);
                console.log("Message : ", message);
            }, 2000);
        })
    }
    document.addEventListener('keypress', function (e) {
        if(closeBtn === document.activeElement) {
            if (e.key === 'Enter') {
                let modal = document.getElementById("contact_modal");
                modal.style.display = "none";
            }
        }
    });
}

function closeModal() {
    let modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}