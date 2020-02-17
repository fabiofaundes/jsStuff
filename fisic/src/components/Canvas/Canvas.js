import React, {Component} from 'react';
import './Canvas.css';

import {fillRectangle} from './canvasFunctions';

import cheese from '../../assets/cheese.jpeg';
import {Rectangle} from '../../classes/Rectangle';

export default class Canvas extends Component {    
    componentDidMount() {
        this.canvas = this.refs.canvas;        
        this.updateCanvasSize();

        this.context = this.canvas.getContext("2d");
        this.draw();
    }
    
    updateCanvasSize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    draw() {
        this.drawBackground();
    }

    drawBackground(color) {
        this.context.fillStyle = "#000000";
        const background = new Rectangle(this.canvas.width, this.canvas.height, 0, 0)
        fillRectangle(this.context, background);
    }

    render() {
        return (
            <>
                <canvas ref='canvas' width={0} height={0}></canvas>
                <img ref='image' alt='' src={cheese} className='hidden'/>
            </>
        )
    }
}