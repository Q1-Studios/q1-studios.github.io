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