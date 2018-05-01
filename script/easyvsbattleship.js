//Restart Button
document.getElementById("restartbutton").addEventListener("click", restartgame);
function restartgame(){
	
	location.reload();
}


// Object to represent player
var player = {
	score: 0,
	numShips : 4,
    carrierHP:    5,
    battleshipHP: 4,
    cruiserHP:    3,
    destroyerHP:  2,
    shotCounter: 30,
		
    // Method to shoot at a guessed position.
    shootPosition:function(letter, number){

		this.shotCounter++;
		
        document.getElementById('shotCounter').innerHTML = ' Shots: ' + this.shotCounter;
		if (enemy.shootResponse(letter, number)) {
			
			if(localStorage.VSrecord == null){
				document.getElementById("score").innerHTML = 'Score: '+ player.score;	
			}else{
				if(player.score > localStorage.VSrecord){
					document.getElementById("score").innerHTML = 'Overflow: ' + player.score;	
				}else{
					document.getElementById("score").innerHTML = 'Break the record: ' + player.score + '/' + localStorage.VSrecord;	
				}
			}
			
			enemy.shootPosition();
			
			return true;
		} else {
			
			if(localStorage.VSrecord == null){
				document.getElementById("score").innerHTML = 'Score: '+ player.score;	
			}else{
				if(player.score > localStorage.VSrecord){
					document.getElementById("score").innerHTML = 'Overflow: ' + player.score;	
				}else{
					document.getElementById("score").innerHTML = 'Break the record: ' + player.score + '/' + localStorage.VSrecord;	
				}
			}
			
			enemy.shootPosition();
			
			return false;
		}
	},
		
	shootResponse: function(x, y){
	
		var shotValue = this.board[y][x];
		
		if (shotValue > 0) { // if shotValue > 0, then there is a ship.
					
			console.log('Your fleet got hit!');
			boardUI.setMessage('Your fleet got hit!');
					
			switch (shotValue) { // Check which type of ship it is.
				case 2: // Destroyer
					this.destroyerHP--;
					if (this.destroyerHP === 0) {
						console.log('Your destroyer sank!');
						boardUI.appendMessage('Your destroyer sank!');
						this.numShips--;
						document.getElementById('yourShipsRemaining').innerHTML = this.numShips + ' ships Remaining!';
					}
					break;
				case 3: // Cruiser
					this.cruiserHP--;
					if (this.cruiserHP === 0) {
						console.log('Your cruiser sank!');
						boardUI.appendMessage('Your cruiser sank!');
						this.numShips--;
						document.getElementById('yourShipsRemaining').innerHTML = this.numShips + ' ships Remaining!';
					}
					break;
				case 4: // Battleship
					this.battleshipHP--;
					if (this.battleshipHP === 0) {
						console.log('Your battleship sank!');
						boardUI.appendMessage('Your battleship sank!');
						this.numShips--;
						document.getElementById('yourShipsRemaining').innerHTML = this.numShips + ' ships Remaining!';
					}
					break;
				case 5: // Carrier
					this.carrierHP--;
					if (this.carrierHP === 0) {
						console.log('Your carrier sank!');
						boardUI.appendMessage('Your carrier sank!');
						this.numShips--;
						document.getElementById('yourShipsRemaining').innerHTML = this.numShips + ' ships Remaining!';
					}
					break;
			}
			
			player.score -= 50;
						
			this.board[y][x] = -1;
			return true;
			
		}else{
		
			//The AI misses
			return false;
							
		}
		
        // When number of ships is 0, game is over.
        if (this.numShips === 0) {
			console.log('Game Over!');
			
			sessionStorage.setItem('result', '0');
			alert('Game Over! Your fleet has been annihilated!');
			location.href = 'clear.html';		
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
                        document.getElementById('shipsRemaining').innerHTML = this.numShips + ' ships Remaining!';
                    }
                    break;
                case 3: // Cruiser
                    this.cruiserHP--;
                    if (this.cruiserHP === 0) {
                        console.log('You sunk my cruiser!');
                        boardUI.appendMessage('You sunk my cruiser!');
                        this.numShips--;
                        document.getElementById('shipsRemaining').innerHTML = this.numShips + ' ships Remaining!';
                    }
                    break;
                case 4: // Battleship
                    this.battleshipHP--;
                    if (this.battleshipHP === 0) {
                        console.log('You sunk my battleship!');
                        boardUI.appendMessage('You sunk my battleship!');
                        this.numShips--;
                        document.getElementById('shipsRemaining').innerHTML = this.numShips + ' ships Remaining!';
                    }
                    break;
                case 5: // Carrier
                    this.carrierHP--;
                    if (this.carrierHP === 0) {
                        console.log('You sunk my carrier!');
                        boardUI.appendMessage('You sunk my carrier!');
                        this.numShips--;
                        document.getElementById('shipsRemaining').innerHTML = this.numShips + ' ships Remaining!';
                    }
                    break;
            }
            this.board[y][x] = -1;
        } else if(shotValue == -2 ){
			console.log('You\'ve already shot here! Please select another square!');
			boardUI.setMessage('You\'ve already shot here! Please select another square!');	
			player.score -= 100;			
			return false;
		}else if (shotValue == -1) {
            console.log('You\'ve already shot an enemy here! Please select another square!');
			boardUI.setMessage('You\'ve already shot an enemy here! Please select another square!');
			player.score -= 100;
            return true;
        } else {
            console.log('Miss!');
            boardUI.setMessage('Doh! You missed. Shoot again!');
			this.board[y][x] = -2;
			player.score -= 50;
            return false;
        }
		
		player.score += 100;
		
        // When number of ships is 0, game is over.
        if (this.numShips === 0) {
			console.log('Congratulations, you won the game!');
            console.log('It only took you ' + player.shotCounter + ' shots!');
			
			if(localStorage.VSrecord != null){
				if(player.score > localStorage.VSrecord)
				{
					localStorage.VSrecord = player.score;
					localStorage.setItem('scorebreak', '1');
					console.log('New high score set');
				}else{
					console.log('No record broken');
				}
			}else{
				localStorage.setItem('VSrecord', player.score);	
				console.log('Fresh record set');				
			}
			
			sessionStorage.setItem('result', '1');
			sessionStorage.setItem('shots', (player.shotCounter));	
			sessionStorage.setItem('VSsrecord', player.score);	
			sessionStorage.setItem('battle', '2');
			alert('Congratulations, you won the game!');
			location.href = 'clear.html';
				
        }
		
        return true;
    },
	
	// Method to shoot at a guessed position.
    shootPosition: function() {
			
		/*Create AI function to pass in the i and j to use closure */
		var letter = Math.floor((Math.random() * 7) + 0);
		var number = Math.floor((Math.random() * 7) + 0);

		
		if (player.shootResponse(letter, number)){
			if(($('#boxP' + letter + number).css('background-color') == 'rgb(255, 0, 0)') || ($('#boxP' + letter + number).css('background-color') == 'rgb(0, 119, 190)'))
			{
				$('#boxP' + letter + number).css('background-color', 'red');	
				var sound = document.getElementById("audioz");
				if(localStorage.sound == '1' || localStorage.sound == undefined)
				{
					sound.play();	
				}			
			}else{
				$('#boxP' + letter + number).css('background-color', 'gray');
				var sound = document.getElementById("audiop");
				if(localStorage.sound == '1' || localStorage.sound == undefined)
				{
					sound.play();	
				}							
			}
			
		} else {
			if(($('#boxP' + letter + number).css('background-color') == 'rgb(128, 128, 128)') || ($('#boxP' + letter + number).css('background-color') == 'rgb(0, 119, 190)')){
				$('#boxP' + letter + number).css('background-color', 'gray');
				var sound = document.getElementById("audiop" || localStorage.sound == undefined);
				if(localStorage.sound == '1')
				{
					sound.play();	
				}						
			}else{
				$('#boxP' + letter + number).css('background-color', 'red');
				var sound = document.getElementById("audioz");
				if(localStorage.sound == '1' || localStorage.sound == undefined)
				{
					sound.play();	
				}						
			}
		}
    }

};

