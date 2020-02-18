
export function drawLine (canvasContext, line) {
    
}

export function fillRectangle (canvasContext, rectangle){
    console.log(canvasContext)
    debugger;
    canvasContext.fillRect(
        rectangle.coordinate.x,
        rectangle.coordinate.y,
        rectangle.width,
        rectangle.height
    );
}