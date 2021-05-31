import React from "react";
import { mount } from "enzyme";
import { getColor } from "@next-libs/basic-components";
import { IconDisplay } from "./IconDisplay";

describe("IconDisplay", () => {
  it("should work", () => {
    const wrapper = mount(
      <IconDisplay
        reverseBgColor={false}
        icon={{
          lib: "fa",
          icon: "address-card",
          prefix: "fas",
          color: "#167be0",
        }}
      />
    );
    expect(wrapper.find("GeneralIcon").prop("icon").color).toBe("#167be0");
    expect(wrapper.find(".iconContainer").prop("style").backgroundColor).toBe(
      "#fff"
    );

    wrapper.setProps({
      reverseBgColor: true,
    });
    wrapper.update();
    expect(wrapper.find("GeneralIcon").prop("icon").color).toBe("#fff");
    expect(wrapper.find(".iconContainer").prop("style").backgroundColor).toBe(
      "#167be0"
    );
  });

  it("should work when color in COLORS_MAP", () => {
    const wrapper = mount(
      <IconDisplay
        reverseBgColor={false}
        icon={{
          lib: "fa",
          icon: "address-card",
          prefix: "fas",
          color: "red",
        }}
      />
    );
    expect(wrapper.find("GeneralIcon").prop("icon").color).toBe(
      getColor("red").color
    );
    expect(wrapper.find(".iconContainer").prop("style").backgroundColor).toBe(
      getColor("red").background
    );

    wrapper.setProps({
      reverseBgColor: true,
    });
    wrapper.update();
    expect(wrapper.find("GeneralIcon").prop("icon").color).toBe("#fff");
    expect(wrapper.find(".iconContainer").prop("style").backgroundColor).toBe(
      getColor("red").color
    );
  });
});
