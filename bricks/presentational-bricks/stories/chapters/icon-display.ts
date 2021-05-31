import { Story } from "@next-core/brick-types";

export const IconDisplayStory: Story = {
  storyId: "presentational-bricks.icon-display",
  category: "other",
  type: "brick",
  author: "nlicroshan",
  text: {
    en: "icon display",
    zh: "图标展示构件",
  },
  description: {
    en: "icon display",
    zh: "用于展示图标",
  },
  icon: {
    lib: "fa",
    icon: "icons",
    prefix: "fas",
  },
  conf: [
    {
      brick: "presentational-bricks.icon-display",
      properties: {
        icon: {
          lib: "fa",
          icon: "address-card",
          prefix: "fas",
          color: "red",
        },
        reverseBgColor: false,
      },
    },
  ],
};
