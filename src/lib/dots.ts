// how many times per second to update the dots interval
const FPS = 60;

const DOT_SIZE = 1.5; // size in px of each dot
const DOT_SPEED = 30 / FPS; // max dot speed, relative to fps
const LINE_WIDTH = 0.5; // line width to draw connections between dot
const LINE_DIST = 200; // max size in px to draw a connection between dots

// colors for dots to be drawn as
type DotColors = {
    bg: string;
    dot: string;
    line: string;
};

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
 * @returns The interval's id to pass to `clearInterval`
 */
export function dots(canvas: HTMLCanvasElement, colors: DotColors) {
    // setup canvas to fill screen
    canvas.width = document.body.clientWidth;
    canvas.height = document.body.clientHeight;

    // adjust number of dots based on initial screen size
    const numDots = Math.round((canvas.width * canvas.height) / 10_000);

    // generate dots with random positions and velocities
    const dots: Dot[] = range(numDots).map(() => ({
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
        drawFrame(canvas, dots, colors);
    });

    // setup an interval to move dots and draw what is needed
    return setInterval(() => {
        updateFrame(canvas, dots);
        drawFrame(canvas, dots, colors);
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
function drawFrame(canvas: HTMLCanvasElement, dots: Dot[], colors: DotColors) {
    const ctx = canvas.getContext('2d');
    if (ctx === null) {
        console.error('Unable to get canvas context');
        return;
    }

    // begin with clearing canvas
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw connections between dots first
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            drawConnection(ctx, dots[i], dots[j], colors);
        }
    }

    // then draw each dot on top of connections
    for (let i = 0; i < dots.length; i++) {
        drawDot(ctx, dots[i], colors);
    }
}

/** Helper function to draw a dot onto the given canvas context */
function drawDot(ctx: CanvasRenderingContext2D, dot: Dot, colors: DotColors) {
    ctx.beginPath();
    ctx.arc(dot.pos.x, dot.pos.y, DOT_SIZE, 0, Math.PI * 2);
    ctx.fillStyle = colors.dot;
    ctx.fill();
}

/** Helper function to draw a line between two dots onto the given canvas context */
function drawConnection(
    ctx: CanvasRenderingContext2D,
    a: Dot,
    b: Dot,
    colors: DotColors
) {
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

        ctx.strokeStyle = `${colors.line}${hex}`;
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
