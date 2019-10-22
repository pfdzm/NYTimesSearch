$(document).ready(function() {
  var searchTerm = $("#searchTerm");
  var startYear = $("#startYear");
  var endYear = $("#endYear");
  var numberOfRecords = $("#numberOfRecords");
  var clearButton = $("#clear");
  var searchButton = $("#search");

  var searchTermVal, startYearVal, endYearVal, numberOfRecordsVal;

  var getData = function() {
    var apiKey = "FguIaigSIbRRfYJYsaFNvMMoIo021Rlz";
    var queryURL =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" +
      searchTermVal +
      "&api-key=" +
      apiKey +
      "&begin_date=" +
      startYearVal +
      "&end_date=" +
      endYearVal;
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);
      var arrayResults = response.response.docs;

      for (let index = 0; index < arrayResults.length; index++) {
        const element = arrayResults[index];
        var headLine = element.headline.main;
        var author = element.byline.original;
        var section = element["section_name"];
        var pubDate = element["pub_date"];
        var webUrl = element["web_url"];

        var card, cardHeader, cardBody, articleURL;

        card = $("<div>");
        card.addClass("card");

        cardBody = $("<div>").text(author + section + pubDate);
        cardBody.addClass("card-body");

        articleURL = $("<a>")
          .attr("href", webUrl)
          .text(webUrl);
        cardBody.append(articleURL);

        cardHeader = $("<h4>").text(headLine);
        cardHeader.addClass("card-header");

        card.append(cardHeader);
        card.append(cardBody);
        $("#results").append(card);
        console.log(headLine);

        if (index == numberOfRecordsVal - 1) {
          break;
        }
      }
    });
  };
  $("#clear").on("click", function(event) {
    event.preventDefault();
    $("#results").html("");
    searchTerm.val("");
    startYear.val("");
    endYear.val("");
    numberOfRecords.val("");
  });

  $("form").on("submit", function(event) {
    event.preventDefault();
    searchTermVal = searchTerm.val();
    startYearVal = startYear.val() + "0101";
    endYearVal = endYear.val() + "1231";
    numberOfRecordsVal = numberOfRecords.val();
    getData();
  });
});
