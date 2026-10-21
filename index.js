const games = [
    {name:"Mutex", image:"assets/game-logos/mutex.png", link:"https://q1studios.itch.io/mutex"},
    {name:"Escape", image:"assets/game-logos/Escape_The_Plant.png", link:"https://q1studios.itch.io/escape-the-plant-plant"},
    {name:"Lane", image:"assets/game-logos/Lane.png", link:"https://q1studios.itch.io/lanliner-recon"},
    {name:"Morbid", image:"assets/game-logos/morbid.png", link:"https://q1studios.itch.io/morbid-curiosity"},
    {name:"Ohm", image:"assets/game-logos/Ohm.png", link:"https://q1studios.itch.io/ohmnbeat"},
    {name:"Sac", image:"assets/game-logos/Sac.png", link:"https://q1studios.itch.io/sacrilegious-terminus"},
    {name:"Stealay", image:"assets/game-logos/Stealay.png", link:"https://q1studios.itch.io/stealay"}
];

let currentIndex = 0;
const cardsCount = 5;

moveSlide(0);

function moveSlide(step) {

    currentIndex = (currentIndex + step + games.length) % games.length;

    // 2. Karten aktualisieren
    for (let i = 0; i < cardsCount; i++) {

        let gameIndex = (currentIndex + i) % games.length;
        setCard(i, gameIndex);
    }
}

function setCard(cardSlot, gameIndex) {
    let id = cardSlot + 1;
    let element = document.getElementById("card" + id);

    if (element) {
        element.src = games[gameIndex].image;

        element.onclick = () => window.location.href = games[gameIndex].link;
    }
}

// Hero slideshow behind the logo, switches every 5 seconds
const slides = document.querySelectorAll(".slideshow .slide");
let currentSlide = 0;

showSlide(0);
setInterval(() => showSlide(currentSlide + 1), 5000);

function showSlide(index) {
    slides[currentSlide].style.display = "none";
    currentSlide = index % slides.length;
    slides[currentSlide].style.display = "block";
}