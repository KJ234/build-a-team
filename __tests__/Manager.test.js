const Manager = require("../lib/Manager");

describe("Manager", () => {
  it("should return the name of the manager", () => {
    expect(Manager([1])).toBe("Tayyab");
  });

  it("should return email address", () => {
    expect(Manager).toBe("Tayyab@gmail.com");
  });
});
