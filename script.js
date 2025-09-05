// --- CÓDIGO DA ANIMAÇÃO DO PALCO ---
const curtainLeft = document.getElementById("curtain-left");
const curtainRight = document.getElementById("curtain-right");
const stageFloor = document.getElementById("stage-floor");
const spotlight = document.getElementById("spotlight");
const aboutMe = document.getElementById("about-me");
const handsClapping = document.getElementById("hands-clapping");
const separator = document.getElementById("separator");
const clapSound = document.getElementById("clap-sound");

curtainLeft.classList.add("curtain-left-animate");
curtainRight.classList.add("curtain-right-animate");

setTimeout(() => {
  stageFloor.classList.add("stage-rise-animate");
  spotlight.classList.add("spotlight-drop-animate");
}, 1600);

setTimeout(() => {
  aboutMe.classList.add("fade-in-text");
}, 1600 + 1800);

setTimeout(() => {
  handsClapping.style.opacity = "1";
  handsClapping.style.transform = "translateX(-50%) translateY(0)";

  setTimeout(() => {
    handsClapping.style.opacity = "0";
    handsClapping.style.transform = "translateX(-50%) translateY(120px)";

    setTimeout(() => {
      separator.style.opacity = "1";
    }, 800);
  }, 3000);
}, 1600 + 1800 + 1600);


// --- LÓGICA PARA OS CARDS DE PROJETO (COM CORREÇÃO) ---
const projectCards = document.querySelectorAll(".project-card");
const modalOverlay = document.getElementById("modal-overlay");

projectCards.forEach(card => {
    card.addEventListener("click", (event) => {
        event.stopPropagation(); // Impede o clique de "atravessar" para o overlay

        if (card.classList.contains("is-open")) {
            return;
        }
        modalOverlay.classList.add("active");
        card.classList.add("is-open");
    });
});

function closeCard() {
    const openCard = document.querySelector(".project-card.is-open");
    if (openCard) {
        modalOverlay.classList.remove("active");
        openCard.classList.remove("is-open");
    }
}

modalOverlay.addEventListener("click", closeCard);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCard();
    }
});