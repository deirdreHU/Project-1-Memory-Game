//start the game,start button
const startElement = document.querySelector(".start-btn")
const timeElement = document.querySelector(".time")
startElement.addEventListener ("click", (event) => {
    const clickStart = event.target.parentElement
    overElement.style.display = 'none'
    getImages()
    let time = 0
    goTime = setInterval(()=> {
        time ++
        timeElement.innerHTML = formatSeconds(time)
    }, 1000)
    return
})

//timer function
let goTime = ''
const formatSeconds = (s) => {
    let t = '';
    if(s > -1){
        var hour = Math.floor(s/3600)
        var min = Math.floor(s/60) % 60
        var sec = s % 60
        if(hour < 10) {
            t = '0'+ hour + ":"
        } else {
            t = hour + ":"
        }
        if(min < 10){
            t += "0"
        }
        t += min + ":"
        if(sec < 10){
            t += "0"
        }
        t += sec
    }
    if (t === "00:00:00") {
        clearInterval(goTime)
    }
    // console.log(t)
    return t
}

//click settings button,pop-up will be shown
const settingsElement = document.querySelector(".set-btn")
const settings = document.querySelector('.setting-dialog')
const overElement = document.querySelector("#overlay");

settingsElement.addEventListener("click",function(event) {
    const clickSettings = event.target.parentElement
    settings.style.display = "flex"
    console.log(clickSettings)
})

//click confirm button, dialog will disapper
const confirm = document.querySelector(".btn-primary")

confirm.addEventListener("click",function() {
    overElement.style.display = "none";
    settings.style.display = "none";
    //restart timer
    let time = 0
    clearInterval(goTime)
    goTime = setInterval(()=> {
        time ++
        timeElement.innerHTML = formatSeconds(time)
    }, 1000)
    //generate images
    getImages() 
    // console.log(cate,num)
})

// generate the images

async function getImages() {
    let num = document.querySelector("#numOfCardGroupSelect01").value;
    let cate = document.querySelector("#categoryGroupSelect01").value;
    fetch(
      `https://api.unsplash.com/photos?client_id=WA0EpeaTH9kcq_HhlabuIubCSs6n4v3jvmhedPjk2G0&query=${cate}&per_page=${num / 2}&page=1`
    )
    .then(response => response.json())
    .then(data => {
       randomize(data)
       console.log(data)
    })
    .catch(error => {
        console.log(error)
    });
}
const section = document.querySelector("section")
const cardsBoard = document.querySelector(".cards")
//Randomize the images
const randomize = (data) => {
    const cardData = data.concat(data);
    cardData.sort(() => Math.random() - 0.5);
    cardsBoard.innerHTML = ""
    // console.log(cardData)
    cardGenerator(cardData)
}


//card generate function
const cardGenerator = (data) => {
    const cardData = data;
    // console.log(data)
    cardData.forEach((item) => {
        const playCard = document.createElement("div");
        const front = document.createElement("img");
        const back = document.createElement("div");
        playCard.classList = "playCard"   ;
        front.classList = "front";
        back.classList = "back";
        cardsBoard.appendChild(playCard);
        playCard.appendChild(front);
        playCard.appendChild(back);
        front.src = item.urls.small;
        front.setAttribute("name", item.id)
        //add click event
        playCard.addEventListener ("click", (event) => {
            playCard.classList.add ("toggleCard");
            checkCards(event);
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
            console.log('done')
        } else {
            flippedCard.forEach((playCard) => {
                playCard.classList.remove("flipped");
                // setTimeout(( )=> card.classList.remove("toggleCard"),1000);
            })
            const flippedCard1 = document.querySelectorAll(".toggleCard");
            flippedCard1.forEach((playCard) => {
                setTimeout(( )=> playCard.classList.remove("toggleCard"),1000);
            })

        }
    }
}
