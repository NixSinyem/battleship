//Game Timer
var secleft = 90;
var downloadTimer = setInterval(function(){
    secleft--;
    document.getElementById("countdowntimer").innerHTML = 'Mission Time: ' + secleft + ' seconds';
    if(secleft <= 0){
        clearInterval(downloadTimer);
		
		console.log('Game Over!');
			
		localStorage.setItem('result', '0');
			
		alert('Time Up! Assault failed!');
		location.href = 'clear.html';			
    }
},1000);

// Object to represent player
var player = {
    shotCounter: 30,

    // Method to shoot at a guessed position.
    shootPosition: function(letter, number) {
        this.shotCounter--;
        document.getElementById('shotCounter').innerHTML = ' Shots: ' + this.shotCounter;
        if (enemy.shootResponse(letter, number)) {       
			return true;
        } else {
            return false;
        }
    }
};

// Object to represent enemy
var enemy = {
    numShips : 4,
    carrierHP:    5,
    battleshipHP: 4,
    cruiserHP:    3,
    destroyerHP:  2,
		
    // Method to calculate whether a shot hits, and respond appropriately.
    shootResponse: function(x, y) {
        var shotValue = this.board[y][x];

        if (shotValue > 0) { // if shotValue > 0, then there is a ship.
            console.log('Hit!');
            boardUI.setMessage('Woohoo! It\'s a hit!');
            switch (shotValue) { // Check which type of ship it is.
                case 2: // Destroyer
                    this.destroyerHP--;
                    if (this.destroyerHP === 0) {
                        console.log('You sunk my destroyer!');
                        boardUI.appendMessage('You sunk my destroyer!');
                        this.numShips--;
                        document.getElementById('shipsRemaining').innerHTML = 'Enemy suriving ships: ' + this.numShips;
                    }
                    break;
                case 3: // Cruiser
                    this.cruiserHP--;
                    if (this.cruiserHP === 0) {
                        console.log('You sunk my cruiser!');
                        boardUI.appendMessage('You sunk my cruiser!');
                        this.numShips--;
                        document.getElementById('shipsRemaining').innerHTML = 'Enemy suriving ships: ' + this.numShips;
                    }
                    break;
                case 4: // Battleship
                    this.battleshipHP--;
                    if (this.battleshipHP === 0) {
                        console.log('You sunk my battleship!');
                        boardUI.appendMessage('You sunk my battleship!');
                        this.numShips--;
                        document.getElementById('shipsRemaining').innerHTML = 'Enemy suriving ships: ' + this.numShips;
                    }
                    break;
                case 5: // Carrier
                    this.carrierHP--;
                    if (this.carrierHP === 0) {
                        console.log('You sunk my carrier!');
                        boardUI.appendMessage('You sunk my carrier!');
                        this.numShips--;
                        document.getElementById('shipsRemaining').innerHTML = 'Enemy suriving ships: ' + this.numShips;
                    }
                    break;
            }
            this.board[y][x] = -1;
        } else if(shotValue == -2 ){
			console.log('You\'ve already shot here! Please select another square!');
			boardUI.setMessage('You\'ve already shot here! Please select another square!');					
			return false;
		}else if (shotValue == -1) {
            console.log('You\'ve already shot an enemy here! Please select another square!');
			boardUI.setMessage('You\'ve already shot an enemy here! Please select another square!');
            return true;
        } else {
            console.log('Miss!');
            boardUI.setMessage('Doh! You missed. Shoot again!');
			this.board[y][x] = -2;
            return false;
        }
		
        // When number of ships is 0, game is over.
        if (this.numShips === 0) {
			console.log('Congratulations, you won the game!');
            console.log('It only took you ' + player.shotCounter + ' shots!');
			
			localStorage.setItem('result', '1');
			localStorage.setItem('shots', (30 - player.shotCounter));
			localStorage.setItem('time', (90 - secleft));
			
			alert('Congratulations, you won the game!');
			location.href = 'clear.html';
        }
        return true;
    }
};

