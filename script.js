const button = document.querySelector('button');
const main = document.querySelector('main');
const choices = document.querySelector('.choices');
const startText = document.querySelector('.startText');
const instructionsText = document.querySelector('.instructionsText');
const startButton = document.querySelector('#start');

// Danny and robot - mini on button hover
var robotButton = new Image (50, 50);
robotButton.src = 'images/robot.png';
robotButton.className = 'robotButton'
button.appendChild(robotButton);

var dannyButton = new Image (50, 50);
dannyButton.src = 'images/danny.png';
dannyButton.className = 'dannyButton'
button.appendChild(dannyButton);

// Danny and robot
var robot = new Image (100, 100);
robot.src = 'images/robot.png';
robot.className = 'robot'
robot.style.left = 'var(--position0)';
/* main.appendChild(robot); */ //add the image at the end of main
button.before(robot);   //add the image before button, the firt element inside main

var danny = new Image (100, 100);
danny.src = 'images/danny.png';
danny.className = 'danny'
danny.style.left = 'var(--position0)';
button.before(danny);


//Variables
let playerSelection;
let computerSelection;
let scoreReport = [];
let winner;
let positionDanny;
let positionRobot;
let positionWinner;
const options = ['rock', 'paper', 'knife'];

//Function to show instructions and weapons
function start() {
    button.style.display ='none';
    startText.style.display ='flex';
    startText.style.flexDirection ='column';
    positionDanny = danny.style.left;
    positionRobot = robot.style.left;
} 

//After instructions, function to show weapons choices
function show () {
    //Hide text and button, show choices buttons
    choices.style.display ='inherit'; 
    instructionsText.style.display ='none';
    startButton.style.display ='none';
    
    //title 'Choose your weapon' before choices button
    const chooseYourWeapon = document.createElement ('h1'); 
    chooseYourWeapon.textContent = 'Choose your weapon:';
    choices.before(chooseYourWeapon);
}

//Winner screen
const winnerScreen = document.createElement('div');
winnerScreen.className = 'winnerScreen';
winnerScreen.style.display = 'none';
main.before(winnerScreen);

var trophy = new Image (250, 300);
trophy.src = 'images/trophyWinner.png';
trophy.className = 'trophy'
winnerScreen.appendChild(trophy);

function theEnd () {
    danny.style.display ='none';
    robot.style.display ='none';
    
    startText.style.display = 'none'
    winnerScreen.style.display = 'inherit';
    
    if (winner = 'danny') {
        const messageWinner = document.createElement('h1');
        messageWinner.textContent = "You win! You did it!";
        messageWinner.className = 'messageWinner';
        main.before(messageWinner);
    }
    if (winner = 'robot') {
        const messageLoser = document.createElement('h1');
        messageLoser.textContent = "You lose! Humanity will be destroy! Shame on you";
        messageLoser.className = 'messageLoser';
        main.before(messageLoser);

        trophy.style.display = 'none';
        winnerScreen.style.backgroundImage ='url(images/lose02.gif)'
        winnerScreen.style.animation = 'none';
    }
    
}

//COMPUTER - random roll function:
function getComputerSelection() {
    //Math.random = randomic number: 0.65436241685
    //* options.length = * 3 positions inside array
    //Math.floor = transform in int number
    return computerSelection = options[Math.floor(Math.random() * options.length)];
}

function nextPosition () {
    if (winner === 'robot') {positionWinner = positionRobot};
    if (winner === 'danny') {positionWinner = positionDanny};
    switch (positionWinner) {
        case "var(--position0)":
            positionWinner = "var(--position1)";
            console.log(winner + 'agora na posicao 1')
            return positionWinner;
        case "var(--position1)":
            positionWinner = "var(--position2)";
            console.log(winner + 'agora na posicao 2')
            return positionWinner;
        case "var(--position2)":
            positionWinner = "var(--position3)";
            console.log(winner + 'agora na posicao 3')
            return positionWinner;
        case "var(--position3)":
            positionWinner = "var(--position4)";
            console.log(winner + 'agora na posicao 4 -ganhou')
            console.log('YOU DIT IT!');
            theEnd (winner);
            return positionWinner;
    }
}



//PLAYROUND:
function playRound (input) {
    playerSelection = input;           
    computerSelection = getComputerSelection();
    console.warn('partida nova');
    console.log('Danny choose: ' + playerSelection);      
    
    //This was a solution to avoid tied
    //Maybe is not fair enough with the player
    //The computer have other chance to play (but it is honest, so worked!)
    if(playerSelection === computerSelection) {
        computerSelection = getComputerSelection();
    }
    console.log('Robot choose: ' + computerSelection);
    
    switch (playerSelection) {
    case "rock":
        if (computerSelection === 'paper') {
            console.log('You Lose! Paper beats Rock');  
            winner = 'robot';

            robot.style.left = nextPosition(winner);
            positionRobot = robot.style.left;

            robot.style.transitionDuration = '1s';
            return positionRobot;
        /* } else if (computerSelection === 'rock') {
            console.log('Tied! Rock doesn`t beats Rock');   */
        } else if (computerSelection === 'knife'){
            console.log('You Win! Rock beats Knife');  
            winner = 'danny';

            danny.style.left = nextPosition(winner);
            positionDanny = danny.style.left;

            danny.style.transitionDuration = '1s';
            return positionDanny;
        }
        break;
    case "paper":
        if (computerSelection === 'knife') {
            console.log('You Lose! Knife beats Paper'); 
            winner = 'robot';

            robot.style.left = nextPosition(winner);
            positionRobot = robot.style.left;

            robot.style.transitionDuration = '1s';
            return positionRobot;
        /* } else if (computerSelection === 'paper') {
            console.log('Tied! Paper doesn`t beats Paper');   */
        } else if (computerSelection === 'rock'){
            console.log('You Win! Paper beats Rock');  
            winner = 'danny';

            danny.style.left = nextPosition(winner);
            positionDanny = danny.style.left;

            danny.style.transitionDuration = '1s';
            return positionDanny;
        }
        break
    case "knife":
        if (computerSelection === 'rock') {
            console.log('You Lose! Rock beats Knife');  
            winner = 'robot';

            robot.style.left = nextPosition(winner);
            positionRobot = robot.style.left;

            robot.style.transitionDuration = '1s';
            return positionRobot;
        /* } else if (computerSelection === 'knife') {
            console.log('Tied! Knife doesn`t beats Knife');  */ 
        } else if (computerSelection === 'paper'){
            console.log('You Win! Knife beats Paper');  
            winner = 'danny';

            danny.style.left = nextPosition(winner);
            positionDanny = danny.style.left;

            danny.style.transitionDuration = '1s';
            return positionDanny;
        }   
        break;
    }
    
}