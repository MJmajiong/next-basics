import React, { useCallback, useEffect, useMemo, useState } from "react";
import { PickerPanel } from "rc-picker";
import zhCN from "rc-picker/lib/locale/zh_CN";
import solarLunar from "solarlunar";
import moment, { Moment } from "moment";
import momentGenerateConfig from "rc-picker/lib/generate/moment";
import classNames from "classnames";
import style from "./DevopsCalendar.less";
import { min, isNil, sortBy } from "lodash";
import { devOpsData, offDutyData, typeColorMapping } from "../interfaces";

const prefixCls = "devops-calendar";

export interface DevopsCalendarProps {
  value?: string;
  displayDate?: string;
  defaultSelectedDate?: string;
  offDutyData?: offDutyData[];
  devOpsData?: devOpsData[];
  taskColorMapping?: Record<string | number, string>;
  typeColorMapping?: typeColorMapping;
  onDateSelect?: (detail: { date: string; data: Record<string, any> }) => void;
  onPickerPanelChange?: (detail: { mode: string; date: string }) => void;
}

export function DevopsCalendar(props: DevopsCalendarProps): React.ReactElement {
  const {
    offDutyData,
    devOpsData,
    typeColorMapping,
    taskColorMapping,
    onDateSelect,
    onPickerPanelChange,
    value,
    displayDate,
    defaultSelectedDate,
  } = props;
  const [selectedData, setSelectedData] = useState<{
    date?: Moment;
    data?: devOpsData;
  }>({});

  const offDutyDataMap = useMemo(() => {
    return offDutyData?.reduce((pre, cur) => {
      const curMoment = moment(cur.date).format("YYYY-MM-DD");
      pre[curMoment] = cur.status;
      return pre;
    }, {} as Record<string, string>);
  }, [offDutyData]);

  const devOpsDataMap = useMemo(() => {
    return devOpsData?.reduce((pre, cur) => {
      const curMoment = moment(cur.date).format("YYYY-MM-DD");
      pre[curMoment] = cur;
      return pre;
    }, {} as Record<string, any>);
  }, [devOpsData]);

  useEffect(() => {
    const now = moment(defaultSelectedDate || value);
    const formatDate = now.format("YYYY-MM-DD");
    const selectedDevOpsData = devOpsDataMap && devOpsDataMap[formatDate];
    setSelectedData({ date: now, data: selectedDevOpsData });
  }, [defaultSelectedDate, devOpsDataMap, value]);

  const dateRender = useCallback(
    (date: Moment, today: Moment) => {
      const solar2lunarData = solarLunar.solar2lunar(
        date.year(),
        date.month() + 1,
        date.date()
      );
      const formatDate = date.format("YYYY-MM-DD");
      const offDuty = offDutyDataMap && offDutyDataMap[formatDate];
      const devOps = devOpsDataMap && devOpsDataMap[formatDate];
      const devOpsTaskStatus = min(
        devOps?.task?.map((task: any) => task?.OPT_PRIORITY_ID)
      );
      const devOpsTaskType = typeColorMapping?.priority?.find((type) =>
        devOps?.type?.includes(type)
      );
      return (
        <div
          className={classNames("dateContainer", {
            devOpsTaskType: !!devOpsTaskType,
            today: date.isSame(value || today, "date"),
          })}
          style={{
            borderColor: date.isSame(selectedData?.date, "date")
              ? "#666"
              : typeColorMapping?.mapping[devOpsTaskType],
            backgroundColor: typeColorMapping?.mapping[devOpsTaskType],
          }}
        >
          {offDuty && <div className="offDuty">{offDuty}</div>}
          {!isNil(devOpsTaskStatus) && (
            <div
              className="devOps"
              style={{
                backgroundColor:
                  taskColorMapping &&
                  taskColorMapping[devOpsTaskStatus as string | number],
              }}
            ></div>
          )}
          <div className="dateMain">
            <div className="dateNumber">{date.date()}</div>
            <div className="dateText">{solar2lunarData?.dayCn}</div>
          </div>
        </div>
      );
    },
    [
      devOpsDataMap,
      offDutyDataMap,
      selectedData,
      taskColorMapping,
      typeColorMapping,
      value,
    ]
  );

  const renderExtraFooter = useCallback(
    (mode: string) => {
      return (
        <div className="dateFooter">
          <div className="dateInfo">
            <div className="dateText">
              {selectedData?.date?.format("YYYY[年]MM[月]DD[日]")}
            </div>
            <div className="devopsType">
              {selectedData?.data?.type?.map((type) => (
                <span
                  className="typeItem"
                  key={type}
                  style={{ backgroundColor: typeColorMapping?.mapping[type] }}
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
          {selectedData?.data?.task?.length > 0 && (
            <div className="taskInfo">
              <div className="taskTitle">运维任务</div>
              <div className="taskList">
                {selectedData?.data?.task?.map((task: any) => (
                  <div className="taskItem" key={task?.OPT_CHANGE_NUMBER}>
                    <div
                      className="taskItemColor"
                      style={{
                        backgroundColor:
                          taskColorMapping &&
                          taskColorMapping[task?.OPT_PRIORITY_ID],
                      }}
                    ></div>
                    <div className="taskItemTime">
                      {moment(task?.OPT_NOTIFICATION_TM)?.format(
                        "YYYY-MM-DD HH:mm"
                      )}
                    </div>
                    <div className="taskItemText">{task?.OPT_SUMMARY}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      );
    },
    [selectedData, taskColorMapping, typeColorMapping]
  );

  const onSelect = useCallback(
    (date: Moment) => {
      const formatDate = date.format("YYYY-MM-DD");
      const selectedOffDutyData = offDutyDataMap && offDutyDataMap[formatDate];
      const selectedDevOpsData = devOpsDataMap && devOpsDataMap[formatDate];
      setSelectedData({ date, data: selectedDevOpsData });
      onDateSelect &&
        onDateSelect({
          date: formatDate,
          data: { ...selectedDevOpsData, offDuty: selectedOffDutyData },
        });
    },
    [devOpsDataMap, offDutyDataMap, onDateSelect]
  );

  const onPanelChange = useCallback(
    (date: Moment, mode: string) => {
      const formatDate = date.format("YYYY-MM-DD");
      onPickerPanelChange && onPickerPanelChange({ mode, date: formatDate });
    },
    [onPickerPanelChange]
  );

  return (
    <>
      <PickerPanel
        prefixCls={prefixCls}
        locale={zhCN}
        picker={"date"}
        generateConfig={momentGenerateConfig}
        prevIcon={<span className={`${prefixCls}-prev-icon`} />}
        nextIcon={<span className={`${prefixCls}-next-icon`} />}
        superPrevIcon={<span className={`${prefixCls}-super-prev-icon`} />}
        superNextIcon={<span className={`${prefixCls}-super-next-icon`} />}
        dateRender={dateRender}
        renderExtraFooter={renderExtraFooter}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
        style={{ width: "100%" }}
        value={moment(displayDate || value)}
      />
      <style>{style}</style>
    </>
  );
}
