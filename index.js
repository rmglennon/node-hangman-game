var inquirer = require("inquirer");

// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// 
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./word.js");

// function to choose a random word from the word list array without repeating any during gameplay
function chooseRandomWord() {
  
  var wordList = ["watermelon", "cauliflower", "pumpkin", "spinach", "lettuce", "celery", "broccoli", "strawberries", "mushrooms", "avocado"];
  for (var i = 0; i < 10; i++) {
    var randomIndex = Math.floor(Math.random() * wordList.length);
    var selectedWord = wordList.splice(randomIndex, 1);
    console.log(selectedWord);
  }
}

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
chooseRandomWord();
