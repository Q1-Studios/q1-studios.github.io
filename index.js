let currentSlide = 0;
const slides = document.querySelectorAll(".slideshow .slide");

// Logic for generating image slideshow progress indicators
const progressDiv = document.getElementById("slideshow-progress");
const templateDot = document.getElementById("template-dot");

for(let i = 0; i < slides.length; i++) {
    const dot = templateDot.cloneNode();
    const slideTitle = slides[i].querySelector(".slide-title").textContent;

    dot.classList.remove("active");
    dot.title = slideTitle;
    dot.addEventListener("click", () => {
        showSlide(i);
    });
    progressDiv.appendChild(dot);
}
progressDiv.removeChild(templateDot);

const progressDots = document.querySelectorAll("#slideshow-progress a.progress-dot");

// Logic for image slideshow
showSlide(currentSlide);

function showSlide(index) {
    if(index < 0) {
        index = slides.length - 1;
    }
    else {
        index = index % slides.length;
    }

    slides[currentSlide].style.display = "none";
    progressDots[currentSlide].classList.remove("active");

    slides[index].style.display= "block";
    progressDots[index].classList.add("active");

    currentSlide = index;
}

function advanceSlide(step) {
    showSlide(currentSlide + step);
}

// Logic for navigating to game slide specified in URL fragment
addEventListener("hashchange", () => { handleURLFragment() })

function handleURLFragment() {
    const fragment = location.hash.substring(1);
    for (let i = 0; i < slides.length; i++) {
        const slide = slides[i];
        if (slide.id === fragment) {
            showSlide(i);
            slide.scrollIntoView();
            break;
        }
    }
}

// Logic for showing popups
const popupContainer = document.getElementById("popup-container")
const body = document.querySelector("body");

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
    for(const child of popupContainer.children) {
        child.style.display = "none";
        popupContainer.classList.remove("active");
        body.classList.remove("no-scroll");
    }
}

// Logic for de-obfuscating e-mail addresses in href-attribute
const emails = document.querySelectorAll(".obfuscated-email");
for (const email of emails) {
    const emailAddr = email.textContent.split("").reverse().join("");
    email.href = "mailto:" + emailAddr
    email.textContent = emailAddr
}