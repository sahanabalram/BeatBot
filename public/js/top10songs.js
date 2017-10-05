function topTen() {
    $.ajax({
        type: "GET",
        url: "api/top10songs",
        success: function (data, textStatus, jqXHR) {
            var tr;
            $("#display-top10songs").empty();
            for(var i = 0; i < data.length; i++) {
                tr =$("<tr/>");
                tr.append("<td>" + data[i].id + "</td>");
                tr.append("<td>" + data[i].artist + "</td>");
                tr.append("<td>" + data[i].title + "</td>");
                tr.append("<td>" + data[i].year + "</td>");
                $("#display-top10songs").first().append(tr);
            }
        }
    });
}

$(document).ready(function(){
    topTen();
});