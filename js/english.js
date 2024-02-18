$(function () {
    $("#english").keyup(function () {
        const englishMessage = $(this).text().trim();
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

    $("#speak").click(function () {
        speak();
    });
});

function speak() {
    const synth = window.speechSynthesis;
    const englishText = $("#english").text().trim();
    const utterance = new SpeechSynthesisUtterance(englishText);
    if (synth.speaking) {
        synth.cancel();
    }
    synth.speak(utterance);
}