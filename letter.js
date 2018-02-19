// Letter.js: Contains a constructor, Letter. This constructor should be able to either display an underlying character or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. That means the constructor should define:

var Letter = function(character) {
  // A string value to store the underlying character for the letter
  this.character = character;
  // A boolean value that stores whether that letter has been guessed yet
  this.isGuessed = false;
  
  // A function that returns the underlying character if the letter has been guessed, or a placeholder (like an underscore) if the letter has not been guessed
  this.toString = function() {
    if (this.isGuessed) {
      console.log("letter toString ran: if")
      console.log(this.character);
      return this.character;
    }
    else {
      console.log("letter toString ran: else")
      
      //console.log("_");
      return "_";
    }
  }
  
  // A function that takes a character as an argument and checks it against the underlying character, updating the stored boolean value to true if it was guessed correctly
  this.checkCharacter = function(letterInput) {
    console.log("letter character " + JSON.stringify(letterInput));
    console.log("letter this.character " + JSON.stringify(this.character));
    if (letterInput.character === this.character) {
      this.isGuessed = true;
      //this.toString();
      console.log("letter checkCharacter ran: if " + this.isGuessed);
      return true;
    }
    else {
      this.isGuessed = false;
      console.log("letter checkCharacter ran: else " + this.isGuessed);
    //  this.toString();
      return false;
    }
  }
}

module.exports = Letter;