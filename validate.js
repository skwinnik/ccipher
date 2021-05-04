import { R_OK, W_OK } from 'constants';
import { promises as fsPromises } from 'fs';
import path from 'path';

export default {
  async action(val) {
    return val === 'encode' || val === 'decode';
  },
  async shift(val) {
    return val && isFinite(val) && val !== 0;
  },
  async input(val) {
    try {
      await fsPromises.access(val, R_OK);
      return true;
    }
    catch (e) {
      return false;
    }
  },
  async output(val) {
    try {
      await fsPromises.access(path.dirname(val), W_OK);
      await fsPromises.writeFile(path.resolve(val), '');
      return true;
    }
    catch (e) {
      return false;
    }
  }
};