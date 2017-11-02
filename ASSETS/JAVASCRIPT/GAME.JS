
// list of presidents names for hangman game.

var presidentNames = {
  names:['Adams, John','Adams, John Quincy','Arthur, Chester Alan','Buchanan, James','Bush, George','Bush George W','Carter, Jimmy',
'Cleveland, Grover','Clinton, Bill','Coolidge, Calvin','Eisenhower, Dwight D','Fillmore, Millard','Ford, Gerald R','Garfield, James A','Grant, Ulysses S',
'Harding, Warren G','Harrison, Benjamin','Harrison, William Henry','Hayes, Rutherford Birchard', 'Hoover, Herbert','Jackson, Andrew','Jefferson, Thomas',
'Johnson, Andrew','Johnson, Lyndon B','Kennedy, John F','Lincoln, Abraham','Madison, James','McKinley, William','Monroe, James',
'Nixon, Richard M','Obama, Barack','Pierce, Franklin','Polk, James K','Reagan, Ronald','Roosevelt, Franklin D','Roosevelt, Theodore','Taft, William H',
'Taylor, Zachary','Truman, Harry S','Trump, Donald J','Tyler, John','Van Buren, Martin','Washington, George','Wilson, Woodrow', ]
},


// using above array we choose a random word.
  wordInPlay: null,
  lettersOfWord: [],
  matchedLetters: [],
  guessedLetters: [],
  guessesLeft: 0,
  totalGuesses: 0,
  letterGuessed: null,
  wins: 0,

// global variables 

setupGame: function() {
  var objKeys = Object.keys(this.wordsToPick);
  this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
//spacing between the words

this.lettersOfWord = this.wordInPlay.split("");
this.rebuildWordView();
this.processUpdateTotalGuesses();

//when user guesses a letter 
updatePage: function(letter) {
  //zero guesses left, restart the game
if (this.guessesLeft===0){
  this.restartGame();
}
//else
else {
  this.updateGuesses(letter);
  this.updateMatchedLetters(letter);
  this.rebuildWordView();
  //if the user wins the game, restart
  if (this.updateWins()===true){
    this.restartGame();
  }
}
},

updateGuesses: function(letter) {
if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfWord.indexOf(letter) === -1)) {
this.guessedLetters.push(letter);
this.guessesLeft--;
//update guesses
document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
document.querySelector("#guessed-letters").innerHTML =
this.guessedLetters.join(", ");}},

processUpdateTotalGuesses: function() {
this.totalGuesses = this.lettersOfWord.length + 3;
this.guessesLeft = this.totalGuesses;
document.querySelector("#guesses-remaining").innerHTML = this.guessesLeft;
},

updateMatchedLetters: function(letter) {
for (var i = 0; i < this.lettersOfWord.length; i++) {
if ((letter === this.lettersOfWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
this.matchedLetters.push(letter);
  }
 }
},


rebuildWordView: function() {
var wordView = "";
for (var i = 0; i < this.lettersOfWord.length; i++) {
if (this.matchedLetters.indexOf(this.lettersOfWord[i]) !== -1) {
wordView += this.lettersOfWord[i];
}
else {
wordView += "&nbsp;_&nbsp;";
}
}
document.querySelector("#current-word").innerHTML = wordView;
},
restartGame: function() {
    document.querySelector("#guessed-letters").innerHTML = "";
    this.wordInPlay = null;
    this.lettersOfWord = [];
    this.matchedLetters = [];
    this.guessedLetters = [];
    this.guessesLeft = 0;
    this.totalGuesses = 0;
    this.letterGuessed = null;
    this.setupGame();
    this.rebuildWordView();
  },

//checking if the user won
  updateWins: function() {
    var win;
    if (this.matchedLetters.length === 0) {
      win = false;
    }
    else {
      win = true;
    }

for (var i = 0; i < this.lettersOfWord.length; i++) {
      if (this.matchedLetters.indexOf(this.lettersOfWord[i]) === -1) {
        win = false;
      }
    }
if (win) {
      this.wins = this.wins + 1;
//update wins
      document.querySelector("#wins").innerHTML = this.wins;
//if win is true
     return true;
    }
//if win is farlse
    return false;
  }
};

h


