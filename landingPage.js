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

function startAutoCycle() {
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000); // Alle 5 Sekunden wechseln
}
showSlide(0);
startAutoCycle();


let currentPos = 0;
const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.carousel-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateButtons() {
    // Get current width of one card + gap
    const cardWidth = cards[0].offsetWidth + 16;
    const maxScroll = track.scrollWidth - track.parentElement.offsetWidth;

    prevBtn.disabled = currentPos <= 0;
    nextBtn.disabled = Math.abs(currentPos) >= maxScroll;
}

function moveSlide(direction) {
    const cardWidth = cards[0].offsetWidth + 16; // width + gap
    const viewportWidth = track.parentElement.offsetWidth;
    const maxScroll = track.scrollWidth - viewportWidth;

    // Move by one card width
    currentPos -= (direction * cardWidth);

    // Constraint checking
    if (currentPos > 0) currentPos = 0;
    if (Math.abs(currentPos) > maxScroll) currentPos = -maxScroll;

    track.style.transform = `translateX(${currentPos}px)`;
    updateButtons();
}

function openLightbox(src) {
    const lb = document.getElementById('lightbox');
    document.getElementById('lightboxImg').src = src;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Handle window resizing to keep carousel position correct
window.addEventListener('resize', () => {
    currentPos = 0;
    track.style.transform = `translateX(0px)`;
    updateButtons();
});

// Initialize button states
setTimeout(updateButtons, 100);