//This section of the script generates a random number in a range from 1 to 5,
//Switch case statement is used to determine the playing grid of the game based on the randomly generated number to avoid repetition.
var stageNum = Math.floor((Math.random() * 10) + 1);
switch(stageNum){
	case 1:
		      //  x =  0  1  2  3  4  5  6  
		enemy.board= [[0, 0, 0, 0, 0, 0, 0],     // y = 0
				      [0, 0, 0, 0, 0, 0, 0],     // y = 1
				      [0, 5, 5, 5, 5, 5, 0],     // y = 2
					  [4, 0, 0, 0, 0, 0, 0],     // y = 3
					  [4, 0, 0, 0, 0, 0, 0],     // y = 4
					  [4, 0, 3, 3, 3, 0, 2],     // y = 5
					  [4, 0, 0, 0, 0, 0, 2]]     // y = 6
		break;
	case 2:
			//  x =  0  1  2  3  4  5  6  
		enemy.board= [[2, 2, 0, 0, 0, 0, 0],     // y = 0
					  [0, 0, 4, 0, 5, 0, 0],     // y = 1
					  [0, 0, 4, 0, 5, 0, 0],     // y = 2
					  [0, 0, 4, 0, 5, 0, 0],     // y = 3
					  [0, 0, 4, 0, 5, 0, 0],     // y = 4
					  [0, 0, 0, 0, 5, 0, 0],     // y = 5
					  [3, 3, 3, 0, 0, 0, 0]]     // y = 6	
		break;
		
	case 3:
		    //  x =  0  1  2  3  4  5  6  
		enemy.board= [[3, 3, 3, 0, 0, 0, 0],     // y = 0
					  [0, 0, 0, 0, 2, 2, 0],     // y = 1
					  [0, 0, 0, 0, 0, 0, 0],     // y = 2
					  [4, 4, 4, 4, 0, 0, 0],     // y = 3
					  [0, 0, 0, 0, 0, 0, 0],     // y = 4
					  [0, 0, 0, 0, 0, 0, 0],     // y = 5
					  [5, 5, 5, 5, 5, 0, 0]]     // y = 6
		break;
				
	case 4:
			//  x =  0  1  2  3  4  5  6  
		enemy.board= [[0, 0, 0, 0, 3, 3, 3],     // y = 0
					  [0, 0, 0, 0, 0, 0, 0],     // y = 1
					  [2, 2, 0, 0, 4, 0, 5],     // y = 2
					  [0, 0, 0, 0, 4, 0, 5],     // y = 3
					  [0, 0, 0, 0, 4, 0, 5],     // y = 4
					  [0, 0, 0, 0, 4, 0, 5],     // y = 5
					  [0, 0, 0, 0, 0, 0, 5]]     // y = 6	
		break;
				
	case 5:
			//  x =  0  1  2  3  4  5  6  
		enemy.board= [[0, 0, 0, 0, 0, 0, 0],     // y = 0
					  [0, 0, 5, 5, 5, 5, 5],     // y = 1
					  [0, 3, 0, 0, 0, 0, 0],     // y = 2
					  [0, 3, 0, 2, 2, 0, 0],     // y = 3
					  [0, 3, 0, 0, 0, 0, 0],     // y = 4
					  [0, 0, 0, 0, 0, 0, 0],     // y = 5
					  [0, 0, 0, 4, 4, 4, 4]]     // y = 6	
		break;

	case 6:
			//  x =  0  1  2  3  4  5  6  
		enemy.board= [[0, 0, 0, 5, 0, 0, 0],     // y = 0
					  [2, 2, 0, 5, 0, 0, 0],     // y = 1
					  [0, 0, 0, 5, 0, 0, 0],     // y = 2
					  [0, 0, 0, 5, 0, 4, 0],     // y = 3
					  [0, 0, 0, 5, 0, 4, 0],     // y = 4
					  [0, 0, 0, 0, 0, 4, 0],     // y = 5
					  [0, 3, 3, 3, 0, 4, 0]]     // y = 6	
		break;

	case 7:
			//  x =  0  1  2  3  4  5  6  
		enemy.board= [[4, 0, 0, 0, 0, 3, 0],     // y = 0
					  [4, 0, 0, 0, 0, 3, 0],     // y = 1
					  [4, 0, 0, 0, 0, 3, 0],     // y = 2
					  [4, 0, 2, 2, 0, 3, 0],     // y = 3
					  [0, 0, 0, 0, 0, 0, 0],     // y = 4
					  [0, 5, 5, 5, 5, 5, 0],     // y = 5
					  [0, 0, 0, 0, 0, 0, 0]]     // y = 6	
		break;
		
	case 8:
			//  x =  0  1  2  3  4  5  6  
		enemy.board= [[0, 0, 0, 0, 0, 0, 0],     // y = 0
					  [0, 5, 0, 0, 0, 0, 0],     // y = 1
					  [0, 5, 0, 0, 0, 0, 3],     // y = 2
					  [0, 5, 0, 0, 2, 0, 3],     // y = 3
					  [0, 5, 0, 0, 2, 0, 3],     // y = 4
					  [0, 5, 0, 0, 0, 0, 0],     // y = 5
					  [0, 0, 0, 4, 4, 4, 4]]     // y = 6	
		break;			

	case 9:
			//  x =  0  1  2  3  4  5  6  
		enemy.board= [[0, 0, 0, 0, 0, 0, 4],     // y = 0
					  [0, 2, 0, 0, 0, 0, 4],     // y = 1
					  [0, 2, 0, 0, 5, 0, 4],     // y = 2
					  [0, 0, 3, 0, 5, 0, 4],     // y = 3
					  [0, 0, 3, 0, 5, 0, 0],     // y = 4
					  [0, 0, 3, 0, 5, 0, 0],     // y = 5
					  [0, 0, 0, 0, 5, 0, 0]]     // y = 6	
		break;			

	case 10:
			//  x =  0  1  2  3  4  5  6  
		enemy.board= [[0, 0, 5, 5, 5, 5, 5],     // y = 0
					  [0, 0, 0, 0, 0, 0, 0],     // y = 1
					  [0, 0, 0, 0, 3, 0, 0],     // y = 2
					  [0, 0, 0, 0, 3, 0, 0],     // y = 3
					  [0, 0, 0, 0, 3, 0, 0],     // y = 4
					  [4, 4, 4, 4, 0, 2, 2],     // y = 5
					  [0, 0, 0, 0, 0, 0, 0]]     // y = 6	
		break;			
};


