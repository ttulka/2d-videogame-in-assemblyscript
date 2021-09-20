const WIDTH = 100, HEIGHT = 100, SIZE = WIDTH * HEIGHT;

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
}
});

async function loadWasm() {
  const wasm = await WebAssembly
    .instantiateStreaming(fetch('../build/optimized.wasm'), {
      env: {
        abort: (_msg, _file, line, column) => console.error(`Abort at ${line}:${column}`),
        seed: Date.now
      }});
    return wasm.instance.exports;
}

async function start() {
  const wasm = await loadWasm();
  wasm.start();
  console.log(wasm)

  const mem = new Uint32Array(wasm.memory.buffer);  // 32bit => 8bit color * 4 (RGBA)
  
  const imageData = ctx.createImageData(WIDTH, HEIGHT);
  const argb = new Uint32Array(imageData.data.buffer);

  const updateCall = () => update(wasm, mem, imageData, argb);  
  setInterval(updateCall, 150);
}

function update(wasm, mem, imageData, argb) {
    wasm.update(wasm[control]);
    control = Controls.None;    // reset controls    
    
    argb.set(mem.subarray(0, SIZE));    // copy output to image buffer
    ctx.putImageData(imageData, 0, 0);  // apply image buffer
}
