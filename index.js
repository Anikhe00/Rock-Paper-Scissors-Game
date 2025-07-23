const gameContent = document.getElementsByClassName("game-content")
const gameInterface = document.getElementsByClassName("game-interface")
const playButton = document.getElementById("playbtn")
const options = document.querySelectorAll(".option")
const countdown = document.getElementById("time")
const timerContainer = document.getElementById("timer")

const computerHandDiv = document.getElementById("computer-hand-div")
const computerHand = document.getElementById("computer-hand-img")
const playerHandDiv = document.getElementById("player-hand-div")
const playerHand = document.getElementById("player-hand-img")

const resultModal = document.querySelector(".result-modal")
const resultIcon = document.getElementById("result-icon")
const resultText = document.getElementById("result-text")
const playAgainButton = document.getElementById("play-again")

let userChoice = null;
let computerChoice = null;
let countdownInterval
let autoPickTimeout

let userScore = 0
let computerScore = 0

const userScoreText = document.getElementById("user-score")
const computerScoreText = document.getElementById("computer-score")

// Get computer choice
const getComputerChoice = () => {
  const computerOptions = ["rock", "paper", "scissors"];
  const index = Math.floor(Math.random() * options.length);

  return computerOptions[index]
};

// Start countdown
function startCountdown(seconds = 5) {
  countdown.textContent = seconds
  let timeLeft = seconds

  countdownInterval = setInterval(() => {
    timeLeft--
    countdown.textContent = timeLeft

    if (timeLeft <= 0) {
      clearInterval(countdownInterval)
      handleTimeout()
    }
  }, 1000)
}

// Handle Timeout and get user choice
function handleTimeout() {
  if (!userChoice) {
    userChoice = getComputerChoice()
  }
  showChoicesAndResult()
}

// User selects an option
options.forEach(option => {
  option.addEventListener("click", () => {
    if (userChoice) return;
    userChoice = option.dataset.option
    showChoicesAndResult()
  })
})

// Determine winner
const determineWinner = (userChoice, computerChoice) => {
  if (userChoice === computerChoice) {
    return "It's a Tie!";
  }

  if ((userChoice === "rock" && computerChoice === "scissors") || (userChoice === "paper" && computerChoice === "rock") || (userChoice === "scissors" && computerChoice === "paper")) {
    return "You Won!"
  } else {
    return "Computer Wins!"
  }
};

// Get the image based on the player's choice
function getUserChoiceImage(choice) {
  return `./assets/player/${choice}.svg`
}

// Get the image based on the computer's choice
function getComputerChoiceImage(option) {
  return `./assets/computer/${option}.svg` 
}

// Get the result icon image path
function getResultIcon(result) {
  if (result === "You Won!") {
    return "./assets/result/Celebrate.svg";
  } else if (result === "Computer Wins!") {
    return "./assets/result/GameOver.svg";
  } else {
    return "./assets/result/Tie.svg";
  }
}

// Show the player and computer's choice and result modal
function showChoicesAndResult() {
  if (!computerChoice) {
    computerChoice = getComputerChoice();
  }
  clearTimeout(autoPickTimeout);
  clearInterval(countdownInterval);

  //Hide timer
  timerContainer.style.display = "none";

  // Show hand containers first
  playerHandDiv.style.display = "block";
  computerHandDiv.style.display = "block";

  // Set hand images
  playerHand.src = getUserChoiceImage(userChoice);
  playerHand.alt = userChoice;

  computerHand.src = getComputerChoiceImage(computerChoice);
  computerHand.alt = computerChoice;

  // Show result after a delay
  setTimeout(() => {
    const result = determineWinner(userChoice, computerChoice);

    // Update scores
    if(result === "You Won!") {
      userScore++;
    } else if (result === "Computer Wins!") {
      computerScore++;
    }

    // Display result and scores
    resultText.textContent = result;
    resultIcon.innerHTML = `<img src="${getResultIcon(result)}" alt="${result}"/>`;
    resultModal.style.display = "flex";

    userScoreText.textContent = `Score: ${userScore}`;
    computerScoreText.textContent = `Score: ${computerScore}`;
  }, 1000);
}

// Main Logic
playButton.addEventListener("click", () => {
  gameContent[0].style.display = "none";
  gameInterface[0].style.display = "flex"
  startCountdown(5)

  autoPickTimeout = setTimeout(() => {
    handleTimeout();
  }, 4000)
})

// Play again button functionality
playAgainButton.addEventListener("click", () => {
  userChoice = null;
  computerChoice = null;
  resultModal.style.display = "none";
  playerHandDiv.style.display = "none";
  computerHandDiv.style.display = "none";
  timerContainer.style.display = "block";
  startCountdown(5);

  autoPickTimeout = setTimeout(() => {
    handleTimeout();
  }, 4000);
});
