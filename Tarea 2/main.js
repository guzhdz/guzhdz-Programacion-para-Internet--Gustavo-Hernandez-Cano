let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult")
const lowOrHi = document.querySelector(".lowOrHi")

const guessSubmit = document.querySelector(".guessSubmit");
const guessField = document.querySelector(".guessField");

let guessCount = 1;
let resetButton;

guessSubmit.addEventListener('click', checkGuess);
guessField.addEventListener('keydown', (event) => {
    if(event.key == "Enter") {
        checkGuess();
    }
});

function checkGuess() {
    let userGuess = Number(guessField.value);

    if(guessCount == '1') {
        guesses.textContent = "Intentos anteriores : ";
    }

    guesses.textContent += userGuess + " ";

    if(userGuess == randomNumber) { 
        lastResult.textContent = "¡Felicidades!  ¡Lo adivinaste!";
        lastResult.classList.remove("red");
        lastResult.classList.add("green");
        lowOrHi.textContent = "";
        setGameOver();

    } else if (guessCount == 10) {
        lastResult.textContent = "¡¡¡Fin del juego!!!";
        setGameOver();

    } else {
        lastResult.textContent = "¡Incorrecto!";
        lastResult.classList.remove("green");
        lastResult.classList.add("red");

        if(userGuess < randomNumber) {
            lowOrHi.textContent = "¡El numero es muy bajo!";

        } else if(userGuess > randomNumber) {
            lowOrHi.textContent = "¡El numero es muy alto!"
        }
    }

    guessCount++;
    guessField.value = "";
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    resetButton = document.createElement("button");
    resetButton.textContent = "Iniciar nuevo juego";
    resetButton.classList.add("button");

    document.body.append(resetButton);
    resetButton.addEventListener('click', resetGame);
}

function resetGame() {
    guessCount = 1;

    const resetParams = document.querySelectorAll(".resultParas p");
    for (let i = 0; i < resetParams.length; i++) {
        resetParams[i].textContent = "";
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    lastResult.classList.remove("red");
    lastResult.classList.remove("green");

    randomNumber = Math.floor(Math.random() * 100) + 1;
}