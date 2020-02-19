import {CollisionDetector} from './CollisionDetector';
import { Line } from '../Line/Line';
import { Coordinate } from '../Coordinate/Coordinate';
import { Rectangle } from '../Rectangle/Rectangle';

const line1 = new Line(new Coordinate(0,0), new Coordinate(1,1), false);
const line2 = new Line(new Coordinate(0,1), new Coordinate(1,0), false);
const line3 = new Line(new Coordinate(0,2), new Coordinate(1,0), true);
const line4 = new Line(new Coordinate(0,-1), new Coordinate(1,0), true);

test('Line collision works', () => {
    expect(new CollisionDetector().lines(line1, line2)).toBeTruthy();
    expect(new CollisionDetector().lines(line1, line3)).toBeTruthy();
    expect(new CollisionDetector().lines(line1, line4)).toBeFalsy();
})

const rect1 = new Rectangle(10, 10, 0, 0);
const rect2 = new Rectangle(3, 3, 2, 2);
const rect3 = new Rectangle(10, 10, 7, 7);

test('Rectangle collision works', () => {
    expect(CollisionDetector().rectangles(rect1, rect2)).toBeTruthy();
    expect(CollisionDetector().rectangles(rect1, rect3)).toBeTruthy();
    expect(CollisionDetector().rectangles(rect2, rect3)).toBeFalsy();
})