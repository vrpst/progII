// start audio
const sound = new Audio('/assets/audio/1/1.wav')
document.addEventListener("keypress", function () {
    sound.muted = false
    console.log("DONE")
    sound.play()
})