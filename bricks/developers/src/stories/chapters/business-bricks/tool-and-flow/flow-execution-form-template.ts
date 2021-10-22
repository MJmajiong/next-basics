import { Story } from "../../../interfaces";
import docMD from "../../../docs/tool-and-flow/flow-execution-form.md";
import { FLOW_ID } from "../../../constants";

export const story: Story = {
  id: "tools.flow-execution-form",
  type: "template",
  author: "jo",
  text: {
    en: "Dynamic Flow execution Form Template",
    zh: "动态参数的流程执行",
  },
  description: {
    en: "Dynamic Flow Execution Template",
    zh: "基于模板搭建的动态参数流程执行场景",
  },
  icon: {
    lib: "fa",
    icon: "running",
  },
  examples: {
    brick: "div",
    slots: {
      "": {
        type: "bricks",
        bricks: [
          {
            brick: "presentational-bricks.brick-utils",
            bg: true,
          },
          {
            template: "tools.flow-execution-form",
            params: {
              flowId: FLOW_ID,
              events: {
                "response.success": [
                  {
                    target: "presentational-bricks\\.brick-utils",
                    method: "message",
                    args: ["success", "流程执行中"],
                  },
                  {
                    action: "history.replace",
                  },
                ],
              },
            },
          },
        ],
      },
    },
  },
  doc: docMD,
};
