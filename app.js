// generate and append letters

let allLetters = 'abcdefghijklmnopqrstuvwxyz+#',
lettersArray = Array.from(allLetters),
lettersContainer = document.querySelector('.letters');

lettersArray.forEach(letter => {
    let letterSpan = document.createElement('span');
    let letterNode = document.createTextNode(letter);
    letterSpan.className = 'letter-box';
    letterSpan.appendChild(letterNode);
    lettersContainer.appendChild(letterSpan);
});

// create categories & words object + generate random category & word

// let words = {
//     programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python", "c++", "c#"],
//     movies: ["Prestige", "Inception", "Parasite", "Interstellar", "whiplash", "Memento", "Coco", "Up"],
//     people: ["Albert Einestein", "Hitchcock", "Alexander", "Cleopatra", "Mhatma Ghandi"],
//     countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
// };

// let props = Object.keys(words),
//     randomPropIndex = Math.floor(Math.random() * props.length),
//     randomPropName = props[randomPropIndex],
//     randomPropValue = words[randomPropName],
//     randomValueIndex = Math.floor(Math.random() * words[randomPropName].length),
//     randomValueValue = randomPropValue[randomValueIndex];

// document.querySelector('.game-info .category span').innerHTML = randomPropName;

// // create spans in the letter-guess container depending on the word

// let wordGuessContainer = document.querySelector('.letters-guess'),
//     wordToArray = Array.from(randomValueValue);

// wordToArray.forEach(letter => {
//     let emptySpan = document.createElement('span');
//     if(letter === " ") {
//         emptySpan.className = 'with-space';
//     };
//     wordGuessContainer.appendChild(emptySpan);
// });

// //  clicking the letters

// let theDraw = document.querySelector('.hangman-draw');
// let wrongCount = 0;
// let playerWord = '';
// document.addEventListener('click', (e) => {
//     if (e.target.className === 'letter-box') {
//         let theStatus = false;
//         e.target.classList.add("clicked");
//         let clickedLetter = e.target.innerHTML.toLowerCase();
//         for (let i = 0; i < wordToArray.length; i++) {
//             if(clickedLetter === wordToArray[i].toLowerCase()) {
//                 theStatus = true;
//                 wordGuessContainer.children[i].innerHTML = clickedLetter;
//             }
//         };
//         if (theStatus !== true) {
//             wrongCount++;
//             fail.play();
//             theDraw.classList.add(`wrong-${wrongCount}`);
//             if (wrongCount === 8) {
//                 endGame();
//                 lettersContainer.classList.add('finished');
//             }
//         } else {
//             correct.play();
//             for (let i = 0; i < wordGuessContainer.children.length; i++) {
//                 playerWord += wordGuessContainer.children[i].innerHTML;
//             }
//         }
//         if (randomValueValue.toLowerCase() === playerWord.toLowerCase()){
//             bravo();
//             lettersContainer.classList.add("finished");
//         } else {
//             playerWord = "";
//         };
//     };
// });

// function endGame() {
//     let div = document.createElement('div');
//     let divText = document.createTextNode(`Game Over The Word Is: ${randomValueValue}`);
//     div.appendChild(divText);
//     div.className = 'popup';
//     document.body.appendChild(div);
//     // setTimeout(() => {
//     //     document.querySelector('.popup').remove();
//     // }, 6000)
// }
// function bravo() {
//     let div = document.createElement('div');
//     let divText = document.createTextNode(`Congrats!!! WhoooHooo, You Made ${wrongCount} Wrong Guesses, Your Level Is ${wrongCount <= 4? 'Legend': wrongCount <= 6? 'Pro':'Beginner'}`);
//     div.appendChild(divText);
//     div.className = 'popup';
//     div.classList.add('correct');
//     document.body.appendChild(div);
//     // setTimeout(() => {
//     //     document.querySelector('.popup').remove();
//     // }, 6000)
// }

/* using fetch method with api or json file */

async function test() {
    let dat = await fetch("./data.json");
    let words = await dat.json();
    
    let props = Object.keys(words),
        randomPropIndex = Math.floor(Math.random() * props.length),
        randomPropName = props[randomPropIndex],
        randomPropValue = words[randomPropName],
        randomValueIndex = Math.floor(Math.random() * words[randomPropName].length),
        randomValueValue = randomPropValue[randomValueIndex];

    document.querySelector(".game-info .category span").innerHTML = randomPropName;

    // create spans in the letter-guess container depending on the word

    let wordGuessContainer = document.querySelector(".letters-guess"),
        wordToArray = Array.from(randomValueValue);

    wordToArray.forEach((letter) => {
        let emptySpan = document.createElement("span");
        if (letter === " ") {
            emptySpan.className = "with-space";
        }
        wordGuessContainer.appendChild(emptySpan);
    });

    //  clicking the letters

    let theDraw = document.querySelector(".hangman-draw");
    let wrongCount = 0;
    let playerWord = "";
    document.addEventListener("click", (e) => {
        if (e.target.className === "letter-box") {
            let theStatus = false;
            e.target.classList.add("clicked");
            let clickedLetter = e.target.innerHTML.toLowerCase();
            for (let i = 0; i < wordToArray.length; i++) {
                if (clickedLetter === wordToArray[i].toLowerCase()) {
                    theStatus = true;
                    wordGuessContainer.children[i].innerHTML = clickedLetter;
                }
            }
            if (theStatus !== true) {
                wrongCount++;
                fail.play();
                theDraw.classList.add(`wrong-${wrongCount}`);
                if (wrongCount === 8) {
                    endGame();
                    lettersContainer.classList.add("finished");
                }
            } else {
            correct.play();
            for (let i = 0; i < wordGuessContainer.children.length; i++) {
                if (wordGuessContainer.children[i].classList.contains("with-space")) {
                    playerWord += " ";
                }
                playerWord += wordGuessContainer.children[i].innerHTML;
            }
            }
            if (randomValueValue.toLowerCase() === playerWord.toLowerCase()) {
                bravo();
                lettersContainer.classList.add("finished");
            } else {
                playerWord = "";
            }
        }
    });

    function endGame() {
        let div = document.createElement("div");
        let replay = document.createElement('button');
        let divText = document.createTextNode(`Game Over The Word Is: ${randomValueValue}`);
        let reText = document.createTextNode('Try Again');
        replay.appendChild(reText);
        replay.onclick = () => {location.reload()};
        div.appendChild(divText);
        div.appendChild(replay);
        div.className = "popup";
        document.body.appendChild(div);
    }

    function bravo() {
        let div = document.createElement("div");
        let divText = document.createTextNode(`Congrats !!! WhoooHooo, You Made ${wrongCount} Wrong Guesses, Your Level Is ${
        wrongCount <= 4 ? "Legend" : wrongCount <= 6 ? "Pro" : "Beginner"
        }`);
        div.appendChild(divText);
        let replay = document.createElement("button");
        let reText = document.createTextNode("Play Again");
        replay.appendChild(reText);
        replay.onclick = () => {
            location.reload();
        };
        div.appendChild(replay);
        div.className = "popup";
        div.classList.add("correct");
        document.body.appendChild(div);
    }
};

test();


















