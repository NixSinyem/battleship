window.onload = function(){
	if(localStorage.music != null)
	{
		if(localStorage.music == '1'){
			music.muted = false;
		}else{
			music.muted = true;
		}
	}
}
	
