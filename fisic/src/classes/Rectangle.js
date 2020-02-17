import {Coordinate} from './Coordinate';

export class Rectangle {
    // arguments: (width [float], height [float], coordinate[Coordinate])
    // or
    // arguments: (width [float], height [float], x [float], y [float])
    constructor() {
        if(arguments.length > 3){
            this.coordinate = arguments[2];
        }else{
            this.coordinate = new Coordinate(arguments[2], arguments[3]);
        }
        this.width = arguments[0];
        this.height = arguments[1];
    }

    equals(object) { 
        if(object === null)
            return false;
        if(object.typeOf() !== this.typeOf())
            return false;
        return(
            this.width === object.width &&
            this.height === object.height &&
            this.coordinate === object.coordinate
        )
    }

    toString() {
        const coordinateString = this.coordinate.toString();
        return `{
            width: ${this.width},
            height: ${this.height},
            coordinate: ${coordinateString}}`;
    }
}