var letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
var states = ["Arizona", "California", "Florida", "Georgia", "Idaho", "Michigan", "Nebraska", "Oklahoma", "Texas", "Vermont"]

var wins = 0;
var guessesLeft = 15;

var currentWord = "";
var currentWordLetters = "";
var currentLetter = "";

var guesses = [];
var alreadyGuessedCorrect =[];
var alreadyGuessedWrong = [];
var correctGuess = [];

var spaces = 0;

var match = null;
var repeat = null;


function chooseWord() {
	var number = Math.random() * 10;
	number = Math.floor(number);

	this.currentWord = this.states[number];
	this.currentWordLetters = this.currentWord.split("");

	this.guesses = [];
	this.alreadyGuessedWrong = [];
	this.alreadyGuessedCorrect = [];
	this.correctGuess = [];
	this.guessesLeft = 15;

}

function isRepeat() {
	var repeatCount = -1;

	for (var i = 0; i < this.guesses. length; i++) {
		repeatCount++;
	}

	if (repeatCount == 0){
		this.repeat = false;
	}

	else{
		this.repeat = true;
	}
}

function isMatch() {
	var matchCount = 0;

	for (var i = 0; i < this.currentWordLetters.length; i++){
		matchCount++;
	}

	if (matchCount == 0){
		this.matchCount = false;
	}

	else{
		this.matchCount = true;
	}
}

function noRepeatLetters() {
	if (this.repeat == true){
		this.guesses.pop(this.currentLetter);
	}

	if (this.repeat == false && this.match == false){
		this.alreadyGuessedWrong.push(this.currentLetter);
		this.guessesLeft--;
	}

	if (this.repeat == false && this.match == true){
		this.alreadyGuessedCorrect.push(this.currentLetter);
		this.guessesLeft--;
	}

}

function lose(){
	if (this.alreadyGuessedCorrect == 0){
		for (var i = 0; i < this.currentWordLetters.length; i++){
			this.correctGuess[i] = "_";
		}
	}

	else {
		for (var i = 0; i < this.currentWordLetters.length; i++){
			if (this.correctGuess[i] != this.currentWordLetters[i]){
				for (var j = 0; j < this.alreadyGuessedCorrect.length; j++){
					if (this.alreadyGuessedCorrect[j] == this.currentWordLetters[i]){
						this.correctGuess[i] = this.currentWordLetters[i];
					}

					else {
						this.correctGuess[i] = "_";
					}
				}
			}
		}
	}
}

document.getElementById("current-word").innerHTML = this.correctGuess.join(" ");
document.getElementById("wins").innerHTML = ("Wins: " + this.wins + " ");
document.getElementById("letters-guessed").innerHTML = this.alreadyGuessedWrong;
document.getElementById("guesses-left").innerHTML = this.guessesLeft;

function check(){
	var counter = 0

	for (var i = 0; i < this.currentWordLetters.length; i++){
		if (this.correctGuess[i] == this.currentWordLetters[i]){
			counter++;
		}
	}

	if (counter == this.currentWordLetters.length) {
		this.wins++
		this.chooseWord();
	}

	//reveal corresponding image

	if (this.guessesLeft == 0) {
		this.chooseWord();
	}

	//reveal corresponding image
}

var userStart = false;

document.onkeyup = function(q) {
	currentLetter = String.fromCharCode(q.keyCode).toUpperCase();
	if (currentLetter == " " && userStart == false) {
		chooseWord();
		userStart = true;
	}

	guesses.push(game.currentLetter);

	isRepeat();
	isMatch();

	noRepeatLetters();
	lose();
	check();

}