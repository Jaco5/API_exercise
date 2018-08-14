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
                var cuddleResults = response.data

                for (i = 0; i < cuddleResults.length; i++) {
                    var cuddleDiv = $("<div class='anim-div'>");
                    var p = $("<p class='rating'>");
                    $(p).text(cuddleResults[i].rating);
                    var cuddleImage = $("<img>");
                    $(cuddleImage).addClass("gif");
                    $(cuddleImage).attr('src', cuddleResults[i].images.fixed_height_still.url);
                    $(cuddleImage).attr("data-still", cuddleResults[i].images.fixed_height_still.url);
                    $(cuddleImage).attr("data-animate", cuddleResults[i].images.fixed_height.url);
                    $(cuddleImage).attr("data-state", "still");
                    $(cuddleDiv).addClass("anim-div");
                    $(cuddleDiv).append(p);
                    $(cuddleDiv).append(cuddleImage);
                    $("#warehouse").prepend(cuddleDiv);
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