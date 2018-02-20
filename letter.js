// Constructor to display an underlying character or a placeholder _, depending on whether or not the user has guessed the letter.

// function to display a string for the letter and a boolean that stores whether the letter has been guessed correctly
var Letter = function(character) {
  this.character = character;
  this.isGuessed = false;
}

// function to determine whether to show the letter when guessed or an _ if not
Letter.prototype.toString = function() {
  if (this.isGuessed) {
    return this.character;
  }
  else {
    return "_";
  }
}

// function to compare the character that was input against the letter in the word. If they match, set to true the boolean for whether the letter has been guessed
Letter.prototype.checkCharacter = function(letterInput) {
  
  if (letterInput === this.character) {
    this.isGuessed = true;
    return true;
  }
  return false;
}

// export Letter for use in other files
module.exports = Letter;