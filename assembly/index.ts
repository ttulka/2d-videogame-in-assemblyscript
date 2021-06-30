import {Game, Controls} from './Game';
import Canvas from './Canvas';
import Scene from './Scene';
import Player from './Player';

const WIDTH = 100, 
      HEIGHT = 100;

const game = new Game(new Canvas(WIDTH, HEIGHT));

function start(): void {
    game.start();
}

function update(control: Controls): void {
    game.update(control);
}

export { Controls, start, update };