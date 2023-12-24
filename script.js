const cards = document.querySelectorAll(".card");
const timerDisplay = document.getElementById("timer-display");
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const successPopup = document.getElementById("success-popup");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let timer;

function flipCard({ target: clickedCard }) {
  if (cardOne !== clickedCard && !disableDeck) {
    clickedCard.classList.add("flip");
    if (!cardOne) {
      return (cardOne = clickedCard);
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
    matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
  if (img1 === img2) {
    matched++;
    if (matched == 8) {
      clearInterval(timer);
      openSuccessPopup();
      setTimeout(() => {
        closePopup('success-popup'); 
        shuffleCard();
      }, 1000);
    }
    cardOne.removeEventListener("click", flipCard);
    cardTwo.removeEventListener("click", flipCard);
    cardOne = cardTwo = "";
    disableDeck = false;
  } else {
    setTimeout(() => {
      cardOne.classList.add("shake");
      cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
      cardOne.classList.remove("shake", "flip");
      cardTwo.classList.remove("shake", "flip");
      cardOne = cardTwo = "";
      disableDeck = false;
    }, 1200);
  }
}

function shuffleCard() {
  matched = 0;
  disableDeck = false;
  cardOne = cardTwo = "";
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/img-${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

function updateTimerDisplay(seconds) {
  timerDisplay.textContent = seconds;
}

function resetGame() {
    clearInterval(timer);
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    cards.forEach(card => {
      card.classList.remove("flip","shake");
      card.removeEventListener("click", flipCard);
    });

    startGame();  
     
}

function openInfoPopup() {
  openPopup('info-popup');
}
function closeInfoPopup() {
  closePopup('info-popup');
}

function openPopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = 'block';
}

function closePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.style.display = 'none';
}

function openSuccessPopup() {
  openPopup('success-popup');
}

function closeSuccessPopup() {
  closePopup('success-popup');
}

function startGame() {
  clearInterval(timer);
  shuffleCard();
  let secondsRemaining = 60;

  updateTimerDisplay(secondsRemaining);

  timer = setInterval(() => {
    secondsRemaining--;
    updateTimerDisplay(secondsRemaining);

    if (secondsRemaining === 0) {
      clearInterval(timer);
      alert("Game Over! Your time is up.");
    }
  }, 1000);
}

start.addEventListener("click", startGame);
reset.addEventListener("click", resetGame);
