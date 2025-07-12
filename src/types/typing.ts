export interface TypingStats {
    wpm: number;
    accuracy: number;
    correctChars: number;
    incorrectChars: number;
    totalChars: number;
    timeElapsed: number;
}

export interface TypingState {
    currentText: string;
    userInput: string;
    currentIndex: number;
    startTime: number | null;
    endTime: number | null;
    isActive: boolean;
    isComplete: boolean;
    errors: Set<number>;
    stats: TypingStats;
}

export type TimerMode = 15 | 30 | 60; 