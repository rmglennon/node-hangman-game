var inquirer = require("inquirer");

// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// 
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

// TODO: make words already guessed not count toward guess number

var Word = require("./word.js");
var secretWordIndex = 0;
var secretWord = chooseRandomWord()[secretWordIndex];
// set the number of guesses to the the number of characters in the word and two extras for incorrect letters
//var numGuesses = secretWord.length + 2;
var currentWord = new Word(secretWord);
var inAGame = true;

var wrongLetters = [];
var correctLetters = [];

// function to choose a random word from the word list array without repeating any, and make a reordered list of words for each game
function chooseRandomWord() {
  
  var wordList = ["watermelon", "cauliflower", "pumpkin", "spinach", "lettuce", "celery", "broccoli", "strawberries", "mushrooms", "avocado"];
  var wordListReordered = [];
  
  for (var i = 0; i < 10; i++) {
    var randomIndex = Math.floor(Math.random() * wordList.length);
    var selectedWord = wordList.splice(randomIndex, 1);
    
    wordListReordered.push(selectedWord.join());
    
  }
  return wordListReordered;
  //console.log(wordListReordered); 
}

function chooseSecretWord(secretWordIndex) {
  secretWord = chooseRandomWord()[secretWordIndex];
  //var currentWord = new Word(secretWord);
  return secretWord;
}

function startGame() {
  
  console.log("Time to play Hangman! \nFill in all the letters in the word before you run out of guesses! \nThe words are related to produce you can find at a farmer's market.")
  
  playGame();
}

function playGame(chooseSecretWord) {
  numGuesses = secretWord.length + 2;
  //console.log("Guesses remaining: " + numGuesses);
  console.log("Here is your word: " + "\n" + currentWord.toString());
  getInput();
}

function getInput() {
  
  // only play if there are guesses left and words left in the array. 
  // TODO: make this 9 for 9 in the index
  //   if (numGuesses > 0 && secretWordIndex < 3) {
  if (inAGame) {

    
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
      
      // don't count letters that are already used
      if ((correctLetters.indexOf(userInput.character) >= 0) || (wrongLetters.indexOf(userInput.character) >= 0)) {
        console.log("Letter already used. Try again.")
        //getInput();
        //return;
      }
      
      // continue checking the letters for a match in the word
      else {
        console.log("Guesses remaining: " + numGuesses);
        console.log(currentWord.toString());
        
        // capture return from function to determine where to put the letters

        var isGuessCorrect = currentWord.guessLetter(userInput.character);
        
        if (isGuessCorrect) {
          correctLetters.push(userInput.character);
          console.log("correct letters " + correctLetters);
        }
        
        else  {
          wrongLetters.push(userInput.character);
          console.log("wrong letters " + wrongLetters);
        }
      }

      
      // console.log("Guesses remaining: " + numGuesses);
      // console.log(currentWord.toString());
      // 
      // // capture return from function to determine where to put the letters
      // 
      // var isGuessCorrect = currentWord.guessLetter(userInput.character);
      // if (isGuessCorrect) {
      //   correctLetters.push(userInput.character);
      //   console.log("correct letters " + correctLetters);
      // }
      // else  {
      //   wrongLetters.push(userInput.character);
      //   console.log("wrong letters " + wrongLetters);
      // }
      // check for existence of _ in the word
      // if (currentWord.toString().indexOf("_") === -1) {
      //   console.log("You win!");
      //   //secretWordIndex++; 
      //   playGame(chooseSecretWord);
      // 
      // } 
      
      // if (numGuesses === 0) {
      //   console.log("You are out of guesses!");
      //   console.log("The word was " + secretWord);
      //   secretWordIndex++; 
      //   playGame(chooseSecretWord);
      // 
      // }
      
      // if (secretWordIndex > 9) {
      //   console.log("game over, mate");
      //   inAGame = false;
      // }

      numGuesses--;
   
      getInput();
      
    });
  }
  

  
  // else {
  //   console.log("game over, mate");
  // 
  //   var inAGame = false;
  // }
}
//chooseRandomWord();
startGame();