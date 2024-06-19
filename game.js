document.addEventListener("DOMContentLoaded", () => {
  let player1, player2;
  const playbtn = document.getElementById("play-btn");

  playbtn.addEventListener("click", () => {
    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();

    // Validate player names
    if (player1 === "" || player2 === "") {
      alert("Please enter names for both players.");
      return;
    }

    localStorage.setItem("player1", player1);
    localStorage.setItem("player2", player2);

    document.querySelector(".inputs").style.display = "none";
    document.querySelector(".outer-div").style.display = "block";
    document.querySelector(".endgame-div").style.display = "none";

    resetGame();
  });

  const playagainbtn = document.querySelector(".playagain-btn");
  const newgamebtn = document.querySelector(".newgame-btn");

  newgamebtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  playagainbtn.addEventListener("click", () => {
    resetGame();

    player1 = localStorage.getItem("player1");
    player2 = localStorage.getItem("player2");

    document.querySelector(".outer-div").style.display = "block";
    document.querySelector(".endgame-div").style.display = "none";
  });

  const gameArr = Array(9).fill(0);
  let flag = false;
  let count = 0;

  for (let i = 0; i < 9; i++) {
    const currEle = document.getElementById(`${i + 1}`);
    currEle.addEventListener("click", () => handleMove(i, currEle));
  }

  function handleMove(index, element) {
    if (gameArr[index] !== 0) return;

    const newEle = document.createElement("i");
    newEle.classList.add("fa-solid", flag ? "fa-o" : "fa-xmark", "fa-4x", "div-icon");
    newEle.style.color = flag ? "#3B93AA" : "#B197FC";
    element.appendChild(newEle);

    gameArr[index] = flag ? 2 : 1;
    flag = !flag;
    count++;

    const winner = isWon();
    let wonpara = document.querySelector(".won-para");

    if (winner) {
      document.querySelector(".outer-div").style.display = "none";
      document.querySelector(".inputs").style.display = "none";
      wonpara.textContent = `${winner === 1 ? player1 : player2} won the game !!!`;
      document.querySelector(".endgame-div").style.display = "block";
    } else if (count === 9) {
      document.querySelector(".outer-div").style.display = "none";
      document.querySelector(".inputs").style.display = "none";
      document.querySelector(".won-para").innerHTML = "Miracle Miracle <br> It's a draw!!!";
      document.querySelector(".endgame-div").style.display = "block";
    }
  }

  function isWon() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombinations) {
      if (gameArr[a] && gameArr[a] === gameArr[b] && gameArr[a] === gameArr[c]) {
        return gameArr[a];
      }
    }
    return 0;
  }

  function resetGame() {
    document.querySelectorAll(".icon").forEach(icon => icon.innerHTML = "");

    gameArr.fill(0);
    flag = false;
    count = 0;

    document.querySelector(".won-para").textContent = "";
    document.querySelector(".endgame-div").style.display = "none";
    document.querySelector(".inputs").style.display = "none";
    document.querySelector(".outer-div").style.display = "block";
  }

  document.querySelector(".reset-btn").addEventListener("click", resetGame);
});
