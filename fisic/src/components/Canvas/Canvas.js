import React, {Component} from 'react';
import './Canvas.css';

import { SnakeGame } from '../../classes/SnakeGame/SnakeGame';

export default class Canvas extends Component {        
    componentDidMount (){
        this.canvas = this.refs.canvas;                
        this.snakeGame = new SnakeGame(this.canvas);
    }

    render() {
        return (
            <>
                <canvas ref='canvas' width={0} height={0} className='canvas'></canvas>                
            </>
        )
    }
}