///////////////////////////////////////////////////////////////////////////////
//Sound loading

ReData=function(O){
	return MapKeysObject(O,key=>Prefix(key,"data-"));
/*
change object keys to data-attributes
ReData({a:1,b:2})
{"data-a":1,"data-b":2}
*/
}

SoundHTML=function(sourcepath,data,id){
	var data=data?ReData(data):{};
	var defaults={
		tag:"audio",
		txt:" ",
		'class':'sound',
		type:'audio/mpeg',
		preload:'auto',
		'src':sourcepath,
		'id':(id?id:KebabCaseString(sourcepath))
	};
	return ElementHTML(Merge(defaults,data));
}

LoadSound=function(soundpath,data,id,parentElement){
	return AppendToElement(SoundHTML(soundpath,data,id),parentElement);
}

LS=function(soundobject,id,parentElement){
	var src=soundobject.src;
	var opts=Merge(soundobject,{});
	delete opts.src;
	LoadSound(src,opts,id,parentElement);
};

LoadSounds=function(soundtrack,parentElement){
	var names=Keys(soundtrack);
	names.map(function(name){LS(soundtrack[name],name,parentElement)});
}

SoundExtensions=[".mp3",".wav",".ogg"];


///////////////////////////////////////////////////////////////////////////////
//Songs, individually

