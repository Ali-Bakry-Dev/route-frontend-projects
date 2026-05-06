/**
 * @fileoverview Question class - handles individual question display and interaction
 */

import {
  ANIMATION_DURATION,
  QUESTION_TRANSITION_DELAY,
  TIMER_DURATION,
  TIMER_WARNING_THRESHOLD,
  ANSWER_KEYS,
} from './constants.js';
import { soundManager } from './sounds.js';

/**
 * Manages individual question display, user interaction, timer, and answer validation
 */
export default class Question {
  /**
   * Creates a new Question instance
   * @param {Quiz} quiz - Reference to the parent Quiz instance
   * @param {HTMLElement} container - The container element for question display
   * @param {Function} onQuizEnd - Callback function when quiz ends
   */
  constructor(quiz, container, onQuizEnd) {
    this.quiz = quiz;
    this.container = container;
    this.onQuizEnd = onQuizEnd;
    this.questionData = quiz.getCurrentQuestion();
    this.index = quiz.currentQuestionIndex;
    this.question = this._decodeHtml(this.questionData.question);
    this.correctAnswer = this._decodeHtml(this.questionData.correct_answer);
    this.category = this._decodeHtml(this.questionData.category);
    this.wrongAnswers = this.questionData.incorrect_answers.map((a) =>
      this._decodeHtml(a)
    );
    this.allAnswers = this._shuffleAnswers();
    this.answered = false;
    this.timerInterval = null;
    this.timeRemaining = TIMER_DURATION;
    this.keyboardHandler = null;
  }

  // ======================== Public Methods ========================

