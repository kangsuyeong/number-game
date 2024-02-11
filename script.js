//랜덤 넘버생성
let computerNumber = 0;
let inputNumber = document.getElementById("input-number")
let playButton = document.getElementById("play-button")
let resetButton = document.getElementById("reset-button")
let resultArea = document.getElementById("result-area")
let chanceArea = document.getElementById("chance-area")
let resultAreaImg = document.querySelector(".img-size");
let chances =5
let gameOver = false
let history =[]


playButton.addEventListener("click",play)
resetButton.addEventListener("click",reset)
inputNumber.addEventListener("focus",function(){
    inputNumber.value=""})

pickRandomNumber()
function pickRandomNumber(){
    computerNumber = Math.floor(Math.random()*100)+1 //0~100까지 랜덤넘버 생성
    console.log("정답은 : ",computerNumber)
}

function play(){
    let userValue = inputNumber.value

    if(userValue<1 || userValue>100){
        resultArea.textContent="1~100범위의 숫자를 입력하세요"
        return;
    }
    if(history.includes(userValue)){
        resultArea.textContent="동일한 숫자를 이미 입력하였습니다"
        return;
    }

    chances--;
    chanceArea.textContent=`남은 횟수 : ${chances}`
    
    //정답 유추
    if(userValue<computerNumber){
        resultArea.textContent="UP"
        resultAreaImg.src="./src/up.png"
    }
    else if(userValue>computerNumber){
        resultArea.textContent="DOWN"
        resultAreaImg.src="./src/down.png"
    }
    else{
        resultArea.textContent="CORRECT"
        resultAreaImg.src="./src/correct.png"
        gameOver = true
    }
    history.push(userValue)

    // 기회를 다쓰면 gameOver
    if(chances<1){
        gameOver = true
        resultArea.textContent="FAIL"
        resultAreaImg.src="./src/fail.png"
    }

    
    if(gameOver){
        playButton.disabled =true
    }

}

function reset(){
    chances = 5 //기회 5번으로 바꾸기
    gameOver = false //게임진행 처음으로 바꾸기
    resultArea.textContent="여기에 숫자를 입력해주세요" //입력창 바꾸기
    chanceArea.textContent=`남은 횟수 : ${chances}`
    inputNumber.value=""
    resultAreaImg.src="./src/soju.png"
    playButton.disabled =false
    history = [];
    pickRandomNumber()
}