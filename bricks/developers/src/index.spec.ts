import i18next from "i18next";
const spyOnAddResourceBundle = (i18next.addResourceBundle = jest.fn());

const spyOnDefine = jest.spyOn(window.customElements, "define");

jest.mock("./lazy-bricks", () => void 0);

// Use `require` instead of `import` to avoid hoisting.
require("./index");

describe("index", () => {
  it("should add i18n resource bundle", () => {
    expect(spyOnAddResourceBundle).toBeCalled();
  });
  it("should define custom elements", () => {
    expect(spyOnDefine).toBeCalled();
  });
});