  /** Generates and displays the question markup */
  displayQuestion() {
    const questionMarkUp = `
      <div class="game-card question-card" role="region" aria-label="Round ${this.index + 1} of ${this.quiz.numberOfQuestions}">
        
        <!-- XP Progress Bar -->
        <div class="xp-bar-container">
          <div class="xp-bar-header">
            <span class="xp-label"><i class="fa-solid fa-bolt"></i> Progress</span>
            <span class="xp-value">Round ${this.index + 1}/${this.quiz.numberOfQuestions}</span>
          </div>
          <div class="xp-bar">
            <div class="xp-bar-fill" style="width: ${this._getProgress()}%" role="progressbar" aria-valuenow="${this._getProgress()}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>

        <!-- Stats Row -->
        <div class="stats-row">
          <div class="stat-badge category">
            <i class="fa-solid fa-bookmark"></i>
            <span>${this.category}</span>
          </div>
          <div class="stat-badge difficulty ${this.quiz.difficulty}">
            <i class="fa-solid ${this._getDifficultyIcon()}"></i>
            <span>${this.quiz.difficulty}</span>
          </div>
          <div class="stat-badge timer" aria-live="polite" aria-label="Time remaining">
            <i class="fa-solid fa-stopwatch"></i>
            <span class="timer-value">${this.timeRemaining}</span>s
          </div>
          <div class="stat-badge counter">
            <i class="fa-solid fa-gamepad"></i>
            <span>${this.index + 1}/${this.quiz.numberOfQuestions}</span>
          </div>
        </div>

        <!-- Question Text -->
        <h2 class="question-text" id="questionText">${this.question}</h2>

        <!-- Answer Grid -->
        <div class="answers-grid" role="listbox" aria-labelledby="questionText">
          ${this.allAnswers
            .map(
              (choice, i) => `
            <button 
              class="answer-btn"
              role="option" 
              tabindex="0" 
              data-index="${i}"
              data-answer="${choice.replace(/"/g, '&quot;')}"
              aria-label="Answer ${i + 1}: ${choice}. Press ${i + 1} to select."
            >
              <span class="answer-key">${i + 1}</span>
              <span class="answer-text">${choice}</span>
            </button>
          `
            )
            .join('')}
        </div>

        <!-- Keyboard Hint -->
        <p class="keyboard-hint">
          <i class="fa-regular fa-keyboard"></i> Press 1-${this.allAnswers.length} to select
        </p>

        <!-- Score Panel -->
        <div class="score-panel">
          <div class="score-item">
            <div class="score-item-label">Score</div>
            <div class="score-item-value">${this.quiz.score}</div>
          </div>
        </div>
      </div>
    `;

    this.container.innerHTML = questionMarkUp;
    this._addEventListeners();
    this._startTimer();
  }

  // ======================== Private Helper Methods ========================

  /** Decodes HTML entities in a string */
  _decodeHtml(html) {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.documentElement.textContent;
  }

  /** Shuffles answers using Fisher-Yates algorithm */
  _shuffleAnswers() {
    const allAnswers = [...this.wrongAnswers, this.correctAnswer];
    for (let i = allAnswers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allAnswers[i], allAnswers[j]] = [allAnswers[j], allAnswers[i]];
    }
    return allAnswers;
  }

  /** Returns progress percentage */
  _getProgress() {
    return Math.round(((this.index + 1) / this.quiz.numberOfQuestions) * 100);
  }

  /** Returns the icon class for current difficulty level */
  _getDifficultyIcon() {
    const icons = {
      easy: 'fa-face-smile',
      medium: 'fa-face-meh',
      hard: 'fa-skull',
    };
    return icons[this.quiz.difficulty] || 'fa-gauge-high';
  }

  /** Adds click and keyboard event listeners */
  _addEventListeners() {
    const allChoices = document.querySelectorAll('.answer-btn');

    allChoices.forEach((choice) => {
      choice.addEventListener('click', () => this._checkAnswer(choice));
      choice.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this._checkAnswer(choice);
        }
      });
    });

    this.keyboardHandler = (e) => {
      if (ANSWER_KEYS.includes(e.key)) {
        const index = parseInt(e.key, 10) - 1;
        if (index < allChoices.length) this._checkAnswer(allChoices[index]);
      }
    };
    document.addEventListener('keydown', this.keyboardHandler);
  }

  /** Removes keyboard event listener */
  _removeEventListeners() {
    if (this.keyboardHandler) {
      document.removeEventListener('keydown', this.keyboardHandler);
      this.keyboardHandler = null;
    }
  }

  /** Starts the countdown timer */
  _startTimer() {
    const timerDisplay = document.querySelector('.timer-value');
    const timerContainer = document.querySelector('.stat-badge.timer');

    this.timerInterval = setInterval(() => {
      this.timeRemaining -= 1;
      if (timerDisplay) timerDisplay.textContent = this.timeRemaining;

      if (this.timeRemaining <= TIMER_WARNING_THRESHOLD) {
        timerContainer?.classList.add('warning');
        soundManager.playWarning();
      }

      if (this.timeRemaining <= 0) {
        this._stopTimer();
        if (!this.answered) {
          soundManager.playTimeUp();
          this._handleTimeUp();
        }
      }
    }, 1000);
  }

  /** Stops the countdown timer */
  _stopTimer() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  /** Handles when time runs out */
  _handleTimeUp() {
    this.answered = true;
    this._removeEventListeners();
    this.quiz.resetStreak();

    const allChoices = document.querySelectorAll('.answer-btn');
    allChoices.forEach((choice) => {
      if (choice.dataset.answer === this.correctAnswer) {
        choice.classList.add('correct');
      } else {
        choice.classList.add('disabled');
      }
    });

    const questionCard = this.container.querySelector('.question-card');
    if (questionCard) {
      const scorePanel = questionCard.querySelector('.score-panel');
      const timeUpMsg = document.createElement('div');
      timeUpMsg.className = 'time-up-message';
      timeUpMsg.innerHTML = '<i class="fa-solid fa-clock"></i> TIME\'S UP!';
      scorePanel.before(timeUpMsg);
    }

    this._animateQuestion(ANIMATION_DURATION);
  }

  /** Checks if the selected answer is correct */
  _checkAnswer(choiceElement) {
    if (this.answered) return;

    this.answered = true;
    this._stopTimer();
    this._removeEventListeners();

    const selectedAnswer = choiceElement.dataset.answer;
    const isCorrect = selectedAnswer.toLowerCase() === this.correctAnswer.toLowerCase();

    const allChoices = document.querySelectorAll('.answer-btn');
    allChoices.forEach((choice) => {
      if (choice !== choiceElement) choice.classList.add('disabled');
    });

    if (isCorrect) {
      choiceElement.classList.add('correct');
      this.quiz.incrementScore();
      this.quiz.incrementStreak();
      soundManager.playCorrect();
    } else {
      choiceElement.classList.add('wrong');
      this.quiz.resetStreak();
      soundManager.playWrong();
      this._highlightCorrectAnswer();
    }

    this._animateQuestion(ANIMATION_DURATION);
  }

  /** Highlights the correct answer when user selects wrong answer */
  _highlightCorrectAnswer() {
    const allChoices = document.querySelectorAll('.answer-btn');
    allChoices.forEach((choice) => {
      if (choice.dataset.answer === this.correctAnswer) {
        choice.classList.add('correct-reveal');
        choice.classList.remove('disabled');
      }
    });
  }

  /** Gets the next question or ends the quiz */
  _getNextQuestion() {
    if (this.quiz.nextQuestion()) {
      const nextQuestion = new Question(this.quiz, this.container, this.onQuizEnd);
      nextQuestion.displayQuestion();
    } else {
      this.container.innerHTML = this.quiz.endQuiz();
      const tryAgain = document.querySelector('.btn-restart');
      if (tryAgain) {
        tryAgain.addEventListener('click', () => {
          tryAgain.classList.add('loading');
          tryAgain.innerHTML = '<i class="fa-solid fa-spinner"></i> Loading...';
          setTimeout(() => this.onQuizEnd(), 500);
        });
      }
    }
  }

  /** Animates the question transition */
  _animateQuestion(duration) {
    setTimeout(() => {
      const questionCard = this.container.querySelector('.question-card');
      if (questionCard) questionCard.classList.add('exit');

      setTimeout(() => {
        this._getNextQuestion();
      }, duration);
    }, QUESTION_TRANSITION_DELAY);
  }
}