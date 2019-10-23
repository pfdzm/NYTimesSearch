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
    var queryURL;
    if (startYearVal == "" && endYearVal == "") {
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" +
        searchTermVal +
        "&api-key=" +
        apiKey;
    } else {
      queryURL =
        "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=" +
        searchTermVal +
        "&api-key=" +
        apiKey +
        "&begin_date=" +
        startYearVal +
        "&end_date=" +
        endYearVal;
    }
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log({query: {searchTermVal, apiKey, startYearVal, endYearVal}, response});
      var arrayResults = response.response.docs;

      for (let index = 1; index < arrayResults.length; index++) {
        const element = arrayResults[index];
        var headline = element.headline.main;
        var author = element.byline.original;
        var section = element["section_name"];
        var pubDate = element["pub_date"];
        var webUrl = element["web_url"];

        var card, cardHeader, cardBody, articleURL;

        card = $("<div>");
        card.addClass("card mb-3");

        cardBody = $("<div>");
        cardBody.addClass("card-body");

        cardBody.html(`
        <div>${moment(pubDate).format("lll")}</div>
        <div class="font-weight font-italic">${author}</div>
        <div class="font-weight-light font-italic">${section}</div>
        `);

        articleURL = $("<a>")
          .attr("href", webUrl)
          .text(`${webUrl}`);

          // articleURL.addClass("card-header text-dark font-weight-bold");
          // articleURL.innerHTML = $("<h4>").text(headline)
        cardBody.append(articleURL);

        cardHeader = $("<h4>").text(headline);
        cardHeader.addClass('card-header')

        card.append(cardHeader);
        card.append(cardBody);
        $("#results").append(card);

        if (index == numberOfRecordsVal) {
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
    $("#results").html("");
    searchTermVal = searchTerm.val().trim();

    if (startYear.val() !== "") {
      startYearVal = startYear.val().trim() + "0101";
    } else {
      startYearVal = "";
    }

    if (endYear.val() !== "") {
      endYearVal = endYear.val().trim() + "1231";
    } else {
      endYearVal = "";
    }
    numberOfRecordsVal = numberOfRecords.val();
    getData();
  });
});
