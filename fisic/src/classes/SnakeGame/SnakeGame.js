import {Snake} from '../Snake/Snake';

export class SnakeGame {
    constructor (){
        this.gameState = States.GAME_OVER;
    }    

    menu(){
        
    }

    playGame(){
        
    }
}

const States = {
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'gameover',
    MENU: 'menu',
}