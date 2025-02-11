const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
let shapes = [];
const colors = ['rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.6)'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createShape() {
    return {
        x: Math.random() * canvas.width,
        y: -10,
        size: Math.random() * 20 + 10,
        speed: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
        type: Math.random() > 0.5 ? 'circle' : 'square'
    };
}

function updateShapes() {
    shapes.forEach(shape => shape.y += shape.speed);
    shapes = shapes.filter(shape => shape.y < canvas.height);
}

function drawShapes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    shapes.forEach(shape => {
        ctx.fillStyle = shape.color;
        if (shape.type === 'circle') {
            ctx.beginPath();
            ctx.arc(shape.x, shape.y, shape.size / 2, 0, Math.PI * 2);
            ctx.fill();
        } else {
            ctx.fillRect(shape.x, shape.y, shape.size, shape.size);
        }
    });
}

function animate() {
    updateShapes();
    drawShapes();
    if (Math.random() < 0.02) shapes.push(createShape());
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animate();