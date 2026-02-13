// Logic for image slideshow
let currentSlide = 0;
showSlide(currentSlide);

function showSlide(index) {
    let slides = document.querySelectorAll(".slideshow .slide");
    if(index < 0) {
        index = slides.length - 1;
    }
    else {
        index = index % slides.length;
    }

    slides[currentSlide].style.display = "none";
    slides[index].style.display= "block";
    currentSlide = index;
}

function advanceSlide(step) {
    showSlide(currentSlide + step);
}

// Logic for showing popups
let popupContainer = document.getElementById("popup-container")
let body = document.querySelector("body");

popupContainer.addEventListener("click", function (e) {
    if(e.target === this) {
        closePopups()
    }
})

function showPopupLayer() {
    popupContainer.classList.add("active");
    body.classList.add("no-scroll");
}

function showImprint() {
    showPopupLayer();
    document.getElementById("imprint").style.display = "block";
}

function showPrivacyPolicy() {
    showPopupLayer()
    document.getElementById("privacy-policy").style.display = "block";
}

function closePopups() {
    for(let child of popupContainer.children) {
        child.style.display = "none";
        popupContainer.classList.remove("active");
        body.classList.remove("no-scroll");
    }
}

// Logic for de-obfuscating e-mail addresses in href-attribute
let emails = document.querySelectorAll(".obfuscated-email");
for(let email of emails) {
    email.href = "mailto:" + email.textContent
}