function init(){
		
	if(localStorage.music != null)
	{
		if(localStorage.music == '1'){
			music.muted = false;
		}else{
			music.muted = true;
		}
	}

	var result = sessionStorage.result;
	var name = sessionStorage.playerName;
	var shots = sessionStorage.shots;
	var battle = sessionStorage.battle;
	var sbreak = localStorage.scorebreak;	
		
	if(battle === '1'){
		var sscore = sessionStorage.srecord;
		var lscore = localStorage.record;		
	}else{
		var sscore = sessionStorage.VSsrecord;
		var lscore = localStorage.VSrecord;
	}

	if(result == '1'){
		document.getElementById('title').innerHTML = 'Game Clear!';
		document.getElementById('message').innerHTML = 'Congratulations ' + name + '!';
		document.getElementById('stats').innerHTML = 'You took ' + shots + ' shots to win!'; 
	
		if(sbreak == '1')
		{
			document.getElementById('score').innerHTML = 'New Record! ' + lscore + '!';	
		}else{
			document.getElementById('score').innerHTML = 'Your score: ' + sscore + '!';	
		}
				
	}else if(result == '2'){
		document.getElementById('title').innerHTML = 'Out of Time!';
		document.getElementById('message').innerHTML = 'Tough luck, ' + name + '!'; 
		document.getElementById('stats').innerHTML = 'You shot ' + shots + ' times!'; 
	}else if(result == '3'){
		document.getElementById('title').innerHTML = 'Out of Ammo!';
		document.getElementById('message').innerHTML = 'Tough luck, ' + name + '!'; 
		document.getElementById('stats').innerHTML = 'You shot ' + shots + ' times!'; 
	}else{
		document.getElementById('title').innerHTML = 'Battleship!';
		document.getElementById('message').innerHTML = 'What\'s your next stage?'; 
	}
	
	var single = document.getElementById("single");
	var vs = document.getElementById("vs");
		
	if(localStorage.diff == null || localStorage.diff == '2' || localStorage.diff == '3')
	{
		single.onclick = normalGame;
		vs.onclick = normalVSGame;
	}else{
		single.onclick = easyGame;
		vs.onclick = easyVSGame;
	}
			
	sessionStorage.clear();
}

function normalGame(){
	location.href = 'game.html';
}
		
function normalVSGame(){
	location.href = 'vsgame.html';
}
		
function easyGame(){
	location.href = 'easygame.html';
}
		
function easyVSGame(){
	location.href = 'easyvsgame.html';
}
	
window.onload = init;