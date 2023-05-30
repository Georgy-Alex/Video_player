const video = document.getElementById('video');
const count = document.getElementById('count');
const progress = document.getElementById('slider')
const bufAmount = document.getElementById("buffered")
// SENSOR
const playAndPaus = document.querySelector('.play')
const back = document.querySelector('.back')
const forth = document.querySelector('.forth')
const speed = document.getElementById('speed')
const sound = document.getElementById('sound')


// HLS
const videoSrc = ' https://devstreaming-cdn.apple.com/videos/streaming/examples/img_bipbop_adv_example_ts/master.m3u8';
if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    window.hls = hls;
};

// SLIDER

video.ontimeupdate = Update;
progress.onclick = Rewind;
bufAmount.onclick = Rewind;
sound.oninput = Volume

function Update() {
    progress.value = (100 * video.currentTime) / video.duration;
};

function Rewind() {
    this.value = (100 * event.offsetX) / this.offsetWidth;
    video.pause();
    video.currentTime = video.duration * (event.offsetX / this.offsetWidth);
    video.play();
};

// SENSOR

let pause = true;
playAndPaus.addEventListener('click', () => {

    if(pause){
        video.play()
        pause = false
        playAndPaus.textContent = 'Pause'
    } else{
        video.pause()
        pause = true
        playAndPaus.textContent = 'Play'
    };

});

back.addEventListener('click', () => {
    video.currentTime -= 5
})

forth.addEventListener('click', () => {
    video.currentTime += 5
})

speed.onchange = () => {
    num = Number(speed.value)
    video.playbackRate = num
}

function Volume() {
    video.volume = this.value / 100
}



// BUFFERED
video.addEventListener('progress', function () {
    var duration = video.duration;
    if (duration > 0) {
        for (var i = 0; i < video.buffered.length; i++) {
            if (video.buffered.start(video.buffered.length - 1 - i) < video.currentTime) {
                document.getElementById("buffered-amount").style.width = (video.buffered.end(video.buffered.length - 1 - i) / duration) * 100 + "%";
                break;
            }
        }
    }
});


