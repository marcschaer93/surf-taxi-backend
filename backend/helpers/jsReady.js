/**
 * Converts the keys of a given object from snake_case to camelCase.
 *
 * This function is particularly useful when working with data from sources like PostgreSQL,
 * where identifiers are often in snake_case format. By converting these identifiers to camelCase,
 * the resulting object keys become more consistent with JavaScript's naming conventions.
 *
 * @example
 * // returns { someKey: "value", anotherKey: 123 }
 * convertKeysToCamelCase({ some_key: "value", another_key: 123 });
 */
const convertKeysToCamelCase = (obj) => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const camelCaseObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
        letter.toUpperCase()
      );
      camelCaseObj[camelCaseKey] = obj[key];
    }
  }
  return camelCaseObj;
};

module.exports = { convertKeysToCamelCase };
