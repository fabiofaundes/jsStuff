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
        return slope*(x-coord1.x) + coord1.y;
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
                object.slope === this.slope &&
                object.getY(0) === this.getY(0)
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

    return{
        get p1 (){return coord1},
        get p2 (){return coord2},
        get endless (){return infinite},
        slope,
        getX,
        getY,
        equals,        
    }
}