// ACCESSING DOM OBJECTS + VARIABLES

const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');
const scoreTextEnd = document.getElementById('score2');
const hud = document.getElementById('hud');
const hud2 = document.getElementById('hud2');
const playAgain = document.getElementById('play');

let currentQuestion;
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

// HARDCODED QUESTIONS & ANSWERS

let questions = [
  {
    question: 'Why do I want to change career?',
    choice1: 'I want to have a better weekly schedule',
    choice2: 'I want to have the opportunity to earn more in the future',
    choice3: 'I want to have less stress and drama in my life',
    choice4: 'All of the above',
    answer: 4
  },
  {
    question: 'Why do I want to work in IT?',
    choice1: 'I spent most of my days in front of computers already',
    choice2: 'I enjoy being creative',
    choice3: 'IT is an ever-changing field so one never gets bored',
    choice4: 'All of the above',
    answer: 4
  },
  {
    question: 'Why did I choose web development?',
    choice1: 'Javascript is a relatively easy to learn programming language for beginners',
    choice2: 'Javascript is the second most popular programming language',
    choice3: 'Web development can be a gateway to software engineering',
    choice4: 'All of the above',
    answer: 4
  },
  {
    question: 'What are my preferences at the beginning of my career?',
    choice1: 'A workplace that gives me the most opportunity to grow',
    choice2: 'A workplace where I can maximize my earnings',
    choice3: 'To feel good where I work',
    choice4: 'To make new friends',
    answer: 1
  },
  {
    question: 'How does a perfect workplace look like to me?',
    choice1: 'Where I can sit on a fitness ball',
    choice2: 'Where I\'m surrounded by intelligent and helpful people',
    choice3: 'There are no perfect workplaces',
    choice4: 'Free coffee',
    answer: 2
  },
  {
    question: 'How flexible am I?',
    choice1: 'I don\'t mind to work remotely',
    choice2: 'I don\'t mind to relocate',
    choice3: 'I don\'t mind to commute',
    choice4: 'All of the above',
    answer: 4
  },
  {
    question: 'What is my biggest weakness?',
    choice1: 'Writing quizzes',
    choice2: 'Sometimes I\'m too passionate',
    choice3: 'Ice cream',
    choice4: 'Spending too much time playing video games',
    answer: 2
  },
  {
    question: 'What are my positive character traits?',
    choice1: 'Open-minded',
    choice2: 'Always ready for a challenge',
    choice3: 'Diligent',
    choice4: 'All of the above',
    answer: 4
  },
  {
    question: 'What can I provide to a company that is willing to hire me?',
    choice1: 'A different perspective that can move a project ahead',
    choice2: 'Willingness to the boring bits as well',
    choice3: 'I make outstanding cocktails',
    choice4: 'All of the above',
    answer: 4
  },
  {
    question: 'Am I a cat person or a dog person?',
    choice1: 'Dog person',
    choice2: 'Cat person',
    choice3: 'Yes',
    choice4: 'All of the above',
    answer: 3
  }
];

// CONSTANTS

const CORRECT_ANSWER = 1; // point per correct answer
const MAX_QUESTIONS = 10; 

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions]; // spread operator is used just in case I want to change questions later on
  getNewQuestion();
};

// LOGIC FOR DISPLAYING NEW QUESTIONS & FOR END GAME

function getNewQuestion() {

  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {  // if all questions answered show final score & play again
     toggleVisibility();
  };

  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}` // template literal to dynamically adjust score
  const questionIndex = Math.floor(Math.random() * availableQuestions.length); // randomly generates the next question out of all available questions
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;  


  choices.forEach( choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];
  });

  availableQuestions.splice(questionIndex, 1); // getting rid of questions that were used

  acceptingAnswer = true;
};

// Logic for selecting answers

choices.forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswer) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset['number'];
    let rightAnswer;

    for (var rightChoice of choices) {
      rightAnswer = rightChoice.dataset['number'];
      if (rightAnswer == currentQuestion.answer) {
        rightChoice.parentElement.classList.add('correct');
        break;
      };
    };   

    if (selectedAnswer == rightAnswer) {
	  incrementScore(CORRECT_ANSWER);
    } else {
      selectedChoice.parentElement.classList.add('incorrect'); 
	}

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove('incorrect');
      rightChoice.parentElement.classList.remove('correct');
      getNewQuestion();
    }, 3000);
  });
});

function incrementScore(num) {
  score += num;
  scoreText.innerText = score;
  scoreTextEnd.innerText = `${score}/10`;
};

function toggleVisibility() {
  hud.style.display = 'none';
  hud2.style.display = 'flex';
};

function visibilityOff() {
  hud.style.display = 'flex';
  hud2.style.display = 'none';
};

function resetScore() {
  let score = 0;
  let questionCounter = 0;
  scoreText.innerText = 0;
}

playAgain.addEventListener('click', () => {
  visibilityOff();
  resetScore();
  startGame();
});

startGame();
