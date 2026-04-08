export const GAME_MODES = {
    WRITE: 'write',
    MULTIPLE_CHOICE: 'multiple_choice',
    MIXED: 'mixed'
} as const;

export type GameMode = typeof GAME_MODES[keyof typeof GAME_MODES];
// export type GameMode = 'flashcards' | 'write' | 'multiple_choice' | 'mixed';

type GameModeData = {
    label: string;
    icon: string;
};

export const GAME_MODE_LABELS: Record<GameMode, GameModeData> = {
    // flashcards: 'Flashcards',
    write: {label: 'Write it', icon: 'pencil-outline'},
    multiple_choice: {label: 'Choose', icon: 'list-outline'},
    mixed: {label: 'Mixed', icon: 'shuffle-outline'}
};
