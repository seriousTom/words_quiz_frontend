export const WORD_DISPLAY_LIST = {
    FLASHCARD: 'flashcard',
    WORD: 'word',
    MIXED: 'mixed'
} as const;

export type WordDisplay = typeof WORD_DISPLAY_LIST[keyof typeof WORD_DISPLAY_LIST];

export const WORD_DISPLAY_LABELS: Record<WordDisplay, string> = {
    flashcard: 'Flashcard',
    word: 'Word',
    mixed: 'Mixed'
};
