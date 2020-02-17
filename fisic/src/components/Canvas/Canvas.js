import React, {Component} from 'react';
import './Canvas.css';

import cheese from '../../assets/cheese.jpeg';

export default class Canvas extends Component {
    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");
        const img = this.refs.image;

        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;

            ctx.drawImage(img, 0, 0);
            ctx.font = '40px Courier';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText(this.props.text, canvas.width/2, canvas.height/2);
        }
      }

    render() {
        return (
            <>
                <div>
                    <canvas ref='canvas' width={640} height={425}></canvas>
                    <img ref='image' alt='' src={cheese} className='hidden'/>
                </div>
            </>
        )
    }
}