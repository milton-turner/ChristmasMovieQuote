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

var movieQuoteData = {
contestantName:"",
contestantNation:"",
movieTitle:"",
movieQuote:"",
movieQuotePts:0,
movieRank:false,
movieImage:""};

var localStoreInMemory = [movieQuoteData];

let quotes;

const ChristmasMovieVoteCalc = "ChristmasMovieVoteCalc";
const ChristmasMovieQuote = "ChristmasMovieQuote";
const ChristmasMovieLBDisplay = "ChristmasMovieLBDisplay";
const ChristmasMovieQuoteDisplay = "ChristmasMovieQuoteDisplay";
const ChristmasMovieTitleScreen = "index";
const nextScreenArray = [ChristmasMovieTitleScreen, ChristmasMovieLBDisplay, ChristmasMovieQuoteDisplay];
const LEADER_BOARD = "leaderBoard";
const MOVIE_QUOTES = "movieQuotes";
const MOVIE_A_DIV_ID = "Movie_A";
const MOVIE_B_DIV_ID = "Movie_B";
const MOVIE_VOTE_BUTTON_DIV_ID = "ButtonSelection";
const cfgLeaderBoardNum = 10;
const cfgActivityTimeOut = 180000;
const cfgScreenSwaps = 60000;
const cfgQuoteSwap = 90000;
var currentScreen = 0;
var paused=false;
var htmlElementBucket;
let movieA=0, movieB=0;

function getMovie() {
	movieQuoteData.movieTitle = document.getElementById("movieEntry").value;
	movieQuoteData.movieQuote = document.getElementById("quoteEntry").value;
	movieQuoteData.contestantName = document.getElementById("contestantNameEntry").value;
	movieQuoteData.contestantNation = getRadioValue("contestantNation");
	if (document.getElementById("movieEntry").value &&
		document.getElementById("quoteEntry").value &&
		document.getElementById("contestantNameEntry").value) {
		//writeMovieQuote();
		addToMovieQuotes(movieQuoteData);
		//screenSwap();
		goQuotesDisplay();
	}
	else {
		clearForm();
	}
	setTimeout(screenSwap,cfgScreenSwaps);
}

function getRadioValue(name) {
	var radioList = document.getElementsByName(name);
	for (let i = 0; i < radioList.length; i++) {
		if (radioList[i].checked) {
			return radioList[i].value;
		}
	}
}

function writeMovieQuote() {
	document.write("<h2>Your favorite movie and quote:</h2>");
	for (var property in movieQuoteData) {
		if (movieQuoteData.hasOwnProperty(property)) {
			document.write(property + ": " + movieQuoteData[property] + "<br>");
		}
	}
}

function clearForm() {
	document.getElementById("movieEntry").value = "";
	document.getElementById("quoteEntry").value = "";
	document.getElementById("contestantNameEntry").value = "";
	var radioList = document.getElementsByName("contestantNation");
	for (let i = 0; i < radioList.length; i++) {
		if (radioList[i].checked) {
			radioList[i].checked = false;
		}
	}
	goQuotesDisplay();
}

function updateLeaderBoard(QuotesData) {
	/** todo 
	 *  getLeaderBoard
	 *  qualifyForLeaderBoard
	 *  addToLeaderBoard
	 */
	QuotesData.sort( function(a, b) {b.movieQuotePts - a.movieQuotePts});
	setLocalFile(LEADER_BOARD, JSON.stringify(QuotesData.slice(0,10)));
}

function getLeaderBoard() {
	/* Retreive the Leader Board from local storage */
	var leaderBoard = localStorage.getItem(LEADER_BOARD);
	return leaderBoard
}

function qualifyForLeaderBoard(leader, user) {
	var leaderBoardData = localStorage.getItem(LEADER_BOARD);
}

function addToMovieQuotes(user) {
	var movieQuotesAsString = loadLocalFile(MOVIE_QUOTES);
	var movieQuotes;
	if (movieQuotesAsString){
		movieQuotes = JSON.parse(movieQuotesAsString);

	}else{
		movieQuotes= [];
	}
	movieQuotes.push(user);
	setLocalFile(MOVIE_QUOTES, JSON.stringify(movieQuotes));
}

function goVote(){
	document.location.assign(ChristmasMovieVoteCalc+".htm");
}

function goQuote(){
	document.location.assign(ChristmasMovieQuote+".htm");
}

function goLBDisplay(){
	document.location.assign(ChristmasMovieLBDisplay+".htm");
}

function goQuotesDisplay(){
	document.location.assign(ChristmasMovieQuoteDisplay+".htm");
}

function goTitle(){
	document.location.assign(ChristmasMovieTitleScreen+".htm");
}

function screenSwap(){
	// const d = new Date();
	// swapTimer = d.getTime();
	// console.log("Current Screen: "+ currentScreen + " Array: "+ nextScreenArray);
	// if(nextScreenArray.length > currentScreen) currentScreen=0;
	// while(swapTimer+cfgScreenSwaps < d.getTime()){
	// 	//wait till time to switch to next screen
	// }
	// document.location.href=nextScreenArray[currentScreen++]+".htm";
	console.log("Current Screen: "+ currentScreen + " Array: "+ nextScreenArray);

	document.location.assign(nextScreenArray[(Math.floor(Math.random() * nextScreenArray.length))]+".htm");
}

