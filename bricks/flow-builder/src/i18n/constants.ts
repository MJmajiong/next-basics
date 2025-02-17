export const NS_FLOW_BUILDER = "flow-builder";

export enum K {
  FLOW_BUILDER = "FLOW_BUILDER",
  SCHEMA_ITEM_NORMAL = "SCHEMA_ITEM_NORMAL",
  SCHEMA_ITEM_REF = "SCHEMA_ITEM_REF",
  PATTERN_INPUT_PLANCEHOLDER = "PATTERN_INPUT_PLANCEHOLDER",
  ENUM_INPUT_PLANCEHOLDER = "ENUM_INPUT_PLANCEHOLDER",
  COMPARE_METHOD_PLANCEHOLDER = "COMPARE_METHOD_PLANCEHOLDER",
  COMPARE_VALUE_PLANCEHOLDER = "COMPARE_VALUE_PLANCEHOLDER",
  MODEL_SEARCH_PLANCEHOLDER = "MODEL_SEARCH_PLANCEHOLDER",
  FIELDS_MAPPING_EDIT_TOOLTIP = "FIELDS_MAPPING_EDIT_TOOLTIP",
  ARRAY = "ARRAY",
  SIMPLE_TYPE = "SIMPLE_TYPE",
  MODEL_TYPE = "FROM_MODEL",
  REF_VALIDATE_REQUIRED_MSG = "REF_VALIDATE_REQUIRED_MSG",
  FIELDS_MAPPING_REQUIRED_MSG = "FIELDS_MAPPING_REQUIRED_MSG",
  EDIT = "EDIT",
  SAVE = "SAVE",
  CANCEL = "CANCEL",
  EDITOR_PLACEHOLDER = "EDITOR_PLACEHOLDER",
  CONST = "CONST",
  FIELDS_MAPPING = "FIELDS_MAPPING",
  CEL = "CEL",
  NAME_LABEL = "NAME_LABEL",
  REQUIRED_LABEL = "REQUIRED_LABEL",
  TYPE_LABEL = "TYPE_LABEL",
  DESCRIPTION_LABEL = "DESCRIPTION_LABEL",
  SETTING_LABEL = "SETTING_LABEL",
  CATEGORY_LABEL = "CATEGORY_LABEL",
  REFERENCE_LABEL = "REFERENCE_LABEL",
  DEFAULT_LABEL = "DEFAULT_LABEL",
  ENUM_LABEL = "ENUM_LABEL",
  VALIDATOR_LABEL = "VALIDATOR_LABEL",
  FIELD_PARAMS = "FIELD_PARAMS",
}

export type Locale = { [key in K]: string };
