import {Rectangle} from './Rectangle';
import { Coordinate } from '../Coordinate/Coordinate';

const testRect1 = new Rectangle(100, 100, 0, 0);
const testRect2 = new Rectangle(100, 100, new Coordinate(0,0))

const testString = "{width: 100, height: 100, coordinate: (X: 0, Y: 0)}";

test('Rectangles should be equal', () => {
    expect(testRect1.equals(testRect2)).toBe(true);
})

test('Rectangle string OK', () => {
    expect(testRect1.toString()).toEqual(testString);
})