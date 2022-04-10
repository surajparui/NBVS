
const songItems = document.getElementsByClassName('songItem');
const inputText =  document.getElementById('form1');
const submitBtn = document.getElementById('submitBtn');
const audioEl = document.querySelector('audio');
const playBtn = document.getElementById('play');
const nextBtn =  document.getElementById('next');
const prevBtn =  document.getElementById('prev');
const progress  =  document.getElementById('progress');
const lengthOfSong =  document.getElementById('Duration');
const playedTime = document.getElementById('currentTime');
const progressContainer =  document.getElementById('progressContainer');
const songsContainer = document.getElementById('songsContainer');
const songTitle =  document.getElementById('title');
const artistTitle = document.getElementById('singer');
let isPlaying =false;
let index = 0;
var array;



// console.log(songItems);
let input='rock';
let fetchedData=null;
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
		'X-RapidAPI-Key': 'a29ac2c3afmshcb6ec0fa866189cp198d9djsn1674bec16e3f'
	}
};
function play(){
    isPlaying=true;
    playBtn.classList.replace('fa-play','fa-pause');
    audioEl.play();
}

function pause(){
    isPlaying=false;
    playBtn.classList.replace('fa-pause','fa-play');
    audioEl.pause();
}

function playSong(audio,title,artist){
    // console.log(audio);
    audioEl.setAttribute('src', audio);
    // console.log(audioEl);
    songTitle.textContent=title;
    artistTitle.textContent=artist;
    play();
}




// function to playNext
function playNext(){
    index++;
    if(index>5){
        index=0;
    }
    // console.log(index);
    playSong(array[0][index].preview,array[0][index].title_short,array[0][index].artist.name);
}

// // function to playPrevious
function playPrev(){
    index--;
    if(index<0){
        index=5;
       
    }
    // console.log(index);
    playSong(array[0][index].preview,array[0][index].title_short,array[0][index].artist.name);
}
//function to set Timer
function setTimer(event){
    if(isPlaying){
    // console.log(event);
    const {duration, currentTime} =  event.srcElement;
    // current progress in %
    const currentProgressInPercent = (currentTime/duration)*100;
    // show progress bar 
    progress.style.width=`${currentProgressInPercent}%`;
    // duration minutes of song
    const minutes = Math.floor(duration/60);
    // duration seconds of song
    const seconds = Math.floor(duration%60);

    // if seconds are < 10  then set as MM:0S
    if(seconds<10){
        lengthOfSong.textContent = `${minutes}:0${seconds}`;
    }
    else{
    // if seconds are calculated then only set values
        if(seconds){
        lengthOfSong.textContent = `${minutes}:${seconds}`;
        }
    }

    // setting the current time progress
    const progressTimeMinutes  = Math.floor(currentTime/60);
    const progressTimeSeconds = Math.floor(currentTime%60);
    playedTime.textContent=`${progressTimeMinutes}:${progressTimeSeconds}`;
    }
    // console.log(event.srcElement.currentTime , event.srcElement.duration );
}

// function to change current time on clicking the progressbar

function changeCurrentTime(e){
    if(isPlaying){
    const width  =  this.clientWidth;
    const clickDistance =  e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickDistance/width) * duration;
    // console.log(e);
    // console.log(this.clientWidth);
    // console.log(this);
    }
}





function loadSongs(data){
    array = Object.values(data);
    console.log(array);
    console.log(array[0][0].title_short);

    for(let i=0;i<6;i++){
        var preview=array[0][i].preview;
        var url = array[0][i].album.cover_medium;
        var title=array[0][i].title_short;
        var singerName=array[0][i].artist.name;
        let template=`<div class="songItem " id="songItem">
                            <!-- Image Container -->
                            <div class="imgContainer" id="imgContainer">
                                <img src=${url} alt="">
                            </div>
                            <div class="songInfo" id="songInfo">
                                <p class="songName" id="songName">${title}</p>
                                <p class="singerName" id="singerName">${singerName}</p>
                            </div>
                            <!-- buttonsContainer -->
                            <div class="btnCont" id="btnCont">
                                <button class="play" id="playBtn${i}">Play</button>
                                <i class="far fa-heart icon" id="icon${i}"></i>
                            </div>
                        </div>`
        songsContainer.innerHTML+=template;
     document.getElementById(`playBtn${i}`).addEventListener('click',function (e) {
            playSong(preview,title,singerName);
        });
    }
}


