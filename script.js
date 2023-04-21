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

const raceSong = document.createElement ('audio');
//Function to show instructions and weapons
function start() {
    button.style.display ='none';
    startText.style.display ='flex';
    startText.style.flexDirection ='column';
    positionDanny = danny.style.left;
    positionRobot = robot.style.left;

    raceSong.src = 'audio/raceSong.mp3';
    raceSong.autoplay = 'true';
    main.appendChild(raceSong);
    
    raceSong.play();
} 

const chooseYourWeapon = document.createElement ('h1'); 
//After instructions, function to show weapons choices
function show () {
    //Hide text and button, show choices buttons
    choices.style.display ='inherit'; 
    instructionsText.style.display ='none';
    startButton.style.display ='none';
    startText.style.backgroundColor = 'rgba(0, 0, 0, 0.767)';
    startText.style.color = 'white';
    
    //title 'Choose your weapon' before choices button
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
    
    if (winner === 'danny') {
        const messageWinner = document.createElement('h1');
        messageWinner.textContent = "You won! The robot was destroyed, you saved the world!";
        messageWinner.className = 'messageWinner';
        main.before(messageWinner);
        
        const winnerSound = document.createElement ('audio');
        winnerSound.src = 'audio/winnerSound.mp3';
        winnerSound.autoplay = 'true';
        winnerScreen.appendChild(winnerSound);

        raceSong.currentTime = 0;
        raceSong.pause();
        raceSong.remove();

        winnerSound.play();
        winnerScreen.style.backgroundImage ='url(images/winnerScreenEnd.gif)'
    } else if (winner === 'robot') {
        const messageLoser = document.createElement('h1');
        messageLoser.textContent = "You lose! Humanity will be destroyed! Shame on you";
        messageLoser.className = 'messageLoser';
        main.before(messageLoser);
        
        const loserSound = document.createElement ('audio');
        loserSound.src = 'audio/loserSound.mp3';
        loserSound.autoplay = 'true';
        winnerScreen.appendChild(loserSound);
        
        const loserSound2 = document.createElement ('audio');
        loserSound2.src = 'audio/loserSound2.mp3';
        loserSound2.autoplay = 'true';
        winnerScreen.appendChild(loserSound2);

        raceSong.currentTime = 0;
        raceSong.pause();
        raceSong.remove();

        loserSound.play();
        loserSound2.play();
        trophy.style.display = 'none';
        winnerScreen.style.backgroundImage ='url(images/loseScreenEnd.gif)'
    }
    
}

//COMPUTER - random roll function:
function getComputerSelection() {
    //Math.random = randomic number: 0.65436241685
    //* options.length = * 3 positions inside array
    //Math.floor = transform in int number
    return computerSelection = options[Math.floor(Math.random() * options.length)];
}

//MOVE CHARACTERS
function nextPosition () {
    if (winner === 'robot') {
        positionWinner = positionRobot
    } else if (winner === 'danny') {
        positionWinner = positionDanny
    };
    switch (positionWinner) {
        case "var(--position0)":
            positionWinner = "var(--position1)";
            return positionWinner;
        case "var(--position1)":
            positionWinner = "var(--position2)";
            return positionWinner;
        case "var(--position2)":
            positionWinner = "var(--position3)";
            return positionWinner;
        case "var(--position3)":
            positionWinner = "var(--position4)";
            theEnd (winner);
            break;
    }
}

//PLAYROUND:
let resultMessage = document.createElement ('div');
let message = document.createElement ('h1')
let imageLose = new Image (250, 250);
function playRound (input) {
    playerSelection = input;           
    computerSelection = getComputerSelection();
    console.warn('Partida nova');
    console.log('Danny choose: ' + playerSelection);      
    
    //This was a solution to avoid tied
    if(playerSelection === computerSelection) {
        computerSelection = getComputerSelection();
    }
    console.log('Robot choose: ' + computerSelection);
    
    switch (playerSelection) {
    case "rock":
        if (computerSelection === 'paper') {
            
            /* Message winner/loser of round */
            chooseYourWeapon.style.display ='none';
            resultMessage.style.display ='flex';
            resultMessage.className = 'resultMessage';
            choices.before(resultMessage);

            message.textContent = 'You lose, LOL! Sorry, choose the next one';
            resultMessage.appendChild(message);

            imageLose.src = 'images/robotWinning0.gif';
            resultMessage.appendChild(imageLose);
            /* End of message winner/loser of round */

            console.log('You Lose! Paper beats Rock');  
            winner = 'robot';

            robot.style.left = nextPosition(winner);
            positionRobot = robot.style.left;

            robot.style.transitionDuration = '1s';
            return positionRobot;
        } else if (computerSelection === 'knife'){
            /* Message winner/loser of round */
            chooseYourWeapon.style.display ='none';
            resultMessage.style.display ='flex';
            resultMessage.className = 'resultMessage';
            choices.before(resultMessage);

            message.textContent = 'You dit it! Nailed it! Choose the next one';
            resultMessage.appendChild(message);

            imageLose.src = 'images/goodjob0.gif';
            resultMessage.appendChild(imageLose);
            /* End of message winner/loser of round */

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
            /* Message winner/loser of round */
            chooseYourWeapon.style.display ='none';
            resultMessage.style.display ='flex';
            resultMessage.className = 'resultMessage';
            choices.before(resultMessage);

            message.textContent = 'This was terrible, You tried to use the toilet paper, but the robot threw the rock and tore the paper! Choose the next one';
            message.style.fontSize = '1rem';
            resultMessage.appendChild(message);

            imageLose.src = 'images/robotWinning1.gif';
            resultMessage.appendChild(imageLose);
            /* End of message winner/loser of round */

            console.log('You Lose! Knife beats Paper'); 
            winner = 'robot';

            robot.style.left = nextPosition(winner);
            positionRobot = robot.style.left;

            robot.style.transitionDuration = '1s';
            return positionRobot;
        } else if (computerSelection === 'rock'){
            /* Message winner/loser of round */
            chooseYourWeapon.style.display ='none';
            resultMessage.style.display ='flex';
            resultMessage.className = 'resultMessage';
            choices.before(resultMessage);

            message.textContent = 'Tha paper envolved the rock, this make total sense, you dit it! Choose the next one';
            resultMessage.appendChild(message);

            imageLose.src = 'images/goodjob3.gif';
            resultMessage.appendChild(imageLose);
            /* End of message winner/loser of round */
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
            /* Message winner/loser of round */
            chooseYourWeapon.style.display ='none';
            resultMessage.style.display ='flex';
            resultMessage.className = 'resultMessage';
            choices.before(resultMessage);

            message.textContent = 'He used a stone to deflect the blade of your knife! Try again!';
            resultMessage.appendChild(message);

            imageLose.src = 'images/robotWinning2.gif';
            resultMessage.appendChild(imageLose);
            /* End of message winner/loser of round */

            console.log('You Lose! Rock beats Knife');  
            winner = 'robot';

            robot.style.left = nextPosition(winner);
            positionRobot = robot.style.left;

            robot.style.transitionDuration = '1s';
            return positionRobot;
        } else if (computerSelection === 'paper'){
             /* Message winner/loser of round */
             chooseYourWeapon.style.display ='none';
             resultMessage.style.display ='flex';
             resultMessage.className = 'resultMessage';
             choices.before(resultMessage);
 
             message.textContent = 'You totally nailed it! You rent the paper he threw. Amazing!';
             resultMessage.appendChild(message);
 
             imageLose.src = 'images/goodjob1.gif';
             resultMessage.appendChild(imageLose);
             /* End of message winner/loser of round */
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