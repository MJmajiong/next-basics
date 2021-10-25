import { Story } from "../../../interfaces";
import docMD from "../../../docs/cmdb-instances/instance-list-modal.md";

export const story: Story = {
  storyId: "cmdb-instances.instance-list-modal",
  type: "brick",
  author: "cyril",
  deprecated: true,
  text: {
    en: "Instance List Modal",
    zh: "实例列表模态框",
  },
  description: {
    en: "cmdb instance list modal",
    zh: "cmdb 通用实例列表模态框",
  },
  icon: {
    lib: "fa",
    icon: "list-alt",
  },
  conf: {
    brick: "cmdb-instances.instance-list-modal",
    properties: {
      objectId: "HOST",
      modalTitle: "查看实例",
      q: "${query.q}",
      aq: "${query.aq|json}",
      page: "${query.page=1|number}",
      pageSize: "${query.pageSize=10|number}",
      sort: "${query.sort}",
      asc: "${query.asc|boolean}",
      objectList: {
        data: [
          {
            objectId: "HOST",
            name: "主机",
            icon: "fa fa-hdd-o",
            category: "基础设施",
            memo: "",
            protected: true,
            system: "",
            view: {
              attr_authorizers: {},
              attr_order: [
                "hostname",
                "ip",
                "agentVersion",
                "_agentStatus",
                "_agentHeartBeat",
              ],
              hide_columns: ["diskSize", "_deviceList_CLUSTER"],
              relation_view: {
                APP: ["name"],
              },
              showHideAttrs: true,
              show_key: ["hostname"],
              visible: true,
            },
            attrList: [
              {
                id: "hostname",
                name: "主机名",
                protected: true,
                custom: "false",
                unique: "false",
                readonly: "false",
                required: "true",
                tag: ["默认属性"],
                description: "",
                tips: "",
                value: {
                  type: "str",
                  regex: null,
                  default_type: "value",
                  default: null,
                  struct_define: [],
                  mode: "default",
                  prefix: "",
                  start_value: 0,
                  series_number_length: 0,
                },
                wordIndexDenied: false,
              },
              {
                id: "ip",
                name: "IP",
                protected: true,
                custom: "false",
                unique: "false",
                readonly: "false",
                required: "true",
                tag: ["默认属性"],
                description: "",
                tips: "",
                value: {
                  type: "ip",
                  regex:
                    "^((25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\.){3}(25[0-5]|2[0-4]\\d|1\\d{2}|[1-9]?\\d)(\\[[^\\[\\],;\\s]{1,100}\\]|)$",
                  default_type: "",
                  default: null,
                  struct_define: [],
                  mode: "",
                  prefix: "",
                  start_value: 0,
                  series_number_length: 0,
                },
                wordIndexDenied: false,
              },
              {
                id: "agentVersion",
                name: "agent版本",
                protected: true,
                custom: "false",
                unique: "false",
                readonly: "false",
                required: "false",
                tag: ["默认属性"],
                description: "",
                tips: "",
                value: {
                  type: "str",
                  regex: null,
                  default_type: "value",
                  default: null,
                  struct_define: [],
                  mode: "default",
                  prefix: "",
                  start_value: 0,
                  series_number_length: 0,
                },
                wordIndexDenied: false,
              },
              {
                id: "_agentStatus",
                name: "agent状态",
                protected: true,
                custom: "false",
                unique: "false",
                readonly: "false",
                required: "false",
                tag: ["默认属性"],
                description: "",
                tips: "",
                value: {
                  type: "enum",
                  regex: ["未安装", "异常", "正常", "已卸载"],
                  default_type: "",
                  default: "未安装",
                  struct_define: [],
                  mode: "",
                  prefix: "",
                  start_value: 0,
                  series_number_length: 0,
                },
                wordIndexDenied: false,
              },
              {
                id: "_agentHeartBeat",
                name: "agent心跳",
                protected: true,
                custom: "false",
                unique: "false",
                readonly: "false",
                required: "false",
                tag: ["默认属性"],
                description: "",
                tips: "",
                value: {
                  type: "int",
                  regex: null,
                  default_type: "value",
                  default: -1,
                  struct_define: [],
                  mode: "",
                  prefix: "",
                  start_value: 0,
                  series_number_length: 0,
                },
                wordIndexDenied: false,
              },
              {
                id: "status",
                name: "运营状态",
                protected: true,
                custom: "false",
                unique: "false",
                readonly: "false",
                required: "false",
                tag: ["默认属性"],
                description: "",
                tips: "",
                value: {
                  type: "enum",
                  regex: [
                    "运营中",
                    "故障中",
                    "未上线",
                    "下线隔离中",
                    "开发机",
                    "测试机",
                    "维修中",
                    "报废",
                  ],
                  default_type: "",
                  default: null,
                  struct_define: [],
                  mode: "",
                  prefix: "",
                  start_value: 0,
                  series_number_length: 0,
                },
                wordIndexDenied: false,
              },
              {
                id: "_environment",
                name: "主机环境",
                protected: true,
                custom: "false",
                unique: "false",
                readonly: "false",
                required: "false",
                tag: ["默认属性"],
                description: "",
                tips: "",
                value: {
                  type: "enum",
                  regex: ["无", "开发", "测试", "预发布", "生产", "灾备"],
                  default_type: "",
                  default: null,
                  struct_define: [],
                  mode: "",
                  prefix: "",
                  start_value: 0,
                  series_number_length: 0,
                },
                wordIndexDenied: false,
              },
            ],
            relation_groups: [
              {
                id: "_user",
                name: "负责人",
                protected: true,
              },
              {
                id: "_relate_connect",
                name: "位置信息",
                protected: true,
              },
              {
                id: "basic_info",
                name: "基本属性",
                protected: true,
              },
              {
                id: "rer",
                name: "erere",
                protected: false,
              },
            ],
            relation_list: [
              {
                relation_id: "CLUSTER_deviceList_HOST",
                name: "",
                protected: true,
                left_object_id: "CLUSTER",
                left_id: "deviceList",
                left_description: "所属集群",
                left_name: "主机",
                left_min: 0,
                left_max: -1,
                left_groups: ["_relate_connect"],
                left_tags: [],
                right_object_id: "HOST",
                right_id: "_deviceList_CLUSTER",
                right_description: "主机",
                right_name: "所属集群",
                right_min: 0,
                right_max: -1,
                right_groups: [],
                right_tags: [],
                _version: 1,
              },
            ],
            wordIndexDenied: false,
            _version: 140,
            creator: "",
            modifier: "easyops",
          },
        ],
      },
      autoCloseOnOkWithSelection: true,
    },
    events: {
      "read.selection.change": {
        action: "console.info",
      },
    },
  },
  actions: [
    {
      text: "open()",
      method: "open",
    },
  ],
  doc: docMD,
};
