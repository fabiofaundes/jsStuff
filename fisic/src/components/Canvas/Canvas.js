import React, {Component} from 'react';
import './Canvas.css';

import {fillRectangle, drawLine} from './canvasFunctions';

import cheese from '../../assets/cheese.jpeg';
import {Rectangle} from '../../classes/Rectangle/Rectangle';
import { Coordinate } from '../../classes/Coordinate/Coordinate';
import { Line } from '../../classes/Line/Line';

export default class Canvas extends Component {    
    componentDidMount() {
        this.canvas = this.refs.canvas;        
        this.updateCanvasSize();

        this.context = this.canvas.getContext("2d");
        this.draw(this.context);
    }
    
    updateCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    draw(context) {
        this.drawBackground(context);
        this.drawLine(context);
    }

    drawBackground(context) {
        this.context.fillStyle = "#000000";
        const background = new Rectangle(this.canvas.width, this.canvas.height, 0, 0)
        fillRectangle(context, background);
    }

    drawLine(context){
        this.context.strokeStyle='#FFFFFF';
        const line = new Line(new Coordinate(40,40), new Coordinate(70,100), true);
        drawLine(context, line);
    }

    render() {
        return (
            <>
                <canvas ref='canvas' width={0} height={0} className='canvas'></canvas>
                <img ref='image' alt='' src={cheese} className='hidden'/>
            </>
        )
    }
}