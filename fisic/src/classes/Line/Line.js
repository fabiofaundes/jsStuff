export function Line(coord1, coord2, infinite) {
    const slope = () => {
        return (coord1.y - coord2.y)/(coord1.x - coord2.x);
    }

    //y-yo = m(x-xo)
    //(y-yo)/m = x-xo
    //x =(y-yo)/m + xo 
    const getX = (y) => {
        return (y-coord1.y)/slope() + coord1.x;
    }

    //y-yo=m(x-xo)
    //y=m(x-xo)+yo
    const getY = (x) => {
        return slope()*(x-coord1.x) + coord1.y;
    }

    const equals = (object) => {
        if(object === null)
            return false;

        if(object === this)
            return true;

        if(object.endless !== infinite)
            return false;

        if(infinite)
            return(
                object.slope() === slope() &&
                object.getY(0) === getY(0)
            );

        return(
            (
                object.p1.equals(coord1) &&
                object.p2.equals(coord2)
            ) || (
                object.p1.equals(coord2) &&
                object.p2.equals(coord1)
            )
        )
    }

    if(infinite)
        return {
            get p1 (){return coord1},
            get p2 (){return coord2},
            get endless (){return infinite},
            slope,
            getX,
            getY,
            equals,
        }

    var biggestX;
    var biggestY;
    var lowestX;
    var lowestY;

    if(coord1.x > coord2.x){
        biggestX = coord1.x;
        lowestX = coord2.x;
    } else {
        biggestX = coord2.x;
        lowestX = coord1.x;
    }

    if(coord1.y > coord2.y){
        biggestY = coord1.y;
        lowestY = coord2.y;
    } else {
        biggestY = coord2.y;
        lowestY = coord1.y;
    }

    return {
        get p1 (){return coord1},
        get p2 (){return coord2},
        get endless (){return infinite},
        slope,
        getX,
        getY,
        equals,
        biggestX,
        lowestX,
        biggestY,
        lowestY,
    }
}