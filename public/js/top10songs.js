function topTen() {
    $.ajax({
        type: "GET",
        url: "api/top10songs",
        success: function (data, textStatus, jqXHR) {
            var tr;
            $("#display-top10songs").empty();
            for (var i = 0; i < data.length; i++) {
                tr = $("<tr/>");
                tr.append("<td>" + data[i].id + "</td>");
                tr.append("<td>" + data[i].artist + "</td>");
                tr.append("<td>" + data[i].title + "</td>");
                tr.append("<td>" + data[i].year + "</td>");
                $("#display-top10songs").first().append(tr);
            }
        }
    });
}


function search() {
    var song = $("#searchInput").val();
    $.ajax({
        type: "GET",
        url: "api/search/itunes/" + song,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            var tr;
            $("#display-itunes").empty();
            for (var i = 0; i < data.length; i++) {
                tr = $("<tr/>");
                tr.append("<td>" + data[i].song + "</td>");
                tr.append("<td>" + data[i].artist + "</td>");
                tr.append("<td>" + data[i].img+ "</td>");
                tr.append("<td>" + data[i].preview + "</td>");
                tr.append("<td>" + data[i].url + "</td>");
                $("#display-itunes").first().append(tr);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error while requesting itunes:", textStatus);
        }
    });
    $.ajax({
        type: "GET",
        url: "api/search/spotify/" + song,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#display-spotify").empty();
            for (var i = 0; i < data.length; i++) {
                tr = $("<tr/>");
                tr.append("<td>" + data[i].song + "</td>");
                tr.append("<td>" + data[i].artist + "</td>");
                tr.append("<td>" + data[i].img+ "</td>");
                tr.append("<td>" + data[i].url + "</td>");
                $("#display-spotify").first().append(tr);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error while requesting spotify:", textStatus);
        }
    });
    $.ajax({
        type: "GET",
        url: "api/search/gp/" + song,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#display-gp").empty();
            for (var i = 0; i < data.length; i++) {
                tr = $("<tr/>");
                tr.append("<td>" + data[i].song + "</td>");
                tr.append("<td>" + data[i].img+ "</td>");
                tr.append("<td>" + data[i].url + "</td>");
                $("#display-gp").first().append(tr);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error while requesting google play music:", textStatus);
        }
    });

}
$(document).ready(function () {
    topTen();
});