// Declare Global Variables

import { WORDS } from "./words.js"
import { BADWORDS } from "./words.js"



const NUMBER_OF_GUESSES = 6;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuess = [];
let nextLetter = 0;
let rightGuessString = WORDS[Math.floor(Math.random() * WORDS.length)]

// Grabs 5 letter words function

const fiveLetterBadWords = BADWORDS.filter(word => word.length === 5);

let rightGuessStringBadWords = "";
while (rightGuessStringBadWords.length !== 5) {
  rightGuessStringBadWords = fiveLetterBadWords[Math.floor(Math.random() * fiveLetterBadWords.length)];
}

// JSON Function to Add https://www.cs.cmu.edu/~biglou/resources/

// export function Add(x,y) {
//     console.log('called ADD')
//     return x + y;
// }

// Creating Gameboard

function initBoard() {
    let board = document.getElementById('game-board')

    for (let i = 0; i < NUMBER_OF_GUESSES; i++){
        let row = document.createElement('div')
        row.className = 'letter-row'

        for(let j = 0; j < 5; j++){
            let box = document.createElement('div')
            box.className = 'letter-box'
            row.appendChild(box)
        }

        board.appendChild(row)
    }
}

initBoard()

// Accept User Input

document.addEventListener('keyup', (e) => {

    if (guessesRemaining === 0) {
        return
    }

    let pressedKey = String(e.key)
    if (pressedKey === 'Backspace' && nextLetter !== 0) {
        deleteLetter()
        return
    }

    if (pressedKey === 'Enter') {
        checkGuess()
        return
    }

    let found = pressedKey.match(/[a-z]/gi)
    if (!found || found.length > 1) {
        return
    } else {
        insertLetter(pressedKey)
    }
})

// Insert Letter Function

function insertLetter(pressedKey) {
    if (nextLetter === 5) {
        return
    }
    pressedKey = pressedKey.toLowerCase()

    let row = document.getElementsByClassName('letter-row')
    [6 - guessesRemaining]
    let box = row.children[nextLetter]
    box.textContent = pressedKey
    box.classList.add('filled-box')
    currentGuess.push(pressedKey)
    nextLetter += 1
}

//  Delete Letter Function

function deleteLetter() {
    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
    let box = row.children[nextLetter - 1]
    box.textContent = ''
    box.classList.remove('filled-box')
    currentGuess.pop()
    nextLetter -= 1
}

// Check Guess Function

function checkGuess() {
    let row = document.getElementsByClassName('letter-row')[6 - guessesRemaining]
    let guessString = ''
    let rightGuess = Array.from(rightGuessString || fiveLetterBadWords)
    
    if (WORDS.includes(guessString) || BADWORDS.includes(guessString)) {
        return
      } else {
        alert('That word is not in our Dicktionary!')
      }      

    for (const val of currentGuess) {
        guessString += val
    }

    if (guessString.length != 5) {
        alert('Not enough letters!')
        return
    }

    if (!WORDS.includes(guessString)) {
        alert('That word is not in our Dicktionary!')
    }

    if (!BADWORDS.includes(guessString)) {
        alert('That word is not in our Dicktionary!')
    }

    for (let i = 0; i < 5; i++) {
        let letterColor = ''
        let box = row.children[i]
        let letter = currentGuess[i]

        let letterPosition = rightGuess.indexOf(currentGuess[i])

        if (letterPosition === -1) {
            letterColor = 'grey'
        } else {
            if (currentGuess[i] === rightGuess[i]) {
                letterColor = 'green'
            } else {
                letterColor = 'yellow'
            }
            rightGuess[letterPosition] = '#'
        }

        let delay = 250 * i
        setTimeout(() => {
            // shade box
            box.style.backgroundColor = letterColor
            shadeKeyboard(letter, letterColor)
        }, delay )

        if (guessString === rightGuessString) {
            alert('You guessed it right you dirty lil slut!')
            guessesRemaining = 0
            return
        } else {
            guessesRemaining -= 1;
            currentGuess = []
            nextLetter = 0

            if (guessesRemaining === 0) {
                alert('Oooh you fucked up! Comeback tomorrow to redeem yourself.')
                alert(`The right word was: ${rightGuessStringBadWords}`)
            }
        }
    }   
}
checkGuess()

function shadeKeyboard (letter, color) {
    for (const elem of document.getElementsByClassName('keyboard-button')) {
        if (elem.textContent === letter) {
            let oldColor = elem.style.backgroundColor
            if (oldColor === 'green') {
                return
            }

            if (oldColor === 'yellow' && color !== 'green') {
                return
            }

            elem.style.backgroundColor = color
            break
        }
    }
}

document.getElementById('keyboard-cont').addEventListener
('click', (e) => {
    const target = e.target

    if (!target.classList.contains('keyboard-button')) {
        return
    }
    let key = target.textContent

    if (key === 'Del') {
        key = 'Backspace'
    }

    document.dispatchEvent(new KeyboardEvent('keyup', {'key':key}))
})




console.log(rightGuessStringBadWords)