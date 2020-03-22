
/**
 * @function validateHasFields: Check which fields, if any, are missing in an array
 * @param {*} expectedFields: The fields expected by the API
 * @param {*} actualFields: The fields sent in the request.body
 * @returns {Array} fieldsNotFound: The fields not found, if any.
 */
const validateHasFields = (expectedFields, actualFields) => {
  const fieldsNotFound = [];
  while (expectedFields.length > 0) {
    fieldToValidate = expectedFields.pop();
    if (!actualFields.includes(fieldToValidate)) {
      fieldsNotFound.push(fieldToValidate);
    }
  }
  return fieldsNotFound;
}

/**
 * @function formatFieldsString: Create a string using the fields in an array
 * @param {*} fields: An array of fields
 * @returns {String}: The fields joined or returned directly (if only one)
 */
const formatFieldString = fields => {
  // Work around empty array
  if (fields.length < 1) return '';
  
  // If the length is one, use singular, else plural
  if (fields.length === 1) {
    return fields[0];
  } else if (fields.length === 2) {
    fields[fields.length - 1] = 'and ' + fields[fields.length - 1];
    return fields.join(' ');
  } else {
    fields[fields.length - 1] = 'and ' + fields[fields.length - 1];
    return fields.join(', ');
  }
}

module.exports = { validateHasFields, formatFieldString };
