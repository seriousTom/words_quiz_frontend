export const GAME_MODES = {
    FLASHCARDS: 'flashcards',
    WRITE: 'write',
    MULTIPLE_CHOICE: 'multiple_choice',
    MIXED: 'mixed'
} as const;

export type GameMode = typeof GAME_MODES[keyof typeof GAME_MODES];
// export type GameMode = 'flashcards' | 'write' | 'multiple_choice' | 'mixed';

export const GAME_MODE_LABELS: Record<GameMode, string> = {
    flashcards: 'Flashcards',
    write: 'Write the word',
    multiple_choice: 'Choose the correct word',
    mixed: 'Mixed'
};
