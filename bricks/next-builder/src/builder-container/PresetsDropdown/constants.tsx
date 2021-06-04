import { BrickPreset } from "../interfaces";
import { ReactComponent as easyViewClassic } from "./previews/easy-view.classic.svg";
import { ReactComponent as easyView2x2 } from "./previews/easy-view.2x2.svg";
import { ReactComponent as easyView3x3 } from "./previews/easy-view.3x3.svg";

export const BrickPresets: BrickPreset[] = [
  {
    title: "Classic",
    brick: "basic-bricks.easy-view",
    properties: {
      gridTemplateAreas: [
        ["header", "header"],
        ["sidebar", "content"],
        ["footer", "footer"],
      ],
      containerStyle: {
        minHeight:
          "calc(100vh - var(--app-bar-height) - 2 * var(--page-padding))",
        gap: "var(--page-card-gap)",
      },
    },
    preview: easyViewClassic,
  },
  {
    title: "2 x 2",
    brick: "basic-bricks.easy-view",
    properties: {
      gridTemplateAreas: [
        ["topLeft", "topRight"],
        ["bottomLeft", "bottomRight"],
      ],
      containerStyle: {
        gap: "var(--card-content-gap)",
      },
    },
    preview: easyView2x2,
  },
  {
    title: "3 x 3",
    brick: "basic-bricks.easy-view",
    properties: {
      gridTemplateAreas: [
        ["topLeft", "topCenter", "topRight"],
        ["centerLeft", "centerCenter", "centerRight"],
        ["bottomLeft", "bottomCenter", "bottomRight"],
      ],
      containerStyle: {
        gap: "var(--card-content-gap)",
      },
    },
    preview: easyView3x3,
  },
];
