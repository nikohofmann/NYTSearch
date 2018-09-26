$("document").ready(function() {
  $("#run-search").on("click", function(event) {
    event.preventDefault();

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json"
    var startYear = $("#start-year").val().trim();
    var endYear = $("#end-year").val().trim();
    var numRecords;

    queryURL += '?' + $.param({
      "api-key": "1622198bdd0b4c76a4d17386f4e7350f",
      "q": $("#search-term").val().trim()
    });

    if(startYear.length !== 4) {
      queryURL += $.param({
        "begin_date": startYear + "0101"
      });
    };

    if(endYear.length !== 4) {
      queryURL += $.param({
        "end_date": endYear + "0101"
      });
    };

    $.ajax({
      method: "GET",
      url: queryURL,
    }).then(function(response) {
      for (var i = 0; i < 5; i++) {
        var newDiv = $("<div>");
        newDiv.text(response.response.docs[i].headline.main);
        $("#article-section").append(newDiv);
      }
      console.log(response);
    });
  });
});