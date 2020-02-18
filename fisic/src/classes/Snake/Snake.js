import {Rectangle} from '../Rectangle/Rectangle';
import { Coordinate } from '../Coordinate/Coordinate';

export class Snake {
    constructor(headCoordinate, length, width){
        var body = [];
        for(var i = 0; i < length; i++){
            var coordinate = new Coordinate(headCoordinate.x - width*i, headCoordinate.y)
            body[i] = new Rectangle(width, width, coordinate);
        }

        this.body = body;
        this.length = length;
        this.width = width;
        this.direction = Directions.RIGHT;
    }

    incPos(){
        var i = this.length-1
        for(i; i > 0; i--){                 
            this.body[i].coordinate = this.body[i-1].coordinate;            
        }

        var newX;
        var newY;
        switch(this.direction){                    
            case Directions.UP:
                newX = this.body[0].coordinate.x;
                newY = this.body[0].coordinate.y-this.width;
                break;
            case Directions.RIGHT:
                newX = this.body[0].coordinate.x+this.width;
                newY = this.body[0].coordinate.y;
                break;
            case Directions.DOWN:
                newX = this.body[0].coordinate.x;
                newY = this.body[0].coordinate.y+this.width;
                break;
            case Directions.LEFT:
                newX = this.body[0].coordinate.x-this.width;
                newY = this.body[0].coordinate.y;
                break;
            default:
                break;
        }
        this.body[0].coordinate = new Coordinate(newX, newY);
    }
}

export const Directions = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3,
}