import React, {Component} from 'react';
import './Canvas.css';

import {fillRectangle, drawLine} from './canvasFunctions';

import {Rectangle} from '../../classes/Rectangle/Rectangle';
import { Coordinate } from '../../classes/Coordinate/Coordinate';
import { Line } from '../../classes/Line/Line';
import { CollisionDetector } from '../../classes/CollisionDetector/CollisionDetector';

export default class Canvas extends Component {    
    constructor(){
        super();
        this.handleResize = this.handleResize.bind(this);
    }

    updateCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    draw() {
        this.drawBackground();
        this.drawLines();
    }

    drawBackground() {
        this.context.fillStyle = "#000000";
        const background = new Rectangle(this.canvas.width, this.canvas.height, 0, 0)
        fillRectangle(this.context, background);
    }

    drawLines(){
        const line1 = new Line(new Coordinate(40,40), new Coordinate(70,100), true);
        const line2 = new Line(new Coordinate(30,50), new Coordinate(80,110), false);
        this.context.strokeStyle =
            CollisionDetector().lines(line1, line2) ?
            "#FF0000" :
            "#FFFFFF";

        drawLine(this.context, line1);
        drawLine(this.context, line2);
    }

    handleResize(){
        this.updateCanvasSize();
        this.draw();
    }

    componentDidMount (){
        this.canvas = this.refs.canvas;        
        this.updateCanvasSize();

        this.context = this.canvas.getContext("2d");
        this.draw();
        window.addEventListener('resize', () => this.handleResize);
    }

    render() {
        return (
            <>
                <canvas ref='canvas' width={0} height={0} className='canvas'></canvas>                
            </>
        )
    }
}