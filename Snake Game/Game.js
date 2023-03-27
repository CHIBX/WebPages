let reset=document.getElementById('resetBtn');
let startBtn=document.getElementById('startBtn');
let level = document.querySelector('select');
let score=0;
let Id;
let speed;
let scoreText=document.querySelector('#score');
let canvas=document.querySelector('canvas');
let ctx=canvas.getContext('2d');
let speedRatio;

let running = true;
let unitSize=25;
let snake=[
    {x: unitSize*4, y:0},
    {x: unitSize*3, y:0},
    {x: unitSize*2, y:0},
    {x: unitSize, y:0},
    {x: 0, y:0}
]
let foodY;
let foodX;
let gameOver;
let xVelocity=unitSize;
let yVelocity=0;
let snakeColor='rgb(20, 35, 210)';
let foodColor='rgb(200, 10, 100)';
startBtn.focus();
if(localStorage.getItem('highScore')===null){
    document.querySelector('.high-score').textContent=`Your High Score Is: 0`;
 }
 else{
    document.querySelector('.high-score').textContent=`Your High Score Is: ${localStorage.getItem('highScore')}`;
 }
 if(parseInt(localStorage.getItem('highScore')) < score){
    localStorage.setItem('highScore', score);
    document.querySelector('.high-score').textContent=`Your High Score Is: ${localStorage.getItem('highScore')}`;
 }

drawSnake();
CreateFood();
drawFood();
window.addEventListener("keydown", ChangeDirection)
reset.addEventListener("click", ResetGame);
startBtn.addEventListener('click', StartGame)
function StartGame(){
    scoreText.textContent=score;
    gameOver=false;
    if(!gameOver){
        checkLevel();
        if(level.options[0].selected || speed===undefined){
            alert('You need to pick a level of difficulty first');
            level.focus()
            return;
        }
        running=true;
        level.disabled=true;
        startBtn.textContent=' Pause Game ';
        startBtn.removeEventListener('click', StartGame)
        startBtn.addEventListener('click', pauseGame);
        NextMove();
        drawSnake();   
    }
}

function pauseGame(){
    if(running && speed){
        running=false;
        startBtn.textContent=' Continue ';
        startBtn.removeEventListener('click', pauseGame)
        startBtn.addEventListener('click', StartGame);
    }
}

function ResetGame(){
    if (gameOver||!running) {
        clearTimeout(Id);
        clearBoard();
        score=0;
        scoreText.textContent=score;
        xVelocity=unitSize;
        yVelocity=0;
        snake=[
            {x: unitSize*4, y:0},
            {x: unitSize*3, y:0},
            {x: unitSize*2, y:0},
            {x: unitSize, y:0},
            {x: 0, y:0}
        ]
        // gameOn=undefined;
        drawSnake();
        CreateFood();
        drawFood();
        running=true;
        gameOver=undefined;
        document.querySelector('.high-score').textContent=`Your High Score Is: ${localStorage.getItem('highScore')}`;
        startBtn.focus();
        level.disabled=false;
        startBtn.textContent=' Start Game ';
        startBtn.removeEventListener('click', pauseGame)
        startBtn.addEventListener('click', StartGame);
    }
}
function checkLevel(){
   let levelIndex=level.selectedIndex;
   speedRatio=parseFloat(level.options[levelIndex].value)
   speed=50 * speedRatio;
   
}

function GameOver(){
 speedRatio=undefined;
 reset.focus();
 ctx.textAlign='center';
 ctx.font='24px Algerian'
 ctx.fillStyle='red'
 ctx.fillText(`GAME OVER! YOU GOT ${score} POINTS`, canvas.width/2, canvas.height/2)   

 if(localStorage.getItem('highScore')===null){
    localStorage.setItem('highScore', score)
    document.querySelector('.high-score').textContent=`Your High Score Is: 0`;
    return ;
}
else{
    document.querySelector('.high-score').textContent=`Your High Score Is: ${localStorage.getItem('highScore')}`;
}

 if(parseInt(localStorage.getItem('highScore')) < score){
    localStorage.setItem('highScore', score);
     document.querySelector('.high-score').textContent=`Your High Score Is: ${localStorage.getItem('highScore')}`;
 }
}

