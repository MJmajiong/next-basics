import { Story } from "../../../interfaces";
import docMD from "../../../docs/real-time-monitor/top-process.md";
import { CMDB_HOST_INSTANCE_ID } from "../../../constants";

export const story: Story = {
  id: "real-time-monitor.top-process",
  type: "template",
  author: "lynette",
  text: {
    en: "Top process",
    zh: "Top 进程",
  },
  description: {
    en: "Top process",
    zh: "Top 进程",
  },
  icon: {
    lib: "antd",
    type: "number",
  },
  examples: {
    template: "real-time-monitor.top-process",
    params: {
      instanceId: CMDB_HOST_INSTANCE_ID,
      sort: "cpu",
      topN: "10",
    },
  },
  doc: docMD,
};
