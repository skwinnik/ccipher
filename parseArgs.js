export default argv => {
  const retVal = {};
  while(argv.length > 0) {
    const argName = argv.splice(0, 1)[0];
    const val = argv.splice(0, 1)[0];
    retVal[removeLeadingDash(argName)] = val == null ? true : val;
  }
  return retVal;
};

const removeLeadingDash = str => str.replace(/-+/g, '');