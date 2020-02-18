import {Coordinate} from './Coordinate';

const testCord1 = new Coordinate(0,0);
const testCord2 = new Coordinate(0,0);
const testCord3 = new Coordinate(1,0);

const testString = "(X: 0, Y: 0)";

test('Coordinates should be equal', () => {
    expect(testCord1.equals(testCord2)).toBeTruthy();
})

test('Coordinates should be different', () => {
    expect(testCord1.equals(testCord3)).toBeFalsy();
})

test('Coordinate to string', () => {
    expect(testCord1.toString()).toEqual(testString);
})

test('Coordinate can\'t be changed', () => {
    
})