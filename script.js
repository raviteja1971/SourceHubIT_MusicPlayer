const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const cover = document.getElementById("cover");
const playlist = document.getElementById("playlist");

let songs = Array.from(playlist.querySelectorAll("li")).map(li => ({
  name: li.textContent,
  src: li.getAttribute("data-src")
}));

let songIndex = 0;
let isPlaying = false;

// Load song
function loadSong(index) {
  const song = songs[index];
  audio.src = song.src;
  title.textContent = song.name;
  cover.src = "https://via.placeholder.com/150/ff9500/ffffff?text=" + encodeURIComponent(song.name);
  progress.value = 0;
}

loadSong(songIndex);

// Play / Pause
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playBtn.textContent = "▶️";
  } else {
    audio.play();
    playBtn.textContent = "⏸";
  }
  isPlaying = !isPlaying;
});

// Next / Previous
nextBtn.addEventListener("click", () => {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
});

prevBtn.addEventListener("click", () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songIndex);
  audio.play();
  playBtn.textContent = "⏸";
  isPlaying = true;
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
  progress.max = audio.duration;
  progress.value = audio.currentTime;
});

progress.addEventListener("input", () => {
  audio.currentTime = progress.value;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Playlist click
playlist.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    const index = songs.findIndex(song => song.src === e.target.getAttribute("data-src"));
    songIndex = index;
    loadSong(songIndex);
    audio.play();
    playBtn.textContent = "⏸";
    isPlaying = true;
  }
});
