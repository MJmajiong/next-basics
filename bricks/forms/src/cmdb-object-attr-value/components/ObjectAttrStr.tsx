import React from "react";
import { useTranslation } from "react-i18next";
import { NS_FORMS, K } from "../../i18n/constants";
import { Form } from "@ant-design/compatible";
import {
  Select,
  Input,
  Row,
  Col,
  Radio,
  Button,
  Popover,
  InputNumber,
} from "antd";
import { RadioChangeEvent } from "antd/lib/radio";
import { isNil, isNumber } from "lodash";

const Option = Select.Option;

interface StrValueType {
  mode: string;
  default_type: string;
  regex?: string;
  start_value?: number;
  prefix?: string;
  series_number_length?: number;
  default: string;
}

interface ObjectAttrStrProps {
  value: any;
  onChange: (newValue?: Partial<StrValueType>) => void;
}

export function ObjectAttrStr(props: ObjectAttrStrProps): React.ReactElement {
  props.value.mode = props.value.mode || "default";
  const { t } = useTranslation(NS_FORMS);
  const [popoverVisible, setPopoverVisible] = React.useState(false);

  const [value, setValue] = React.useState<Partial<StrValueType>>({
    mode: "default",
    default_type: "value",
    regex: "",
    start_value: 1,
    prefix: "",
    default: "",
  });
  const [startValue, setStartValue] = React.useState(1);

  React.useEffect(() => {
    !isNil(props.value) && setValue(props.value);
  }, [props.value]);

  const handleStrChange = (newValue: Partial<StrValueType>) => {
    props.onChange && props.onChange(newValue);
  };

  const handleValueChange = (value: Partial<StrValueType>) => {
    setValue(value);
    handleStrChange(value);
  };

  const handleRegexChange = (e: { target: { value: string } }) => {
    handleValueChange({ ...value, regex: e.target.value });
  };

  const handleStrModeChange = (e: RadioChangeEvent) => {
    handleValueChange({ ...value, mode: e.target.value });
  };

  const handleStrDefaultTypeChange = (default_type: string) => {
    if (default_type === "function") {
      handleValueChange({ ...value, default_type, default: "guid()" });
    } else if (
      value.default_type !== default_type &&
      ["series-number", "auto-increment-id"].includes(default_type)
    ) {
      handleValueChange({
        ...value,
        default_type,
        default: "",
        start_value: 1,
      });
    } else {
      handleValueChange({ ...value, default_type, default: "" });
    }
  };

  const handleVisibleChange = () => {
    setStartValue(value.start_value);
    setPopoverVisible(true);
  };
  const hidePopover = () => {
    setPopoverVisible(false);
  };

  const handleStartValueChange = () => {
    handleValueChange({ ...value, start_value: startValue });
    setPopoverVisible(false);
  };
  const handleNumberChange = (e: number) => {
    setStartValue(isNumber(e) && e >= 1 ? e : 1);
  };

  const getPopoverContent = (): React.ReactNode => (
    <>
      <Row style={{ width: 200, marginBottom: 15 }} align="middle" type="flex">
        <Col span={6}>起始值</Col>
        <Col span={16}>
          <InputNumber
            placeholder="默认为1"
            data-testid="start-value-input"
            style={{ width: "100%" }}
            value={startValue}
            onChange={handleNumberChange}
            min={1}
          />
        </Col>
      </Row>
      <Row justify="end" type="flex">
        <Button data-testid="start-value-cancel" onClick={hidePopover}>
          {t(K.CANCEL)}
        </Button>
        <Button
          onClick={handleStartValueChange}
          type="primary"
          style={{ marginLeft: 15 }}
          data-testid="start-value-confirm"
        >
          {t(K.CONFIRM)}
        </Button>
      </Row>
    </>
  );

  const getDefaultControl = (): React.ReactNode => {
    if (value.default_type === "value") {
      if (value.mode === "default" || value.mode === "url") {
        return (
          <Input
            value={value.default}
            onChange={(e) => {
              handleValueChange({ ...value, default: e.target.value });
            }}
          />
        );
      } else {
        // value.mode === "multiple-lines" || value.mode === "markdown"
        return (
          <Input.TextArea
            rows={4}
            allowClear
            value={value.default}
            onChange={(e) => {
              handleValueChange({ ...value, default: e.target.value });
            }}
          />
        );
      }
    } else if (value.default_type === "function") {
      return (
        <Select value="guid()" style={{ width: "100%" }}>
          <Option value="guid()">{t(K.GLOBALLY_UNIQUE_IDENTIFIER)}</Option>
        </Select>
      );
    } else if (value.default_type === "auto-increment-id") {
      return (
        <Row>
          <Col span={20}>
            <Input
              placeholder="前缀标识符（可不填）"
              className="auto-increment-id-prefix"
              value={value.prefix}
              onChange={(e) => {
                handleValueChange({ ...value, prefix: e.target.value });
              }}
            />
          </Col>
          <Col span={4}>
            <Popover
              content={getPopoverContent({ prefix: value.prefix })}
              trigger="click"
              visible={popoverVisible}
              onVisibleChange={handleVisibleChange}
            >
              <Button type="link">高级</Button>
            </Popover>
          </Col>
        </Row>
      );
    } else if (value.default_type === "series-number") {
      return (
        <Row gutter={15}>
          <Col span={8}>
            <InputNumber
              placeholder="流水号长度"
              value={value.series_number_length}
              onChange={(e) => {
                handleValueChange({ ...value, series_number_length: e });
              }}
              style={{ width: "100%" }}
              min={1}
              max={10}
            />
          </Col>
          <Col span={10}>
            <Input
              placeholder="前缀标识符（可不填）"
              className="series-number-prefix"
              value={value.prefix}
              onChange={(e) => {
                handleValueChange({ ...value, prefix: e.target.value });
              }}
            />
          </Col>
          <Col span={4}>
            <Popover
              content={getPopoverContent({
                prefix: value.prefix,
              })}
              trigger="click"
              visible={popoverVisible}
              onVisibleChange={handleVisibleChange}
            >
              <Button type="link">高级</Button>
            </Popover>
          </Col>
        </Row>
      );
    }
  };

  return (
    <>
      <div>
        <div>
          正则：
          <Row>
            <Input
              placeholder="可不填"
              value={value.regex}
              onChange={handleRegexChange}
            />
          </Row>
        </div>
        <div>
          显示为：
          <Row>
            <Radio.Group value={value.mode} onChange={handleStrModeChange}>
              <Radio value="default">默认</Radio>
              <Radio value="multiple-lines">多行字符串</Radio>
              <Radio value="url">URL</Radio>
              <Radio value="markdown">Markdown</Radio>
            </Radio.Group>
          </Row>
        </div>
        <div>
          {t(K.ATTRIBUTE_DEFAULT_VALUE)}
          <Row gutter={15}>
            <Col span={value.default_type === "series-number" ? 6 : 12}>
              <Select
                value={value.default_type}
                onChange={handleStrDefaultTypeChange}
                style={{ width: "100%" }}
              >
                <Option value="value">固定值</Option>
                <Option value="function">内置函数</Option>
                <Option value="auto-increment-id">自增ID</Option>
                <Option value="series-number">流水号</Option>
              </Select>
            </Col>
            <Col
              span={value.default_type === "series-number" ? 18 : 12}
              style={{
                marginTop:
                  value.mode === "multiple-lines" || value.mode === "markdown"
                    ? "-5px"
                    : "0px",
              }}
            >
              {getDefaultControl()}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
