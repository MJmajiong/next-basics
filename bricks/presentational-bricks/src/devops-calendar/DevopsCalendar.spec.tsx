import React from "react";
import { mount } from "enzyme";
import { DevopsCalendar } from "./DevopsCalendar";
import moment from "moment";

jest.mock("./DevopsCalendar.less", () => {
  return "DevopsCalendar.less";
});

const offDutyData = [
  { date: "2021-05-01", status: "休" },
  { date: "2021-05-13", status: "休" },
  { date: "2021-05-14", status: "休" },
];

const taskMapping = {
  0: "red",
  1: "#ccc",
  2: "var(--theme-blue-color)",
  3: "yellow",
};

const typeMapping = {
  priority: ["发版", "两会", "人行窗口"],
  mapping: {
    发版: "yellow",
    两会: "green",
    人行窗口: "yellow",
  },
};

const devOpsData = [
  {
    date: "2021-05-01",
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
    date: "2021-05-02",
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
    date: "2021-05-03",
    task: [],
    type: ["人行窗口", "两会"],
  },
];

describe("DevopsCalendar", () => {
  it("should work", () => {
    const wrapper = mount(
      <DevopsCalendar
        offDutyData={offDutyData}
        taskColorMapping={taskMapping}
        typeColorMapping={typeMapping}
        devOpsData={devOpsData}
        value={"2021-05-10"}
        defaultSelectedDate={"2021-05-02"}
      />
    );
    expect(wrapper.find(".today .dateNumber").text()).toEqual("10");
    expect(wrapper.find(".taskItem")).toHaveLength(1);
    expect(wrapper.find(".typeItem")).toHaveLength(0);

    expect(wrapper.find(".devOps")).toHaveLength(2);
    expect(wrapper.find(".devOps").at(0).prop("style").backgroundColor).toEqual(
      "var(--theme-blue-color)"
    );
    expect(wrapper.find(".devOps").at(1).prop("style").backgroundColor).toEqual(
      "#ccc"
    );

    expect(wrapper.find(".offDuty")).toHaveLength(3);

    expect(wrapper.find(".devOpsTaskType")).toHaveLength(2);
    expect(
      wrapper.find(".devOpsTaskType").at(0).prop("style").backgroundColor
    ).toEqual("yellow");
    expect(
      wrapper.find(".devOpsTaskType").at(1).prop("style").backgroundColor
    ).toEqual("green");
  });

  it("events should work", () => {
    const onSelect = jest.fn();
    const onPanelChange = jest.fn();
    const wrapper = mount(
      <DevopsCalendar
        offDutyData={offDutyData}
        taskColorMapping={taskMapping}
        typeColorMapping={typeMapping}
        devOpsData={devOpsData}
        onDateSelect={onSelect}
        onPickerPanelChange={onPanelChange}
        displayDate={"2021-05-30"}
      />
    );
    wrapper.find("PickerPanel").invoke("onSelect")(moment("2021-05-01"));
    expect(wrapper.find(".taskItem")).toHaveLength(3);
    expect(wrapper.find(".typeItem")).toHaveLength(1);
    expect(onSelect).lastCalledWith({
      date: "2021-05-01",
      data: {
        date: "2021-05-01",
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
        offDuty: "休",
      },
    });

    wrapper.find("PickerPanel").invoke("onPanelChange")(
      moment("2021-04-01"),
      "date"
    );
    expect(onPanelChange).lastCalledWith({ date: "2021-04-01", mode: "date" });
  });
});
