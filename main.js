$(function () {
    $("#english").keyup(function () {
        const englishMessage = $(this).val();
        let morseMessage = ""
        for (let i = 0; i < englishMessage.length; i++) {
            englishLetter = englishMessage[i].toUpperCase();
            morseMessage += morseDict[englishLetter] + " ";
        }
        $("#morse").val(morseMessage);
    });

    $("#morse").keyup(function () {
        const morseMessage = $(this).val();
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
        $("#english").val(englishMessage);
    });
});

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