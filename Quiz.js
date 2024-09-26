const questions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "Who wrote 'Hamlet'?",
        options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
        answer: 2
    },
    // Add 8 more questions
];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 30;

const questionElement = document.getElementById('question');
const optionButtons = document.querySelectorAll('.option');
const nextButton = document.getElementById('next-btn');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');

function startQuiz() {
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    questionElement.textContent = question.question;
    optionButtons.forEach((button, index) => {
        button.textContent = question.options[index];
        button.addEventListener('click', () => selectAnswer(index));
    });
}

function selectAnswer(selectedIndex) {
    const correctIndex = questions[currentQuestionIndex].answer;
    if (selectedIndex === correctIndex) {
        score++;
    }
    nextButton.classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        resetState();
        showQuestion(questions[currentQuestionIndex]);
        resetTimer();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    scoreElement.textContent = `Your score is: ${score}`;
    scoreElement.classList.remove('hidden');
    nextButton.classList.add('hidden');
    timerElement.classList.add('hidden');
}

function resetState() {
    nextButton.classList.add('hidden');
}

function startTimer() {
    timerElement.classList.add('animating');
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = `00:${timeLeft < 10 ? '0' : ''}${timeLeft}`;
        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 30;
    timerElement.textContent = "00:30";
    startTimer();
}

nextButton.addEventListener('click', nextQuestion);
startQuiz();
