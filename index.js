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

function testInput() {
var currentWord = new Word();
  currentWord.makeWordStr(secretWord);
//  var testWord = new Word();
  //console.log("index currentWord " + word.makeWordStr(currentWord));
  
  if (numGuesses > 0) {
inquirer.prompt([
  {
    name: "character",
    message: "Type a character."
  }
]).then(function(userInput) {
//  var inputLetter = new Letter(userInput.character);
  //console.log("index inputLetter " + inputLetter);
  currentWord.guessLetter(userInput);
  numGuesses--;    
  testInput();
});
}
else {
   console.log("No guesses remaining");
 }
}
testInput();
