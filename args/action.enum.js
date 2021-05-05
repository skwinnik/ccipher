export const actionEnum = {
  encode: 'encode',
  decode: 'decode'
};
export const actionToShiftSign = action => actionEnum.encode === action ? 1 : -1;
export default actionEnum;
