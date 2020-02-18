export function Coordinate(_x, _y) {
    const equals = (object) => {        
        if(object === null)
            return false;

        if(object === this)
            return true;        
                
        return(_x === object.x && _y === object.y)
    }

    const toString = () => {
        return `(X: ${_x}, Y: ${_y})`;
    }

    return {
        get x () {return _x},
        get y () {return _y},
        toString,
        equals,
    }
}