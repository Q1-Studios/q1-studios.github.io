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
popupContainer.addEventListener("click", function (e) {
    if(e.target === this) {
        closePopups()
    }
})

function showImprint() {
    popupContainer.classList.add("active");
    document.getElementById("imprint").style.display = "block";
}

function showPrivacyPolicy() {
    popupContainer.classList.add("active");
    document.getElementById("privacy-policy").style.display = "block";
}

function closePopups() {
    for(let child of popupContainer.children) {
        child.style.display = "none";
        popupContainer.classList.remove("active");
    }
}