const images = [
    "./assets/images/rock.svg",
    "./assets/images/paper.svg",
    "./assets/images/scissors.svg"
];

function getComputerChoice() {
    const random = Math.floor(Math.random() * images.length);
    return images[random];
}

function winningCondition(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'Draw'
    }
    if (
        (playerChoice === images[0] && computerChoice === images[2]) ||
        (playerChoice === images[1] && computerChoice === images[0]) ||
        (playerChoice === images[2] && computerChoice === images[1])
    ) {
        return 'player';
    } else {
        return 'computer';
    }
}
let playerScore = 0;
let highScore = 0;
function updateScore(winner) {
    const scoreElement = document.querySelector('.scoree');
    const HscoreElement = document.querySelector('.hScore');


    if (winner === 'player') {
        playerScore += 1;
        if (playerScore > highScore) {
            highScore = playerScore;
        }
    } else if (winner === 'computer') {
        playerScore = 0;
    }

    scoreElement.textContent = playerScore;
    HscoreElement.textContent = highScore;
}

function setComputerChoice() {
    const computerImageDiv = document.querySelector(".Computerimage");
    if (computerImageDiv) {
        const img = document.createElement("img");
        const computerChoice = getComputerChoice();
        img.src = computerChoice;
        img.style.height = "50px";
        img.style.width = "50px";
        computerImageDiv.appendChild(img);
        return computerChoice;
    }
}

function createImageTag(src) {
    const imgTag = document.createElement("img");
    imgTag.src = src;
    imgTag.style.height = "50px";
    imgTag.style.width = "50px";
    return imgTag;
}

function handleButtonClick(event) {
    let imageSrc;

    switch (event.target.className) {
        case 'rock':
            imageSrc = "./assets/images/rock.svg";
            break;
        case 'Paper':
            imageSrc = "./assets/images/paper.svg";
            break;
        case 'scissors':
            imageSrc = "./assets/images/scissors.svg";
            break;
        default:
            return;
    }

    const newImage = createImageTag(imageSrc);
    const playerImageDiv = document.querySelector(".playerimage");
    if (playerImageDiv) {
        playerImageDiv.innerHTML = '';
        playerImageDiv.appendChild(newImage);

        const computerChoice = setComputerChoice();
        const winner = winningCondition(imageSrc, computerChoice);
        updateScore(winner);

        const resultDiv = document.querySelector('.result h1');
        const buttons = document.querySelector('.buttons');
        const playAgain = document.getElementById("playAgain")

        if (resultDiv) {
            if (winner === 'player') {
                resultDiv.textContent = 'You Won :)';
                buttons.style.display = "none";
                playAgain.style.display = "block"
            } else if (winner === 'computer') {
                resultDiv.textContent = 'You Lost :(';
                buttons.style.display = "none";
                playAgain.style.display = "block"

            } else {
                resultDiv.textContent = 'Draw';
                buttons.style.display = "none";
                playAgain.style.display = "block"

            }
        }
    }
}

const buttonS = document.querySelectorAll("button")
buttonS.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

const results = document.querySelector(".result")
results.addEventListener('click', () => {
    document.querySelector('.result h1').textContent = 'Make Your Choice';
    document.querySelector('.playerimage').innerHTML = '';
    document.querySelector('.Computerimage').innerHTML = '';
    document.querySelector('.buttons').style.display = "flex";
    document.getElementById("playAgain").style.display = 'none'
});
