import React from "react";
import { shallow } from "enzyme";
import { ContextItemFormModal } from "./ContextItemFormModal";
import { Modal } from "antd";

import i18next from "i18next";
import { K } from "../../i18n/constants";

jest.mock("./ContextItemForm", () => ({
  ContextItemForm: function MockContextItemForm() {
    return <div>form</div>;
  },
}));

describe("ContextItemFormModal", () => {
  it("should work", () => {
    const onContextItemUpdate = jest.fn();
    const handleOk = jest.fn();
    const handleCancel = jest.fn();
    const settingItemForm = {
      resetFields: jest.fn(),
    };
    const wrapper = shallow(
      <ContextItemFormModal
        data={{
          name: "data-a",
          resolve: {
            useProvider: "provider-a",
            args: ["args1"],
            if: false,
            transform: {
              value: "<% DATA %>",
            },
          },
        }}
        brickList={[
          {
            type: "brick",
            name: "brick-a",
          },
          {
            type: "provider",
            name: "provider-a",
          },
          {
            type: "provider",
            name: "provider-b",
          },
        ]}
        onContextItemUpdate={onContextItemUpdate}
        settingItemForm={settingItemForm}
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
      />
    );
    expect(wrapper.find(Modal).prop("title")).toBe(
      `${i18next.t(K.SETTINGS)} - data-a`
    );

    wrapper.setProps({
      data: undefined,
    });
    expect(wrapper.find(Modal).prop("title")).toBe(i18next.t(K.ADD_DATA));
  });
});