function displayQuotes(displayElementID){
	//console.log(JSON.stringify(localStorage.getItem(MOVIE_QUOTES)));
	data = JSON.parse(localStorage.getItem(MOVIE_QUOTES));
	if(data){
		if(displayElementID){
			htmlElementBucket = document.getElementById(displayElementID);
			//htmlElementBucket.textContent=JSON.stringify(localStorage.getItem(MOVIE_QUOTES));
			data.forEach(d => {htmlElementBucket.innerHTML += ("<p>Movie: "+ d.movieTitle + "<br>Quote: " + d.movieQuote + "<br>Name: " + d.contestantName + "<br>Nation: " + d.contestantNation + "<\p>")});
		}else
		{
			document.write(JSON.stringify(localStorage.getItem(MOVIE_QUOTES)));
		}
	}
	else{
		document.write("No Quotes yet");
	}
	setTimeout(screenSwap,cfgScreenSwaps);
}

function displayOneQuote(displayElementID, movieQuote) {
	if (displayElementID && movieQuote) {
		htmlElement = document.getElementById(displayElementID);
		//htmlElementBucket.textContent=JSON.stringify(localStorage.getItem(MOVIE_QUOTES));
		htmlElement.innerHTML = ("<p>Movie: " + movieQuote.movieTitle +
			"<br>Quote: " +
			movieQuote.movieQuote + "<br>Name: " +
			movieQuote.contestantName + "<br>Nation: " +
			movieQuote.contestantNation + "<\p>");
	}
}

function displayLB(displayElementID){
	//console.log(JSON.stringify(localStorage.getItem(MOVIE_QUOTES)));
	/**ToDo handle null case from leader board local storeage */
	data = JSON.parse(localStorage.getItem(LEADER_BOARD));
	if(data){
		if(displayElementID){
			let htmlElementBucket = document.getElementById(displayElementID);
			//htmlElementBucket.textContent=JSON.stringify(localStorage.getItem(LEADER_BOARD));
			//htmlElementBucket.textContent=JSON.stringify(localStorage.getItem(LEADER_BOARD));
			data.forEach(d => {htmlElementBucket.innerHTML += ("<p>Movie: "+ d.movieTitle + "<br>Quote: " + d.movieQuote + "<br>Name: " + d.contestantName + "<br>Nation: " + d.contestantNation + "<\p>")});

		}
		else{
			document.write(JSON.stringify(localStorage.getItem(MOVIE_QUOTES)));
		}
	}
	else{
		document.write("No Votes yet");
	}
	setTimeout(screenSwap,cfgScreenSwaps);
}

function loadLocalFile(localFile){
	return(localStorage.getItem(localFile));
}

function setLocalFile(localFile, localFileData){
	localStorage.setItem(localFile, localFileData);
}

function yesVote(quoteElement){
	// htmlElement = document.getElementById(displayElementID);
	console.log("Movie A: \n" + JSON.stringify(quotes[quoteElement]));
	console.log("YesVote");
	quotes[quoteElement].movieQuotePts++;
	quotes[quoteElement].movieRank=true;
	//quoteVoteLoad();
}

function noVote(quoteElement){
	console.log("Movie B: \n" + JSON.stringify(quotes[quoteElement]));
	console.log("NoVote");
	(quotes[quoteElement].movieQuotePts > 0) ? quotes[quoteElement].movieQuotePts-- : quotes[quoteElement].movieQuotePts=0;
	quotes[quoteElement].movieRank=false;
	//quoteVoteLoad();
}

function quoteVoteLoad(){
	quotes = JSON.parse(loadLocalFile(MOVIE_QUOTES));
	if (quotes && quotes.length > 1) {
		movieA = Math.floor(Math.random() * quotes.length);
		do {
			movieB = Math.floor(Math.random() * quotes.length);
		} while(movieB == movieA); //Keep looping till 2 different numbers are present
	}else
	{
		goQuote();
	}
	displayOneQuote(MOVIE_A_DIV_ID,quotes[movieA]);
	displayOneQuote(MOVIE_B_DIV_ID,quotes[movieB]);
	addVoteButtons(MOVIE_A_DIV_ID, movieA);
	addVoteButtons(MOVIE_B_DIV_ID, movieB);
	setLocalFile(MOVIE_QUOTES, JSON.stringify(quotes));
	updateLeaderBoard(quotes);
	setTimeout(screenSwap, cfgActivityTimeOut);
}	

function addVoteButtons(screenDIV_ID, movieQuoteElement)
{
	if (screenDIV_ID && movieQuoteElement) {
		htmlElement = document.getElementById(screenDIV_ID);
			const yesButton = document.createElement("button");
			yesButton.onclick = () => yesVote(movieQuoteElement);
			yesButton.textContent = "Yes Vote";
			htmlElement.appendChild(yesButton);

			const noButton = document.createElement("button");
			yesButton.onclick = () => noVote(movieQuoteElement);
			yesButton.textContent = "No Vote";
			htmlElement.appendChild(noButton);
	}
}