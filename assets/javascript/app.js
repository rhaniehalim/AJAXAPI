var listBrand = ['POTATO', 'PASTA', 'NOODLES', 'FRIED CHICKEN','KOREAN BBQ', 'SUSHI', 'RAMEN'];

function printBtn() {
    $(".buttons-container").empty();
    for (var i = 0; i < listBrand.length; i++) {
        var btn = $("<button>")
        btn.text(listBrand[i]);
        btn.addClass("buttons");
        btn.attr("info", listBrand[i]);
        $(".buttons-container").append(btn);
    }
}
printBtn()


$(document).on("click",".buttons", function () {
    getData($(this).attr("info"));
})

function getData(searchterm) {

    $.get("http://api.giphy.com/v1/gifs/search?q=" + searchterm + "&api_key=31n6Ki9I4bIeC6gtglM931FkUn2czpxk&limit=30", function (response) {

        $(".giphy-container").empty();
        for (let i = 0; i < response.data.length; i++) {
            var newImage = $("<img>");
            newImage.attr("src", response.data[i].images.original.url);
            $(".giphy-container").append(newImage);
            
        }

    });

}

$(".add-form").on("submit", function (event) {
    event.preventDefault();
    var button = $("#new-button-text").val();
    console.log(button);
    listBrand.push(button);
    printBtn();
})