var itunes = require('itunes-search');
var SpotifyWebApi = require('spotify-web-api-node');
var PlayMusic = require('playmusic');

module.exports = function (app) {
    //------------------------------------------------------------

    var options = {
        media: "music",
        entity: "",
        limit: 5
    }

    app.get("/api/search/itunes/:song", function (req, res) {
        results = [];
        if(!req.params.song) res.json(results);
        itunes.search(req.params.song, options, function (data) {
            
            for (var i = 0; i < data.results.length; i++) {
                var item = {
                    song: data.results[i].trackName,
                    artist: data.results[i].artistName,
                    album: data.results[i].collectionName,
                    img: data.results[i].artworkUrl100,
                    url: data.results[i].trackViewUrl,
                    preview: data.results[i].previewUrl
                }
                results.push(item);
            }
            res.json(results);
        });
    });

    app.get("/api/search/spotify/:song", function (req, res) {
        var spotifyApi = new SpotifyWebApi({
            clientId: '26e7e461255f4d1ca61d06d85c55e56d',
            clientSecret: '8005e4cceb1a49958d902ff43df0295d',
            redirectUri: 'http://www.example.com/callback'
        });
        
        spotifyApi.clientCredentialsGrant()
            .then(function (data) {
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.searchTracks(req.params.song, {
                    limit: 5
                }).then(function (data) {
                    results = [];
                    if(!req.params.song) res.json(results);
                    for (var i = 0; i < data.body.tracks.items.length; i++) {
                        var item = {
                            song: data.body.tracks.items[i].name,
                            artist: data.body.tracks.items[i].artists[0].name,
                            album: data.body.tracks.items[i].album.name,
                            img: data.body.tracks.items[i].album.images[1].url,
                            url: data.body.tracks.items[i].external_urls.spotify,
                            preview: null
                        }
                        results.push(item)
                    }
                    res.json(results);
                }, function (err) {
                    console.log('Something went wrong during search!', err);
                });
            }, function (err) {
                console.log('Something went wrong when retrieving an access token', err.message);
            });
    });

    app.get("/api/search/gp/:song", function (req, res) {
        var gpc = {
            username: "babyjnova12",
            password: "pagebrin"
        };

        var pm = new PlayMusic();

        pm.login({
            email: gpc.username,
            password: gpc.password,
            androidId: ""
        }, function (err) {
            if (err) throw err;
        });
        pm.init({
            email: gpc.username,
            password: gpc.password
        }, function (err) {
            if (err) {
                console.error(err);
            } else {
                pm.search(req.params.song, 5, function (err, data) {
                    results = [];
                    if(!req.params.song) res.json(results);
                    for (var i = 0; i < data.entries.length; i++) {
                        if (data.entries[i].type == 8) {
                            results.mv = "https://www.youtube.com/watch?v=" + data.entries[i].youtube_video.id;
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
                            results.push(item)
                        }
                    }
                    res.json(results);
                });
            }
        });
    });
}