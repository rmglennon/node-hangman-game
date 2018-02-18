var inquirer = require("inquirer");

// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// 
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses
var wordToGuess = "cat";
var Word = require("./word.js");
var Letter = require("./letter.js");

var numGuesses = 3;

function testInput() {
var testWord = new Word(wordToGuess);
  //testWord.makeWordStr(wordToGuess);
//  var testWord = new Word();
  console.log("index testWord " + testWord.makeWordStr(wordToGuess));
  
  if (numGuesses > 0) {
inquirer.prompt([
  {
    name: "character",
    message: "Type a character."
  }
]).then(function(userInput) {
  var newLetter = new Letter(userInput.character);
testWord.guessLetter(newLetter);
  numGuesses--;    
  testInput();
});
}
else {
   console.log("No guesses remaining");
 }
}
testInput();
