import { Story } from "@next-core/brick-types";

export const DevopsCalendarStory: Story = {
  storyId: "presentational-bricks.devops-calendar",
  category: "data-view",
  type: "brick",
  author: "nlicroshan",
  text: {
    en: "devops Calendar",
    zh: "运维日历",
  },
  description: {
    en: "Display Devops data in calendar",
    zh: "在日历中展示运维数据",
  },
  icon: {
    lib: "easyops",
    category: "default",
    icon: "calendar",
  },
  conf: [
    {
      brick: "presentational-bricks.devops-calendar",
      events: {
        "calendar.onSelect": [
          {
            action: "console.log",
            args: ["${EVENT.detail}"],
          },
        ],
        "calendar.onPanelChange": [
          {
            action: "console.log",
            args: ["${EVENT.detail}"],
          },
        ],
      },
      properties: {
        style: {
          width: "500px",
        },
        value: "2021-06-20",
        offDutyData: [
          {
            _object_id: "MOBILE_CALENDAR",
            date: "2021-06-13",
            instanceId: "5bef784c9c2a2",
            status: "休",
          },
          {
            _object_id: "MOBILE_CALENDAR",
            date: "2021-06-12",
            instanceId: "5bef784c9c2c6",
            status: "休",
          },
          {
            _object_id: "MOBILE_CALENDAR",
            date: "2021-06-14",
            instanceId: "5bef784c9c382",
            status: "休",
          },
        ],
        taskColorMapping: {
          "0": "var(--theme-red-color)",
          "1": "var(--theme-orange-color)",
          "2": "var(--theme-purple-color)",
          "3": "var(--theme-green-color)",
        },
        typeColorMapping: {
          priority: ["发版", "两会", "人行窗口"],
          mapping: {
            发版: "var(--theme-green-color)",
            两会: "var(--theme-cyan-color)",
            人行窗口: "var(--theme-geekblue-color)",
          },
        },
        devOpsData: [
          {
            date: "2021-06-01",
            task: [
              {
                OPT_CHANGE_NUMBER: "001",
                OPT_SUMMARY: "XBUS系统月度巡检",
                OPT_NOTIFICATION_TM: "2021-05-01 09:00:00",
                OPT_PRIORITY_ID: "3",
              },
              {
                OPT_CHANGE_NUMBER: "002",
                OPT_SUMMARY: "ESB系统月度巡检",
                OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
                OPT_PRIORITY_ID: "3",
              },
              {
                OPT_CHANGE_NUMBER: "003",
                OPT_SUMMARY: "新同城数据中心EBUS部署",
                OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
                OPT_PRIORITY_ID: "2",
              },
            ],
            type: ["发版"],
          },
          {
            date: "2021-06-02",
            task: [
              {
                OPT_CHANGE_NUMBER: "004",
                OPT_SUMMARY: "EBUS系统老中心WAS漏洞修复工作",
                OPT_NOTIFICATION_TM: "2021-05-01 10:00:00",
                OPT_PRIORITY_ID: "1",
              },
            ],
            type: [],
          },
          {
            date: "2021-06-03",
            task: [],
            type: ["人行窗口", "两会"],
          },
        ],
      },
    },
  ],
};