// Object to represent HTML Elements
var boardUI = {
    textOutput: document.getElementById('textDisplay'),
    
    setMessage: function(msg) {
        this.textOutput.innerHTML = msg;
    },
    
    appendMessage: function(msg) {
        this.textOutput.innerHTML += '<br>' + msg;
    },

    createClickFire: function() {

        // Create anonymous function to pass in the i and j to use closure
        function createAnonFunction(i, j) {
            var anonFcn = function() {
                if (player.shootPosition(i, j)) {
                    $(this).css('background-color', 'red'); 	
					var sound = document.getElementById("audioHit");
					sound.play();
						if((player.shotCounter == 0) && (enemy.numShips > 0)){
							console.log('Game Over!');
								
							localStorage.setItem('result', '0');
								
							alert('Out of Ammo! Assault failed!');
							location.href = 'clear.html';				
						} 					
                } else {
                    $(this).css('background-color', 'gray');
					var sound = document.getElementById("audioMiss");
					sound.play();	
						if((player.shotCounter == 0) && (enemy.numShips > 0)){
							console.log('Game Over!');
								
							localStorage.setItem('result', '0');
								
							alert('Out of Ammo! Assault failed!');
							location.href = 'clear.html';				
						}					
                }
            };
			
            return anonFcn;
        }


        // Loop to initialize all click handlers
        for (var i = 0; i < 7; ++i) {
            for (var j = 0; j < 7; ++j) {
                $('#box' + i + j).click(createAnonFunction(i, j));
            }
        }
    },
};

window.onload = init;


function init(){
	
	var name = prompt('Please enter your name: ');
	
	if (name === "") {
		var defaultName = 'Player';
		localStorage.setItem('playerName', defaultName);
	} else if (name) {
		localStorage.setItem('playerName', name);
	} else {
		var defaultName = 'Player';
		localStorage.setItem('playerName', defaultName);
	}
	
	boardUI.createClickFire();
		
};