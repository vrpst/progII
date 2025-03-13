// start audio
const audio_context = new AudioContext()!;
const audio_element = document.querySelector("audio")!;
let audio = audio_context.createMediaElementSource(audio_element);
audio.connect(audio_context.destination);

const button = document.querySelector("button")!;
button.addEventListener("click", () => {
    audio_element.play();
    console.log("PLAYING");
});