//This section of the script generates a random number in a range from 1 to 5,
//Switch case statement is used to determine the playing grid of the game based on the randomly generated number to avoid repetition.
//stageNumP used to represent player's enemy's board
//stageNumAI used to represent player's board
var stageNumP = Math.floor((Math.random() * 10) + 1);
var stageNumAI = Math.floor((Math.random() * 10) + 1);
	
switch(stageNumP){
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

switch(stageNumAI){
	case 1:
		      //  x =  0  1  2  3  4  5  6  
		player.board= [[0, 0, 0, 0, 0, 0, 0],     // y = 0
				      [0, 0, 0, 0, 0, 0, 0],     // y = 1
				      [0, 5, 5, 5, 5, 5, 0],     // y = 2
					  [4, 0, 0, 0, 0, 0, 0],     // y = 3
					  [4, 0, 0, 0, 0, 0, 0],     // y = 4
					  [4, 0, 3, 3, 3, 0, 2],     // y = 5
					  [4, 0, 0, 0, 0, 0, 2]]     // y = 6
		break;
	case 2:
			//  x =  0  1  2  3  4  5  6  
		player.board= [[2, 2, 0, 0, 0, 0, 0],     // y = 0
					  [0, 0, 4, 0, 5, 0, 0],     // y = 1
					  [0, 0, 4, 0, 5, 0, 0],     // y = 2
					  [0, 0, 4, 0, 5, 0, 0],     // y = 3
					  [0, 0, 4, 0, 5, 0, 0],     // y = 4
					  [0, 0, 0, 0, 5, 0, 0],     // y = 5
					  [3, 3, 3, 0, 0, 0, 0]]     // y = 6	
		break;
	case 3:
		    //  x =  0  1  2  3  4  5  6  
		player.board= [[3, 3, 3, 0, 0, 0, 0],     // y = 0
					  [0, 0, 0, 0, 2, 2, 0],     // y = 1
					  [0, 0, 0, 0, 0, 0, 0],     // y = 2
					  [4, 4, 4, 4, 0, 0, 0],     // y = 3
					  [0, 0, 0, 0, 0, 0, 0],     // y = 4
					  [0, 0, 0, 0, 0, 0, 0],     // y = 5
					  [5, 5, 5, 5, 5, 0, 0]]     // y = 6
		break;
				
	case 4:
			//  x =  0  1  2  3  4  5  6  
		player.board= [[0, 0, 0, 0, 3, 3, 3],     // y = 0
					  [0, 0, 0, 0, 0, 0, 0],     // y = 1
					  [2, 2, 0, 0, 4, 0, 5],     // y = 2
					  [0, 0, 0, 0, 4, 0, 5],     // y = 3
					  [0, 0, 0, 0, 4, 0, 5],     // y = 4
					  [0, 0, 0, 0, 4, 0, 5],     // y = 5
					  [0, 0, 0, 0, 0, 0, 5]]     // y = 6	
		break;
				
	case 5:
			//  x =  0  1  2  3  4  5  6  
		player.board= [[0, 0, 0, 0, 0, 0, 0],     // y = 0
					  [0, 0, 5, 5, 5, 5, 5],     // y = 1
					  [0, 3, 0, 0, 0, 0, 0],     // y = 2
					  [0, 3, 0, 2, 2, 0, 0],     // y = 3
					  [0, 3, 0, 0, 0, 0, 0],     // y = 4
					  [0, 0, 0, 0, 0, 0, 0],     // y = 5
					  [0, 0, 0, 4, 4, 4, 4]]     // y = 6	
		break;

	case 6:
			//  x =  0  1  2  3  4  5  6  
		player.board= [[0, 0, 0, 5, 0, 0, 0],     // y = 0
					  [2, 2, 0, 5, 0, 0, 0],     // y = 1
					  [0, 0, 0, 5, 0, 0, 0],     // y = 2
					  [0, 0, 0, 5, 0, 4, 0],     // y = 3
					  [0, 0, 0, 5, 0, 4, 0],     // y = 4
					  [0, 0, 0, 0, 0, 4, 0],     // y = 5
					  [0, 3, 3, 3, 0, 4, 0]]     // y = 6	
		break;

	case 7:
			//  x =  0  1  2  3  4  5  6  
		player.board= [[4, 0, 0, 0, 0, 3, 0],     // y = 0
					  [4, 0, 0, 0, 0, 3, 0],     // y = 1
					  [4, 0, 0, 0, 0, 3, 0],     // y = 2
					  [4, 0, 2, 2, 0, 3, 0],     // y = 3
					  [0, 0, 0, 0, 0, 0, 0],     // y = 4
					  [0, 5, 5, 5, 5, 5, 0],     // y = 5
					  [0, 0, 0, 0, 0, 0, 0]]     // y = 6	
		break;
		
	case 8:
			//  x =  0  1  2  3  4  5  6  
		player.board= [[0, 0, 0, 0, 0, 0, 0],     // y = 0
					  [0, 5, 0, 0, 0, 0, 0],     // y = 1
					  [0, 5, 0, 0, 0, 0, 3],     // y = 2
					  [0, 5, 0, 0, 2, 0, 3],     // y = 3
					  [0, 5, 0, 0, 2, 0, 3],     // y = 4
					  [0, 5, 0, 0, 0, 0, 0],     // y = 5
					  [0, 0, 0, 4, 4, 4, 4]]     // y = 6	
		break;			

	case 9:
			//  x =  0  1  2  3  4  5  6  
		player.board= [[0, 0, 0, 0, 0, 0, 4],     // y = 0
					  [0, 2, 0, 0, 0, 0, 4],     // y = 1
					  [0, 2, 0, 0, 5, 0, 4],     // y = 2
					  [0, 0, 3, 0, 5, 0, 4],     // y = 3
					  [0, 0, 3, 0, 5, 0, 0],     // y = 4
					  [0, 0, 3, 0, 5, 0, 0],     // y = 5
					  [0, 0, 0, 0, 5, 0, 0]]     // y = 6	
		break;			

	case 10:
			//  x =  0  1  2  3  4  5  6  
		player.board= [[0, 0, 5, 5, 5, 5, 5],     // y = 0
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
					var sound = document.getElementById("audiot");
					if(localStorage.sound == '1' || localStorage.sound == undefined)
					{
						sound.play();	
					} 
				} else {
					$(this).css('background-color', 'gray');
					var sound = document.getElementById("audioe");
					if(localStorage.sound == '1' || localStorage.sound == undefined)
					{
						sound.play();	
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
		
		for (var x = 0; x < 7; ++x) {
            for (var y = 0; y < 7; ++y) {
                $('#boxP' + x + y);				
            }
        }
		
    }
};

window.onload = init;

function init(){
	
	var defaultName = 'Player';
	
	if(localStorage.music != null)
	{
		if(localStorage.music == '1'){
			music.muted = false;
		}else{
			music.muted = true;
		}
	}
	
	var name = prompt('Please enter your name: ');
	
	if (name === "") {
		sessionStorage.setItem('playerName', defaultName);
	} else if (name) {
		sessionStorage.setItem('playerName', name);
	} else {
		sessionStorage.setItem('playerName', defaultName);
	}
	
	boardUI.createClickFire();

};