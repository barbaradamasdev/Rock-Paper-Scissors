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
/* main.appendChild(robot); */ //add the image at the end of main
button.before(robot);   //add the image before button, the firt element inside main

var danny = new Image (100, 100);
danny.src = 'images/danny.png';
danny.className = 'danny'
button.before(danny);


//FUNCTIONS
let playerSelection;
//PLAYROUND:
function playRound (inputChoice) {
            
    playerSelection = inputChoice;
    computerSelection = getComputerSelection();
    console.log('You choose: ' + playerSelection);      
    console.log('Your oponent choose: ' + computerSelection);

    switch (playerSelection) {
    case "Rock":
        if (computerSelection === 'Paper') {
            console.log('You Lose! Paper beats Rock');  
            return 'Computer';
        } else if (computerSelection === 'Rock') {
            console.log('Tied! Rock doesn`t beats Rock');  
            return 'Tied';
            
        } else if (computerSelection === 'Knife'){
            console.log('You Win! Rock beats Knife');  
            return 'Player';
        }
        break;
    case "Paper":
        if (computerSelection === 'Knife') {
            console.log('You Lose! Knife beats Paper');  
            return 'Computer';
        } else if (computerSelection === 'Paper') {
            console.log('Tied! Paper doesn`t beats Paper');  
            return 'Tied';
        } else if (computerSelection === 'Rock'){
            console.log('You Win! Paper beats Rock');  
            return 'Player';
        }
        break
    case "Knife":
        if (computerSelection === 'Rock') {
            console.log('You Lose! Rock beats Knife');  
            return 'Computer';
        } else if (computerSelection === 'Knife') {
            console.log('Tied! Knife doesn`t beats Knife');  
            return 'Tied';
        } else if (computerSelection === 'Paper'){
            console.log('You Win! Knife beats Paper');  
            return 'Player';
        }   
        break;
    }
    
}

function show () {
    instructionsText.style.display ='none';
    choices.style.display ='inherit';
    startButton.style.display ='none';
    const chooseYourWeapon = document.createElement ('h1');
    chooseYourWeapon.textContent = 'Choose your weapon:';
    choices.before(chooseYourWeapon);
    var inputChoice = document.getElementById("btnChoice").value;
    alert(inputChoice);
    game(inputChoice);
}

//GAME FUNCTION
function game (inputChoice) {
    let scoreReport = [];
    let winner;
   
    console.warn('Starting the game!'); //lixo

    for (let index = 0; index < 5; index++) {
        console.warn('Round ' + (index+1));
        scoreReport[index] = [('Round: ' + (index+1)), 'Winner: ' + playRound(inputChoice)];
    }
    console.log(scoreReport);
}

//COMPUTER ROLL:
const options = ['Rock', 'Paper', 'Knife'];
let computerSelection;
function getComputerSelection() {
    //Math.random = randomic number: 0.65436241685
    //* options.length = * 3 positions inside array
    //Math.floor = transform in int number
    return computerSelection = options[Math.floor(Math.random() * options.length)];
}


//Function when the input is text, we changed for button
/* function getPlayerSelection() {
    playerSelection = prompt("Choose between: Rock, Paper and Knife!");
    const firstLetter = playerSelection.charAt(0) //Capitalize only first letter
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = playerSelection.slice(1)
    const remainingLettersLow = remainingLetters.toLowerCase()
    playerSelection = firstLetterCap + remainingLettersLow
    return playerSelection;
} */

//Function to show instructions and weapons
function start() {
    button.style.display ='none';
    startText.style.display ='flex';
    startText.style.flexDirection ='column';
} 