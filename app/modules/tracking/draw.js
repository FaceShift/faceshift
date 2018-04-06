function drawPoint(imageDataContext, x, y, r) {
    imageDataContext.beginPath();
    imageDataContext.arc(x, y, r, 0, 2 * Math.PI);
    imageDataContext.stroke();
}

function drawTriangle(imageDataContext, pts) {
    if (pts.length !== 3)
        return;

    imageDataContext.beginPath();
    imageDataContext.moveTo(pts[0].x, pts[0].y);
    imageDataContext.lineTo(pts[1].x, pts[1].y);
    imageDataContext.lineTo(pts[2].x, pts[2].y);
    imageDataContext.closePath();
    imageDataContext.stroke();
}

function drawSquare(imageDataContext, rect) {
    imageDataContext.beginPath();
    imageDataContext.rect(rect.x, rect.y, rect.width, rect.height);
    imageDataContext.stroke();
}

module.exports = {drawPoint, drawTriangle, drawSquare};
