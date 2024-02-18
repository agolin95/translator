$(function () {
    $("#morse").keyup(function () {
        const morseMessage = $(this).text().trim();
        const morseWords = morseMessage.split("/");
        let englishMessage = "";
        for (let i = 0; i < morseWords.length; i++) {
            const morseLetters = morseWords[i].split(" ");
            let englishWord = "";
            for (let j = 0; j < morseLetters.length; j++) {
                const morseLetter = morseLetters[j];
                const englishLetter = getKeyByValue(morseDict, morseLetter);
                if (englishLetter != undefined) {
                    englishWord += englishLetter;
                }
            }
            englishMessage += englishWord + " ";
        }
        $("#english").text(englishMessage);
    });

    $("#play-morse").click(function () {
        const morseText = $("#morse").text().trim();
        playMorse(morseText);
    });
});

function playMorse(morse) {
    dotlength = 50;
    const audioNodes = createAudioNodes();
    audioNodes.osc.start();
    let duration = 0;
    switch (morse[0]) {
        case ".":
            audioNodes.gain.value = 0.1;
            duration = dotlength;
            break;
        case "-":
            audioNodes.gain.value = 0.1;
            duration = dotlength * 3;
            break;
        case " ":
            duration = dotlength * 3;
            break;
        case "/":
            duration = dotlength * 5;
            break;
    }
    setTimeout(() => {
        audioNodes.osc.stop();
        setTimeout(() => {
            if (morse.length > 1) {
                playMorse(morse.substring(1))
            }
        }, dotlength * 1.2); // Constant space between dots and dashes
    }, duration); // Duration of tone or silence
}

function createAudioNodes() {
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = 0;
    oscillator.type = 'sine';
    oscillator.frequency.value = 440;
    return { "osc": oscillator, "gain": gainNode.gain };
}