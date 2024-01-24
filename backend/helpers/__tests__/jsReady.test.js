const jsReady = require("../jsReady");
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

describe("Method to convert Keys to camelCase", function () {
  test("converts snake_case keys to camelCase keys", async function () {
    const result = jsReady.convertKeysToCamelCase(testObject);

    expect(result.firstName).toEqual("marc");
    expect(result.lastName).toEqual("schaer");
    expect(result.gender).toEqual("male");
    expect(result.profileImgUrl).toEqual("google.com");
  });

  test("handles empty object", async function () {
    const result = jsReady.convertKeysToCamelCase({});
    expect(result).toEqual({});
  });

  test("handles null input", async function () {
    const result = jsReady.convertKeysToCamelCase(null);
    expect(result).toEqual(null);
  });
});
