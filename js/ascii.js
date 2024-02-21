$(function () {
    $("#ascii").keyup(function () {
        const asciiMessage = $(this).text().trim();
        const englishMessage = asciiToEnglish(asciiMessage);
        const morseMessage = englishToMorse(englishMessage);
        const binaryMessage = asciiToBinary(asciiMessage);
    });

    $("#play-ascii").click(function () {
        speak($("#ascii").text().trim(), 1.2);
    });
});

function asciiToEnglish(asciiMessage) {
    const asciiLetters = asciiMessage.split(" ");
    let englishMessage = "";
    for (let i = 0; i < asciiLetters.length; i++) {
        const asciiLetter = asciiLetters[i];
        const englishLetter = getKeyByValue(asciiDict, asciiLetter);
        if (englishLetter != undefined) {
            englishMessage += englishLetter;
        }
    }
    $("#english").text(englishMessage);
    return englishMessage;
}

function asciiToBinary(asciiMessage) {
    const asciiLetters = asciiMessage.split(" ");
    let binaryMessage = "";
    for (let i = 0; i < asciiLetters.length; i++) {
        const asciiLetter = asciiLetters[i];
        let binaryLetter = Number(asciiLetter).toString(2);
        if (binaryLetter != undefined && binaryLetter != 0) {
            const bitLength = binaryLetter.length;
            for (let j = 0; j < 8 - bitLength; j++) {
                binaryLetter = "0" + binaryLetter;
            }
            binaryMessage += binaryLetter + " ";
        }
    }
    binaryMessage = binaryMessage.substring(0, binaryMessage.length - 1);
    $("#binary").text(binaryMessage);
    return binaryMessage;
}