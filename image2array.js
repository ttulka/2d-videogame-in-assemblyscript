const fs = require("fs");
const PNG = require("pngjs").PNG;

const filename = process.argv[2] || "./image.png";

const file = fs.readFileSync(filename);
const png = PNG.sync.read(file);
 
const data = png.data;
// const width = png.width;
// const height = png.height;

process.stdout.write("const image: u8[] = [");

for (let i = 0, l = data.length; i < l; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const a = data[i + 3];
  
  process.stdout.write(`${r}, ${g}, ${b}, ${a}, `);
}

process.stdout.write("];\n");
process.stdout.write("export default image;\n");
