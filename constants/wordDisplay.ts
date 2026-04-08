export const WORD_DISPLAY_LIST = {
    FLASHCARD: 'flashcard',
    WORD: 'word',
    MIXED: 'mixed'
} as const;

export type WordDisplay = typeof WORD_DISPLAY_LIST[keyof typeof WORD_DISPLAY_LIST];

type WordDisplayData = {
    label: string;
    icon: string;
};

export const WORD_DISPLAY_LABELS: Record<WordDisplay, WordDisplayData> = {
    flashcard: {label: 'Flashcard', icon: 'image-outline'},
    word: {label: 'Word', icon: 'text-outline'},
    mixed: {label: 'Mixed', icon: 'shuffle-outline'}
};
