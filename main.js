$(function () {
    $(".placeholder").click(function () {
        $(".placeholder").text("    ");
        $(".placeholder").removeClass("placeholder");
    });

    $("#english").keyup(function () {
        const englishMessage = $(this).text();
        let morseMessage = "";
        for (let i = 0; i < englishMessage.length; i++) {
            const englishLetter = englishMessage[i].toUpperCase();
            const morseLetter = morseDict[englishLetter];
            if (morseLetter != undefined) {
                morseMessage += morseLetter + " ";
            }
        }
        $("#morse").text(morseMessage);
    });

    $("#morse").keyup(function () {
        const morseMessage = $(this).text();
        const morseWords = morseMessage.split("/");
        let englishMessage = "";
        for (let i = 0; i < morseWords.length; i++) {
            const morseLetters = morseWords[i].split(" ");
            let englishWord = "";
            for (let j = 0; j < morseLetters.length; j++) {
                const morseLetter = morseLetters[j].replace(" ", "");
                const englishLetter = getKeyByValue(morseDict, morseLetter);
                if (englishLetter != undefined) {
                    englishWord += englishLetter;
                }
            }
            englishMessage += englishWord + " ";
        }
        $("#english").text(englishMessage);
    });

    $(".textarea").on("focusout", function () {
        speak();
    });
});

function speak() {
    const englishText = $("#english").text();
    const morseText = $("#morse").text();
    const utterance = new SpeechSynthesisUtterance(englishText);
    utterance.onend = function (event) { playMorse(morseText); }
    window.speechSynthesis.speak(utterance);
}

function playMorse(morse) {
    dotlength = 50;
    var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    var oscillator = audioCtx.createOscillator();
    var gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    gainNode.gain.value = 0;
    oscillator.type = 'sine';
    oscillator.frequency.value = 440;
    oscillator.start();
    let duration = 0;
    console.log(morse[0])
    switch (morse[0]) {
        case ".":
            gainNode.gain.value = 0.1;
            duration = 2000;
        case "-":
            gainNode.gain.value = 0.1;
            duration = dotlength * 5;
        case " ":
            duration = dotlength * 2;
        case "/":
            duration = dotlength * 5;
    }
    setTimeout(() => {
        if (morse.length > 1) {
            oscillator.stop();
            playMorse(morse.substring(1))
        }
    }, duration);

}

function getKeyByValue(object, value) {
    return Object.keys(object).find(key =>
        object[key] === value);
}

const morseDict = {
    "A": ".-",
    "B": "-...",
    "C": "-.-.",
    "D": "-..",
    "E": ".",
    "F": "..-.",
    "G": "--.",
    "H": "....",
    "I": "..",
    "J": ".---",
    "K": "-.-",
    "L": ".-..",
    "M": "--",
    "N": "-.",
    "O": "---",
    "P": ".--.",
    "Q": "--.-",
    "R": ".-.",
    "S": "...",
    "T": "-",
    "U": "..-",
    "V": "...-",
    "W": ".--",
    "X": "-..-",
    "Y": "-.--",
    "Z": "--..",
    " ": "/",
    "0": "-----",
    "1": ".----",
    "2": "..---",
    "3": "...--",
    "4": "....-",
    "5": ".....",
    "6": "-....",
    "7": "--...",
    "8": "---..",
    "9": "----.",
    "&": ".-...",
    "'": ".----.",
    "@": ".--.-.",
    ")": "-.--.-",
    "(": "-.--.",
    ":": "---...",
    ",": "--..--",
    "=": "-...-",
    "!": "-.-.--",
    ".": ".-.-.-",
    "-": "-....-",
    "*": "-..-",
    "%": "----- -..-. -----",
    "+": ".-.-.",
    '"': ".-..-.",
    "?": "..--..",
    "/": "-..-."
}