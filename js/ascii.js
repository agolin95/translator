$(function () {
    $("#ascii").keyup(function () {
        const asciiMessage = $(this).text().trim();
        const englishMessage = asciiToEnglish(asciiMessage);
        const morseMessage = englishToMorse(englishMessage);
    });

    $("#play-ascii").click(function () {
        speak($("#ascii").text().trim());
    });
});

function asciiToEnglish(asciiMessage) {
    const asciiLetters = asciiMessage.split(" ");
    let englishMessage = "";
    console.log(asciiLetters);
    for (let i = 0; i < asciiLetters.length; i++) {
        const asciiLetter = asciiLetters[i];
        const englishLetter = getKeyByValue(asciiDict, asciiLetter);
        console.log(englishLetter)
        if (englishLetter != undefined) {
            englishMessage += englishLetter;
        }
    }
    englishMessage = englishMessage;
    $("#english").text(englishMessage);
    return englishMessage;
}