import React from "react";
import ReactDOM from "react-dom";
import {
  BrickWrapper,
  property,
  UpdatingElement,
  event,
  EventEmitter,
} from "@next-core/brick-kit";
import { DevopsCalendar } from "./DevopsCalendar";
import { devOpsData, offDutyData, typeColorMapping } from "../interfaces";

/**
 * @id presentational-bricks.devops-calendar
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.devops-calendar`
 * @docKind brick
 * @noInheritDoc
 */
export class DevopsCalendarElement extends UpdatingElement {
  /**
   * @kind string
   * @required false
   * @default -
   * @description 今天的日期
   */
  @property({
    attribute: false,
  })
  value: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 日历展示的日期
   */
  @property({
    attribute: false,
  })
  displayDate: string;

  /**
   * @kind string
   * @required false
   * @default -
   * @description 默认选中的日期
   */
  @property({
    attribute: false,
  })
  defaultSelectedDate: string;

  /**
   * @kind offDutyData[]
   * @required false
   * @default -
   * @description 上班、休班数据
   */
  @property({
    attribute: false,
  })
  offDutyData: offDutyData[];

  /**
   * @kind devOpsData[]
   * @required false
   * @default -
   * @description 运维事项、发布窗口数据
   */
  @property({
    attribute: false,
  })
  devOpsData: devOpsData[];

  /**
   * @kind Record<string | number, string>
   * @required false
   * @default -
   * @description 运维事项原点颜色映射
   */
  @property({
    attribute: false,
  })
  taskColorMapping: Record<string | number, string>;

  /**
   * @kind typeMapping
   * @required false
   * @default -
   * @description 发布窗口背景颜色映射
   */
  @property({
    attribute: false,
  })
  typeColorMapping: typeColorMapping;

  /**
   * @detail { date: string; data?: Record<string, any>}
   * @description 点击选择日期事件 date为选择的日期，data为该日期上的数据
   */
  @event({ type: "calendar.onSelect" })
  calendarOnSelect: EventEmitter<{ date: string; data?: Record<string, any> }>;
  private _handleSelect = (detail: {
    date: string;
    data?: Record<string, any>;
  }): void => {
    this.calendarOnSelect.emit(detail);
  };

  /**
   * @detail {mode: string; date: string}
   * @description 日期面板变化事件 date为当前面板的日期，mode为面板类型
   */
  @event({ type: "calendar.onPanelChange" })
  calendarOnPanelChange: EventEmitter<{ mode: string; date: string }>;
  private _handlePanelChange = (detail: {
    mode: string;
    date: string;
  }): void => {
    this.calendarOnPanelChange.emit(detail);
  };

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <DevopsCalendar
            offDutyData={this.offDutyData}
            devOpsData={this.devOpsData}
            taskColorMapping={this.taskColorMapping}
            typeColorMapping={this.typeColorMapping}
            onDateSelect={this._handleSelect}
            onPickerPanelChange={this._handlePanelChange}
            value={this.value}
            displayDate={this.displayDate}
            defaultSelectedDate={this.defaultSelectedDate}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "presentational-bricks.devops-calendar",
  DevopsCalendarElement
);
