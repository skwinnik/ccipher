import parseArgs from './parseArgs.js';
import validate from './validate.js';
import path from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createCipherStream } from './cipher.js';
import { pipeline } from 'stream';

const args = parseArgs(process.argv.slice(2));
let shift = parseInt(args.s || args.shift || '');
let action = args.a || args.action;
let input = args.i || args.input;
let output = args.o || args.output;

const errors = [];

if (!(await validate.action(action)))
  errors.push('-a/--action is required and accepts "encode" or "decode"\n');

if (!(await validate.shift(shift)))
  errors.push('-s/--shift is required and accepts non-zero values\n');

if (input && !(await validate.input(input)))
  errors.push('-i/--input should be a valid file with read permissions');

if (output && !(await validate.output(output)))
  errors.push('-o/--output should be a valid file with write permissions');

if (errors.length) {
  errors.forEach(e => console.error(e));
  process.exit(1);
}

const shiftSign = action === 'encode' ? 1 : -1;

const inputStream = input ? createReadStream(path.resolve(input)) : process.stdin;
const outputStream = output ? createWriteStream(path.resolve(output)) : process.stdout;

pipeline(
  inputStream,
  createCipherStream(shift * shiftSign),
  outputStream,
  err => { if (err) console.error(err); }
)