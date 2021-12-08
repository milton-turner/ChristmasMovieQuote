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
	contestantName: "",
	contestantNation: "",
	movieTitle: "",
	movieQuote: "",
	movieQuotePts: 0,
	movieRank: "",
	movieImage: ""
};

let movieQuoteDataArr = [movieQuoteData];
let leaderBoardArr = [movieQuoteData];

const ChristmasMovieVoteCalc = "ChristmasMovieVoteCalc";
const ChristmasMovieQuote = "ChristmasMovieQuote";
const ChristmasMovieLBDisplay = "ChristmasMovieLBDisplay";
const ChristmasMovieQuoteDisplay = "ChristmasMovieQuoteDisplay";
const ChristmasMovieTitleScreen = "ChristmasMovieTitleScreen";
const nextScreenArray = [ChristmasMovieLBDisplay, ChristmasMovieQuoteDisplay, ChristmasMovieTitleScreen];
const LEADER_BOARD = "leaderBoard";
const MOVIE_QUOTES = "movieQuotes"
const cfgLeaderBoardNum = 10;
const cfgActivityTimeOut = 180000;
const cfgScreenSwaps = 60000;
const cfgQuoteSwap = 90000;
var currentScreen = 0;
var paused=false;
var htmlElementBucket;

function getMovie() {
	movieQuoteData.movieTitle = document.getElementById("movieEntry").value;
	movieQuoteData.movieQuote = document.getElementById("quoteEntry").value;
	movieQuoteData.contestantName = document.getElementById("contestantNameEntry").value;
	movieQuoteData.contestantNation = getRadioValue("contestantNation");
	if (document.getElementById("movieEntry").value &&
		document.getElementById("quoteEntry").value &&
		document.getElementById("contestantNameEntry").value) {
		writeMovieQuote();
		addToMovieQuotes(movieQuoteData);
		//screenSwap();
		//goQuotesDisplay();
	}
	else {
		clearForm();
	}
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

function calculateLeaderBoardPosition(newUserQuoteData) {
	/** todo 
	 *  getLeaderBoard
	 *  qualifyForLeaderBoard
	 *  addToLeaderBoard
	 */
	addToLeaderBoard(newUserQuoteData).qualifyForLeaderBoard(newUserQuoteData).getLeaderBoard();
}

function getLeaderBoard() {
	/* Retreive the Leader Board from local storage */
	var leaderBoard = localStorage.getItem(LEADER_BOARD);
	return leaderBoard
}

function qualifyForLeaderBoard(leader, user) {
	var leaderBoardData = localStorage.getItem(LEADER_BOARD);
}

function addToLeaderBoard(user) {
	var movieQuotesAsString = loadLocalFile(LEADER_BOARD);
	var movieQuotes;
	if (movieQuotesAsString){
		movieQuotes = JSON.parse(movieQuotesAsString);
	}else{
		movieQuotes= [];
		movieQuotes.push(movieQuote);
	}
		loadLocalFile(LEADER_BOARD, JSON.stringify(movieQuotes));
}

function addToMovieQuotes(movieQuote) {
	var movieQuotesAsString = loadLocalFile(MOVIE_QUOTES);
	var movieQuotes;
	if (movieQuotesAsString){
		movieQuotes = JSON.parse(movieQuotesAsString);

	}else{
		movieQuotes= [];
	}
	movieQuotes.push(movieQuote);
	loadLocalFile(MOVIE_QUOTES, JSON.stringify(movieQuotes));
}

function goVote(){
	document.location.href=ChristmasMovieVoteCalc+".htm";
}

function goQuote(){
	document.location.href=ChristmasMovieQuote+".htm";
}

function goLBDisplay(){
	document.location.href=ChristmasMovieLBDisplay+".htm";
}

function goQuotesDisplay(){
	document.location.href=ChristmasMovieQuoteDisplay+".htm";
}

function goTitle(){
	document.location.href=ChristmasMovieTitleScreen+".htm";
}

function screenSwap(){
	const d = new Date();
	swapTimer = d.getTime();
	console.log("Current Screen: "+ currentScreen + " Array: "+ nextScreenArray);
	if(nextScreenArray.length > currentScreen) currentScreen=0;
	while(swapTimer+cfgScreenSwaps < d.getTime()){
		//wait till time to switch to next screen
	}
	document.location.href=nextScreenArray[currentScreen++]+".htm";
	console.log("Current Screen: "+ currentScreen + " Array: "+ nextScreenArray);
}

function displayQuotes(displayElementID){
	//console.log(JSON.stringify(localStorage.getItem(MOVIE_QUOTES)));

	if(displayElementID){
		htmlElementBucket = document.getElementById(displayElementID);
		htmlElementBucket.textContent=JSON.stringify(localStorage.getItem(MOVIE_QUOTES));
	}
	{
		//document.write(JSON.stringify(localStorage.getItem(MOVIE_QUOTES)));
	}
	
}
function displayLB(displayElementID){
	//console.log(JSON.stringify(localStorage.getItem(MOVIE_QUOTES)));

	if(displayElementID){
		htmlElementBucket = document.getElementById(displayElementID);
		htmlElementBucket.textContent=JSON.stringify(localStorage.getItem(LEADER_BOARD));
	}
	{
		//document.write(JSON.stringify(localStorage.getItem(MOVIE_QUOTES)));
	}
	
}

function loadLocalFile(localFile){
	return(localStorage.getItem(localFile));
}

function setLocalFile(localFile, localFileData){
	localStorage.setItem(localFile, localFileData);
}

function yesVote(quoteDataArg){
	console.log("YesVote");
}

function noVote(quoteDataArg){
	console.log("NoVote");
}

function loadLeaderAndQuoteArr(){
	if(movieQuoteDataArr.length <= 1){
		/**todo load the Leader Board and Quote Array in memory */
		movieQuoteDataArr=JSON.parse(loadLocalFile(MOVIE_QUOTES));
	}
	if(leaderBoardArr.length <= 1){
		leaderBoardArr=JSON.parse(loadLocalFile(LEADER_BOARD));
	}
}

function displayFormattedMovieQuote(data){
	data.forEach(d => {console.log("Movie: "+ d.movieTitle + "\nQuote: "+ d.movieQuote)});
}
