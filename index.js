var inquirer = require("inquirer");

// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// 
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./word.js");

var secretWord = "kitten second";

var numGuesses = 3;
var currentWord = new Word(secretWord);

console.log(currentWord.toString());

function getInput() {
  
  if (numGuesses > 0) {
    inquirer.prompt([
      {
        name: "character",
        type: "input",
        message: "Type a character."
      }
    ]).then(function(userInput) {
      currentWord.guessLetter(userInput.character);
      console.log(currentWord.toString());
      numGuesses--;    
      getInput();
    });
  }
  else {
    console.log("No guesses remaining");
  }
}
getInput();
