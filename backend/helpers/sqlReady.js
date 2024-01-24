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

  // Other helper functions related to PostgreSQL service can be added here
};
