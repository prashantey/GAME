const images = [
    "./assets/images/rock.svg",
    "./assets/images/paper.svg",
    "./assets/images/scissors.svg"
];

let playerScore = 0;
let highScore = 0;

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) return 'tie';
    if (
        (playerChoice === images[0] && computerChoice === images[2]) || 
        (playerChoice === images[1] && computerChoice === images[0]) ||
        (playerChoice === images[2] && computerChoice === images[1])    
    ) {
        return 'player';
    }
    return 'computer';
}

function updateScore(winner) {
    const scoreElement = document.querySelector('.scoree');
    const HscoreElement = document.querySelector('.hScore');

    if (!scoreElement || !HscoreElement) {
        console.error('Score elements not found.');
        return;
    }

    if (winner === 'player') {
        playerScore += 1;
        if (playerScore > highScore) highScore = playerScore;
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
        img.alt = "Computer Choice";
        img.style.height = "50px";
        img.style.width = "50px";
        computerImageDiv.innerHTML = '';
        computerImageDiv.appendChild(img);
        return computerChoice;
    } else {
        console.error("Element with class 'Computerimage' not found.");
    }
}

function createImageTag(src, alt) {
    const imgTag = document.createElement("img");
    imgTag.src = src;
    imgTag.alt = alt;
    imgTag.style.height = "50px";
    imgTag.style.width = "50px";
    return imgTag;
}

function handleButtonClick(event) {
    let imageSrc;
    let altText;

    switch (event.target.className) {
        case 'rock':
            imageSrc = "./assets/images/rock.svg";
            altText = 'Rock';
            break;
        case 'Paper':
            imageSrc = "./assets/images/paper.svg";
            altText = 'Paper';
            break;
        case 'scissors':
            imageSrc = "./assets/images/scissors.svg";
            altText = 'Scissors';
            break;
        default:
            return;
    }

    const newImage = createImageTag(imageSrc, altText);
    const playerImageDiv = document.querySelector(".playerimage");
    if (playerImageDiv) {
        playerImageDiv.innerHTML = '';
        playerImageDiv.appendChild(newImage);

        const computerChoice = setComputerChoice();
        const winner = determineWinner(imageSrc, computerChoice);
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
                resultDiv.textContent = 'It\'s a Draw';
                buttons.style.display = "none";
                playAgain.style.display = "block"

            }
        } else {
            console.error("Result element not found.");
        }
    } else {
        console.error('Element with class "playerimage" not found.');
    }
}

document.querySelectorAll(".buttons button").forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

document.querySelector(".result button")?.addEventListener('click', () => {
    document.querySelector('.result h1').textContent = 'Make Your Choice';
    document.querySelector('.playerimage').innerHTML = '';
    document.querySelector('.Computerimage').innerHTML = '';
    document.querySelector('.buttons').style.display = "flex";
    document.getElementById("playAgain").style.display = 'none'

});
