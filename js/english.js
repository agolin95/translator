$(function () {
    $("#english").keyup(function () {
        const englishMessage = $(this).text().trim();
        toMorse(englishMessage);
        toAscii(englishMessage);
    });

    $("#speak").click(function () {
        speak($("#english").text().trim());
    });

    $("#play-ascii").click(function () {
        speak($("#ascii").text().trim());
    });
});

function toMorse(text) {
    let morseMessage = "";
    for (let i = 0; i < text.length; i++) {
        const letter = text[i].toUpperCase();
        const morseLetter = morseDict[letter];
        if (morseLetter != undefined) {
            morseMessage += morseLetter + " ";
        }
    }
    $("#morse").text(morseMessage);
}

function toAscii(text) {
    let asciiMessage = "";
    for (let i = 0; i < text.length; i++) {
        const letter = text[i];
        const asciiLetter = asciiDict[letter];
        if (asciiLetter != undefined) {
            asciiMessage += asciiLetter + " ";
        }
    }
    $("#ascii").text(asciiMessage);
}

function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    if (synth.speaking) {
        synth.cancel();
    }
    synth.speak(utterance);
}