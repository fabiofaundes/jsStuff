import {Snake} from '../Snake/Snake';

export class SnakeGame {
    constructor (){
        this.gameState = States.GAME_OVER;
    }    

    menu(){
        
    }

    startGame(){
        this.gameState = States.PAUSED;
    }
}

const States = {
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'gameover',
}