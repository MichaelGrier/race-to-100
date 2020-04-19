/////////////////// Modal for Game Rules ////////////////////////

// Get the modal and modal button
var modal = document.getElementById('rulesModal');
var btn = document.querySelector('.btn-rules');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}

// When the user clicks on the <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}


/////////////////// Game ////////////////////////

// game variables
var scores, roundScore, activePlayer, gamePlaying;

// initialize new game
initialize();


// event handler for dice roll
document.querySelector('.btn-roll').addEventListener('click', function() {
    // check to see if game is being played
    if (gamePlaying) {
        // 1. generate random number between 1 and 6
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;


        // 2. display the result of the roll
        var diceDOM1 = document.getElementById('dice-1');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice1 + '.png'

        var diceDOM1 = document.getElementById('dice-2');
        diceDOM1.style.display = 'block';
        diceDOM1.src = 'dice-' + dice2 + '.png'

        // 3. update the current round score IF the number rolled was NOT a 1
        if (dice1 !== 1 && dice2 !== 1) {
            // add roll to current round score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;

        } else {
            // reset current round score to 0 and switch to next player
            nextPlayer();
        }
    }
});

// event handler for hold button
document.querySelector('.btn-hold').addEventListener('click', function() {
    // confirm that game is still in progress
    if (gamePlaying) {
        // 1. add current round score to total score and update ui
        scores[activePlayer] += roundScore;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // 2. check if active player has won the game
        var input = document.querySelector('.final-score').value // read value of "final score" input field
        if (input) { 
            winningScore = input;  // if value is set, use that value
        } else {
            winningScore = 100; // if not, set to default
        }

        if (scores[activePlayer] >= winningScore) {
            // update UI to indicate win
            document.querySelector('#dice-1').style.display = 'none';
            document.querySelector('#dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            document.querySelector('#name-' + activePlayer).textContent = 'winner';

            // end game
            gamePlaying = false;
        } else {
            // reset current round score to 0 and switch to next player
            nextPlayer();
        } 
    }
});

// switch active player 
function nextPlayer() {
    // reset current round score to 0 and switch to next player
    roundScore = 0;
    document.querySelector('#current-' + activePlayer).textContent = roundScore;

    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // update ui to reflect player change
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
};

// initialize new game
function initialize() {
    // reset scores
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    
    // reset ui
    document.querySelector('#dice-1').style.display = 'none';
    document.querySelector('#dice-2').style.display = 'none';

    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2'; 

    document.querySelector('.player-0-panel').classList.add('active');
};

// event handler for new game button
document.querySelector('.btn-new').addEventListener('click', initialize);

//document.querySelector('#current-' + activePlayer).textContent = dice;