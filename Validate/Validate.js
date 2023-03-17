const validator = require('validator');

const validate = {
  validateString(str) {
    return str !== '' || 'Enter a valid response!';
  },
  validateSalary(num) {
    if (validator.isDecimal(num)) return true;
    return 'Enter a valid salary!';
  },
  isSame(str1, str2) {
    if (str1 === str2) return true;
  }
};

module.exports = validate;
