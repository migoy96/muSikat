const image = document.getElementById('cover'), 
    title = document.getElementById('music-title'), 
    artist = document.getElementById('music-artist'), 
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');


const music = new Audio();

const song = [
    {
        path: 'assets/May Halaga Pa Ba Ako Sayo.mp3',
        displayName: 'May Halaga Pa Ba Ako Sayo',
        cover: 'assets/mayhalaga.jpg',
        artist: 'Juan Karlos Labajo',
    },
    {
        path: 'assets/Kisame_Rhodessa.mp3',
        displayName: 'Kisame',
        cover: 'assets/kisame.jpg',
        artist: 'Rhodessa',
    },
    {
        path: 'assets/Orasa_Dilaw.mp3',
        displayName: 'Orasa',
        cover: 'assets/orasa.jpg',
        artist: 'Dilaw',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    //change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    //set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play()
}

function pauseMusic(){
    isPlaying = false;
    //change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    //set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause()
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + sessionStorage.length) % song.length;
    loadMusic(song[musicIndex]);
    playMusic();
}


function updateProgressBar(){
    const { duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay)
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(song[musicIndex]);