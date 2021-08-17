import Canvas from './Canvas';

const digits = [
    Inliner.inlineImageAsRGBStaticArray('../assets/digit0.png'),
    Inliner.inlineImageAsRGBStaticArray('../assets/digit1.png'),
    Inliner.inlineImageAsRGBStaticArray('../assets/digit2.png'),
    Inliner.inlineImageAsRGBStaticArray('../assets/digit3.png'),
    Inliner.inlineImageAsRGBStaticArray('../assets/digit4.png'),
    Inliner.inlineImageAsRGBStaticArray('../assets/digit5.png'),
    Inliner.inlineImageAsRGBStaticArray('../assets/digit6.png'),
    Inliner.inlineImageAsRGBStaticArray('../assets/digit7.png'),
    Inliner.inlineImageAsRGBStaticArray('../assets/digit8.png'),
    Inliner.inlineImageAsRGBStaticArray('../assets/digit9.png')
];

const WIDTH = 12,
    HEIGHT = 14;

export default class Score {
    
    private canvas: Canvas;
    private positionX: i32;
    private positionY: i32;

    private amount: i32;

    constructor(canvas: Canvas, positionX: i32, positionY: i32) {
        this.canvas = canvas;
        this.positionX = positionX;
        this.positionY = positionY;
    }

    increment(): void {
        this.amount++;
    }

    draw(): void {
        let i = this.amount;
        let pos = this.positionX - WIDTH;
        do {
            const d = i % 10;
            i = i / 10;
            this.canvas.drawImage(digits[d], pos, this.positionY - HEIGHT, WIDTH, HEIGHT);
            pos -= WIDTH;
        } while (i > 0);
    }
}