require("dotenv").config();
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require('request');
// var http = require('http');
// var fs = require('fs');

var keys = require("./keys");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

// Possible commands
switch (command) {
    case "my-tweets":
        return myTweets();
    case "spotify-this-thing":
        return console.log("Not Available Yet")
    case "movie-this":
        return movieThis();
    case "do-what-it-says":
        return console.log("Not Available Yet")
    default:
        return console.log("Error in Arguments")
}

// function for my-tweets command
function myTweets() {
    client.get('statuses/user_timeline', function (error, tweets, response) {
        if (error) { console.log(error) };
        var tweetNum = 20;
        if (tweets.length < 20) {
            tweetNum = tweets.length;
        }
        for (var i = 0; i < tweetNum; i++) {
            console.log(tweets[i].text); // text of tweet
            console.log(tweets[i].created_at); // the UTC time of the tweet
            console.log("-------------------------------------------------");
        }
    });
}

// function for the movie-this command
function movieThis() {
    var movie = "";
    if (process.argv.length < 4) {
        movie = "Mr. Nobody";
    }
    else {
        for (var i = 3; i < process.argv.length; i++) {
            movie += process.argv[i] + " ";
        }
    }
    var url = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";
    request(url, function (error, response, body) {
        var data = JSON.parse(body);
        console.log('Title:', data.Title); // title of movie
        console.log('Year:', data.Year); // Release Year
        console.log('IMDB Rating:', data.imdbRating); // IMDB Rating
        console.log('Rotten Tomatoes Rating:', data.Ratings[1].Value); // rotten tomatoes rating
        console.log('Country:', data.Country); // country the movie is made
        console.log('Language:', data.Language); // languages the movie is in
        console.log('Plot:', data.Plot); // plot of the movie
        console.log('Actors:', data.Actors); // actors in the movie
    });
}