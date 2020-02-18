import snakeMock from './mock/snakeMock';
import incPosMock from './mock/incPosMock'
import { Snake } from './Snake';
import { Coordinate } from '../Coordinate/Coordinate';

const snake1 = new Snake(new Coordinate(50,50), 5, 5);
const snake2 = new Snake(new Coordinate(50,50), 5, 5);
snake2.incPos();

test('Snake formed correctly',() => {
    expect(JSON.stringify(snake1.body)).toEqual(JSON.stringify(snakeMock));
})

test('Snake incPos correctly', () => {
    expect(JSON.stringify(snake2.body)).not.toEqual(JSON.stringify(snakeMock));
    expect(JSON.stringify(snake2.body)).toEqual(JSON.stringify(incPosMock));
})