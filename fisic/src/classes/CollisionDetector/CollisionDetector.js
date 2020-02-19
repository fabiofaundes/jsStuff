import { Coordinate } from "../Coordinate/Coordinate";

export function CollisionDetector (){
    const rectangles = (rect1, rect2) => {
        if(rect1.equals(rect2)){
            return true;
        }
        
        if(rect1.coordinate.x > rect2.coordinate.x + rect2.width){
            return false;
        }            

        if(rect2.coordinate.x > rect1.coordinate.x + rect1.width){
            return false;
        }            
        
        if(rect1.coordinate.y > rect2.coordinate.y + rect2.height){
            return false;
        }            

        if(rect2.coordinate.y > rect1.coordinate.y + rect1.height){
            return false;
        }

        return true;
    }
    
    const lines = (line1, line2) => {
        if(line1.equals(line2))
            return true;
        
        if(line1.slope() === line2.slope())
            return false;
        
        if(line1.endless && line2.endless)
            return true;

        //y=m(x-xo)+yo
        //y=m1(x-x1)+y1
        //m(x-xo)+yo=m1(x-x1)+y1
        //mx-mxo+yo=m1x-m1x1+y1
        //mx-m1x-mxo+yo=-m1x1+y1
        //x(m-m1)=-m1x1+y1+mxo-yo
        //x=(-m1x1+y1+mxo-yo)/(m-m1)
        const m1 = line2.slope();
        const x1 = line2.p1.x;
        const y1 = line2.p1.y;
        const xo = line1.p1.x;
        const m = line1.slope();
        const yo = line1.p1.y;
        const intersecX = (-1*m1*x1 + y1 + m*xo -yo)/(m-m1);
        const intersec = new Coordinate(intersecX, line1.getY(intersecX));

        if(line1.endless){
            if(intersecX > line2.biggestX || intersec < line2.lowestX)
                return false;

            if(intersec.y > line2.biggestY || intersec.y < line2.lowestY)
                return false;
        }

        if(intersecX > line1.biggestX || intersec < line1.lowestX)
                return false;

        return !(intersec.y > line2.biggestY || intersec.y < line2.lowestY);

    }

    return {
        rectangles,
        lines,
    }
}