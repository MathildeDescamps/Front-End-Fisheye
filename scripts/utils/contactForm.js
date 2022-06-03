function displayModal() {
    let modal = document.getElementById("contact_modal");
    let photographerName = document.querySelector(".photographer-header h2").innerText;
    let contactMeText = document.querySelector(".modal header h2");
    contactMeText.innerHTML = `Contactez-moi <br/> ${photographerName}`;
	modal.style.display = "block";
}

function closeModal() {
    let modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}
