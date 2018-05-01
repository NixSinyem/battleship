window.onload = function() {

	if(localStorage.music == '1')
	{
		document.getElementById('music').innerHTML = 'Turn Off Music';
	}else{
		document.getElementById('music').innerHTML = 'Turn On Music';
	}
		
	if(localStorage.sound == '1')
	{
		document.getElementById('sound').innerHTML = 'Turn Off Game Sound';
	}else{
		document.getElementById('sound').innerHTML = 'Turn On Game Sound';
	}
			
	if(localStorage.diff == '1')
	{
		document.getElementById('diff').innerHTML = 'Medium Difficulty';
	}else if(localStorage.diff == '2' || localStorage.diff == null){
		document.getElementById('diff').innerHTML = 'Hard Difficulty';
	}else{
		document.getElementById('diff').innerHTML = 'Easy Difficulty';
	}			
	  
	var diff = document.getElementById("diff");
	var sound = document.getElementById("sound");
	var music = document.getElementById("music");
	var lrecord = document.getElementById("lrecord");
	var lvsrecord = document.getElementById("lvsrecord");
 
	sound.onclick = soundSwitch;
	music.onclick = musicSwitch;
	diff.onclick = diffSwitch;
	lrecord.onclick = resetLRecord;
	lvsrecord.onclick = resetVSRecord;
			
	if(localStorage.music != null)
	{
		if(localStorage.music == '1'){
			bgm.muted = false;
		}else{
			bgm.muted = true;
		}
	}
				
				
}

function resetLRecord(){
	
	if(localStorage.record == null)
	{
		alert('Player Record is already empty!');
	}else{
		localStorage.removeItem('record');
		alert('Player Record has been reset!');
	}
	
	return false;
	
}

function resetVSRecord(){
	
	if(localStorage.VSrecord == null)
	{
		alert('VS Player Record is already empty!');
	}else{
		localStorage.removeItem('VSrecord');
		alert('VS Player Record has been reset!');
	}
	
	return false;
		
}

function diffSwitch() {

	if(localStorage.diff != null){
		if(localStorage.diff == '1'){
			localStorage.setItem('diff', '2');
			document.getElementById('diff').innerHTML = 'Hard Difficulty';
			alert('Difficulty set to Medium');
			console.log('Medium Difficulty');
		}else if(localStorage.diff == '2'){
			localStorage.setItem('diff', '3');
			document.getElementById('diff').innerHTML = 'Easy Difficulty';
			alert('Difficulty set to Hard');
			console.log('Hard Difficulty');
		}else{
			localStorage.setItem('diff', '1');
			document.getElementById('diff').innerHTML = 'Medium Difficulty';
			alert('Difficulty set to easy');
			console.log('Easy Difficulty');
		}
	}else{
		localStorage.setItem('diff', '3');
		document.getElementById('diff').innerHTML = 'Hard Difficulty';
		console.log('Default(Medium) Difficulty');
	}
	
	return false;
}		
		
function musicSwitch() {

	if(localStorage.music != null){
		if(localStorage.music == '1'){
			localStorage.setItem('music', '0');
			document.getElementById('music').innerHTML = 'Turn On Music';
			console.log('Music muted');
		}else{
			localStorage.setItem('music', '1');
			document.getElementById('music').innerHTML = 'Turn Off Music';
			console.log('Music enabled');
		}
	}else{
		localStorage.setItem('music', '0');
		document.getElementById('music').innerHTML = 'Turn On Music';
		music.muted = true;
	}
			
	if(localStorage.music != null)
	{
		if(localStorage.music == '1'){
			bgm.muted = false;
		}else{
			bgm.muted = true;
		}
	}
		
	return false;
}
		
function soundSwitch() {

	if(localStorage.sound != null){
		if(localStorage.sound == '1'){
			localStorage.setItem('sound', '0');
			document.getElementById('sound').innerHTML = 'Turn On Game Sound';
			console.log('Sound muted');
		}else{
			localStorage.setItem('sound', '1');
			document.getElementById('sound').innerHTML = 'Turn Off Game Sound';
			console.log('Sound enabled');
		}
	}else{
		localStorage.setItem('sound', '0');
		document.getElementById('sound').innerHTML = 'Turn On Game Sound';
	}
			
	return false;
}