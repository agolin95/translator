let allVoices = {};

$(function () {
    $(".placeholder").click(function () {
        $(".placeholder").text("    ");
        $(".placeholder").removeClass("placeholder");
    });

    populateVoiceList();
    speechSynthesis.onvoiceschanged = populateVoiceList;
});

function getKeyByValue(object, value) {
    return Object.keys(object).find(key =>
        object[key] === value);
}

function speak(text, rate) {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = rate;
        utterance.volume = 0.5;
        utterance.voice = allVoices[$("#voice-select").val()];

        const synth = window.speechSynthesis;
        synth.speaking ? synth.cancel() : synth.speak(utterance);
    }
    else {
        alert("Speech Synthesis Unavailable.")
    }
}


function populateVoiceList() {
    if (!("speechSynthesis" in window)) {
        const optionDOM = `<option>No Voices Available 🥺</option>`;
        $("#voice-select").append(optionDOM);
        return;
    }
    const voices = window.speechSynthesis.getVoices();
    for (let i = 0; i < voices.length; i++) {
        if (voices[i].lang == "en-US") {
            $("#voice-select").append(`<option>${voices[i].name}</option>`);
            allVoices[voices[i].name] = voices[i];
        }
    }

}