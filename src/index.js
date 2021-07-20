const WIDTH = 100, HEIGHT = 100;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

start();

const Controls = {
  None: 'Controls.None',
  Up: 'Controls.Up',
  Right: 'Controls.Right',
  Left: 'Controls.Left'
}

let control = Controls.None;

document.addEventListener('keydown', event => {
  switch (event.key) {
    case "ArrowLeft":
      control = Controls.Left;
      break;
    case "ArrowRight":
      control = Controls.Right;
      break;
    case "ArrowUp":
      control = Controls.Up;
      break;
    case "ArrowDown":
      control = Controls.Down;
      break;
    default:
      control = Controls.None;
      break;
  }
});
document.addEventListener('keyup', event => {
  control = Controls.None;
});

async function loadWasm() {
  const wasm = await WebAssembly
    .instantiateStreaming(fetch('../build/optimized.wasm'), {
      Date,
      env: {
        abort: (_msg, _file, line, column) => console.error(`Abort at ${line}:${column}`),
        seed: () => new Date().getTime()
      }});
    return wasm.instance.exports;
}

async function start() {
  const wasm = await loadWasm();
  wasm.start();
  console.log(wasm)

  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);

  const updateCall = () => { 
    update(wasm, imageData);  
    window.requestAnimationFrame(updateCall);
  }
  window.requestAnimationFrame(updateCall);
}

function update(wasm, imageData) {
    //console.log('update', new Date());
    wasm.update(wasm[control]);

    writeImageData(imageData, wasm.memory.buffer);
}

function writeImageData(imageData, buffer) {
  const bytes = new Uint8ClampedArray(buffer);
  
  for (let i = 0; i < WIDTH * HEIGHT * 4; i++) 
     imageData.data[i] = bytes[i];

  ctx.putImageData(imageData, 0, 0);
}
