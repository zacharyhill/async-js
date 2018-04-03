/*                                                  
Your grade school Math teacher visited you at Hack Reactor, expecting
you to do an old assignment to see if you're still a smart cookie. 
In fact, your teacher expects you to do this every week to make sure 
you keep practiced! How frustrating! 

The assignment: Count the number of distinct words in a paragraph and 
submit it to her. 

However, you now have the power of code to do it within an instant and
can do it in a fraction of a second without her knowing :) 

TLDR; Write a function that reads an input file and outputs a .txt file 
containing the word count of every word in your input.txt. The ordering
of the words in the file does not matter. This is purely to practice 
use of asynchronous functions! 

Contraints: 
1) No punctuation will be in your paragraph
2) This is case-insensitive, so apple and Apple both count as the same word

/*                                                  */

const fs = require('fs');

// countWords is a helper function... it helps you convert a paragraph into 
// the string you need

// EXAMPLE USAGE 
// countWords('hello world hello me') --> 'hello: 2\nme:1\nworld: 1\n'
const countWords = function(paragraph) {
  let words = paragraph.trim('.').split(' ');

  let wordBank = {};

  for (let i = 0; i < words.length; i++) {
    let word = words[i].toLowerCase();
    if (wordBank.hasOwnProperty(word)) {
      wordBank[word] += 1;
    } else {
      wordBank[word] = 1;
    }
  }

  let outputString = '';

  let wordsFound = Object.keys(wordBank).sort();

  wordsFound.forEach(word => {
    outputString += `${word}: ${wordBank[word]}\n`;
  })
  
  return outputString;
}

// inputFile: paragraph to read
// outputFile: path to write resulting .txt to
var countAllWords = function(inputFile, outputFile) {
  /* WRITE CODE HERE */ 
  fs.readFile(inputFile, 'utf8', function(err, data) {
    if (err) {
      throw err;
    } else {

      let outputString = countWords(data);

      fs.writeFile(outputFile, outputString, (err) => {
        if (err) {
          throw err;
        } else {
          console.log('Successfully wrote output file!');
        }
      });
    }
  });
}

countAllWords('./input.txt', './output.txt');
