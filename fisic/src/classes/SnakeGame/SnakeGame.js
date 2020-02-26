import {fillRectangle, drawText, strokeRectangle} from '../../components/Canvas/canvasFunctions';

import {Rectangle} from '../Rectangle/Rectangle';
import {Snake, Directions} from '../Snake/Snake';
import {KeyboardController, Keys} from '../KeyboardController/KeyboardController';
import { CanvasText } from '../CanvasText/CanvasText';
import { Coordinate } from '../Coordinate/Coordinate';
import {CollisionDetector} from '../CollisionDetector/CollisionDetector';


export class SnakeGame {
    constructor (canvas){   
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
        this.keyboardController = new KeyboardController();
        this.blockWidth = 15;

        this.handleResize = this.handleResize.bind(this);
        this.draw = this.draw.bind(this);
        this.drawBackground = this.drawBackground.bind(this);
        this.menu = this.menu.bind(this);
        this.drawMenu = this.drawMenu.bind(this);
        this.menuKeys = this.menuKeys.bind(this);
        this.gameKeys = this.gameKeys.bind(this);
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
        document.addEventListener('keyChanged', this.menuKeys);
    }

    menuKeys (){
        var key = this.keyboardController.getKeyPressed();        
        switch(key){
        case Keys.ENTER:        
            document.removeEventListener('keyChanged', this.menuKeys)
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
        
        const qntHBlocks = Math.floor(width/(this.blockWidth+1));
        const qntVBlocks = Math.floor(height/(this.blockWidth+1));
        const midBlock = {
            horizontal: Math.floor(qntHBlocks/2),
            vertical: Math.floor(qntVBlocks/2)
        }
        const midCoord = new Coordinate(
            this.border.width + (this.blockWidth+1)*midBlock.horizontal,
            this.border.height + (this.blockWidth+1)*midBlock.vertical
        )
        console.log(midCoord);

        this.snake = new Snake(midCoord, 5, this.blockWidth);
        this.directionChanged = true;
        document.addEventListener('keyChanged', this.gameKeys);

        const intervalID = setInterval(() => {
            if(this.gameState === States.RUNNING){                
                this.snake.incPos();
                this.directionChanged = true;                                
                this.checkCollisons();
                this.shouldPaintPause = true;
                this.draw();
            }else if(this.gameState === States.PAUSED){
                this.pause();
            }else if(this.gameState === States.GAME_OVER)
                clearInterval(intervalID);
        },100)
    }

    gameKeys (){
        const key = this.keyboardController.getKeyPressed(); 
        if(this.gameState === States.RUNNING)       
            if(this.directionChanged){
                switch(key){
                    case Keys.RIGHT:
                        if(this.snake.direction !== Directions.LEFT)
                            this.snake.direction = Directions.RIGHT;
                        break;
                    case Keys.DOWN:
                        if(this.snake.direction !== Directions.UP)
                            this.snake.direction = Directions.DOWN;
                        break;
                    case Keys.LEFT:
                        if(this.snake.direction !== Directions.RIGHT)
                            this.snake.direction = Directions.LEFT;
                        break;
                    case Keys.UP:
                        if(this.snake.direction !== Directions.DOWN)
                            this.snake.direction = Directions.UP;
                        break;
                    default:
                        break;
                }
                this.directionChanged = false;
            }

        if(key === Keys.ENTER)
            this.gameState =
            this.gameState === States.RUNNING ?
            States.PAUSED :
            States.RUNNING;
    }

    checkCollisons() {
        for(var i = 1; i < this.snake.body.length; i++)
            if(CollisionDetector().rectangles(this.snake.body[0],this.snake.body[i]))
                this.gameOver();        
        
        if(this.snake.body[0].coordinate.y > this.canvas.height - this.border.height)
            this.gameOver();

        if(this.snake.body[0].coordinate.x > this.canvas.width - this.border.height)
            this.gameOver();

        if(this.snake.body[0].coordinate.y < 40 + this.border.height)
            this.gameOver();
        
        if(this.snake.body[0].coordinate.x < this.border.height)
            this.gameOver();
    }

    pause (){
        if(this.shouldPaintPause){
            this.draw();
            this.shouldPaintPause = false;
        }            
    }

    gameOver (){
        this.gameState = States.GAME_OVER;        
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

        const height = this.canvas.height - 40;
        const width = this.canvas.width;
        this.border = {
            height: (height % (this.blockWidth+1))/2,
            width: (width % (this.blockWidth+1))/2
        };
    }

    draw() {             
        if(this.gameState === States.MENU){
            this.drawBackground();   
            this.drawMenu();
        }            
        
        if(this.gameState === States.RUNNING){
            this.drawBackground()
            this.drawMap();
            this.drawSnake();
            this.drawScore();
        }

        if(this.gameState === States.PAUSED){
            this.drawPaused();
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

    drawSnake (){
        this.context.fillStyle = 'white';
        for(var i=0; i < this.snake.body.length; i++)
            fillRectangle(this.context, this.snake.body[i]);
    }

    drawPaused (){
        const paused = new CanvasText(
            'PAUSED',
            40,
            'Arial',
            new Coordinate(
                this.canvas.width/2,
                this.canvas.height/2
            ),
            'white',
            'center',
            'middle',
        )
        drawText(this.context, paused);
    }
}

const States = {
    RUNNING: 'running',
    PAUSED: 'paused',
    GAME_OVER: 'gameover',
    MENU: 'menu',
}