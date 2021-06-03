//Vertical Position will be strictly assigned to the bottom property of the dom
var verticalPosition = 200;
//Horizontal position will be strictly assigned to the left property of the dom
var horizontalPosition = 200;
var snake = document.querySelector(".snake1");
var playAgainBtn = document.querySelector(".playAgain");




//Score and highscore

var score = 0;
var highScore = 0;

function scoreAndHighScore(){
    document.querySelector("span.score").innerHTML = score;
    if(score > highScore){
        highScore = score;
    }
    document.querySelector("span.highScore").innerHTML = highScore;
    
    return "Added score and highScore";
}



//Has lost ?


var lostPopUpDisplayed = false;
//if hit the wall
function checkLoss(xAxis,yAxis){
    if(xAxis > 400 || xAxis < 0 || yAxis > 400 || yAxis < 0){
        return true;
    }else{
        return false;
    }    
}
//if the snake went encountered it's body part
function ateYourself(){
    for(var x= 1; x< snakeWrapperToArray.length;x++){
        if(snakeWrapperToArray[0].style.left == snakeWrapperToArray[x].style.left
            && snakeWrapperToArray[0].style.bottom == snakeWrapperToArray[x].style.bottom){
            return true;
        }
    }
    return false;
}


//****************Involving Basic Rules******************** */

function checkIfReversed(direction,previousDirection){
    
  if(direction == "w" && previousDirection == "s" || direction == "s" && previousDirection == "w" ||
  direction == "a" && previousDirection == "d" || direction == "d" && previousDirection == "a"){
      console.log("OVER HERERERRE");
      return true;
  }
}


var keepMoving;
var previousMovingDirection;
var clickedPlayAgain =false;


//****************RESET GAME****************** */
function playAgain(){
    clickedPlayAgain = true;
    lostPopUpDisplayed = false;
    document.querySelector(".lostPopUp").style.display = "none";
    snake.style.bottom = "200px";
    snake.style.left = "200px";
    horizontalPosition = 200;
    verticalPosition = 200;
    score = 0;
}

function removeAllParts(){
    while(snakeWrapper.childElementCount > 1){
        snakeWrapper.removeChild(snakeWrapper.lastChild);
        snakeWrapperToArray = Array.prototype.slice.call(snakeWrapper.children);
    }
    return "Removed all snake parts";
}




function move(object,direction){

    synergizeSnake();

clearTimeout(keepMoving);
    if(direction == "w"){
        verticalPosition+=10;
        object.style.bottom = `${verticalPosition}px`;
    }else if(direction == "s"){

        verticalPosition-=10;
        object.style.bottom = `${verticalPosition}px`;

    }else if(direction == "a"){

        horizontalPosition-=10;
        object.style.left = `${horizontalPosition}px`;

    }else if(direction == "d"){
        horizontalPosition+=10;
        object.style.left = `${horizontalPosition}px`;

    }else{
        return "Wrong Character";
    }
    keepMoving = window.setTimeout(move,150,object,direction);
    
    if(checkLoss(horizontalPosition,verticalPosition) == true || ateYourself() == true){
        document.querySelector(".lostPopUp").style.display = "flex";
        clearTimeout(keepMoving);
        lostPopUpDisplayed = true;
        scoreAndHighScore();
        removeAllParts();
    }

    snakeAteFood(direction);
    
    

   
    return "Just moved one slot";
}

var count =1;
window.addEventListener("keypress", function(event){
var key = event.key.toLowerCase();
    if(checkIfReversed(key, previousMovingDirection) || lostPopUpDisplayed == true|| 
    key != "a" && key != "d" && key != "w" && key != "s"){
        return;
    }
    move(snake,key);
    previousMovingDirection = key;

})


function roundToNearestTen(number){
    var lastNmb = number % 10;
    number-=lastNmb;
    lastNmb/=10;
    lastNmb = Math.round(lastNmb);
    return (lastNmb == 0)?number: number+=10;
}

//*******************EVERYTHING THAT INVOLVED FOOD*******************

var foodPositionXAxis = 0;
var foodPositionYAxis = 0;

var food = document.querySelector(".food");

function foodSpawn(min,max){
    var randHori = min + roundToNearestTen(Math.floor(Math.random() * (max - min + 1)));
    var randVerti = roundToNearestTen(min + Math.floor(Math.random() * (max - min + 1)));
    randHori = randHori - randHori % 10;
    randVerti = randVerti - randVerti % 10;
    food.style.display = "block";
    console.log(randHori + " " + randVerti);
    food.style.left = `${randHori}px`;
    food.style.bottom = `${randVerti}px`;
    /*
        Since the food element's positioning is absolute,left = 0 means it starts from the left of the map
        unlike the snake element(positioning relative and centered with flexbox), where its left = 0; means the
        center of the map.
        So to fix this gap two other variables will hold the x and y axis of the food element
        and subtract -200 from it so it's range will be between (-200px, 200px ), just like the snake.
    */
    foodPositionXAxis = randHori;
    foodPositionYAxis = randVerti;
    return "Just added some food for you";
}
foodSpawn(0,400);
function snakeAteFood(motion){
    if(horizontalPosition == foodPositionXAxis && verticalPosition == foodPositionYAxis){
        food.style.display = "none";
        score++; 
        addToSnake(motion);
        return foodSpawn(0,400);
    }
    return "Snake didn't eat the food yet.";
}


//Mutate snake

var snakeWrapper = document.querySelector(".snakeWrapper");
var snakeWrapperToArray = Array.prototype.slice.call(snakeWrapper.children);

function addToSnake(motion){
    var bodyPart = 1;
    var newSnakeBody = document.createElement("div");
    //Adding display none to the new part until it is position with the function spawnedSnakePosition
  
    bodyPart++;
    newSnakeBody.classList.add("snake1");

    //To give all the snake parts a different class
    newSnakeBody.classList.add(`snake${bodyPart}`);
    //add snake part to snake wrapper
    snakeWrapper.appendChild(newSnakeBody);
    snakeWrapperToArray.push(newSnakeBody);
    //Synergizing the snake again because a new part was added
    synergizeSnake();
}

function synergizeSnake(){
    var storePreviousHori= snakeWrapperToArray[0].style.left;
    var storePreviousVerti = snakeWrapperToArray[0].style.bottom;
    var tempHori = 0;
    var tempVerti = 0;
    for(var x = 1; x < snakeWrapperToArray.length; x++){
        snakePart = snakeWrapperToArray;

        tempHori = snakePart[x].style.left;
        tempVerti = snakePart[x].style.bottom;
        
        console.log("I'm looping nana nana");
        snakePart[x].style.left = storePreviousHori;
        snakePart[x].style.bottom = storePreviousVerti;

        storePreviousHori = tempHori;
        storePreviousVerti = tempVerti;
    }
}




