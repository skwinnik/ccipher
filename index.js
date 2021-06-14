import getArgs from './args/get.js';
import { createInputStream } from './streams/input.js';
import { createOutputStream } from './streams/output.js';
import { createCipherStream } from './streams/cipher.js';
import { pipeline } from 'stream';

let args = {};
try {
  args = await getArgs(process.argv);
}
catch (e) {
  console.log('\n');
  console.error(e.message);
  process.exit(1);
}

pipeline(
  createInputStream(args.input),
  createCipherStream(args.shift),
  createOutputStream(args.output),
  err => { if (err) console.error(err); }
)