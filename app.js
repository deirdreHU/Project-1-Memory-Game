//start the game,start button
const startElement = document.querySelector(".start-btn");
const moveElement = document.querySelector(".moves");
const timeElement = document.querySelector(".time");

let moves = 0;
startElement.addEventListener("click", (event) => {
  const clickStart = event.target.parentElement;
  overElement.style.display = "none";
  getImages();
  moveElement.innerHTML = `Moves: 0`;
  let time = 0;
  goTime = setInterval(() => {
    time++;
    timeElement.innerHTML = formatSeconds(time);
  }, 1000);
  return;
});

//timer function
let goTime = "";
const formatSeconds = (s) => {
  let t = "";
  if (s > -1) {
    var hour = Math.floor(s / 3600);
    var min = Math.floor(s / 60) % 60;
    var sec = s % 60;
    if (hour < 10) {
      t = "0" + hour + ":";
    } else {
      t = hour + ":";
    }
    if (min < 10) {
      t += "0";
    }
    t += min + ":";
    if (sec < 10) {
      t += "0";
    }
    t += sec;
  }
  if (t === "00:00:00") {
    clearInterval(goTime);
  }
  return t;
};

//click settings button,pop-up will be shown
const settingsElement = document.querySelector(".set-btn");
const settings = document.querySelector("#setting-dialog");
const overElement = document.querySelector("#overlay");
settingsElement.addEventListener("click", function (event) {
  const clickSettings = event.target.parentElement;
  settings.style.display = "flex";
  console.log(clickSettings);
});

//click confirm button, dialog will disapper
const confirm = document.querySelector(".confirm");
confirm.addEventListener("click", function () {
  overElement.style.display = "none";
  settings.style.display = "none";
  // //clear moves
  moveElement.innerHTML = `Moves: 0`;
  //restart timer
  let time = 0;
  clearInterval(goTime);
  goTime = setInterval(() => {
    time++;
    timeElement.innerHTML = formatSeconds(time);
  }, 1000);
  //generate images
  getImages();
});

//click cancel button,dialog will be closed
const cancel = document.querySelector(".cancel");
cancel.addEventListener("click", function () {
  settings.style.display = "none";
});

// generate the images
async function getImages() {
  let num = document.querySelector("#numOfCardGroupSelect01").value;
  let cate = document.querySelector("#categoryGroupSelect01").value;
  fetch(
    `https://api.unsplash.com/photos?client_id=WA0EpeaTH9kcq_HhlabuIubCSs6n4v3jvmhedPjk2G0&query=${cate}&per_page=${
      num / 2
    }`
  )
    .then((response) => response.json())
    .then((data) => {
      randomize(data);
      console.log(data);
      image = data;
    })
    .catch((error) => {
      console.log(error);
    });
}
const section = document.querySelector("section");
const cardsBoard = document.querySelector(".cards");

//Randomize the images
const randomize = (data) => {
  const cardData = data.concat(data);
  cardData.sort(() => Math.random() - 0.5);
  cardsBoard.innerHTML = "";
  //   console.log(cardData)
  cardGenerator(cardData);
};

//card generate function
const cardGenerator = (data) => {
  const cardData = data;
  // console.log(data)
  cardData.forEach((item) => {
    const playCard = document.createElement("div");
    const front = document.createElement("img");
    front.setAttribute("name", item.id);
    front.src = item.urls.small;
    const back = document.createElement("div");
    playCard.classList = "playCard";
    front.classList = "front";
    back.classList = "back";
    cardsBoard.appendChild(playCard);
    playCard.appendChild(front);
    playCard.appendChild(back);

    //add click event
    playCard.addEventListener("click", (event) => {
      console.log(playCard.classList);
      if (JSON.stringify(playCard.classList).indexOf("toggleCard") <= 1) {
        moves++;
        moveElement.innerHTML = `Moves: ${moves}`;
        if (!goTime) {
          let time = 0;
          goTime = setInterval(() => {
            time++;
            timeElement.innerHTML = formatSeconds(time);
          }, 1000);
        }
        playCard.classList.add("toggleCard");
        checkCards(event);
      }
    });
  });
};

const checkCards = (event) => {
  const clickedCard = event.target;
  clickedCard.classList.add("flipped");
  const flippedCard = document.querySelectorAll(".flipped");
  const restartBox = document.querySelector("#restart-dialog");

  //verify whether match
  if (flippedCard.length === 2) {
    if (
      flippedCard[0].getAttribute("name") ===
      flippedCard[1].getAttribute("name")
    ) {
      flippedCard.forEach((item) => {
        item.classList.remove("flipped");
      });
      const toggleCard = document.querySelectorAll(".toggleCard");
      if (toggleCard.length === image.length * 2) {
        setTimeout(() => (restartBox.style.display = "flex"), 2000);
        setTimeout(() => (overElement.style.display = "flex"), 2000);
        clearInterval(goTime);
      }
    } else {
      flippedCard.forEach((playCard) => {
        console.log(playCard.parentElement);
        setTimeout(
          () => playCard.parentElement.classList.remove("toggleCard"),
          1000
        );
        playCard.classList.remove("flipped");
      });
    }
  }
};

//restart the game when all cards are toggled
const restartElement = document.querySelector(".restart-btn");
const removeDiaElement = document.querySelector("#restart-dialog");
const toggleElement = document.querySelectorAll(".toggleCard");

restartElement.addEventListener("click", (event) => {
  toggleElement.forEach((playCard) => {
    playCard.classList.remove("toggleCard");
  });
  removeDiaElement.style.display = "none";
  moveElement.innerHTML = `Moves: 0`;
  // let time = 0;
  // moves = 0;
});

//music control
const muteMusic = document.querySelector(".play-btn");
const playMusic = document.querySelector(".mute-btn");
const music = document.querySelector("#background");

muteMusic.onclick = function () {
  music.pause();
  muteMusic.style.display = "none";
  playMusic.style.display = "flex";
};

playMusic.onclick = function () {
  music.play();
  muteMusic.style.display = "flex";
  playMusic.style.display = "none";
};


//give hints

const hintShown = document.querySelector(".hint-btn");


hintShown.addEventListener("click", (event) => {
  //get all the data based on the existing cards
  const playCards = document.querySelectorAll(".playCard");
  const toggleCard = document.querySelectorAll(".toggleCard")
  //all playCards should be shown as "togglecards" (flipped)
  let toFlip = [];
  playCards.forEach((item) => {
    if(!item.classList.contains("toggleCard")) {
      toFlip.push(item);
    }
  });
  console.log(toFlip)

  toFlip.forEach(item => {
    item.classList.add("toggleCard");
  });

  setTimeout(() => {
    toFlip.forEach(item => {
      item.classList.remove("toggleCard");
    });
  }, 3000);
});