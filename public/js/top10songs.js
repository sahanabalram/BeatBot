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
                tr.append("<td>" + data[i].topTenArtist + "</td>");
                tr.append("<td>" + data[i].topTenTitle + "</td>");
                tr.append("<td>" + data[i].topTenYear + "</td>");
                $("#display-top10songs").first().append(tr);
            }
        }
    });
}

function history() {
    $.ajax({
        type: "GET",
        url: "/history",
        success: function (data, textStatus, jqXHR) {
            console.log("Data: ",data);
            var searches;
            $("#display-top10searches").empty();
            if(data.length === 0) $("#display-top10searches").first().append("Error: User has no history!");
            for (var i = 0; i < data.length; i++) {
                searches = data[i].query+"<br/>";
                $("#display-top10searches").first().append(searches);
            }
        }
    });
}

function clearHistory() {
    $.ajax({
        type: "GET",
        url: "/clearhistory",
        success: function (data, textStatus, jqXHR) {
            console.log("Search History Cleared!");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error in clearing history: ",textStatus);
        }
    })
}

function search() {
    var song = $("#searchInput").val();
    $("#searchInput").val("");
    $.ajax({
        type: "POST",
        url: "/search",
        data: {value: song},
        success: function(data, textStatus, jqXHR) {
            console.log(data);
            console.log("The post worked?");
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log("Error while posting search: ",textStatus);
        }
    });
    $.ajax({
        type: "GET",
        url: "api/search/itunes/" + song,
        success: function (data, textStatus, jqXHR) {
            console.log(data);
            $("#itunes").empty();
            for (var i = 0; i < 5; i++) {
                div = $("<div/>");
                html = ' \
                <figure class="snip1506"> \
                    <div class="profile-image"><img src="' + data[i].img + '" alt="Card image cap"/> \
                    </div> \
                      <figcaption> \
                        <h3><a href=' + data[i].url +'>'  + data[i].song + '</a></h3> \
                        <h4>' + data[i].artist + '</h4> \
                        <p>' + data[i].album + '</p> \
                     </figcaption> \
                </figure> \
                ';
                div.append(html);
                $("#itunes").append(div);
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
            $("#spotify").empty();
            for (var i = 0; i < data.length; i++) {
                div = $("<div/>");
                html = ' \
                <figure class="snip1506"> \
                    <div class="profile-image"><img src="' + data[i].img + '" alt="Card image cap"/> \
                    </div> \
                      <figcaption> \
                        <h3><a href=' + data[i].url +'>'  + data[i].song + '</a></h3> \
                        <h4>' + data[i].artist + '</h4> \
                        <p>' + data[i].album + '</p> \
                     </figcaption> \
                </figure> \
                ';
                div.append(html);
                $("#spotify").append(div);
            }
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("Error while requesting spotify:", textStatus);
        }
    });
}

$(document).ready(function () {
    topTen();
    history();
});
