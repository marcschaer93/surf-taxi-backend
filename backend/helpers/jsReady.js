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

module.exports = {
  convertKeysToCamelCase,

  // Other helper functions related to PostgreSQL service can be added here
};
