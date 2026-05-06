/**
 * Centralized constants for the Quiz App
 * Single source of truth for configuration
 */

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = 500;
export const ANIMATION_DELAY_MULTIPLIER = 2;
export const QUESTION_TRANSITION_DELAY = ANIMATION_DURATION * ANIMATION_DELAY_MULTIPLIER;

// Timer settings
export const TIMER_DURATION = 15;               // seconds per question
export const TIMER_WARNING_THRESHOLD = 5;       // seconds remaining to show warning

// Quiz settings
export const MIN_QUESTIONS = 1;
export const MAX_QUESTIONS = 50;
export const DEFAULT_DIFFICULTY = 'easy';

// LocalStorage keys
export const STORAGE_KEY_HIGH_SCORES = 'quizApp_highScores';
export const MAX_HIGH_SCORES = 10;

// API settings
export const API_BASE_URL = 'https://opentdb.com/api.php';
export const API_SUCCESS_CODE = 0;

// Keyboard mappings for answer selection
export const ANSWER_KEYS = ['1', '2', '3', '4'];

// CSS class names
export const CSS_CLASSES = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  LOADING: 'loading',
  HIDDEN: 'd-none',
  FLEX: 'd-flex',
  TIMER_WARNING: 'timer-warning',
  ANIMATE_BOUNCE_IN: 'animate__bounceIn',
  ANIMATE_BOUNCE_OUT: 'animate__bounceOutLeft',
  ANIMATE_FLIP: 'animate__flipInY',
  ANIMATE_SHAKE: 'animate__shakeX',
};