
const music = [
	{
		title:"Rap God",
		Singer:"Eminem",
		url:"./music/Rap god.mp3",
		duration:30,
		thumbnail:"./thumbnails/Eminem.jpeg"
	},
	{
		title:"Lose Yourself",
		Singer:"Eminem",
		url:"./music/Lose yourself.mp3",		
		duration:30,
		thumbnail:"./thumbnails/Eminem.jpeg"
	},
	{
		title:"Real Slim Shady",
		Singer:"Eminem",
		url:"./music/Real slim shady.mp3",
		duration:16,
		thumbnail:"./thumbnails/Eminem.jpeg"
	},
	{
		title:"Castle In The Sky",
		Singer:"Anime",
		url:"./music/Laputa castle in the sky.mp3",
		duration:30,
		thumbnail:"./thumbnails/Laputa.jpg"
	},
	{
		title:"Zero Theme",
		Singer:"Code Geass",
		url:"./music/Zero theme.mp3",
		duration:28,
		thumbnail:"./thumbnails/Codegeass.jpeg"
	},
	{
		title:"The Light",
		Singer:"Mason Jennings",
		url:"./music/The light.mp3",
		duration:263,
		thumbnail:"./thumbnails/lights.jpg"
	},
	{
		title:"Rohan theme (LOTR)",
		Singer:"LOTR",
		url:"./music/Lords of the rings.mp3",
		duration:30,
		thumbnail:"./thumbnails/Lotr.jpg"
	},
	{
		title:"Rolling Sky Illusion",
		Singer:"Cheetah Mobile",
		url:"./music/Rolling sky illusion.mp3",
		duration:30,
		thumbnail:"./thumbnails/Rollingsky.png"
	},
	{
		title:"Rolling Sky 8 bits",
		Singer:"Cheetah Mobile",
		url:"./music/8 bits.mp3",
		duration:30,
		thumbnail:"./thumbnails/Rollingsky.png"
	},
	{
		title:"Dancing Lines Desert",
		Singer:"Cheetah Mobile",
		url:"./music/Dancing lines desert.mp3",
		duration:29,
		thumbnail:"./thumbnails/dancingline.jpeg"
	},
	{
		title:"Light's Theme",
		Singer:"Death Note",
		url:"./music/Light's theme.mp3",
		duration:16,
		thumbnail:"./thumbnails/Deathnote.jpg"
	}
]



const thumbnail = document.querySelector(".thumbnail img");
const title = document.querySelector("#title")
const artist = document.querySelector("#singer")
const elapsed = document.querySelector(".elapsedTime");
const total =   document.querySelector(".totalTime");
const currTime = document.querySelector(".seek_slider");
const volumeBar = document.querySelector(".volumeBar")
const volumeDown = document.querySelectorAll(".fa-vol-low");
const volumeUp = document.querySelectorAll(".fa-vol-high");
const shuffle = document.querySelector(".shuffle");
const previous = document.querySelector(".previous");
const play = document.querySelector(".play i");
const next = document.querySelector(".next");
const replay = document.querySelector(".replay");
const audio  = document.querySelector("audio");
const listLength = music.length;
const playicon = "fa-circle-play";
const pauseicon = "fa-circle-pause";
const stroke = document.querySelector(".animation");

var currTrack = 0
var startTime
let clrId
var trackLength 
var playing = false

function setTrack(){
	audio.src= music[currTrack].url
	thumbnail.src   = music[currTrack].thumbnail
	title.innerText = music[currTrack].title
	artist.innerText = music[currTrack].Singer
	trackLength = music[currTrack].duration
	total.innerText = Math.floor(trackLength/60) + ":" + (trackLength%60)
}

function changeTrack(step) {
	playing = true
	currTrack = currTrack+step

	if(currTrack<0)
		currTrack = currTrack + listLength;
	else if(currTrack == listLength)
		currTrack = 0
	setTrack()

}
function playpause(){
	if(playing)
	{
		playing = false
		play.classList.remove(playicon)
		play.classList.add(pauseicon)
		stroke.style.visibility = "visible"
		thumbnail.style.animationPlayState = "running"
		audio.play()
	}
	else{
		playing = true
		play.classList.remove(pauseicon)	
		play.classList.add(playicon)
		stroke.style.visibility = "hidden"
		thumbnail.style.animationPlayState = "paused"
		audio.pause()
	}
}
function randomTrack(){
	currTrack = Math.round(Math.random() * trackLength)
	setTrack()
}

function setVolume(){
	var volume =  volumeBar.value
	audio.volume = volume/10
}

function changeVolume(step){
	var volume = parseInt(volumeBar.value)
	if(volume + step < 11 && volume + step > -1){
		volume = volume + step
	}
	volumeBar.value = volume
	setVolume()
}

setTrack()


function seekTo(){
	let temp = (currTime.value/100)*trackLength
	elapsed.innerText = Math.floor(temp/60) + ":" + Math.floor(temp%60)
	audio.currentTime = Math.floor((currTime.value/100)*trackLength)
}

function setTime(){
	let temp = Math.floor(audio.currentTime)

	if(temp == trackLength)
		changeTrack(1)

	elapsed.innerText = Math.floor(temp/60) + ":" + temp%60
	currTime.value = 100*(audio.currentTime / trackLength)
}

setInterval( setTime, 500)
