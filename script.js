//Variables to catch document sections
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

// Danny and robot players
var robot = new Image (100, 100);
robot.src = 'images/robot.png';
robot.className = 'robot'
robot.style.left = 'var(--position0)';
button.before(robot);

var danny = new Image (100, 100);
danny.src = 'images/danny.png';
danny.className = 'danny'
danny.style.left = 'var(--position0)';
button.before(danny);

//Variables used in functions
let playerSelection;
let computerSelection;
let scoreReport = [];
let winner;
let positionDanny;
let positionRobot;
let positionWinner;
const options = ['rock', 'paper', 'knife'];
const raceSong = document.createElement ('audio');
const chooseYourWeapon = document.createElement ('h1'); 

//Function to show instructions and weapons
function start() {
    //Hide button and change display
    button.style.display ='none';
    startText.style.display ='flex';
    startText.style.flexDirection ='column';

    // Initial positions
    positionDanny = danny.style.left;
    positionRobot = robot.style.left;

    // Song play
    raceSong.src = 'audio/raceSong.mp3';
    raceSong.autoplay = 'true';
    main.appendChild(raceSong);
    raceSong.play();
} 

//After instructions, function to show weapons choices
function show () {
    //Hide text and button, show choices buttons
    choices.style.display ='inherit'; 
    instructionsText.style.display ='none';
    startButton.style.display ='none';
    startText.style.backgroundColor = 'rgba(255, 255, 255, 0.63)';
    
    //title 'Choose your weapon' before choices button
    chooseYourWeapon.textContent = 'Choose your weapon:';
    choices.before(chooseYourWeapon);
}

//Winner screen and Trophy image
const winnerScreen = document.createElement('div');
winnerScreen.className = 'winnerScreen';
winnerScreen.style.display = 'none';
main.before(winnerScreen);

var trophy = new Image (250, 300);
trophy.src = 'images/trophyWinner.png';
trophy.className = 'trophy'
winnerScreen.appendChild(trophy);

//Function
function theEnd () {
    const tryAgainText = document.createElement('button');
    const messageWinner = document.createElement('h1');
    const messageLoser = document.createElement('h1');

    danny.style.display ='none';
    robot.style.display ='none';
    
    startText.style.display = 'none'
    winnerScreen.style.display = 'inherit';

    //End the race song
    raceSong.currentTime = 0;
    raceSong.pause();
    raceSong.remove();
    
    if (winner === 'danny') {
        //Message to show
        messageWinner.textContent = "You won! The robot was destroyed, you saved the world!";
        messageWinner.className = 'messageWinner';
        main.before(messageWinner);
        
        //Song to play
        const winnerSound = document.createElement ('audio');
        winnerSound.src = 'audio/winnerSound.mp3';
        winnerSound.autoplay = 'true';
        winnerScreen.appendChild(winnerSound);

        winnerSound.play();
        
        //Change background
        winnerScreen.style.backgroundImage ='url(images/winnerScreenEnd.gif)'

        //Message try again to winner
        tryAgainText.textContent = "Doesn`t make any sense because you already saved the world, but do you wanna try again?";
        messageWinner.after(tryAgainText);
        
    } else if (winner === 'robot') {
        //Message to show
        messageLoser.textContent = "You lose! Humanity will be destroyed! Shame on you";
        messageLoser.className = 'messageLoser';
        main.before(messageLoser);
        
        //Songs to play
        const loserSound = document.createElement ('audio');
        loserSound.src = 'audio/loserSound.mp3';
        loserSound.autoplay = 'true';
        winnerScreen.appendChild(loserSound);
        
        const loserSound2 = document.createElement ('audio');
        loserSound2.src = 'audio/loserSound2.mp3';
        loserSound2.autoplay = 'true';
        winnerScreen.appendChild(loserSound2);

        loserSound.play();
        loserSound2.play();
        
        //Hide trophy and change background
        trophy.style.display = 'none';
        winnerScreen.style.backgroundImage ='url(images/loseScreenEnd.gif)'

        //Message try again to loser
        tryAgainText.textContent = "Doesn`t make any sense because you already destroyed the world, but do you wanna try again?";
        messageLoser.after(tryAgainText);
    }

    //Try again option
        tryAgainText.className = 'tryAgainText';
        tryAgainText.onclick = function () {
            danny.style.display ='inherit';
            robot.style.display ='inherit';
            
            startText.style.display = 'inherit'
            winnerScreen.style.display = 'none';
            messageLoser.style.display = 'none';
            messageWinner.style.display = 'none';
            tryAgainText.style.display = 'none';
            resultMessage.style.display = 'none';
            chooseYourWeapon.style.display = 'inherit';
            raceSong.play();
            
            danny.style.left = 'var(--position0)';
            robot.style.left = 'var(--position0)';
            positionDanny = danny.style.left;
            positionRobot = robot.style.left;
            
            start (); 
        };
        
        // Function to reload page
        // tryAgainText.onclick = function () {location.reload(start());};
}

//Computer random roll function:
function getComputerSelection() {
    //Math.random = randomic number: 0.65436241685
    //* options.length = * 3 positions inside array
    //Math.floor = transform in int number
    return computerSelection = options[Math.floor(Math.random() * options.length)];
}

//Move players
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

//Playround:
//Create the div for show the result (message and image)
let resultMessage = document.createElement ('div');
let message = document.createElement ('h1')
let imageLose = new Image (200, 200);

function playRound (input) {
    playerSelection = input;           
    computerSelection = getComputerSelection();
    console.warn('New round');
    console.log('Danny choose: ' + playerSelection);      
    
    //This was a solution to avoid tied
    if(playerSelection === computerSelection) {
        computerSelection = getComputerSelection();
    }
    console.log('Robot choose: ' + computerSelection);
    
    //Verify the winner
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

            //Console log just for verification
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

//Function to sandwich menu
function toggleMenu () {
    document.getElementById('infoText').classList.toggle('active');
}