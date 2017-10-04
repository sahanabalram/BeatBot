<p align="center" text-align="center">
  <img width="100" src="https://raw.githubusercontent.com/sahanabalram/BeatBot/master/public/images/BeatBot-Logo.PNG" alt="BeatBot - Logo">
</p>
# BeatBot

## Things to work on:
- Check if logged in, if logged in take to user profile, if not logged in take them to /login (or keep on index, but display login/create an account box)
- ~~When a user is on their profile they should see their playlist names (songs in playlist, will be in a collapsed div that can expand)~~
- Search box can change between song, album or artist
- API's to add: Spotify, YouTube, SoundCloud, iTunes, LastFM, etc.. (choose 3?)
- Setting up routes, gets, posts, handlebars (layouts w/ dynamic code)
- Any public files can go in the public folder
- ~~Add a view for public vs private users (if user says public, than anyone can type in users name and see playlists, but not edit, etc..)~~

## Dependencies:
- bCrypt (bcrypt-nodejs)
- Body Parser (body-parser)
- Express
- Express Handlebars (express-handlebars)
- Express Session (express-session)
- Method Override (method-override)
- Mocha
- Moment
- MySQL2
- Passport
- Passport Local (passport-local)
- Path
- Sequelize
- Should

```
npm install express express-session express-handlebars body-parser method-override passport passport-local sequelize mysql2 bcrypt-nodejs mocha moment path should --save
```

