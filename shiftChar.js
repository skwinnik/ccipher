export default (code, shift) => {
  const isCapital = withinRange(code, A_code, Z_code);
  const isLetter = isCapital || withinRange(code, a_code, z_code);
  if (!isLetter) return code;

  const { min, max } = getRange(isCapital);
  shift = shift % (max - min + 1);
  return modByRange(code + shift, min, max);
}

const getCode = ch => ch.charCodeAt(0);
const withinRange = (val, min, max) => min <= val && val <= max;
const getRange = isCapital =>
  ({ min: isCapital ? A_code : a_code, max: isCapital ? Z_code : z_code });

const modByRange = (val, min, max) => {
  if (val > max) return val % max + min - 1;
  if (val < min) return max - min % val + 1;
  return val;
};

const A_code = getCode('A');
const Z_code = getCode('Z');
const a_code = getCode('a');
const z_code = getCode('z');