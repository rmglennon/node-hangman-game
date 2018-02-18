var Letter = require("./letter.js");

// Word.js: Contains a constructor, Word that depends on the Letter constructor. This is used to create an object representing the current word the user is attempting to guess. That means the constructor should define:

var Word = function(currentWord) {
  // An array of new Letter objects representing the letters of the underlying word
  this.lettersArray = [];
  this.word = currentWord;
  
  //A function that returns a string representing the word. This should call the function on each letter object (the first function defined in Letter.js) that displays the character or an underscore and concatenate those together.
  this.makeWordStr = function() {
    for (var i = 0; i < currentWord.length; i++) {
      console.log("word makeWordStr ran " + i + " times")
      
      var letter = new Letter(currentWord[i]);
      console.log("word letter stringify " + JSON.stringify(letter));
      this.lettersArray.push(letter.toString([i]));
    }
      this.lettersArray = this.lettersArray.join(" ");
    console.log("word this.lettersArray " + this.lettersArray);
    //  return this.lettersArray;
  };
  
  //A function that takes a character as an argument and calls the guess function on each letter object (the second function defined in Letter.js)
  this.guessLetter = function(character) {
    
    for (var i = 0; i < this.lettersArray.length; i++) {
      var letter = new Letter(character);
      console.log("word guessLetter ran " + i + " times")
      
      letter.checkCharacter(character);


      console.log("word guessLetter character " + JSON.stringify(character));
    }
    
      if (letter.checkCharacter(character)) {
              letter.toString();
      }


    console.log("word guessLetter this.lettersArray " + this.lettersArray)
  };
}

module.exports = Word;