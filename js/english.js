$(function () {
    $("#english").keyup(function () {
        const englishMessage = $(this).text();
        const morseMessage = englishToMorse(englishMessage);
        const asciiMessage = englishToAscii(englishMessage);
        const binaryMessage = asciiToBinary(asciiMessage);
    });

    $("#play-english").click(function () {
        speak($("#english").text().trim(), 1);
    });
    $("#play-english").on("touchstart", function () {
        speak($("#english").text().trim(), 1);
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
    asciiMessage = asciiMessage.substring(0, asciiMessage.length - 1);
    $("#ascii").text(asciiMessage);
    return asciiMessage;
}