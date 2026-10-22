// hover preview shows the itch.io cover, title and tagline (itch.io doesn't allow embedding its pages)
const games = [
    {name:"Mutex", image:"../assets/game-logos/mutex.png", link:"https://q1studios.itch.io/mutex",
        title:"M.U.T.E.X.", desc:"Two pilots, scrambled sensors, maximum firepower",
        preview:"../assets/game-previews/mutex.jpg"},
    {name:"Escape", image:"../assets/game-logos/Escape_The_Plant.png", link:"https://q1studios.itch.io/escape-the-plant-plant",
        title:"Escape the Plant, Plant!", desc:"Breach your confinement, yearning for spring.",
        preview:"../assets/game-previews/escape-the-plant.jpg"},
    {name:"Lane", image:"../assets/game-logos/Lane.png", link:"https://q1studios.itch.io/lanliner-recon",
        title:"LanLiner: Reconciliation", desc:"Race an adversary's data packet to the game server.",
        preview:"../assets/game-previews/lanliner.jpg"},
    {name:"Morbid", image:"../assets/game-logos/morbid.png", link:"https://q1studios.itch.io/morbid-curiosity",
        title:"Morbid Curiosity", desc:"[Work in progress - Currently unfinished]",
        preview:"../assets/game-previews/morbid-curiosity.jpg"},
    {name:"Ohm", image:"../assets/game-logos/Ohm.png", link:"https://q1studios.itch.io/ohmnbeat",
        title:"Ohm'n'Beat", desc:"Exhilarating & Oscillating Beat Resistance",
        preview:"../assets/game-previews/ohmnbeat.jpg"},
    {name:"Sac", image:"../assets/game-logos/Sac.png", link:"https://q1studios.itch.io/sacrilegious-terminus",
        title:"Sacrilegious Terminus", desc:"The rift is calling - unleash the underworld!",
        preview:"../assets/game-previews/sacrilegious-terminus.jpg"},
    {name:"Stealay", image:"../assets/game-logos/Stealay.png", link:"https://q1studios.itch.io/stealay",
        title:"Stealay", desc:"A heist planned right - delayed in execution",
        preview:"../assets/game-previews/stealay.jpg"}
];

let currentIndex = 0;
const cardsCount = 5;

// One dot per game below the slider; clicking a dot makes that game the first card
const dots = games.map((game, i) => {
    const dot = document.createElement("button");
    dot.className = "slider-dot";
    dot.setAttribute("aria-label", "Show " + game.title);
    dot.onclick = () => moveSlide(i - currentIndex);
    document.getElementById("sliderDots").appendChild(dot);
    return dot;
});
// 5, 3 or 1 cards are visible depending on the screen width
window.addEventListener("resize", updateDots);

moveSlide(0);

function moveSlide(step) {

    currentIndex = (currentIndex + step + games.length) % games.length;

    // 2. Karten aktualisieren
    for (let i = 0; i < cardsCount; i++) {

        let gameIndex = (currentIndex + i) % games.length;
        setCard(i, gameIndex);
    }
    updateDots();
}

// Highlight the dots of the games that are currently shown
function updateDots() {
    const visible = [...document.querySelectorAll(".gameCard")]
        .filter(card => getComputedStyle(card).display !== "none").length;

    dots.forEach((dot, i) => {
        const shown = (i - currentIndex + games.length) % games.length < visible;
        dot.classList.toggle("active", shown);
        dot.setAttribute("aria-current", shown ? "true" : "false");
    });
}

function setCard(cardSlot, gameIndex) {
    let id = cardSlot + 1;
    let card = document.getElementById("card" + id);
    let game = games[gameIndex];

    if (card) {
        card.href = game.link;
        card.querySelector(".game-logo").src = game.image;
        card.querySelector(".game-logo").alt = game.title;
        card.querySelector(".preview-image").src = game.preview;
        card.querySelector(".preview-title").textContent = game.title;
        card.querySelector(".preview-desc").textContent = game.desc;
        card.querySelector(".preview-url").textContent = game.link.replace("https://", "");
    }
}

// Keep the hover preview at least 40px away from the sides of the page
for (const card of document.querySelectorAll(".gameCard")) {
    card.addEventListener("mouseenter", () => placePreview(card));
    card.addEventListener("focus", () => placePreview(card));
}

function placePreview(card) {
    const margin = 40;
    const half = card.querySelector(".preview").offsetWidth / 2;
    const cardBox = card.getBoundingClientRect();
    const center = cardBox.left + cardBox.width / 2;
    const pageWidth = document.documentElement.clientWidth;
    const target = Math.min(Math.max(center, margin + half), pageWidth - margin - half);

    card.style.setProperty("--shift", (target - center) + "px");
}

// Hero slideshow behind the logo, crossfades to the next image every 5 seconds
const slides = document.querySelectorAll(".slideshow .slide");
let currentSlide = 0;

showSlide(0);
setInterval(() => showSlide(currentSlide + 1), 5000);

function showSlide(index) {
    slides[currentSlide].classList.remove("active");
    currentSlide = index % slides.length;
    slides[currentSlide].classList.add("active");
}
// Imprint and privacy policy popups; the footer links (and shared links) use #imprint / #privacy-policy
const popups = document.querySelectorAll("dialog.popup");

for (const popup of popups) {
    // a click on the dimmed backdrop lands on the dialog itself, not its content
    popup.addEventListener("click", (e) => { if (e.target === popup) popup.close(); });
    popup.addEventListener("close", () => {
        if (location.hash === "#" + popup.id) {
            history.replaceState(null, "", location.pathname + location.search);
        }
    });
}

addEventListener("hashchange", openPopupFromHash);
openPopupFromHash();

function openPopupFromHash() {
    const popup = document.getElementById(location.hash.substring(1));
    if (popup && popup.matches("dialog.popup") && !popup.open) {
        popup.showModal();
    }
}

// The e-mail address is stored reversed in the HTML to keep it away from simple scrapers
for (const email of document.querySelectorAll(".obfuscated-email")) {
    const address = email.textContent.split("").reverse().join("");
    email.href = "mailto:" + address;
    email.textContent = address;
}
