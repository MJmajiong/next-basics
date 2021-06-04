import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dropdown, Menu, Tooltip } from "antd";
import { AppstoreAddOutlined } from "@ant-design/icons";
import { K, NS_NEXT_BUILDER } from "../../i18n/constants";
import { PresetsDropdownMenu } from "./PresetsDropdownMenu/PresetsDropdownMenu";

import shareStyles from "../share.module.css";

export function PresetsDropdown(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const [visible, setVisible] = useState(false);
  const isOpen = useRef(false);

  const handleVisibleChange = useCallback((value: boolean): void => {
    isOpen.current = value;
    setVisible(value);
  }, []);

  const handleDraggingChange = useCallback((isDragging: boolean): void => {
    if (isOpen.current && isDragging) {
      setVisible(false);
    }
  }, []);

  return (
    <Dropdown
      overlay={
        <Menu>
          <PresetsDropdownMenu onDraggingChange={handleDraggingChange} />
        </Menu>
      }
      overlayClassName={shareStyles.customAnimation}
      trigger={["click"]}
      placement="bottomLeft"
      onVisibleChange={handleVisibleChange}
      visible={visible}
    >
      <Tooltip
        title={t(K.BRICK_LIBRARY)}
        placement="bottomRight"
        overlayStyle={{
          // Hide tooltip when dropdown is open.
          display: visible ? "none" : undefined,
        }}
      >
        <a
          className={shareStyles.tabLink}
          role="button"
          data-testid="button-to-open-presets-dropdown"
        >
          <AppstoreAddOutlined />
        </a>
      </Tooltip>
    </Dropdown>
  );
}
