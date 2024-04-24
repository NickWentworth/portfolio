// how many times per second to update the dots interval
const FPS = 60;

const NUM_DOTS = 100; // number of dots to render on the canvas
const DOT_SIZE = 4; // size in px of each dot
const DOT_SPEED = 0.5; // max dot speed in px/frame
const LINE_WIDTH = 1; // line width to draw connections between dot
const LINE_DIST = 200; // max size in px to draw a connection between dots

// colors
const BG_COLOR = '#dddddd';
const DOT_COLOR = '#000000';
const LINE_COLOR = '#222222';

/** Return a list of numbers ranging from 0 to n (exclusive) */
const range = (n: number) => Array.from({ length: n }).map((_, idx) => idx);

type Vec2 = {
    x: number;
    y: number;
};

type Dot = {
    pos: Vec2;
    vel: Vec2;
};

/**
 * Draw dots onto the given canvas that bounce around, connected if they are close enough together
 *
 * @returns The interval's id (if created properly)
 */
export function dots(canvas: HTMLCanvasElement) {
    // setup canvas to fill screen
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    // generate dots with random positions and velocities
    const dots: Dot[] = range(NUM_DOTS).map(() => ({
        pos: {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
        },
        vel: {
            // allow velocities to be in the range (-DOT_SPEED, DOT_SPEED)
            x: Math.random() * DOT_SPEED * 2 - DOT_SPEED,
            y: Math.random() * DOT_SPEED * 2 - DOT_SPEED,
        },
    }));

    // resize canvas to fill the background whenever the window is resized
    addEventListener('resize', () => {
        canvas.width = document.body.clientWidth;
        canvas.height = document.body.clientHeight;

        // also draw the frame again to prevent flickering
        drawFrame(canvas, dots);
    });

    // setup an interval to move dots and draw what is needed
    return setInterval(() => {
        updateFrame(canvas, dots);
        drawFrame(canvas, dots);
    }, 1000 / FPS);
}

/** Handles updating the dot positions each frame */
function updateFrame(canvas: HTMLCanvasElement, dots: Dot[]) {
    dots.forEach((dot) => {
        // update dot positions
        dot.pos.x += dot.vel.x;
        dot.pos.y += dot.vel.y;

        // bounce dots off canvas borders
        if (
            (dot.pos.x <= 0 && dot.vel.x < 0) ||
            (dot.pos.x >= canvas.width && dot.vel.x > 0)
        ) {
            dot.vel.x *= -1;
        }

        if (
            (dot.pos.y <= 0 && dot.vel.y < 0) ||
            (dot.pos.y >= canvas.height && dot.vel.y > 0)
        ) {
            dot.vel.y *= -1;
        }
    });
}

/** Handles drawing the dots and their connections each frame */
function drawFrame(canvas: HTMLCanvasElement, dots: Dot[]) {
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        console.error('Unable to get canvas context');
        return;
    }

    // begin with clearing canvas
    ctx.fillStyle = BG_COLOR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < NUM_DOTS; i++) {
        // draw each individual dot
        drawDot(ctx, dots[i]);

        // draw the connections between dots
        for (let j = i + 1; j < NUM_DOTS; j++) {
            drawConnection(ctx, dots[i], dots[j]);
        }
    }
}

/** Helper function to draw a dot onto the given canvas context */
function drawDot(ctx: CanvasRenderingContext2D, dot: Dot) {
    ctx.beginPath();
    ctx.arc(dot.pos.x, dot.pos.y, DOT_SIZE, 0, Math.PI * 2);
    ctx.fillStyle = DOT_COLOR;
    ctx.fill();
}

/** Helper function to draw a line between two dots onto the given canvas context */
function drawConnection(ctx: CanvasRenderingContext2D, a: Dot, b: Dot) {
    const dist = distance(a.pos, b.pos);

    // only draw a connection if the distance is within threshold
    if (dist < LINE_DIST) {
        ctx.beginPath();
        ctx.moveTo(a.pos.x, a.pos.y);
        ctx.lineTo(b.pos.x, b.pos.y);

        // convert distance between points to a 2-digit hex opacity value
        const weight = 1 - dist / LINE_DIST;
        const opacity = Math.floor(weight * 255);
        const hex = opacity.toString(16).padStart(2, '0');

        ctx.strokeStyle = `${LINE_COLOR}${hex}`;
        ctx.lineWidth = LINE_WIDTH;
        ctx.stroke();
    }
}

/** Return distance between two points */
function distance(a: Vec2, b: Vec2): number {
    const diff: Vec2 = {
        x: a.x - b.x,
        y: a.y - b.y,
    };

    return Math.sqrt(diff.x * diff.x + diff.y * diff.y);
}
