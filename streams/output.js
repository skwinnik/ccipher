import { createWriteStream } from 'fs';
export const createOutputStream = output => output ?
  createWriteStream(output, { flags: 'a' }) : process.stdout;
export default createOutputStream;