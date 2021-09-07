const fs = require('fs');

const WIDTH = 100, HEIGHT = 100;

start();

const Controls = {
  None: 'Controls.None',
  Up: 'Controls.Up',
  Right: 'Controls.Right',
  Left: 'Controls.Left'
}

let control = Controls.None;

// document.addEventListener('keydown', event => {
//   switch (event.key) {
//     case "ArrowLeft":
//       control = Controls.Left;
//       break;
//     case "ArrowRight":
//       control = Controls.Right;
//       break;
//     case "ArrowUp":
//       control = Controls.Up;
//       break;
//     case "ArrowDown":
//       control = Controls.Down;
//       break;
//     default:
//       control = Controls.None;
//       break;
//   }
// });
// document.addEventListener('keyup', event => {
//   control = Controls.None;
// });

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
  console.log(wasm);

  const updateCall = () => update(wasm);
  //setInterval(updateCall, 500);
}

function update(wasm) {
    wasm.update(wasm[control]);
    render(wasm.memory.buffer);
}

function render(buffer) {
  const bytes = new Uint8ClampedArray(buffer);
  
  for (let i = 0; i < WIDTH * HEIGHT * 4; i++) {
    // TODO render bytes[i];
  }
}
