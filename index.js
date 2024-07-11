

const colorPicker = document.getElementById('tcp');
const BGcolorPicker = document.getElementById('bcp');
const canvas = document.getElementById('mycanvas');
const clearButton = document.getElementById('clrbtn');
const saveButton = document.getElementById('save');
const retrieveButton = document.getElementById('retrieve');
const fontPicker = document.getElementById('fontsize');
const ctx = canvas.getContext('2d');
let isDrawing = false;
let lastX = 0;
let lastY = 0;

function draw(x, y) {
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastX = x;
    lastY = y;
}

// Desktop mouse events
canvas.addEventListener('mousedown', (event) => {
    isDrawing = true;
    lastX = event.offsetX;
    lastY = event.offsetY;
});

canvas.addEventListener('mousemove', (event) => {
    if (isDrawing) {
        draw(event.offsetX, event.offsetY);
    }
});

canvas.addEventListener('mouseup', () => {
    isDrawing = false;
});

canvas.addEventListener('mouseout', () => {
    isDrawing = false;
});

// Mobile touch events
canvas.addEventListener('touchstart', (event) => {
    const touch = event.touches[0];
    isDrawing = true;
    lastX = touch.clientX - canvas.offsetLeft;
    lastY = touch.clientY - canvas.offsetTop;
});

canvas.addEventListener('touchmove', (event) => {
    event.preventDefault();
    if (isDrawing) {
        const touch = event.touches[0];
        draw(touch.clientX - canvas.offsetLeft, touch.clientY - canvas.offsetTop);
    }
});

canvas.addEventListener('touchend', () => {
    isDrawing = false;
});

// General event handlers
colorPicker.addEventListener('change', (event) => {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;
});

BGcolorPicker.addEventListener('change', (event) => {
    ctx.fillStyle = event.target.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
});

fontPicker.addEventListener('change', (event) => {
    ctx.lineWidth = event.target.value;
});

clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

saveButton.addEventListener('click', () => {
    localStorage.setItem('canvasContents', canvas.toDataURL());
    let link = document.createElement('a');
    link.download = 'my-sign.png';
    link.href = canvas.toDataURL();
    link.click();
});

retrieveButton.addEventListener('click', () => {
    let savedCanvas = localStorage.getItem('canvasContents');
    if (savedCanvas) {
        let img = new Image();
        img.src = savedCanvas;
        img.onload = () => {
            ctx.drawImage(img, 0, 0);
        };
    }
});

// Initialization
window.onload = function() {
    document.ontouchmove = function(e){ e.preventDefault(); }

    function clear() {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    clear();
}
