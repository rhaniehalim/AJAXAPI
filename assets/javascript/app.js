var listBrand = ['PORSCHE 911', 'TOYOTA SUPRA', 'NISSAN SKYLINE', 'BMW M4', 'NISSAN 370Z', 'AUDI R8'];

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


$(document).on("click", ".buttons", function () {
    getData($(this).attr("info"));
    $("#new-button-text").empty;
})

function getData(searchterm) {

    $.get("http://api.giphy.com/v1/gifs/search?q=" + searchterm + "&api_key=31n6Ki9I4bIeC6gtglM931FkUn2czpxk&limit=9", function (response) {

        $(".giphy-container").empty();

        for (let i = 0; i < response.data.length; i++) {
            var still = response.data[i].images.fixed_height_still.url;
            var animated = response.data[i].images.fixed_height.url;


            
            var rating = response.data[i].rating;
            var containerRating = $("<p>").text("Rating: " + rating);
            var newImage = $("<img>");
            var newDiv = $("<div>")
            newImage.attr("src", response.data[i].images.fixed_height_still.url);
            newImage.attr("src", still);
            newImage.attr("data-still", still);
            newImage.attr("data-animate", animated);
            newImage.attr("data-state", still);
            newImage.addClass("new-image");
           
            newDiv.append(containerRating)
             newDiv.append(newImage)
            // new gif will animate if clicked twice, then work properly
            $(".giphy-container").append(newDiv);

        }

    });

}

$(document).on("click", ".new-image", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animated");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }

});

$("#add-form").on("submit", function (event) {
    event.preventDefault();
    var button = $("#new-button-text").val();
    console.log(button);
    listBrand.push(button);
    printBtn();
})
