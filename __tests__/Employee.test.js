const Employee = require("../lib/Employee");

it("Should return the Employee name when requested", () => {
  expect(testEmployee.getName()).toBe(Komal);
});

it("Should return the Employee id when requested", () => {
  expect(testEmployee.getId()).toBe(id);
});
