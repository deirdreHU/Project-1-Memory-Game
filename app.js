//start the game,start button
const startElement = document.querySelector(".start-btn");
const moveElement = document.querySelector(".moves")
const timeElement = document.querySelector(".time");
let moves = 0
startElement.addEventListener("click", (event) => {
  const clickStart = event.target.parentElement;
  overElement.style.display = "none";
  getImages();
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
const settings = document.querySelector(".setting-dialog");
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
  //restart timer
  let time = 0;
  clearInterval(goTime);
  goTime = setInterval(() => {
    time++;
    timeElement.innerHTML = formatSeconds(time);
  }, 1000);
  //generate images
  getImages();
  //clear moves
  let moves = 0;
});

//click cancel button,dialog will be closed
const cancel = document.querySelector(".cancel");
cancel.addEventListener("click",function () {
    settings.style.display = "none";
})

// generate the images
async function getImages() {
  let num = document.querySelector("#numOfCardGroupSelect01").value;
  let cate = document.querySelector("#categoryGroupSelect01").value;
  fetch(
    `https://api.unsplash.com/photos?client_id=WA0EpeaTH9kcq_HhlabuIubCSs6n4v3jvmhedPjk2G0&query=${cate}&per_page=${
      num / 2}`
  )
    .then((response) => response.json())
    .then((data) => {
      randomize(data);
      console.log(data);
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
    playCard.addEventListener ("click", (event) => {
        console.log(playCard.classList)
        if(JSON.stringify(playCard.classList).indexOf('toggleCard') <= 1){
            moves ++
            moveElement.innerHTML = `Moves: ${moves}`
            if(!goTime){
                let time = 0
                goTime = setInterval(()=> {
                    time ++
                    timeElement.innerHTML = formatSeconds(time)
                }, 1000)
            }
            playCard.classList.add('toggleCard');
            checkCards(event);
        }
    })
});
};

const checkCards = (event) => {
    const clickedCard = event.target;
    clickedCard.classList.add("flipped");
    const flippedCard = document.querySelectorAll(".flipped");

    //verify whether match
    if(flippedCard.length === 2){
        if(
            flippedCard[0].getAttribute("name") === flippedCard[1].getAttribute("name")
        ) {
            flippedCard.forEach(item =>{
                item.classList.remove("flipped")
            })
            const flippedCard1 = document.querySelectorAll(".toggleCard");
            if(flippedCard1.length === Image.length){
                console.log(Image.length)
                clearInterval(goTime)
                overElement.style.display = "shown";
            }
        } else {
            flippedCard.forEach((playCard) => {
                console.log(playCard.parentElement)
                setTimeout(( )=> playCard.parentElement.classList.remove("toggleCard"),1000);
                playCard.classList.remove("flipped");
            })
        }
    }
}



