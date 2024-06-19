let player1 = prompt("Enter name of player 1 ( Player X )");
let player2 = prompt("Enter name of player 2 ( Player O )");
let gameArr = [0, 0, 0, 0, 0, 0, 0, 0, 0];
let flag = false;
let count = 0;

for (let i = 0; i < 9; i++) {
  let currEle = document.getElementById(`${i + 1}`);
  currEle.addEventListener("click", () => {
    if (gameArr[i] === 0) {
      if (!flag) {
        const newEle = document.createElement("i");
        newEle.classList.add("fa-solid", "fa-xmark", "fa-4x", "div-icon");
        newEle.style.color = "#B197FC";
        currEle.appendChild(newEle);
        gameArr[i] = 1;
        flag = true;
      } else {
        const newEle = document.createElement("i");
        newEle.classList.add("fa-solid", "fa-o", "fa-4x", "div-icon");
        newEle.style.color = "#3B93AA";
        currEle.appendChild(newEle);
        gameArr[i] = 2;
        flag = false;
      }
      count++;
      let ans = isWon();
      if (ans === 1) {
        setTimeout(() => {
          alert(`${player1} won the game !!!`);
          resetGame();
        }, 100);
      } else if (ans === 2) {
        setTimeout(() => {
          alert(`${player2} won the game !!!`);
          resetGame();
        }, 100);
      } else if (count === 9 && ans === 0) {
        let winTxt = document.querySelector(".winning-div");
        let drawDiv = document.querySelector(".draw-div");
        winTxt.textContent = "Miracle!!! Miracle!!!";
        winTxt.style.display = "block";
        drawDiv.style.display = "block";
      }
    }
  });
}

const isWon = () => {
  for (let i = 0; i < 9; i += 3) {
    if (
      gameArr[i] === gameArr[i + 1] &&
      gameArr[i + 1] === gameArr[i + 2] &&
      gameArr[i] !== 0
    ) {
      return gameArr[i];
    }
  }
  for (let i = 0; i < 3; i++) {
    if (
      gameArr[i] === gameArr[i + 3] &&
      gameArr[i + 3] === gameArr[i + 6] &&
      gameArr[i] !== 0
    ) {
      return gameArr[i];
    }
  }
  if (
    gameArr[0] === gameArr[4] &&
    gameArr[4] === gameArr[8] &&
    gameArr[0] !== 0
  ) {
    return gameArr[0];
  }
  if (
    gameArr[2] === gameArr[4] &&
    gameArr[4] === gameArr[6] &&
    gameArr[2] !== 0
  ) {
    return gameArr[2];
  }
  return 0;
};

const resetGame = () => {
  let icons = document.querySelectorAll(".div-icon");
  icons.forEach((icon) => {
    icon.remove();
  });
  for (let i = 0; i < 9; i++) {
    gameArr[i] = 0;
  }
  flag = false;
  count = 0;
  let winTxt = document.querySelector(".winning-div");
  let drawDiv = document.querySelector(".draw-div");
  winTxt.style.display = "none";
  drawDiv.style.display = "none";
};

let reset = document.querySelector(".reset-btn");
reset.addEventListener("click", () => {
  resetGame();
});
