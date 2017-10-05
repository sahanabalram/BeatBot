var authController = require("../controllers/authcontroller.js");
module.exports = function(app, passport) {
    // Waits for a get request on /signup
    app.get("/", authController.index);
    app.get("/signup", authController.signup);

    // Looks for a post request on /signup then runs through passport
    app.post("/signup", passport.authenticate("local-signup", {
        successRedirect: "/user",
        failureRedirect: "/signup"
    }));

    // Waits for a get request for /user
    app.get("/user", isLoggedIn, authController.user);

    // Waits for a get request on /logout
    app.get("/logout", authController.logout);

    // Looks for a post request on /signin then runs passport
    app.post("/signin", passport.authenticate("local-signin", 
        {
            successRedirect: "/user",
            failureRedirect: "/signup"
        }
    ));

    app.get("/search/:query", isLoggedIn, authController.searchQuery);
    // Looks for a post to /search, checks if loggedin and then runs searchPost
    app.post("/search", isLoggedIn, authController.searchPost);

    /**
     * API REQUESTS
     */
    app.get("/api/top10songs", isLoggedIn, authController.top10songs);

    /**
     * Music Stuff
     */
    app.post("api/search", function(req, res) {
        //Apple Music-------------------------------------------------------
            itunes.search(JSON.parse(req.body).song, options, function(data) {
                result.apple = [];
                for (var i = 0; i < data.results.length; i++) {
                    var item = {
                            song: data.results[i].trackName,
                            artist: data.results[i].artistName,
                            album: data.results[i].collectionName,
                            img: data.results[i].artworkUrl100,
                            url: data.results[i].trackViewUrl,
                            preview: data.results[i].previewUrl
                    }
                    result.apple.push(item)
                }
        //		res.json(data)
                
            })	
        //Spotify-------------------------------------------------------
            spotifyApi.clientCredentialsGrant()
            .then(function(data) {
        //		console.log('The access token expires in ' + data.body['expires_in']);
        //		console.log('The access token is ' + data.body['access_token']);
            
                // Save the access token so that it's used in future calls
                spotifyApi.setAccessToken(data.body['access_token']);
                
                spotifyApi.searchTracks(JSON.parse(req.body).song, {limit: 10})
                .then(function(data) {
                    result.spotify = [];
                    for (var i = 0; i < data.body.tracks.items.length; i++) {
                        var item = {
                                song: data.body.tracks.items[i].name,
                                artist: data.body.tracks.items[i].artists[0].name,
                                album: data.body.tracks.items[i].album.name,
                                img: data.body.tracks.items[i].album.images[1].url,
                                url: data.body.tracks.items[i].external_urls.spotify,
                                preview: null
                        }
                        result.spotify.push(item)
                    }
            }, function(err) {
                console.log('Something went wrong when retrieving an access token', err.message);
            });
                
                
        //	  res.json(data)
            }, function(err) {
              console.log('Something went wrong!', err);
            });
            
        //Google-------------------------------------------------------	
            pm.login({email: "babyjnova12", password: "pagebrin", androidId: ""}, function(err) {
                if(err) console.error(err);
                
            })
            pm.init({email: "babyjnova12", password: "pagebrin"}, function(err) {
                if(err) console.error(err);
        
                pm.search(JSON.parse(req.body).song, 10, function(err, data) { 
                        result.google = [];
                    for (var i = 0; i < data.entries.length; i++) {
                        if (data.entries[i].type == 8) {
                            result.mv = "https://www.youtube.com/watch?v=" + data.entries[i].youtube_video.id;
                            break;
                        }
        
                    }
                    
                    for (var i = 0; i < data.entries.length; i++) {
                        if (data.entries[i].type == 6) {
                            if (data.entries[i].station.seed.trackId == undefined) {
                                continue;
                            }
                            var item = {
                                    song: data.entries[i].station.name,
                                    artist: null,
                                    album: null,
                                    img: data.entries[i].station.imageUrls[0].url,
                                    url: "https://play.google.com/music/listen?authuser&u=0#/wst/sm/" + data.entries[i].station.seed.trackId,
                                    preview: null
                            }
                            result.google.push(item)
                        }
        
                    }
        //	        res.json(data)
                    });
        
            });
        //------------------------------------------------------------	
            res.json(result);
            
        });
    
    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated()) return next();
        res.redirect("/signup");
    }
}