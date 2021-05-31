import { MenuIcon } from "@next-core/brick-types";
import {
  Colors,
  COLORS_MAP,
  GeneralIcon,
  getColor,
} from "@next-libs/basic-components";
import React, { useState, useEffect } from "react";
import style from "./index.module.css";

export interface IconDisplayProps {
  icon: MenuIcon;
  reverseBgColor?: boolean;
  iconContainerStyle?: React.CSSProperties;
  iconStyle?: React.CSSProperties;
}

export function IconDisplay(props: IconDisplayProps): React.ReactElement {
  const { icon, reverseBgColor, iconContainerStyle, iconStyle } = props;
  const [colorStyle, setColorStyle] = useState<React.CSSProperties>(null);

  useEffect(() => {
    if (icon?.color) {
      if (COLORS_MAP[icon.color as Colors]) {
        setColorStyle(
          reverseBgColor
            ? {
                color: "#fff",
                backgroundColor: getColor(icon.color).color,
              }
            : {
                color: getColor(icon.color).color,
                backgroundColor: getColor(icon.color).background,
              }
        );
      } else {
        setColorStyle(
          reverseBgColor
            ? {
                color: "#fff",
                backgroundColor: icon.color,
              }
            : {
                color: icon.color,
                backgroundColor: "#fff",
              }
        );
      }
    }
  }, [icon.color, reverseBgColor]);

  return (
    <div
      className={style.iconContainer}
      style={{
        backgroundColor: colorStyle?.backgroundColor,
        ...iconContainerStyle,
      }}
    >
      <GeneralIcon
        icon={{ ...icon, color: colorStyle?.color }}
        style={iconStyle}
      />
    </div>
  );
}
