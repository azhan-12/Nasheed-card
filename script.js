let progress = document.getElementById("progress");
let nasheed = document.getElementById("nasheed");
let ctrlIcon = document.getElementById("ctrlIcon");

const title = document.querySelector("h1");
const artist = document.querySelector("p");
const image = document.querySelector(".nasheed-img");

// 🎵 List of songs
const songs = [
    {
        name: "My Mother",
        artist: "Muhammad al-muqit",
        src: "/img/audio 1.mp3",
        img: "img/img1.jpg"
    },
    {
        name: "Wedding Nasheed",
        artist: "Muhammad al-muqit",
        src: "img/audio 2.mp3",
        img: "img/img2.jpg"
    },
    {
        name: "Kashwaq al-layaal",
        artist: "Muhammad al-muqit",
        src: "img/audio 3.mp3",
        img: "img/img3.jpg"
    },
    {
        name: "Tabsirah",
        artist: "Muhammad al-muqit",
        src: "img/audio 4.mp3",
        img: "img/img4.jpg"
    },
    {
        name: "The way of tears",
        artist: "Muhammad al-muqit",
        src: "img/audio 5.mp3",
        img: "img/img5.jpg"
    },
];

let currentSong = 0;

// 🔁 Load current song
function loadSong(index) {
    const song = songs[index];
    title.textContent = song.name;
    artist.textContent = song.artist;
    image.src = song.img;
    nasheed.src = song.src;
    progress.value = 0;
}

function playPause() {
    if (nasheed.paused) {
        nasheed.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    } else {
        nasheed.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
}

nasheed.onloadeddata = function () {
    progress.max = nasheed.duration;
    progress.value = nasheed.currentTime;
};

nasheed.addEventListener("timeupdate", () => {
    progress.value = nasheed.currentTime;
});

progress.onchange = function () {
    nasheed.currentTime = progress.value;
    nasheed.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
};

// ▶️ Auto update progress
setInterval(() => {
    if (!nasheed.paused) {
        progress.value = nasheed.currentTime;
    }
}, 500);

// ⏭ Next Song
document.querySelector(".fa-forward").addEventListener("click", () => {
    currentSong = (currentSong + 1) % songs.length;
    loadSong(currentSong);
    nasheed.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
});

// ⏮ Previous Song
document.querySelector(".fa-backward").addEventListener("click", () => {
    currentSong = (currentSong - 1 + songs.length) % songs.length;
    loadSong(currentSong);
    nasheed.play();
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
});

// 🚀 Load first song on page load
loadSong(currentSong);
