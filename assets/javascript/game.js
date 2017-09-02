var game = {
//letterArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
states = ["Arizona", "California", "Florida", "Georgia", "Idaho", "Michigan", "Nebraska", "Oklahoma", "Texas", "Vermont"];

wins = 0;
guessesLeft = 15;

currentWord = "";
currentWordLetters = "";
currentLetter = "";

guesses = [];
alreadyGuessedCorrect =[];
alreadyGuessedWrong = [];
correctGuess = [];

spaces = 0;

match = null;
repeat = null;
}


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

	if (this.guessesLeft == 0) {
		this.chooseWord();
	}
}

var userStart = false;

document.onkeyup = function(q) {
	game.currentLetter = String.fromCharCode(q.keyCode).toUpperCase();
	if (game.currentLetter == " " && userStart == false) {
		game.chooseWord();
		userStart = true;
	}

	game.guesses.push(game.currentLetter);

	game.isRepeat();
	game.isMatch();

	game.noRepeatLetters();
	game.lose();
	game.check();

}