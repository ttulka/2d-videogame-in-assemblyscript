import Canvas from './Canvas';

const digits = [
    Inliner.inlineImageAsRgbaStaticArray('../assets/digit0.png'),
    Inliner.inlineImageAsRgbaStaticArray('../assets/digit1.png'),
    Inliner.inlineImageAsRgbaStaticArray('../assets/digit2.png'),
    Inliner.inlineImageAsRgbaStaticArray('../assets/digit3.png'),
    Inliner.inlineImageAsRgbaStaticArray('../assets/digit4.png'),
    Inliner.inlineImageAsRgbaStaticArray('../assets/digit5.png'),
    Inliner.inlineImageAsRgbaStaticArray('../assets/digit6.png'),
    Inliner.inlineImageAsRgbaStaticArray('../assets/digit7.png'),
    Inliner.inlineImageAsRgbaStaticArray('../assets/digit8.png'),
    Inliner.inlineImageAsRgbaStaticArray('../assets/digit9.png')
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