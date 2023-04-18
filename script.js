//PLAYROUND:
function playRound () {
            
    playerSelection = getPlayerSelection();
    
    if ((playerSelection === 'Rock') || (playerSelection === 'Paper') || (playerSelection === 'Scissors')){
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
                
            } else if (computerSelection === 'Scissors'){
                console.log('You Win! Rock beats Scissors');  
                return 'Player';
            }
            break;
        case "Paper":
            if (computerSelection === 'Scissors') {
                console.log('You Lose! Scissors beats Paper');  
                return 'Computer';
            } else if (computerSelection === 'Paper') {
                console.log('Tied! Paper doesn`t beats Paper');  
                return 'Tied';
            } else if (computerSelection === 'Rock'){
                console.log('You Win! Paper beats Rock');  
                return 'Player';
            }
            break
        case "Scissors":
            if (computerSelection === 'Rock') {
                console.log('You Lose! Rock beats Scissors');  
                return 'Computer';
            } else if (computerSelection === 'Scissors') {
                console.log('Tied! Scissors doesn`t beats Scissors');  
                return 'Tied';
            } else if (computerSelection === 'Paper'){
                console.log('You Win! Scissors beats Paper');  
                return 'Player';
            }   
            break;
    }

    } else {
        confirm('Maybe the name you said is wrong. Can you please say it again?');
        playRound();
    }
}

//GAME FUNCTION
function game () {
    let scoreReport = [];
    let winner;
    
    console.warn('Starting the game!');

    for (let index = 0; index < 5; index++) {
        console.warn('Round ' + (index+1));
        scoreReport[index] = [('Round: ' + (index+1)), 'Winner: ' + playRound()];
    }
    console.log(scoreReport);
}

//COMPUTER ROLL:
const options = ['Rock', 'Paper', 'Scissors'];
let computerSelection;
function getComputerSelection() {
    //Math.random = randomic number: 0.65436241685
    //* options.length = * 3 positions inside array
    //Math.floor = transform in int number
    return computerSelection = options[Math.floor(Math.random() * options.length)];
}

//PLAYER ROLL:
let playerSelection;
function getPlayerSelection() {
    playerSelection = prompt("Choose between: Rock, Paper and Scissors!");
    const firstLetter = playerSelection.charAt(0) //Capitalize only first letter
    const firstLetterCap = firstLetter.toUpperCase()
    const remainingLetters = playerSelection.slice(1)
    const remainingLettersLow = remainingLetters.toLowerCase()
    playerSelection = firstLetterCap + remainingLettersLow
    return playerSelection;
}