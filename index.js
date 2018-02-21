// import packages and dependencies; initialize global variables
var inquirer = require("inquirer");
var Word = require("./word.js");
var chalk = require("chalk");

var initializePackage = {
  hasRun: false
};
var usedLetters = [];
var numGuesses;

// function to initialize the game and randomize the list of words. This should only run the very first time.
function initializeGame() {
  
  console.log("\nTime to play Hangman! \nFill in all the letters in the word before you run out of guesses! \nThe words are related to produce you can find at a farmer's market.")
  
  initializePackage.hasRun = true;
  
  // shuffle the list of words into a new, reordered array
  var wordList = ["watermelon", "cauliflower", "pumpkin", "spinach", "lettuce", "celery", "broccoli", "strawberries", "mushrooms", "avocado"];
  
  var wordListReordered = [];
  for (var i = 0; i < 10; i++) {
    var randomIndex = Math.floor(Math.random() * wordList.length);
    var selectedWord = wordList.splice(randomIndex, 1);
    wordListReordered.push(selectedWord.join());
  }
  
  initializePackage.wordListReordered = wordListReordered;
  return initializePackage;
}

// function to start the game play and reset variables in subsequent rounds
function playGame() {
  
  // if the game has not been initialized previously, get it set up
  if (!initializePackage.hasRun) {
    initializeGame();
  }
  
  // grab the first word from the list
  var wordList = initializePackage.wordListReordered.shift();
  
  // end the game if there are no words left
  if ((wordList === undefined) || (!wordList.length)) {
    console.log("\nYou have guessed all the words. \nHope you had a good visit to the farmer's market!\n");
    return;
  }
  
  // make a new word object from the word list 
  var wordToGuess = wordList;
  currentWord = new Word(wordToGuess);
  
  // set the number of guesses to the the number of characters in the word and add two extras to consider incorrect letters
  numGuesses = wordToGuess.length + 2;
  usedLetters = [];
  
  // start the game and display the word to guess
  console.log(chalk.blue.bold("\n" + "Here is your word: " + "\n")); console.log(chalk.bold.red(currentWord.toString() + "\n"));
  console.log(chalk.green.italic("Guesses remaining: " + numGuesses  + "\n"));
  getInput(currentWord, wordToGuess);
  
}

// function to allow user to input letters with the inquirer package
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
      
      // do not count letters that are already used
      if (usedLetters.indexOf(userInput.character) >= 0) {
        console.log(chalk.blue("\n" + "Letter already used. Try again." + "\n"));
        getInput(currentWord, wordToGuess);
      }
      
      // continue checking the letters for a match in the word
      else {
        
        // userInput returns an object, so need to send its .character property to check if the letter is in the word
        numGuesses--;
        
        currentWord.guessLetter(userInput.character);
        
        console.log("\n" + chalk.bold.red(currentWord.toString() + "\n"));
        console.log(chalk.green.italic("Guesses remaining: " + numGuesses + "\n"));
        // capture return from function to add the letter to the list of already guessed letters.
        usedLetters.push(userInput.character);
        
        console.log(chalk.green.italic("Used letters: " + usedLetters  + "\n"));
        
        // check whether to end the round. If so, then call the reset function; otherwise, use recursion to continue guessing this word.
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

// function to check whether to end the round
function setGameState(currentWord, numGuesses, wordToGuess) {
  
  //check for existence of _ in the word, which means it is unsolved. If no _ are found, then the round should end.
  if (currentWord.toString().indexOf("_") === -1) {
    console.log(chalk.blue("You win! The word was " + wordToGuess + ".\n"));
    console.log("------------------------------------");
    return true;
  } 
  // if there are no guesses left, the round should end. This needs to be wordToGuess because currentWord is underscores.
  if (numGuesses === 0) {
    console.log(chalk.blue("You are out of guesses! The word was " + wordToGuess + ".\n"));
    console.log("------------------------------------");
    return true;
  }
}

// start off the game by calling playGame() function
playGame();