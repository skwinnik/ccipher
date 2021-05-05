import { R_OK, W_OK } from 'constants';
import { promises as fsPromises } from 'fs';
import actionEnum from './action.enum.js';

export default {
  action(val) {
    return Object.keys(actionEnum).indexOf(val) > -1;
  },
  shift(val) {
    return val && isFinite(val) && val !== 0;
  },
  async input(path) {
    if (!path) return true;
    try {
      await fsPromises.access(path, R_OK);
      return true;
    }
    catch (e) {
      return false;
    }
  },
  async output(path) {
    if (!path) return true;
    try {
      await fsPromises.access(path, W_OK);
      return true;
    }
    catch (e) {
      return false;
    }
  }
};