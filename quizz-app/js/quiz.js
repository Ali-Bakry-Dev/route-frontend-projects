


/**
 * Quiz class - manages quiz state, scoring, and API interactions
 */

import { API_BASE_URL, API_SUCCESS_CODE, STORAGE_KEY_HIGH_SCORES, MAX_HIGH_SCORES } from './constants.js';
import { soundManager } from './sounds.js';

// ============================== Quiz Class ==============================
/**
 * Manages quiz state, scoring, and API interactions
 */
export default class Quiz {
  /**
   * Creates a new Quiz instance
   * @param {string} category - Category ID
   * @param {string} difficulty - Difficulty level (easy, medium, hard)
   * @param {number} numberOfQuestions - Number of questions to fetch
   * @param {string} playerName - Player's name
   */
  constructor(category, difficulty, numberOfQuestions, playerName) {
    this.category = category;
    this.difficulty = difficulty;
    this.numberOfQuestions = numberOfQuestions;
    this.playerName = playerName;
    this.questions = [];
    this.currentQuestionIndex = 0;
    this.score = 0;
    this.streak = 0;
  }

  // ========== API Methods ==========
  /**
   * Fetches questions from Open Trivia Database API
   * @returns {Promise<void>}
   * @throws {Error} If API response is invalid or contains no questions
   */
  async getQuestions() {
    let url = `${API_BASE_URL}?amount=${this.numberOfQuestions}`;
    if (this.category) url += `&category=${this.category}`;
    if (this.difficulty) url += `&difficulty=${this.difficulty}`;
    url += '&type=multiple';

    const response = await fetch(url);
    const data = await response.json();

    if (data.response_code !== API_SUCCESS_CODE) {
      throw new Error(`API Error: response code ${data.response_code}`);
    }
    if (!data.results || data.results.length === 0) {
      throw new Error('No questions received from the API.');
    }

    this.questions = data.results;
  }

  /**
   * Returns the current question object
   * @returns {Object} Current question object
   */
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }

  // ========== Navigation ==========
  /**
   * Moves to the next question
   * @returns {boolean} True if there is a next question, false otherwise
   */
  nextQuestion() {
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      return true;
    }
    return false;
  }

  // ========== Scoring Methods ==========
  /**
   * Increases score by the current streak-based points
   */
  incrementScore() {
    this.incrementStreak();
    this.score += this.streak;
  }

  /**
   * Increases streak counter (max 5)
   * @returns {number} New streak value
   */
  incrementStreak() {
    this.streak = Math.min(this.streak + 1, 5);
    return this.streak;
  }

  /**
   * Resets streak counter to zero
   */
  resetStreak() {
    this.streak = 0;
  }

  // ========== High Score Management ==========
  /**
   * Loads high scores from localStorage
   * @returns {Array} Array of high score objects
   */
  loadHighScores() {
    const stored = localStorage.getItem(STORAGE_KEY_HIGH_SCORES);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  }

  /**
   * Saves high scores to localStorage
   * @param {Array} scores - Array of high score objects
   */
  saveHighScores(scores) {
    localStorage.setItem(STORAGE_KEY_HIGH_SCORES, JSON.stringify(scores.slice(0, MAX_HIGH_SCORES)));
  }

  /**
   * Saves current score if it qualifies for high scores
   * @returns {boolean} True if saved, false otherwise
   */
  saveScoreIfHigh() {
    const highScores = this.loadHighScores();
    const scoreToSave = {
      name: this.playerName,
      score: this.score,
      date: new Date().toISOString(),
      difficulty: this.difficulty,
      totalQuestions: this.numberOfQuestions,
    };

    const lowestScoreIndex = highScores.length >= MAX_HIGH_SCORES ? highScores.length - 1 : null;
    const qualifies = highScores.length < MAX_HIGH_SCORES || this.score > highScores[highScores.length - 1].score;

    if (qualifies) {
      highScores.push(scoreToSave);
      highScores.sort((a, b) => b.score - a.score);
      this.saveHighScores(highScores);
      return true;
    }
    return false;
  }

  // ========== UI Generation ==========
  /**
   * Generates quiz completion markup
   * @returns {string} HTML markup for quiz completion screen
   */
  endQuiz() {
    const totalPossible = this.numberOfQuestions * 5;
    const perfectScore = this.score === totalPossible;
    const saved = this.saveScoreIfHigh();
    soundManager.playGameEnd(this.score, totalPossible);

    return `
      <div class="game-card result-card">
        <div class="result-icon ${perfectScore ? 'perfect' : 'complete'}">
          <i class="fa-solid ${perfectScore ? 'fa-crown' : 'fa-trophy'}"></i>
        </div>
        <h2 class="result-title">Quiz Complete!</h2>
        <p class="result-player">${this.playerName}</p>
        <div class="score-breakdown">
          <div class="score-box">
            <div class="score-label">Final Score</div>
            <div class="score-number">${this.score} / ${totalPossible}</div>
          </div>
          <div class="score-box">
            <div class="score-label">Accuracy</div>
            <div class="score-number">${Math.round((this.score / totalPossible) * 100)}%</div>
          </div>
        </div>
        ${saved ? '<div class="high-score-badge"><i class="fa-solid fa-medal"></i> New High Score!</div>' : ''}
        <div class="result-actions">
          <button class="btn-play btn-restart"><i class="fa-solid fa-rotate-right"></i> Play Again</button>
        </div>
      </div>
    `;
  }
}
