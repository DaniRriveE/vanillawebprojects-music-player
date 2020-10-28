const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const fastBackwardBtn = document.getElementById('fast-backward');
const nextBtn = document.getElementById('next');
const fastForwardBtn = document.getElementById('fast-forward');
const currentTimeStamp = document.getElementById('current-time');
const lengthTimeStamp = document.getElementById('audio-length');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const volume = document.getElementById('volume');
const volumeContainer = document.getElementById('volume-container');
const volumePercentage = document.getElementById('volume-percentage');
const title = document.getElementById('title');
const status = document.getElementById('status');
const cover = document.getElementById('cover');

// Song titles
const songs = ['mystery-evil', 'sicko-mode'];

// Keep track of song
let songIndex = 1;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
  volumePercentage.innerText = Math.round(audio.volume * 100) + " %";
}

function loadDuration() {
  const minutesTotal = Math.floor(audio.duration / 60);
  let secondsTotal = '';
  if (audio.duration % 60 < 10) {
      secondsTotal = '0' + Math.floor(audio.duration % 60);
  } else {
      secondsTotal = Math.floor(audio.duration % 60);
  }
  lengthTimeStamp.innerText = `${minutesTotal}:${secondsTotal}`;
}

// Play song
function playSong() {
  musicContainer.classList.add('play');
  musicContainer.classList.remove('paused');
  status.innerText = "Playing";
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');

  audio.play();
}

// Pause song
function pauseSong() {
  musicContainer.classList.remove('play');
  musicContainer.classList.add('paused');
  status.innerText = "Paused";
  playBtn.querySelector('i.fas').classList.add('fa-play');
  playBtn.querySelector('i.fas').classList.remove('fa-pause');

  audio.pause();
}

// Previous song
function prevSong() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Next song
function nextSong() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playSong();
}

// Fast-backward song
function fastBackwardSong(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration)  * 100 + duration / 100;
  progress.style.width = `${progressPercent}%`;
}
// Fast-forward song

// Set volume bar
function setVolume(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;

  audio.volume = clickX / width;
  const volumePercent = audio.volume * 100;
  volume.style.width = `${volumePercent}%`;
  volumePercentage.innerText = Math.round(audio.volume * 100) + " %";
}

// Update progress bar
function updateProgress(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const minutesPassed = Math.floor(currentTime / 60);
  let secondsPassed = '';
  if (currentTime % 60 < 10) {
      secondsPassed = '0' + Math.floor(currentTime % 60);
  } else {
      secondsPassed = Math.floor(currentTime % 60);
  }
  
  currentTimeStamp.innerText = `${minutesPassed}:${secondsPassed}`;
}

// Set progress bar
function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

// Event listeners
playBtn.addEventListener('click', () => {
  const isPlaying = musicContainer.classList.contains('play');

  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
  loadDuration();
});

// Change song
prevBtn.addEventListener('click', () => {prevSong(); loadDuration()});
nextBtn.addEventListener('click', () => {nextSong(); loadDuration()});

// Skipping time
// fastBackwardBtn.addEventListener('click', fastBackwardSong);
// fastForwardBtn.addEventListener('click', fastForwardSong);

// Time/song update
audio.addEventListener('timeupdate', updateProgress);

// Click on volume bar
volumeContainer.addEventListener('click', setVolume);

// Click on progress bar
progressContainer.addEventListener('click', setProgress);

// Song ends
audio.addEventListener('ended', () => {nextSong(); loadDuration()});