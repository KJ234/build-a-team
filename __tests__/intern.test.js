const Intern = require("../lib/Intern");

it("Should return previous school ", () => {
  expect(intern.getSchool()).toBe("Dar town Academy");
});

it("Should return the intern name when requested", () => {
  expect(intern.getName()).toBe(intern);
});
