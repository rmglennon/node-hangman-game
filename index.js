var inquirer = require("inquirer");

// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// 
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./word.js");
//var Letter = require("./letter.js");

var secretWord = "cat";
console.log("index secretWord is " + secretWord);

var numGuesses = 3;
var currentWord = new Word(secretWord);
currentWord.makeWordStr(secretWord);

function getInput() {

  
  if (numGuesses > 0) {
inquirer.prompt([
  {
    name: "character",
    message: "Type a character."
  }
]).then(function(userInput) {
  console.log("index currentWord is " + JSON.stringify(currentWord));
  //var inputLetter = new Letter(userInput);
  console.log("index userInput " + JSON.stringify(userInput));
  
  currentWord.guessLetter(userInput);
  numGuesses--;    
  getInput();
});
}
else {
   console.log("No guesses remaining");
 }
}
getInput();
