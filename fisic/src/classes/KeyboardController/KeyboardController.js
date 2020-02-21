export class KeyboardController {
    constructor (){
        this.keyDownhandler = this.keyDownhandler.bind(this);
        this.keyUpHandler = this.keyUpHandler.bind(this);

        document.addEventListener(
            'keydown',
            this.keyDownhandler,
            false,
        );
        document.addEventListener(
            'keyup',
            this.keyUpHandler,
            false,
        );
        document.addEventListener(
            'keypress',
            this.keyPressedHandler,
            false,
        );

        this.rightPressed = false;
        this.leftPressed = false;
        this.upPressed = false;
        this.downPressed = false;
        this.keyPressed = -1;
    }

    keyDownhandler (e){    
        this.keyPressed = e.keyCode;        
        switch(e.keyCode){
            case Keys.RIGHT:
                this.rightPressed = true;
                break;
            case Keys.DOWN:
                this.downPressed = true;
                break;
            case Keys.LEFT:
                this.leftPressed = true;
                break;
            case Keys.UP:
                this.upPressed = true;
                break;
            case Keys.ENTER:
                this.enterPressed = true;
                break;
            default:
                break;
        }
        document.dispatchEvent(new CustomEvent('keyChanged'));
    }

    keyUpHandler (e){        
        switch(e.keyCode){
            case Keys.RIGHT:
                this.rightPressed = false;
                break;
            case Keys.DOWN:
                this.downPressed = false;
                break;
            case Keys.LEFT:
                this.leftPressed = false;
                break;
            case Keys.UP:
                this.upPressed = false;
                break;
            case Keys.ENTER:
                this.enterPressed = false;
                break;
            default:
                break;
        }
    }

    getKeyPressed() {
        const aux = this.keyPressed;
        this.keyPressed = -1;
        return aux;
    }
}

export const Keys = {
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37,
    ENTER: 13,
}