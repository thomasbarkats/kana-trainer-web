import { GAME_MODES, KANA_INCLUSION, VOCABULARY_MODES } from '../constants';


export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const getAllKanaForMode = (mode, kanaData, options = {}) => {
  const { dakutenMode = KANA_INCLUSION.OFF, combinationsMode = KANA_INCLUSION.OFF } = options;
  let result = [];

  // Check if we should include basic kana
  const includeBasics = dakutenMode !== KANA_INCLUSION.ONLY && combinationsMode !== KANA_INCLUSION.ONLY;

  // Determine base kana sets
  const includeBasicHiragana = mode === GAME_MODES.HIRAGANA || mode === GAME_MODES.BOTH;
  const includeBasicKatakana = mode === GAME_MODES.KATAKANA || mode === GAME_MODES.BOTH;

  // Add basic kana if needed
  if (includeBasics) {
    if (includeBasicHiragana) result = [...result, ...kanaData.hiragana];
    if (includeBasicKatakana) result = [...result, ...kanaData.katakana];
  }

  // Add dakuten if needed
  if (dakutenMode !== KANA_INCLUSION.OFF) {
    if (includeBasicHiragana) {
      result = [...result, ...kanaData.hiraganaDakuten];
    }
    if (includeBasicKatakana) {
      result = [...result, ...kanaData.katakanaDakuten];
    }
  }

  // Add combinations if needed
  if (combinationsMode !== KANA_INCLUSION.OFF) {
    if (includeBasicHiragana) {
      result = [...result, ...kanaData.hiraganaCombinations];
    }
    if (includeBasicKatakana) {
      result = [...result, ...kanaData.katakanaCombinations];
    }
  }

  return result;
};

export const initializeKanaData = (allKana) => {
  const initialProgress = {};
  const initialStats = {};

  allKana.forEach(kana => {
    initialProgress[kana.char] = {
      successes: 0,
      failures: 0,
      mastered: false
    };
    initialStats[kana.char] = {
      key: kana.char,
      question: kana.char,
      answer: kana.reading,
      failures: 0,
      successes: 0,
      timeSpent: 0
    };
  });

  return { initialProgress, initialStats };
};

export const initializeVocabularyData = (words, vocabularyMode) => {
  const initialProgress = {};
  const initialStats = {};

  words.forEach(word => {
    const key = word.japanese;
    initialProgress[key] = {
      successes: 0,
      failures: 0,
      mastered: false
    };
    initialStats[key] = {
      key: word.japanese,
      question: vocabularyMode === VOCABULARY_MODES.FROM_JAPANESE ? word.japanese : word.translation,
      answer: vocabularyMode === VOCABULARY_MODES.FROM_JAPANESE ? word.translation : word.japanese,
      successes: 0,
      failures: 0,
      timeSpent: 0
    };
  });

  return { initialProgress, initialStats };
};
