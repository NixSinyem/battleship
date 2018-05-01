function init(){
	
	if(localStorage.music != null)
	{
		if(localStorage.music == '1'){
			music.muted = false;
		}else{
			music.muted = true;
		}
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