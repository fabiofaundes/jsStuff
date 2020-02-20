import {fillRectangle, drawText} from '../../components/Canvas/canvasFunctions';

import {Rectangle} from '../Rectangle/Rectangle';
import {KeyboardController} from '../KeyboardController/KeyboardController';
import { CanvasText } from '../CanvasText/CanvasText';
import { Coordinate } from '../Coordinate/Coordinate';


export class SnakeGame {
    constructor (canvas){   
        this.gameState = States.MENU;
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.keyboardController = new KeyboardController();

        this.handleResize = this.handleResize.bind(this);
        this.draw = this.draw.bind(this);
        this.drawBackground = this.drawBackground.bind(this);        

        this.handleResize();

        window.addEventListener('resize', this.handleResize);        
    }    

    menu(){
        
    }

    playGame(){
        
    }

    handleResize(){
        if(this.gameState === States.RUNNING)
            this.gameState = States.PAUSED;

        this.updateCanvasSize();
        this.draw();
    }

    updateCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    draw() {
        this.drawBackground();        
        this.drawMenu();
    }

    drawBackground() {
        this.context.fillStyle = "#000000";
        const background = new Rectangle(this.canvas.width, this.canvas.height, 0, 0)
        fillRectangle(this.context, background);
    }
    
    drawMenu() {
        const text = new CanvasText("<Snake_Game/>", "40", "Press Start 2P", new Coordinate(this.canvas.width/2, this.canvas.height/2), "green", "center");
        drawText(this.context, text);
    }
}

const States = {
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'gameover',
    MENU: 'menu',
}