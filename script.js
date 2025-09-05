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


// --- LÓGICA PARA OS CARDS E LIVROS ---
const projectCards = document.querySelectorAll(".project-card");
const modalOverlay = document.getElementById("modal-overlay");

projectCards.forEach(card => {
    // --- Lógica de Navegação do Livro (para cada card) ---
    const pages = card.querySelectorAll(".book-page");
    const arrowLeft = card.querySelector(".arrow-left");
    const arrowRight = card.querySelector(".arrow-right");
    let currentPageIndex = 0;

    function showPage(index) {
        // Esconde todas as páginas
        pages.forEach(page => page.classList.remove("active-page"));
        // Mostra a página correta
        if (pages[index]) { // Verifica se a página existe antes de tentar mostrar
            pages[index].classList.add("active-page");
        }
    }

    if (arrowLeft && arrowRight) {
        arrowRight.addEventListener("click", (event) => {
            event.stopPropagation(); // Impede que o clique feche o modal
            currentPageIndex++;
            if (currentPageIndex >= pages.length) {
                currentPageIndex = 0; // Volta para a primeira página
            }
            showPage(currentPageIndex);
        });

        arrowLeft.addEventListener("click", (event) => {
            event.stopPropagation(); // Impede que o clique feche o modal
            currentPageIndex--;
            if (currentPageIndex < 0) {
                currentPageIndex = pages.length - 1; // Vai para a última página
            }
            showPage(currentPageIndex);
        });
    }

    // --- Lógica de Abrir o Card (e o Livro junto) ---
    card.addEventListener("click", (event) => {
        event.stopPropagation();

        if (card.classList.contains("is-open")) {
            return;
        }
        modalOverlay.classList.add("active");
        card.classList.add("is-open");
        
        // Reseta o livro para a primeira página sempre que abrir
        currentPageIndex = 0;
        showPage(currentPageIndex);
    });
});

// --- Lógica de Fechar o Card (e o Livro junto) ---
// ESTA É A NOVA VERSÃO
function closeCard() {
    const openCard = document.querySelector(".project-card.is-open");
    if (openCard) {
        // 1. Adiciona a classe que faz o livro sumir (via CSS)
        openCard.classList.add('is-closing');

        // 2. Espera 400ms (o tempo da animação do livro) antes de continuar
        setTimeout(() => {
            // 3. Agora sim, remove as classes para fechar a carta e o fundo
            modalOverlay.classList.remove("active");
            openCard.classList.remove("is-open");

            // 4. Limpa a classe de fechamento para a próxima vez que o card for aberto
            openCard.classList.remove('is-closing');
        }, 400); // Este tempo (em ms) deve ser igual ao da transição do CSS
    }
}

modalOverlay.addEventListener("click", closeCard);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeCard();
    }
});