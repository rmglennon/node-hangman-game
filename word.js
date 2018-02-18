var Letter = require("./letter.js");

// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

var Word = function(word) {
  // An array of new Letter objects representing the letters of the underlying word
  this.lettersArray = [];
  //console.log(this.lettersArray);
}

// A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
Word.prototype.makeWordStr = function(word) {
  var character = new Letter();
  for (var i = 0; i < word.length; i++) {
    console.log("makeWordStr ran " + i + " times")
  //this.lettersArray.join(" ");
  this.lettersArray.push(character.toString());


  }
    console.log("this.lettersArray " + this.lettersArray);
  //  return this.lettersArray;
};

// A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
Word.prototype.guessLetter = function(character) {
  // var character = new Letter;

  for (var i = 0; i < this.lettersArray.length; i++) {
      console.log("guessLetter ran " + i + " times")
    character.checkCharacter(character);
    console.log("guessLetter character " + character);
  }
};

// var myWord = new Word("cat");
// Word(myWord);

module.exports = Word;