const fs = require('fs');
const readline = require('readline');
const Canvas = require('drawille');

const WIDTH = 100, HEIGHT = 100;
const RENDER_THRESHOLD = 120;

const canvas = new Canvas(WIDTH, HEIGHT);

console.clear();

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

start();

const Controls = {
  None: 'Controls.None',
  Up: 'Controls.Up',
  Right: 'Controls.Right',
  Left: 'Controls.Left'
}

let control = Controls.None;

process.stdin.on('keypress', (_, key) => {
  if (key.ctrl && key.name === 'c') {
    console.clear();
    process.exit(0);
  }
  switch (key.name) {
    case "left":
      control = Controls.Left;
      break;
    case "right":
      control = Controls.Right;
      break;
    case "up":
      control = Controls.Up;
      break;
    case "down":
      control = Controls.Down;
      break;
    default:
      control = Controls.None;
      break;
  }
});

async function loadWasm() {
  const wasm = await WebAssembly
    .instantiate(fs.readFileSync('./build/optimized.wasm'), {
      Date,
      env: {
        abort: (_msg, _file, line, column) => console.error(`Abort at ${line}:${column}`),
        seed: Date.now
      }});
    return wasm.instance.exports;
}

async function start() {
  const wasm = await loadWasm();
  wasm.start();
  //console.log(wasm);

  const updateCall = () => update(wasm);
  setInterval(updateCall, 100);
}

function update(wasm) {
    wasm.update(wasm[control]);
    render(wasm.memory.buffer);
    control = Controls.None;
}

function render(buffer) {
  const bytes = new Uint8ClampedArray(buffer);
  canvas.clear();
  
  for (let x = 0; x < WIDTH; x++) {
    for (let y = 0; y < HEIGHT; y++) {
      const i = x * 4 + y * WIDTH * 4;
      const r = bytes[i];
      const g = bytes[i + 1];
      const b = bytes[i + 2];
      const gray = r * 0.2126 + g * 0.7152 + b * 0.0722;

      if (gray > RENDER_THRESHOLD) {
        canvas.set(x, y);
      }
    }
  }
  readline.cursorTo(process.stdout, 0, 0);
  process.stdout.write(canvas.frame());
}