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
    
    for (var i = 0; i < currentWord.length; i++) {
      var letterInput = new Letter(currentWord[i]);
      console.log("word guessLetter ran " + i + " times")
      
      letterInput.checkCharacter(character);
      // if (letterInput.checkCharacter(currentWord[i])) {
      //     this.lettersArray.push(letter.toString([i]));
      // }

      console.log("word guessLetter character " + JSON.stringify(character));
    }
    
      // if (letterInput.checkCharacter(letterInput)) {
      //         letterInput.toString();
      // }


    console.log("word guessLetter this.lettersArray " + this.lettersArray)
  };
}

module.exports = Word;