function ChangeDirection(e){
   let LEFT=37;
   let UP=38;
   let RIGHT=39;
   let DOWN=40;
   let goingUp=(yVelocity==-unitSize),
   goingDown=(yVelocity==unitSize),
   goingLeft=(xVelocity==-unitSize),
   goingRight=(xVelocity==unitSize);
   switch (true){
    case (e.keyCode==DOWN && !goingUp) :
    yVelocity=unitSize;
    xVelocity=0;
    break;
    case (e.keyCode==UP && !goingDown) :
        yVelocity=-unitSize;
        xVelocity=0;
    break;
    case (e.keyCode==LEFT && !goingRight) :
        xVelocity=-unitSize;
        yVelocity=0;
    break;
    case (e.keyCode==RIGHT && !goingLeft) :
        xVelocity=unitSize;
        yVelocity=0;
    break;    
   }
   
}

function checkGameOver(){
    if(snake[0].x==canvas.height || snake[0].y==canvas.width ||snake[0].x< 0 || snake[0].y<0){
        running=false;
        gameOver=true;
        GameOver();
        speed=undefined;
        return;
    }
    for(let i=1; i<snake.length; i++){
       if(snake[0].x== snake[i].x && snake[0].y== snake[i].y){
        running=false;
        gameOver=true;
        GameOver();
        speed=undefined;
        return;
       }
    }
}

function clearBoard() {
  ctx.fillStyle='white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function CreateFood(){

    function randomNum(min, max){
      return Math.round((Math.random()*(max - min) + min)/unitSize)*unitSize
    }
    foodY=randomNum(0, canvas.height - unitSize);
    foodX=randomNum(0, canvas.width - unitSize);
    snake.forEach(part=>{
        if(foodX==part.x ||foodY==part.y){
        foodY=randomNum(0, canvas.height - unitSize);
        foodX=randomNum(0, canvas.width - unitSize);
        }
    })
            ctx.fillStyle=foodColor;
            ctx.strokeStyle=foodColor;
            ctx.fillRect(foodX, foodY, unitSize, unitSize);
            ctx.strokeRect(foodX, foodY, unitSize, unitSize);
            
}

function drawSnake(){
    ctx.fillStyle=snakeColor;
    ctx.strokeStyle='black';
    ctx.lineWidth=0.5;
    snake.forEach((parts, i)=>{
        ctx.fillRect(parts.x, parts.y, unitSize, unitSize);
        ctx.strokeRect(parts.x, parts.y, unitSize, unitSize);
    });
    
}

function NextMove(){
    if(!gameOver && running){
      snake.forEach(part=>{
          if(!(part.x==foodX && part.y==foodY)){
              ctx.fillStyle='transparent';
              ctx.strokeStyle='transparent';
              ctx.fillRect(foodX, foodY, unitSize, unitSize);
              ctx.strokeRect(foodX, foodY, unitSize, unitSize);
      }
      })
    Id=setTimeout(()=>{
            clearBoard();
            drawFood();
            MoveSnake();
            drawSnake();
            checkGameOver();
            NextMove();
            }, speed);
    }     
}

function MoveSnake(){
   const head={x: snake[0].x + xVelocity, y: snake[0].y + yVelocity};
   snake.unshift(head);
   if(snake[0].x==foodX && snake[0].y==foodY){
      if(level.options[1].selected){ score+=1; }
      else if(level.options[2].selected){ score+=3; }
      else if(level.options[3].selected){ score+=5; }
      else if(level.options[4].selected){ score+=6; }
      else if(level.options[5].selected){ score+=8; }
      else if(level.options[6].selected){ score+=10; }
      scoreText.textContent=score;
      setTimeout(()=>{
          CreateFood();
      }, Math.floor(Math.random()* 800));
    }
   else{
     snake.pop();
   }
}

function drawFood(){
    ctx.fillStyle=foodColor;
    ctx.strokeStyle='black';
    ctx.lineWidth=0.5;
    ctx.fillRect(foodX, foodY, unitSize, unitSize);
    ctx.strokeRect(foodX, foodY, unitSize, unitSize)
}
