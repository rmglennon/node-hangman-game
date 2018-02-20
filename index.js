var inquirer = require("inquirer");

// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// 
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./word.js");

// var wordToGuessIndex = 0;
// var wordListReordered = [];
//wordToGuess = wordListReordered[wordToGuessIndex];
// var wordToGuess = chooseRandomWord()[wordToGuessIndex];
// set the number of guesses to the the number of characters in the word and two extras for incorrect letters
//var numGuesses = wordToGuess.length + 2;
//var currentWord = new Word(wordToGuess);

var initializePackage = {
  hasRun: false
};

function initializeGame() {
  
  console.log("Time to play Hangman! \nFill in all the letters in the word before you run out of guesses! \nThe words are related to produce you can find at a farmer's market.")
  
  initializePackage.hasRun = true;
  
  var wordList = ["watermelon", "cauliflower", "pumpkin", "spinach", "lettuce", "celery", "broccoli", "strawberries", "mushrooms", "avocado"];
  // var wordListReordered = [];
  var wordListReordered = [];
  
  for (var i = 0; i < 10; i++) {
    var randomIndex = Math.floor(Math.random() * wordList.length);
    var selectedWord = wordList.splice(randomIndex, 1);
    
    wordListReordered.push(selectedWord.join());
    
  }
  initializePackage.wordListReordered = wordListReordered;
  return initializePackage;
  //console.log(wordListReordered); 
  
  //var getStarted = playGame(wordListReordered);
}

function playGame() {
  //wordListReordered = [];
  if (!initializePackage.hasRun) {
    initializeGame();
  }
  // TODO: when wordList is null, end game
  var wordList = initializePackage.wordListReordered.shift();
  // console.log("my reordered word list is: " + wordList);
  var wordToGuess = wordList;
  currentWord = new Word(wordToGuess);
  console.log("my wordToGuess is " + wordToGuess + "| new wordList array is " + wordList);
  numGuesses = wordToGuess.length + 2;
  //console.log("Guesses remaining: " + numGuesses);
  console.log("Here is your word: " + "\n" + currentWord.toString());
  getInput(currentWord);
}

// function to choose a random word from the word list array without repeating any, and make a reordered list of words for each game

function getInput(currentWord) {
  console.log("currentWord is " + currentWord);
  // only play if there are guesses left
  var wrongLetters = [];
  var correctLetters = []
  var keepGuessing = false;
  
  if (numGuesses  > 0) {
    
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
      
      console.log("currentWord is after function " + currentWord);
      // don't count letters that are already used
      if ((correctLetters.indexOf(userInput.character) >= 0) || (wrongLetters.indexOf(userInput.character) >= 0)) {
        console.log("Letter already used. Try again.")
        //getInput();
        //return;
      }
      
      // continue checking the letters for a match in the word
      else {
        // userInput returns an object, so need to send the character property to check if the letter is in the word
        
        console.log("currentWord is " + currentWord);
        currentWord.guessLetter(userInput.character);
        
        console.log("Guesses remaining: " + numGuesses);
        
        console.log(currentWord.toString());
        
        // capture return from function to determine where to put the letter in the arrays of already guessed letters.. may not need two arrays here
        var isGuessCorrect = currentWord.guessLetter(userInput.character);
        
        if (isGuessCorrect) {
          correctLetters.push(userInput.character);
          console.log("correct letters " + correctLetters);
        }
        
        else  {
          wrongLetters.push(userInput.character);
          console.log("wrong letters " + wrongLetters);
        }
        
        numGuesses--;
        
        keepGuessing = true;
        
      }
      
      function setGameState () {
        //check for existence of _ in the word
        if (currentWord.toString().indexOf("_") === -1) {
          console.log("You win!");
          keepGuessing = false;
        } 
        
        if (numGuesses === 0) {
          console.log("You are out of guesses!");
          console.log("The word was " + wordToGuess);
          keepGuessing = false;
        }
        
        
      }
      getInput();
      
    });
  }
  
}

playGame();