let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedCategory = localStorage.getItem('quizCategory');
let totalQuestions = 5;
let username = "";

// Array of background colors to change for each question
const backgroundColors = ['#fffae3', '#d1f7c4', '#c4d7f7', '#f7c4c4', '#f7e1c4'];

document.addEventListener("DOMContentLoaded", function() {
    // Set quiz category heading
    document.getElementById("quiz-category").textContent = `${selectedCategory} Quiz`;
});

// Function to start the quiz after entering a name
function startQuiz() {
    username = document.getElementById('username').value;
    if (!username) {
        alert("Please enter your name to start the quiz.");
        return;
    }

    // Hide start screen and show quiz box
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('quiz-box').style.display = 'block';

    // Load questions from JSON
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            questions = shuffleArray(data[selectedCategory]).slice(0, totalQuestions);
            displayQuestion();
        });
}

function displayQuestion() {
    document.body.style.backgroundColor = backgroundColors[currentQuestionIndex % backgroundColors.length];

    if (currentQuestionIndex < totalQuestions) {
        const question = questions[currentQuestionIndex];
        document.getElementById('question-container').innerText = question.question;
        const answerButtons = document.getElementById('answer-buttons');
        answerButtons.innerHTML = '';

        question.answers.forEach((answer, index) => {
            const li = document.createElement('li');
            const label = document.createElement('label');
            label.setAttribute('for', `answer${index}`);
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = 'answer';
            input.id = `answer${index}`;
            input.value = answer;
            input.onclick = () => selectAnswer(answer);
            label.appendChild(input);
            label.appendChild(document.createTextNode(answer));
            li.appendChild(label);
            answerButtons.appendChild(li);
        });
    } else {
        showResult();
    }
}

function selectAnswer(answer) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (answer === correctAnswer) {
        score++;
    }

    document.getElementById('next-button').style.display = 'block';
}

function nextQuestion() {
    currentQuestionIndex++;
    document.getElementById('next-button').style.display = 'none';
    displayQuestion();
}

function showResult() {
    document.getElementById('quiz-box').style.display = 'none';
    const resultContainer = document.getElementById('result-container');
    resultContainer.style.display = 'block';
    resultContainer.innerHTML = `You scored ${score} out of ${totalQuestions}!`;

    const username = prompt("Please enter your name:");

    // Create a history entry object with category
    const historyEntry = {
        username: username,
        category: selectedCategory,
        score: score,
        totalQuestions: totalQuestions,
        quizDate: new Date().toLocaleString()
    };

    // Retrieve existing history from localStorage or initialize an empty array
    let quizHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
    quizHistory.push(historyEntry);

    // Save updated history back to localStorage
    localStorage.setItem('quizHistory', JSON.stringify(quizHistory));
}


function goHome() {
    window.location.href = 'index.html';
}

function viewHistory() {
    window.location.href = 'history.html';
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
