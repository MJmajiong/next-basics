import React, { useState, useMemo, useCallback, useEffect } from "react";
import { Select } from "antd";
import { debounce, isEmpty } from "lodash";
import { useTranslation } from "react-i18next";
import { NS_FLOW_BUILDER, K } from "../../../i18n/constants";
import { useContractModels } from "../../hooks/useContractModels";
import { fecthModelData } from "../../hooks/useCurModel";
import { ModelFieldItem } from "../../interfaces";
import { processRefItemData, processRefItemInitValue } from "../../processor";
import { modelRefCache } from "../../constants";

export interface ProcessRefItemValue {
  name?: string;
  field?: string;
}

export interface RefItemProps {
  value?: string;
  onChange?: (value: string) => void;
}

export function RefItem(props: RefItemProps): React.ReactElement {
  const { t } = useTranslation(NS_FLOW_BUILDER);
  const [{ modelList }, setQ] = useContractModels();
  const [fieldList, setFieldList] = useState<ModelFieldItem[]>([]);
  const [refValue, setRefValue] = useState<ProcessRefItemValue>(
    processRefItemInitValue(props.value)
  );

  useEffect(() => {
    const value = processRefItemInitValue(props.value);
    setRefValue(value);
  }, [props.value]);

  useEffect(() => {
    (async () => {
      const data = await fecthModelData(refValue.name);
      setFieldList(data?.fields);
    })();
  }, [refValue.name]);

  const processFieldList = useCallback((fieldList: ModelFieldItem[]) => {
    if (!isEmpty(fieldList)) {
      return [{ name: "*" }].concat(fieldList);
    }

    return fieldList;
  }, []);

  const handleModelChange = (value: string): void => {
    const newValue = {
      name: value,
      field: "",
    };
    setRefValue(newValue);
    props.onChange(processRefItemData(newValue));

    const find = modelList.find((item) => item.name === value);
    // istanbul ignore else
    if (find) {
      setFieldList(find.fields);
    }
  };

  const handleSearch = useCallback(
    (value: string): void => {
      setQ(value ?? "");
    },
    [setQ]
  );

  const debounceSearch = useMemo(() => {
    return debounce(handleSearch, 200);
  }, [handleSearch]);

  const handleFieldChange = (value: string): void => {
    const newValue = {
      ...refValue,
      field: value,
    };

    setRefValue(newValue);
    const find = modelList.find((item) => item.name === newValue.name);
    find &&
      modelRefCache.set(
        `${newValue.name}.${newValue.field}`,
        `${find.namespaceId}.${find.name}`
      );
    props.onChange(processRefItemData(newValue));
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <Select
        style={{ flex: 1 }}
        value={refValue.name}
        showSearch
        filterOption={false}
        placeholder={t(K.MODEL_SEARCH_PLANCEHOLDER)}
        onChange={handleModelChange}
        onSearch={debounceSearch}
      >
        {modelList.map((item) => (
          <Select.Option key={item.name} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
      <Select
        style={{ flex: 1 }}
        onChange={handleFieldChange}
        value={refValue.field}
      >
        {processFieldList(fieldList)?.map((item) => (
          <Select.Option key={item.name} value={item.name}>
            {item.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );
}
