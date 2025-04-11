// start audio
const sound = new Audio('/assets/audio/1/1.wav')
document.addEventListener("mousemove", function () {
    sound.muted = false
    console.log("DONE")  //  figure out what below is
    //Uncaught (in promise) NotAllowedError: play() failed because the user didn't interact with the document first. https://goo.gl/xX8pDD
    sound.play()
})