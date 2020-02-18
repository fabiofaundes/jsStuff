import {Rectangle} from './Rectangle';
import { Coordinate } from '../Coordinate/Coordinate';

const testRect1 = new Rectangle(100, 100, 0, 0);
const testRect2 = new Rectangle(100, 100, new Coordinate(0,0));

test('Rectangles should be equal', () => {
    expect(testRect1.equals(testRect2)).toBe(true);
})