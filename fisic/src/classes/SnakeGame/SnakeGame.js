import {fillRectangle, drawText, strokeRectangle} from '../../components/Canvas/canvasFunctions';

import {Rectangle} from '../Rectangle/Rectangle';
import {Snake} from '../Snake/Snake';
import {KeyboardController, Keys} from '../KeyboardController/KeyboardController';
import { CanvasText } from '../CanvasText/CanvasText';
import { Coordinate } from '../Coordinate/Coordinate';


export class SnakeGame {
    constructor (canvas){   
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.keyboardController = new KeyboardController();
        this.blockWidth = 10;

        this.handleResize = this.handleResize.bind(this);
        this.draw = this.draw.bind(this);
        this.drawBackground = this.drawBackground.bind(this);
        this.menu = this.menu.bind(this);
        this.drawMenu = this.drawMenu.bind(this);
    }
    
    start(){
        this.gameState = States.MENU;
        window.addEventListener('resize', this.handleResize);
        this.updateCanvasSize();
        this.menu();
    }

    menu(){
        this.menuLength = 1;
        this.menuOpt = 1;        
        this.draw();
        document.addEventListener('keyChanged', () => {
            var key = this.keyboardController.getKeyPressed();
            switch(key){
            case Keys.ENTER:                
                this.chooseOption();
                break;
            case Keys.DOWN:
                this.changeMenuOption(true);
                break;
            case Keys.UP:
                this.changeMenuOption(false);
                break; 
            default:
                break;
            }  
        })                                  
    }

    changeMenuOption (shouldIncrease){
        if(shouldIncrease)
            this.menuOpt = this.menuOpt === this.menuLength ? 1 : this.menuOpt + 1;
        else
            this.menuOpt = this.menuOpt === 1 ? this.menuLength : this.menuOpt - 1;
    }

    chooseOption (){
        switch(this.menuOpt){
            case 1:                
                this.playGame();
                break;
            default:
                break;
        }
    }

    playGame(){
        this.gameState = States.RUNNING;        
        this.score = 0;        

        const height = this.canvas.height - 40;
        const width = this.canvas.width;
        
        const qntHBlocks = Math.floor(width/10);
        const qntVBlocks = Math.floor(height/10);
        const midBlock = {
            horizontal: Math.floor(qntHBlocks/2),
            vertical: Math.floor(qntVBlocks/2)
        }
        const midCoord = new Coordinate(
            this.border.width + this.blockWidth*midBlock.horizontal,
            this.border.height + this.blockWidth*midBlock.vertical
        )

        const snake = new Snake(midCoord, 5, this.blockWidth);

        const intervalID = setInterval(() => {
            if(this.gameState === States.RUNNING){

            }
        },200)
    }

    handleResize(){        
        this.updateCanvasSize();
        this.draw();
    }

    updateCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        const height = this.canvas.height - 40;
        const width = this.canvas.width;
        this.border = {
            height: (height % 10)/2,
            width: (width % 10)/2
        };
    }

    draw() {
        this.drawBackground();        

        if(this.gameState === States.MENU)
            this.drawMenu();
        else{
            this.drawScore();
            this.drawMap();
        }
    }

    drawBackground() {
        this.context.fillStyle = "#000000";
        const background = new Rectangle(this.canvas.width, this.canvas.height, 0, 0)
        fillRectangle(this.context, background);
    }
    
    drawMenu() {
        const title = new CanvasText(
            "<Snake_Game/>",
            "90",
            'Arial',
            new Coordinate(
                this.canvas.width/2,
                50),
            "green",
            "center",
            "hanging");
        const opt1 = new CanvasText(
            "Start Game",
            "40",
            'Arial',
            new Coordinate(
                this.canvas.width/2,
                200),
            "white",
            "center",
            "middle"
        );
        drawText(this.context, title);
        drawText(this.context, opt1);
    }

    drawScore (){
        const txtScore = new CanvasText(
            `Score: ${this.score}`,
            30,
            'Arial',
            new Coordinate(5,10),
            'white',
            'start',
            'hanging',
        );
        drawText(this.context, txtScore);
    }

    drawMap (){
        this.context.strokeStyle = 'white';
        const coord = new Coordinate(
            this.border.width-1,
            40 + this.border.height-1
        );
        strokeRectangle(this.context, new Rectangle(
            this.canvas.width - this.border.width*2 + 2,
            this.canvas.height - this.border.height*2 - 40 + 2,            
            coord
        ));
    }
}

const States = {
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'gameover',
    MENU: 'menu',
}