const sqlReady = require("../sqlReady");

const testObject = {
  username: "marcschaer",
  first_name: "marc",
  last_name: "schaer",
  email: "marc.schaer93@gmail.com",
  gender: "male",
  birth_year: 1993,
  phone: "+41798490968",
  country: "switzerland",
  languages: ["german", "english", "french"],
  profile_img_url: "google.com",
  bio: "surfer",
  role: "user",
};

describe("Method to convert Keys to snake_case", function () {
  test("converts camelCase keys to snake_case keys", async function () {
    const result = sqlReady.convertKeysToSnakeCase(testObject);

    expect(result.first_name).toEqual("marc");
    expect(result.last_name).toEqual("schaer");
    expect(result.gender).toEqual("male");
    expect(result.profile_img_url).toEqual("google.com");
  });

  test("handles empty object", async function () {
    const result = sqlReady.convertKeysToSnakeCase({});
    expect(result).toEqual({});
  });

  test("handles null input", async function () {
    const result = sqlReady.convertKeysToSnakeCase(null);
    expect(result).toEqual(null);
  });
});
