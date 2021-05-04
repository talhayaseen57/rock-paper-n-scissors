const game = () => {
  let pScore = 0;
  let cScore = 0;
  let i = 0;
  let txt = 'Wanna play with me!';
  
  //typewriter
  const typeWriter = () => {    
    if (i < txt.length) {
      document.querySelector(".typo").innerHTML += txt.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  };

  //Start the Game
  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");
    const score = document.querySelector(".score");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
      score.classList.add("fadeIn");
    });
  };

  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand");
    const computerHand = document.querySelector(".computer-hand");
    const hands = document.querySelectorAll(".hands img");

    hands.forEach(hand => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    //Computer Options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach(option => {
      option.addEventListener("click", function () {
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];

        setTimeout(() => {
          compareHands(this.textContent, computerChoice);
          playerHand.src = `./images/${this.textContent}.png`;
          computerHand.src = `./images/${computerChoice}.png`;
        }, 2000);
        playerHand.style.animation = "shakePlayer 3s ease";
        computerHand.style.animation = "shakeComputer 3s ease";
      });
    });
  };

  const updateScore = () => {
    const winner = document.querySelector(".winner");
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
    if ((pScore == 5) && (pScore > cScore)) {
      winner.textContent = "Congratulations!";
      setTimeout("location.reload(true);", 2000);
    }
    if ((cScore == 5) && (pScore < cScore)) {
      winner.textContent = "Oho! Try Again";
      setTimeout("location.reload(true);", 2000);
    }
  };


  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");

    //Checking for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "Match Ties";
      return;
    }

    //Check for Rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "You Win";
        pScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "You Loose";
        cScore++;
        updateScore();
        return;
      }
    }

    //Check for Paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "You Loose";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "You Win";
        pScore++;
        updateScore();
        return;
      }
    }
    
    //Check for Scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "You Loose";
        cScore++;
        updateScore();
        return;
      } else {
        winner.textContent = "You Win";
        pScore++;
        updateScore();
        return;
      }
    }
  };

  //Is call all the inner function
  startGame();
  playMatch();
  typeWriter();
};

//start the game function
game();
