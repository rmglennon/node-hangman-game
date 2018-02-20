var inquirer = require("inquirer");

// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// 
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./word.js");

// set the number of guesses to the the number of characters in the word and two extras for incorrect letters

var initializePackage = {
  hasRun: false
};
var usedLetters = [];
var numGuesses;

function initializeGame() {
  
  console.log("Time to play Hangman! \nFill in all the letters in the word before you run out of guesses! \nThe words are related to produce you can find at a farmer's market.")
  
  initializePackage.hasRun = true;
  
  
    var wordList = ["watermelon", "avocado"];
  // var wordList = ["watermelon", "cauliflower", "pumpkin", "spinach", "lettuce", "celery", "broccoli", "strawberries", "mushrooms", "avocado"];
  var wordListReordered = [];
  
  for (var i = 0; i < 10; i++) {
    var randomIndex = Math.floor(Math.random() * wordList.length);
    var selectedWord = wordList.splice(randomIndex, 1);
    wordListReordered.push(selectedWord.join());
  }
  initializePackage.wordListReordered = wordListReordered;
  return initializePackage;
}

function playGame() {
  if (!initializePackage.hasRun) {
    initializeGame();
  }
  // TODO: when wordList is null, end game
  var wordList = initializePackage.wordListReordered.shift();
  if (wordList.length < 1) {
    console.log("You have guessed all the words. Hope you had a good visit to the farmer's market!");
    return;
  }
  var wordToGuess = wordList;
  currentWord = new Word(wordToGuess);
  numGuesses = wordToGuess.length + 2;
  usedLetters = [];
  // console.log("usedLetters " + usedLetters);
  console.log("Here is your word: " + "\n" + currentWord.toString());
  getInput(currentWord, wordToGuess);

}

// function to choose a random word from the word list array without repeating any, and make a reordered list of words for each game


function getInput(currentWord, wordToGuess) {
  // only play if there are guesses left
  
  if (numGuesses  > 0) {
    
    inquirer.prompt([
      {
        name: "character",
        type: "input",
        message: "Type a letter.",
        validate: function(value) {
          // make sure only English letters are entered
          var pass = (value.match(/([a-z])/gi));
          if (pass) {
            return true;
          }
          else {
            return "Enter only text values.";
          }
        }
      }
    ]).then(function(userInput) {
      
      // don't count letters that are already used
      if (usedLetters.indexOf(userInput.character) >= 0) {
        console.log("Letter already used. Try again.")
        getInput(currentWord, wordToGuess);
        //return;
      }
      // continue checking the letters for a match in the word
      else {
        // userInput returns an object, so need to send the character property to check if the letter is in the word
        
        currentWord.guessLetter(userInput.character);
        
        console.log("Guesses remaining: " + numGuesses);
        
        console.log(currentWord.toString());
        
        // capture return from function to determine where to put the letter in the array of already guessed letters.. may not need two arrays here
        usedLetters.push(userInput.character);
        console.log("used letters " + usedLetters);
        
        numGuesses--;
        var gameState = setGameState(currentWord, numGuesses, wordToGuess);

        if (gameState) {
          playGame();
          //return;
        }
        else {
          getInput(currentWord, wordToGuess);
        }
      }
      
    });
  }
}
//TODO - figure out why the second round has duplicate prompt text

function setGameState(currentWord, numGuesses, wordToGuess) {
  //check for existence of _ in the word
  
  if (currentWord.toString().indexOf("_") === -1) {
    console.log("You win!");
    //  playGame();
    return true;
  } 
  // needs to be wordToGuess because currentWord is underscores
  if (numGuesses === 0) {
    console.log("You are out of guesses!");
    console.log("The word was " + wordToGuess);
    //  playGame();
    return true;
  }
}

// start off by calling playGame() function
playGame();