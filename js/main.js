$(function () {
    $(".placeholder").click(function () {
        $(".placeholder").text("    ");
        $(".placeholder").removeClass("placeholder");
    });
});

function getKeyByValue(object, value) {
    return Object.keys(object).find(key =>
        object[key] === value);
}

function speak(text, rate) {
    if ('speechSynthesis' in window) {
        alert(text);
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = rate;
        utterance.volume = 0.5;
        let voices = synth.getVoices();
        for (let i = 0; i < voices.length; i++) {
            if (voices[i].name == "Junior") {
                utterance.voice = voices[i];
            }
        }
        if (synth.speaking) { synth.cancel(); }
        synth.speak(utterance);
    }
    else {
        alert("Speech Synthesis Unavailable.")
    }
}