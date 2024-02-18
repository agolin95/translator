$(function () {
    $(".placeholder").click(function () {
        $(".placeholder").text("    ");
        $(".placeholder").removeClass("placeholder");
    });
});

function getKeyByValue(object, value) {
    return Object.keys(object).find(key =>
        object[key] === value);
}