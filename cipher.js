import { join } from 'path';
import { Transform } from 'stream';

const getCode = ch => ch.charCodeAt(0);

const A_code = getCode('A');
const Z_code = getCode('Z');
const a_code = getCode('a');
const z_code = getCode('z');

function shift(code, shift) {
  const isCapital = (A_code <= code && code <= Z_code);
  const isLetter = isCapital ||
    (a_code <= code && code <= z_code);
  if (!isLetter) return code;

  const min = isCapital ? A_code : a_code;
  const max = isCapital ? Z_code : z_code;

  shift = shift % (max - min + 1);

  let result = code + shift;
  if (result > max)
    result = min + result - max - 1;

  if (result < min)
    result = max + (result - min) + 1;

  return result;
}

export default class CipherStream extends Transform {
  constructor(shift) {
    super();

    this.shift = shift;
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.map(ch => shift(ch, this.shift)));
    callback();
  }

  _flush(callback) {
    callback();
  }
}

export const createCipherStream = shift => new CipherStream(shift);