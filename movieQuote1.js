/** todo
Create application in the vein of the Pardon the Turkey for the Favorite Christmas Movie
	Prompt for famous quote from the movie
	Rank on best quote
Bad word scrambler 
	Ass => A#%
    Dick => D^*$
	Faggot => F(**#t
	Fagot => F(**#t
    Fuck => F$%@
	Shit => S*&%
    ****/

const { Prompt } = require("react-router");

var movieQuoteData = {
contestantName:"",
contestantNation:"",
movieTitle:"",
movieQuote:"",
movieQuotePts:0,
movieRank:"",
movieImage:""};


/** todo: grab the movie and the quote */
movieQuoteData.movieTitle = prompt("What is your favorite Christmas movie?");
movieQuoteData.movieQuote = prompt("Give a quote from this movie.");
