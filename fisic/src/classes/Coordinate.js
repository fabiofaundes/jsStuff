export class Coordinate {
    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    equals(object) {
        if(object === null)
            return false;

        if(object.typeOf() !== this.typeOf())
            return false;
        
        return(this.x === object.x && this.y === object.y)
    }

    toString() {
        return `(X: ${this.x}, Y: ${this.y})`;
    }
}