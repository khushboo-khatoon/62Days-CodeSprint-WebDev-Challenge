const quizQuestions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Java", "C", "Python", "JavaScript"],
    answer: 3
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Creative Style System",
      "Colorful Style Sheets"
    ],
    answer: 0
  },
  {
    question: "Which HTML tag is used to link a CSS file?",
    options: ["<style>", "<css>", "<link>", "<script>"],
    answer: 2
  },
  {
    question: "Which symbol is used for comments in JavaScript?",
    options: ["<!-- -->", "//", "**", "##"],
    answer: 1
  },
  {
    question: "Which method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "remove()"],
    answer: 0
  }
];

const questionScreen   = document.getElementById("question-screen");
const resultScreen     = document.getElementById("result-screen");
const questionCounter  = document.getElementById("question-counter");
const questionText     = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const feedbackText     = document.getElementById("feedback-text");
const nextBtn          = document.getElementById("next-btn");
const restartBtn       = document.getElementById("restart-btn");
const scoreText        = document.getElementById("score-text");


let currentQuestionIndex = 0; // which question we are on
let score = 0;                // how many correct answers
let hasAnswered = false;      // stops double-clicking answers


function loadQuestion() {
  // Reset state for the new question
  hasAnswered = false;
  feedbackText.textContent = "";
  nextBtn.classList.add("hidden");
  optionsContainer.innerHTML = ""; // clear old buttons

  // Get the current question object from our array
  const currentQuestion = quizQuestions[currentQuestionIndex];

  // Update the counter, e.g. "Question 2 of 5"
  questionCounter.textContent =
    `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;

  // Show the question text
  questionText.textContent = currentQuestion.question;

  // Create a button for each option using a loop
  currentQuestion.options.forEach((optionText, index) => {
    const button = document.createElement("button");
    button.textContent = optionText;
    button.classList.add("option-btn");

    // When the button is clicked, run checkAnswer()
    button.addEventListener("click", () => checkAnswer(index, button));

    optionsContainer.appendChild(button);
  });
}


function checkAnswer(selectedIndex, selectedButton) {
  // Prevent clicking multiple answers for the same question
  if (hasAnswered) return;
  hasAnswered = true;

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const correctIndex = currentQuestion.answer;

  // Get ALL the option buttons so we can disable/color them
  const allButtons = document.querySelectorAll(".option-btn");

  allButtons.forEach((btn, index) => {
    btn.classList.add("disabled"); // stop further clicks

    if (index === correctIndex) {
      btn.classList.add("correct"); // always highlight correct answer
    }
  });

  if (selectedIndex === correctIndex) {
    score++;
    feedbackText.textContent = "✅ Correct!";
    feedbackText.style.color = "#1d7a1d";
  } else {
    selectedButton.classList.add("wrong"); // highlight the wrong pick
    feedbackText.textContent = "❌ Incorrect!";
    feedbackText.style.color = "#a30000";
  }

  // Show the "Next Question" button
  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  questionScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");

  scoreText.textContent =
    `You scored ${score} out of ${quizQuestions.length}!`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;

  resultScreen.classList.add("hidden");
  questionScreen.classList.remove("hidden");

  loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

loadQuestion();