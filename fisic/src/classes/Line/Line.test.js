import {Line} from './Line';
import { Coordinate } from '../Coordinate/Coordinate';

const line1 = new Line(new Coordinate(0,0), new Coordinate(1,1), false);
const line2 = new Line(new Coordinate(0,0), new Coordinate(1,1), false);
const line3 = new Line(new Coordinate(1,1), new Coordinate(0,0), false);
const line4 = new Line(new Coordinate(3,2), new Coordinate(1,0), false);
const line5 = new Line(new Coordinate(0,0), new Coordinate(1,1), true);
const line6 = new Line(new Coordinate(-1,-1), new Coordinate(5,5), true);

test("Line slope works", () => {
    expect(line1.slope()).toBe(1);
    expect(line6.slope()).toBe(1);
})

test("Line getY works", () => {
    expect(line1.getY(0)).toBe(0);
})

test("Line equals working", () => {
    //Mesmos pontos
    expect(line1.equals(line2)).toBeTruthy();

    //Ordem invertida de pontos
    expect(line1.equals(line3)).toBeTruthy();

    //Pontos diferentes
    expect(line1.equals(line4)).toBeFalsy();

    //Linhas infinitas
    expect(line5.equals(line6)).toBeTruthy();
})