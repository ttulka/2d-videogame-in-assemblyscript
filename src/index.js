const WIDTH = 100, HEIGHT = 100;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;

start();

const Controls = {
  None: 0,
  Up: 1,
  Left: 2,
  Right: 3,
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
}
});

async function loadWasm() {
  const wasm = await WebAssembly
    .instantiateStreaming(fetch('../build/optimized.wasm'), {
      env: {
        abort: (_msg, _file, line, column) => console.error(`Abort at ${line}:${column}`),
        seed: () => new Date().getTime()
      }});
    return wasm.instance.exports;
}

async function start() {
  const wasm = await loadWasm();
  wasm.start();

  const imageData = ctx.getImageData(0, 0, WIDTH, HEIGHT);

  const renderCall = () => writeImageData(imageData, wasm.memory.buffer);
  const updateCall = () => update(wasm, renderCall);
  
  setInterval(updateCall, 150);
}

function update(wasm, render) {
    //console.log('update', new Date())

    wasm.update(control);    
    
    control = Controls.None;

    render();
}

function writeImageData(imageData, buffer) {
  const bytes = new Uint8ClampedArray(buffer);
  //console.log('bytes length', bytes.length);
  //console.log('data', bytes[0], bytes[1], bytes[2], bytes[3]);
  const data = imageData.data;
  for (let i = 0; i < WIDTH * HEIGHT * 4; i++) 
     data[i] = bytes[i];

  ctx.putImageData(imageData, 0, 0);
}
