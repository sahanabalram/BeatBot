$(documnet).ready(function() {
    $("#cms").on("submit", function() {
        event.preventDefault();
        var loginIn = $("#login");
        var bodyIn = $("#body");
        if(!loginIn.val().trim() || !bodyIn.val().trim() {
            return;
        }

        var loginPass = {
            username: loginIn.val().trim(),
            password: bodyIn.val().trim()
        };

        console.log(loginPass);
    });
}); 