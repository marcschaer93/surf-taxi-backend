/**
 * Converts the keys of a given object from camelCase to snake_case.
 *
 * This function is especially useful when preparing data to be sent to databases or other systems
 * that prefer snake_case naming conventions, such as PostgreSQL. Converting JavaScript object keys
 * from camelCase (JavaScript's convention) to snake_case makes the object keys more consistent
 * with the expected format in these systems.
 *
 *
 * @example
 * // returns { some_key: "value", another_key: 123 }
 * convertKeysToSnakeCase({ someKey: "value", anotherKey: 123 });
 */
const convertKeysToSnakeCase = (obj) => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const snakeCaseObject = {};
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const snakeCaseKey = key.replace(
        /[A-Z]/g,
        (match) => `_${match.toLowerCase()}`
      );
      snakeCaseObject[snakeCaseKey] = obj[key];
    }
  }

  return snakeCaseObject;
};

module.exports = {
  convertKeysToSnakeCase,
};
