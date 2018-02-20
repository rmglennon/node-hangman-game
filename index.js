var inquirer = require("inquirer");

// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// 
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./word.js");

// function to choose a random word from the word list array without repeating any, and make a reordered list of words for each game
function chooseRandomWord() {
  
  var wordList = ["watermelon", "cauliflower", "pumpkin", "spinach", "lettuce", "celery", "broccoli", "strawberries", "mushrooms", "avocado"];
  var wordListReordered = [];
  
  for (var i = 0; i < 10; i++) {
    var randomIndex = Math.floor(Math.random() * wordList.length);
    var selectedWord = wordList.splice(randomIndex, 1);
    
    wordListReordered.push(selectedWord.join());
    
  }
  //console.log(wordListReordered); 
  return wordListReordered;
}

var secretWord = "meowcat";
// set the number of guesses to the the number of characters in the word and two extras
var numGuesses = secretWord.length + 2;
var currentWord = new Word(secretWord);

function startGame() {
  console.log("Time to play Hangman! Fill in all the letters in the word before you run out of guesses!")
  console.log("Guesses remaining: " + numGuesses);
  console.log("Here is your word: " + "\n" + currentWord.toString());
  getInput();
}

function playAgain() {
  numGuesses = secretWord.length + 2;
  console.log("Guesses remaining: " + numGuesses);
  console.log("Here is your word: " + "\n" + currentWord.toString());
}

function getInput() {
  
  if (numGuesses > 0) {
    inquirer.prompt([
      {
        name: "character",
        type: "input",
        message: "Type a letter.",
        validate: function(value) {
          // make sure only English letters are entered
          var pass = value.match(/([a-z])/gi);
          if (pass) {
            return true;
          }
          else {
            return "Enter only text values.";
          }
        }
      }
    ]).then(function(userInput) {
      currentWord.guessLetter(userInput.character);
      console.log(currentWord.toString());
      
      if (currentWord.toString().indexOf("_") === -1) {
        console.log("You win!")
        
      }
      numGuesses--;    
      getInput();
    });
  }
  else {
    console.log("You are out of guesses!");
    console.log("The word was " + secretWord);
  }
}
//chooseRandomWord();
startGame();