import { Transform } from 'stream';
import shiftChar from '../shiftChar.js';

export default class CipherStream extends Transform {
  constructor(shift) {
    super();
    this.shift = shift;
  }

  _transform(chunk, encoding, callback) {
    this.push(chunk.map(ch => shiftChar(ch, this.shift)));
    callback();
  }

  _flush(callback) {
    callback();
  }
}

export const createCipherStream = shift => new CipherStream(shift);