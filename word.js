var Letter = require("./letter.js");

// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

var Word = function(currentWord) {
  // An array of new Letter objects representing the letters of the underlying word
  this.word = currentWord;
  this.wordSplit = this.word.split(""); //split on each letter
  this.lettersArray = this.wordSplit.map(function(value){
    return new Letter(value); //takes an array and returns new array of letters 
  });
}

//A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
Word.prototype.toString = function() {
  var str = "";
  this.lettersArray.forEach(function(value) {
    str = str + value.toString(); 
  });
  return str;
//  return this.lettersArray.join(" ");
};


Word.prototype.guessLetter = function(character) {
  var isGuessCorrect = false;
  for (var i = 0; i < this.lettersArray.length; i++) {
    if (this.lettersArray[i].checkCharacter(character)) {
      isGuessCorrect = true;
    }
  }
  //console.log(this.toString());
  return isGuessCorrect;
};

// don't just return true in case if there are two of the same letter

module.exports = Word;