SongFilename=function(song){
	return decodeURI(PageFile(song.src)).replace(/.*\//,"");
}

SongName=function(song){
	return UnPosfix(SongFilename(song),SoundExtensions);
}

SongTitle=function(song){
	return SongName(song).replace(/\%20/g," ");
}

SongValid=function(song){
	return (typeof song!=="undefined")&&(Posfixed(SongFilename(song),SoundExtensions));
}

SongPlay=function(song){
	if(SongValid(song)&&song.paused){
		song.play();
		return true;
	}
	return false;
}

SongPause=function(song){
	if(SongValid(song)&&!song.paused){
		song.pause();
		return true
	}
	return false;
}

SongStop=function(song){
	if(SongValid(song)&&!song.paused){
		SongPause(song);
		SongSeek(song,0);
		return true
	}
	return false;
}

GetSetter=function(attributeName,Limiter){
	return function (object,value){
		if(typeof value==="undefined")
			return object[attributeName];
		else
			return object[attributeName]=Limiter(value);
	}
}

SongVolume=function(song,volume){
	return GetSetter("volume",v=>Min(Max(v,0),1))(song,volume);
}
SongSeek=function(song,time){
	return GetSetter("currentTime",t=>Min(Max(t,0),song.duration))(song,time);
}
SongSpeed=function(song,speed){
	return GetSetter("playbackRate",t=>Min(Max(t,2),0.5))(song,speed);
}



///////////////////////////////////////////////////////////////////////////////
//Music Playlist

var Playlist={};

PlaylistStart=function(){
	return Playlist={
		songs:GetElements('.music'),
		current:0,
		paused:true,
		sleep:false,
		blocked:false
	}
}

PlaylistPlaying=function(){
	return Playlist.songs&&Playlist.songs.length>0&&!Playlist.paused;
}

PlaylistSong=function(i){
	if(typeof i==="undefined")
		return PlaylistCurrentSong();
	else
		return Playlist.songs[i];
}

PlaylistCurrentSong=function(){
	return Playlist.songs[Playlist.current];
}


PlaylistPause=function(){
	if(Playlist.blocked)
		return;
	if(SongPause(PlaylistCurrentSong())){
		Playlist.paused=true;
		ConsoleAdd("Music paused...");
		MusicButtonMute();
		window.removeEventListener("blur", PlaylistSleep);
	}
}

PlaylistResume=function(){
	if(Playlist.blocked)
		return;
	var song=PlaylistCurrentSong();
	PlaylistStopOtherSongs();
	if(SongPlay(song)){
		Playlist.paused=false;
		ConsoleAdd("Resumed playing ♫♪♪ "+SongTitle(song));
		MusicButtonUnMute();
		Listen("blur", PlaylistSleep);
	}
}

PlaylistPlay=function(){
	if(Playlist.blocked)
		return;
	var song=PlaylistCurrentSong();
	PlaylistStopOtherSongs();
	if(SongPlay(song)){
		Playlist.paused=false;
		ListenOnce('ended',PlaylistNext,song);
		MusicButtonUnMute();
		Listen("blur", PlaylistSleep);
	}
}


PlaylistStop=function(){
	if(Playlist.blocked)
		return;
	var song=PlaylistCurrentSong();
	if(SongStop(song)){
		Playlist.paused=true;
		song.removeEventListener('ended',PlaylistNext);
		MusicButtonMute();
	}
}

PlaylistStopOtherSongs=function(){
	Complement(Playlist.songs,[PlaylistCurrentSong()]).map(SongStop);
}

PlaylistGoto=function(i){
	if(Playlist.blocked)
		return;
	var max=Playlist.songs.length;
	if(typeof i==="undefined"||(i=i%max)===Playlist.current)
		PlaylistResume();
	else{
		PlaylistStop();
		Playlist.current=i;
		PlaylistPlay();
	}
}

PlaylistNext=function(){
	PlaylistGoto(Playlist.current+1);
}

PlaylistPrev=function(){
	PlaylistGoto(Playlist.songs.length+Playlist.current-1);
}


PlaylistSleep=function(){
	if(Playlist.blocked)
		return;
	if(!Playlist.sleep){
		Playlist.sleep=true;
		PlaylistPause(PlaylistCurrentSong());
		AttendOnce("focus", PlaylistAwaken);
	}
}

PlaylistAwaken=function(){
	if(Playlist.blocked)
		return;
	if(Playlist.sleep){
		Playlist.sleep=false;
		PlaylistResume(PlaylistCurrentSong());
		//UnAttend("focus");
		return true;
	}
}


PlaylistStartPlay=function(){
	PlaylistStart();
	PlaylistPlay();
	return true;
}


///////////////////////////////////////////////////////////////////////////////
// Music Button & Toggle

MusicButtonMuted=function(){
	var MusicButtonMutebutton=GetElement("MusicButton");
	if(MusicButtonMutebutton)
		return !Selected(MusicButtonMutebutton);
	else
		return false;
}
MusicButtonMute=function(){
	Deselect("MusicButton");
}
MusicButtonUnMute=function(){
	Select("MusicButton");
}

PlaylistToggle=function(){
	if(Playlist.blocked)
		return	ConsoleAdd("The playlist is blocked in this situation.");
	var song=PlaylistCurrentSong();
	if(typeof song==="undefined")
		ConsoleAdd("Error: can't find the jukebox...");
	else if(song.paused)
		PlaylistResume();
	else
		PlaylistPause();
}

PlaylistBlock=function(){
	Playlist.blocked=true;
}
PlaylistUnBlock=function(){
	Playlist.blocked=false;
}

///////////////////////////////////////////////////////////////////////////////
//Etc

PlaySound=function(src){
	var s=new Audio(src);
	PlaylistCrossFade((s.duration?s.duration:1)*1000,()=>s.play());
}

PlaylistCrossFade=function(duration,Play){
	if(!PlaylistPlaying()||Playlist.blocked)
		Play();
	else {
		var song=PlaylistCurrentSong();
		Kinemate([
			PlaylistCrossFadeInAction(song,Play,duration),
			{startDelay:duration},
			PlaylistCrossFadeOutAction(song,duration)
		]);
	}
}

PlaylistCrossFadeInAction=function(song,Play,duration){
	var initialvolume=1;
	var steps=10;
	return{
		interval:Min(100,duration/steps),
		steps:steps,
		startDelay:0,
		endDelay:0,
		Iterator:function(i){song.volume=(1-i/10)*initialvolume},
		Ender:function(){song.pause();Play();}
	}
};

PlaylistCrossFadeOutAction=function(song,duration){
	var initialvolume=1;
	var steps=10;
	return{
		Starter:()=>song.play(),
		interval:Min(100,duration/steps),
		steps:steps,
		Iterator:function(i){song.volume=(i/10)*initialvolume},
		
	}
};




Shout("data-game-music");