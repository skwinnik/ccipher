import parseArgs from './parse.js';
import validateArgs from './validate.js';
import { actionToShiftSign } from './action.enum.js';

export const getArgs = async argv => {
  const args = parseArgs(argv.slice(2));
  const shift = parseInt(args.s || args.shift);
  const action = args.a || args.action;
  const input = args.i || args.input;
  const output = args.o || args.output;

  const errors = [];

  if (!validateArgs.action(action))
    errors.push('-a/--action is required and accepts "encode" or "decode"\n');

  if (!validateArgs.shift(shift))
    errors.push('-s/--shift is required and accepts non-zero values\n');

  if (!(await validateArgs.input(input)))
    errors.push('-i/--input should be a valid file with read permissions');

  if (!(await validateArgs.output(output)))
    errors.push('-o/--output should be a valid file with write permissions');

  if (errors.length > 0)
    throw new Error(errors.join('\r'));

  return {
    input,
    output,
    shift: shift * actionToShiftSign(action)
  };
};

export default getArgs;