import { Story } from "@next-core/brick-types";

export const generalClipboard: Story = {
  storyId: "utils.general-clipboard",
  category: "other",
  type: "brick",
  author: "steve",
  text: {
    en: "General Clipboard",
    zh: "普通剪贴板",
  },
  description: {
    en: "Use localStorage to save clipboard data, and use deep comparison to dispatch change events",
    zh: "可以存放剪贴板数据，可使用本地存储记录相关数据，并使用深度值比较来发起变更事件。",
  },
  icon: {
    lib: "fa",
    icon: "clipboard",
  },
  conf: [
    {
      brick: "div",
      slots: {
        "": {
          type: "bricks",
          bricks: [
            {
              brick: "utils.general-clipboard",
              properties: {
                storageKey: "developers:test-general-clipboard",
                id: "test-general-clipboard",
              },
              events: {
                "clipboard.change": {
                  action: "console.log",
                },
              },
              portal: true,
            },
            {
              brick: "basic-bricks.general-button",
              properties: {
                buttonName: 'Set clipboard to { hello: "world" }',
              },
              events: {
                "general.button.click": {
                  target: "#test-general-clipboard",
                  method: "setClipboardImmediately",
                  args: [{ hello: "world" }],
                },
              },
            },
          ],
        },
      },
    },
  ],
};
