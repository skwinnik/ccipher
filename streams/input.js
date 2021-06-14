import { createReadStream } from 'fs';
export const createInputStream = input => input ?
  createReadStream(input) : process.stdin;
export default createInputStream;