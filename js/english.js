$(function () {
    $("#english").keyup(function () {
        const englishMessage = $(this).text();
        englishToMorse(englishMessage);
        englishToAscii(englishMessage);
    });

    $("#speak").click(function () {
        speak($("#english").text());
    });
});

function englishToMorse(englishMessage) {
    let morseMessage = "";
    for (let i = 0; i < englishMessage.length; i++) {
        const englishLetter = englishMessage[i].toUpperCase();
        const morseLetter = morseDict[englishLetter];
        if (morseLetter != undefined) {
            morseMessage += morseLetter + " ";
        }
    }
    morseMessage = morseMessage.substring(0, morseMessage.length - 1);
    $("#morse").text(morseMessage);
    return morseMessage;
}

function englishToAscii(englishMessage) {
    let asciiMessage = "";
    for (let i = 0; i < englishMessage.length; i++) {
        const englishLetter = englishMessage[i];
        const asciiLetter = asciiDict[englishLetter];
        if (asciiLetter != undefined) {
            asciiMessage += asciiLetter + " ";
        }
    }
    $("#ascii").text(asciiMessage);
    return asciiMessage;
}