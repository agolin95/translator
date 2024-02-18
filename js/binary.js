$(function () {
    $("#binary").keyup(function () {
        const binaryMessage = $(this).text().trim();
        const asciiMessage = binaryToAscii(binaryMessage);
        const englishMessage = asciiToEnglish(asciiMessage);
        const morseMessage = englishToMorse(englishMessage);
    });

    $("#play-binary").click(function () {
        speak($("#binary").text().trim());
    });
});

function binaryToAscii(binaryMessage) {
    const binaryLetters = binaryMessage.split(" ");
    let asciiMessage = "";
    for (let i = 0; i < binaryLetters.length; i++) {
        const binaryLetter = binaryLetters[i];
        const asciiLetter = parseInt(binaryLetter, 2);
        if (asciiLetter != undefined) {
            asciiMessage += asciiLetter + " ";
        }
    }
    asciiMessage = asciiMessage.substring(0, asciiMessage.length - 1);
    $("#ascii").text(asciiMessage);
    return asciiMessage;
}