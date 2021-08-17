import Canvas from './Canvas';

const sky: StaticArray<u8> = Inliner.inlineImageAsRGBStaticArray('../assets/sky.png');
const forest: StaticArray<u8> = Inliner.inlineImageAsRGBStaticArray('../assets/forest.png');
const soil: StaticArray<u8> = Inliner.inlineImageAsRGBStaticArray('../assets/soil.png');

export default class Scene {

    private canvas: Canvas;

    constructor(canvas: Canvas) {
        this.canvas = canvas;
    }

    draw(position: i32): void {
        this.drawLayer(sky, 0, 0);
        this.drawLayer(forest, position, 3);
        this.drawLayer(soil, position, 1);
    }

    private drawLayer(image: StaticArray<u8>, offset: i32, speed: i32): void {
        this.canvas.drawBackground(image, speed > 0 ? offset / speed : offset);
    }
}