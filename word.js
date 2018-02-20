var Letter = require("./letter.js");

// Constructor to create an object representing the current word the user is attempting to guess. 

// function to create an array of new Letter objects in the word
var Word = function(currentWord) {
  
  this.word = currentWord;
  // split the word on each letter
  this.wordSplit = this.word.split("");
  // returns a new array of letters
  this.lettersArray = this.wordSplit.map(function(value){
    return new Letter(value); 
  });
}

// function to displays the character or an underscore in the word being guessed
Word.prototype.toString = function() {
  var str = "";
  
  // " " puts a space between letters so it is easier to reaad
  this.lettersArray.forEach(function(value) {
    str = str + " " + value.toString(); 
  });
  return str;
};

// determines whether the letter is correct by calling Letter's function to check if the input character is the same as the letter in the word.
// this does not just return true immediately in case if there are two of the same letter in a word
Word.prototype.guessLetter = function(character) {
  var isGuessCorrect = false;
  for (var i = 0; i < this.lettersArray.length; i++) {
    if (this.lettersArray[i].checkCharacter(character)) {
      isGuessCorrect = true;
    }
  }
  return isGuessCorrect;
};

// export Word for use in other files
module.exports = Word;