export interface Guess {
    number: string;
    result: ('green' | 'yellow' | 'none')[];
}

export interface GameState {
    targetNumber: string;
    currentGuess: string;
    guesses: Guess[];
    isGameWon: boolean;
} 