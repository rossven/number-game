export type Screen = 'home' | 'game' | 'multiplayer' | 'multiplayerGame';
export type GameMode = 'random' | 'daily';
export type DigitStatus = 'green' | 'yellow' | 'none' | 'unused';
export type FeedbackType = 'tap' | 'submit' | 'win' | 'hint';

export interface GameMessage {
    type: 'NUMBER_SET' | 'GUESS' | 'RESULT' | 'GAME_OVER' | 'PLAY_AGAIN';
    data: any;
}
