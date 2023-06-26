const board = document.getElementById('board');
const player1Score = document.getElementById('player1');
const player2Score = document.getElementById('player2');

const cards = [
  { id: 1, value: 'A' },
  { id: 2, value: 'B' },
  { id: 3, value: 'C' },
  { id: 4, value: 'D' },
  { id: 5, value: 'E' },
  { id: 6, value: 'F' },
  { id: 7, value: 'A' },
  { id: 8, value: 'B' },
  { id: 9, value: 'C' },
  { id: 10, value: 'D' },
  { id: 11, value: 'E' },
  { id: 12, value: 'F' },
];

let flippedCards = [];
let matchedCards = [];
let currentPlayer = 1;
let player1ScoreCount = 0;
let player2ScoreCount = 0;

function createCard(card) {
  const element = document.createElement('div');
  element.classList.add('card');
  element.dataset.id = card.id
  element.dataset.value= card.value
  element.textContent = "TM"
  element.addEventListener('mousedown', flipCard);
  return element;
}

function flipCard() {
  if (this.classList.contains('flipped') || this.classList.contains('matched')) {
    return;
  }

  this.classList.add('flipped');
  this.textContent = this.dataset.value;
  flippedCards.push(this);
  console.log(flippedCards[0].dataset.value)
  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    updateScore();
    checkGameEnd();
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card1.textContent = 'TM';
      card2.classList.remove('flipped');
      card2.textContent = 'TM';
      switchPlayer();
    }, 1000);
  }

  flippedCards = [];
}

function switchPlayer() {
  currentPlayer = currentPlayer === 1 ? 2 : 1;
  player1Score.classList.toggle('active');
  player2Score.classList.toggle('active');

  const span = document.getElementById('playerNum');
  span.textContent = `${currentPlayer}`;

  scoreBoard.appendChild(heading);
}

function updateScore() {
  if (currentPlayer === 1) {
    player1ScoreCount++;
    player1Score.textContent = `Speler 1: ${player1ScoreCount}`;
  } else {
    player2ScoreCount++;
    player2Score.textContent = `Speler 2: ${player2ScoreCount}`;
  }
}

function checkGameEnd() {
  if (matchedCards.length === cards.length) {
    let winner = '';

    if (player1ScoreCount > player2ScoreCount) {
      winner = 'Speler 1';
    } else if (player1ScoreCount < player2ScoreCount) {
      winner = 'Speler 2';
    } else {
      winner = 'Gelijkspel';
    }
    alert(`De winnaar is: ${winner}`);
  }
}

function initializeGame() {
  player1Score.textContent = `Speler 1: ${player1ScoreCount}`;
  player2Score.textContent = `Speler 2: ${player2ScoreCount}`;

  cards.sort(() => Math.random() - 0.5);

  cards.forEach((card) => {
    const newCard = createCard(card);
    board.appendChild(newCard);
  });
}

initializeGame();
