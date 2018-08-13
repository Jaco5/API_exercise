var buttons = ["Baby Elephants", "Baby Koalas", "Baby Donkeys", "Miniature Ponies"]

function cuddleFunction() {
    $("#button-div").empty();
    for (i = 0; i < buttons.length; i++) {
        var cuddleButton = $("<button>" + buttons[i] + "</button>")
        cuddleButton.addClass("cuddle-button btn btn-primary");
        cuddleButton.attr("data-cuddletype", buttons[i]);
        $("#button-div").prepend(cuddleButton);

    }

    $(".cuddle-button").on("click", function () {
        var search = $(this).attr("data-cuddletype");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log(search);

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                var results = response.data

                for (i = 0; i < results.length; i++) {
                    var animalDiv = $("<div class='anim-div'>");
                    var p = $("<p class='rating'>");
                    $(p).text(results[i].rating);
                    var animalImage = $("<img>");
                    $(animalImage).addClass("gif");
                    $(animalImage).attr('src', results[i].images.fixed_height_still.url);
                    $(animalImage).attr("data-still", results[i].images.fixed_height_still.url);
                    $(animalImage).attr("data-animate", results[i].images.fixed_height.url);
                    $(animalImage).attr("data-state", "still");
                    $(animalDiv).addClass("anim-div");
                    $(animalDiv).append(p);
                    $(animalDiv).append(animalImage);
                    $("#warehouse").prepend(animalDiv);
                }

            })
    })
}
$("#warehouse").on("click", ".gif", function () {
    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr('data-animate'));
        $(this).attr("data-state", 'animate');
    }
    if (state === "animate") {
        $(this).attr("src", $(this).attr('data-still'));
        $(this).attr("data-state", 'still');
    }



    

});
$("nav").on("click", "#cute-button", function () {
    event.preventDefault();
    
    var newAnim = $("#cute-input").val();
    buttons.push(newAnim);
    cuddleFunction();
    $("#cute-input").val(" ")
})
cuddleFunction();