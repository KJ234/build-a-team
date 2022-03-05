const Engineer = require("../lib/Engineer");

it("Should return github linked account", () => {
  expect(Engineer.getGithub()).toBe(KJ234);
});

it("Should return the Engineer name when requested", () => {
  expect(Engineer.getName()).toBe(Komal);
});
