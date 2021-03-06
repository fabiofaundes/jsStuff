export function fillRectangle (canvasContext, rectangle){    
    canvasContext.fillRect(
        rectangle.coordinate.x,
        rectangle.coordinate.y,
        rectangle.width,
        rectangle.height
    );
}

export function strokeRectangle (canvasContext, rectangle){
    canvasContext.rect(rectangle.coordinate.x,
        rectangle.coordinate.y,
        rectangle.width,
        rectangle.height);
    canvasContext.stroke();
}

export function drawLine(canvasContext, line){
    if(line.endless){
        const height = canvasContext.canvas.clientHeight;

        const initX = line.getX(0);
        const finalX = line.getX(height);

        canvasContext.moveTo(initX, 0);
        canvasContext.lineTo(finalX, height);
        canvasContext.stroke();

    } else {
        canvasContext.moveTo(line.p1.x, line.p1.y);
        canvasContext.lineTo(line.p2.x, line.p2.y);
        canvasContext.stroke();
    }
}

export function drawText(canvasContext, text){
    const font = `${text.size}px ${text.family}`;
    canvasContext.font = font;    
    canvasContext.fillStyle = text.color;
    canvasContext.textAlign = text.align;
    canvasContext.textBaseline = text.baseLine;
    canvasContext.fillText(
        text.content,
        text.coordinate.x,
        text.coordinate.y);
}