async function  fetchSongs(){
await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${input}`,options)
	.then(response => response.json())
	.then(data => loadSongs(data))
	.catch(err => console.error(err));
}



const playButton=document.getElementById('playBtn');

playBtn.addEventListener('click', () => (isPlaying ? pause() : play()));
nextBtn.addEventListener('click',playNext);
prevBtn.addEventListener('click',playPrev);
progressContainer.addEventListener('click',changeCurrentTime);
audioEl.addEventListener('timeupdate',setTimer);
submitBtn.addEventListener('click',()=>{
    location.reload;
    songsContainer.innerHTML='';
    input=inputText.value;
    console.log(input);
    fetchSongs();
    if(input!=null){
        setTimeout(function(){
        console.log((document.querySelectorAll('.play')));
        Array.from(document.querySelectorAll('.play')).forEach(function(button,i){button.addEventListener('click',()=>{
        playSong(array[0][i].preview,array[0][i].title_short,array[0][i].artist.name);
        })})
        },5000);
    }
   
}
)

fetchSongs();

if(input!=null){
    setTimeout(function(){
    console.log((document.querySelectorAll('.play')));
    Array.from(document.querySelectorAll('.play')).forEach(function(button,i){button.addEventListener('click',()=>{
    playSong(array[0][i].preview,array[0][i].title_short,array[0][i].artist.name);
    console.log(document.getElementById(`icon${i}`));
    })})
    },5000);
}




















































// const audio = document.querySelector('audio');
// const playBtn = document.getElementById('play');
// const nextBtn =  document.getElementById('next');
// const prevBtn =  document.getElementById('prev');
// const image = document.querySelectorAll('img');
// const title = document.getElementById('songName');
// const singer = document.getElementById('singerName');
// const progress  =  document.getElementById('progress');
// const lengthOfSong =  document.getElementById('Duration');
// const playedTime = document.getElementById('currentTime');
// const progressContainer =  document.getElementById('progressContainer');
// let isPlaying =false;

// let index = 0;


// const songs = [
//     {
//         name : 'Mann Bharryaa 2.0',
//         Title: 'Mann Bharraya 2.0',
//         Singer: 'B-Park'
//     },
//     {
//         name : 'Raataan Lambiyan',
//         Title: 'Raataan Lambiyan',
//         Singer: 'Kamal Khan'
//     },
//     {
//         name : 'Ranjha',
//         Title: 'Ranjha',
//         Singer: 'Jasleen Royal, B-Park'
//     },
//     {
//         name : 'Haan-Tu-Hain',
//         Title: 'Haan-Tu-Hain',
//         Singer: 'KK, Pritam Chakraborty'
//     },
//     {
//         name : 'Hum-Dum',
//         Title: 'Hum-Dum',
//         Singer: 'AR Rahman, Gulzar'
//     },
//     {
//         name : 'Shiddat',
//         Title: 'Shiddat',
//         Singer: 'Manan Bharadwaj'
//     }
// ];




// // function to play
// function play(){
//     isPlaying=true;
//     playBtn.classList.replace('fa-play','fa-pause');
//     audio.play();
// }


// // function to pause
// function pause(){
//     isPlaying=false;
//     playBtn.classList.replace('fa-pause','fa-play');
//     audio.pause();
// }

// // function loadsong
// function loadsong(song){
//     audio.setAttribute('src', `public/assets/audio/${song.name}.mp3`);
//     Array.from(image)[index].setAttribute('src',`public/assets/images/${song.name}.jpg`);
//     title.textContent= `${song.name}`;
//     singer.textContent= `${song.Singer}`;  
// }


// // function to playPrevious
// function playPrev(){
//     index--;
//     if(index<0){
//         index=songs.length-1;
       
//     }
//     // console.log(index);
//     loadsong(songs[index]);
//     play();
// }

// //function to set Timer
// function setTimer(event){
//     if(isPlaying){
//     // console.log(event);
//     const {duration, currentTime} =  event.srcElement;
//     // current progress in %
//     const currentProgressInPercent = (currentTime/duration)*100;
//     // show progress bar 
//     progress.style.width=`${currentProgressInPercent}%`;
//     // duration minutes of song
//     const minutes = Math.floor(duration/60);
//     // duration seconds of song
//     const seconds = Math.floor(duration%60);

//     // if seconds are < 10  then set as MM:0S
//     if(seconds<10){
//         lengthOfSong.textContent = `${minutes}:0${seconds}`;
//     }
//     else{
//     // if seconds are calculated then only set values
//         if(seconds){
//         lengthOfSong.textContent = `${minutes}:${seconds}`;
//         }
//     }

//     // setting the current time progress
//     const progressTimeMinutes  = Math.floor(currentTime/60);
//     const progressTimeSeconds = Math.floor(currentTime%60);
//     playedTime.textContent=`${progressTimeMinutes}:${progressTimeSeconds}`;
//     }
//     // console.log(event.srcElement.currentTime , event.srcElement.duration );
// }

// // function to change current time on clicking the progressbar

// function changeCurrentTime(e){
//     if(isPlaying){
//     const width  =  this.clientWidth;
//     const clickDistance =  e.offsetX;
//     const duration = audio.duration;
//     audio.currentTime = (clickDistance/width) * duration;
//     // console.log(e);
//     // console.log(this.clientWidth);
//     // console.log(this);
//     }
// }


// // function to playNext
// function playNext(){
//     index++;
//     if(index>songs.length-1){
//         index=0;
//     }
//     // console.log(index);
//     loadsong(songs[index]);
//     play();
// }


// playBtn.addEventListener('click', () => (isPlaying ? pause() : play()));
// nextBtn.addEventListener('click',playNext);
// prevBtn.addEventListener('click',playPrev);
// audio.addEventListener('timeupdate',setTimer);
// progressContainer.addEventListener('click',changeCurrentTime);
// loadsong(songs[0])