import { Locale, K } from "../constants";

const locale: Locale = {
  [K.NEXT_BUILDER]: "Next Builder",
  [K.LIBRARY]: "构件库",
  [K.EVENTS]: "事件",
  [K.DATA]: "数据 (Context)",
  [K.SEARCH_BRICKS_IN_LIBRARY]: "搜索构件",
  [K.SEARCH_DATA]: "根据配置信息查找数据",
  [K.SEARCH_BRICKS_WITH_EVENTS]: "搜索有事件关联的构件",
  [K.SEARCH_ROUTE]: "搜索路由",
  [K.SEARCH_TEMPLATE]: "搜索模板",
  [K.SEARCH_SNIPPET]: "搜索片段",
  [K.ADD_DATA]: "添加数据",
  [K.SETTINGS]: "设置",
  [K.BRICK_LIBRARY]: "构件库",
  [K.LAYOUT_LIBRARY]: "布局",
  [K.WIDGET_LIBRARY]: "挂件",
  [K.VIEW_ROUTE]: "查看路由",
  [K.VIEW_TEMPLATE]: "查看模板",
  [K.VIEW_SNIPPET]: "查看片段",
  [K.BUILD_AND_PUSH_TOOLTIP]: "构建并推送 (Ctrl+B)",
  [K.PREVIEW]: "预览",
  [K.TIPS]: "提示",
  [K.ENTER_FULLSCREEN]: "进入全屏模式",
  [K.EXIT_FULLSCREEN]: "退出全屏模式",
  [K.CLOSE]: "关闭",
  [K.NODE_ACTION_EVENTS_VIEW]: "事件视图",
  [K.NODE_ACTION_COPY]: "复制",
  [K.NODE_ACTION_CUT]: "剪切",
  [K.NODE_ACTION_PASTE]: "粘贴",
  [K.NODE_ACTION_CONVERT_TO_TEMPLATE]: "转换为模板",
  [K.NODE_ACTION_APPEND_BRICK]: "添加子构件",
  [K.NODE_ACTION_APPEND_ROUTE]: "添加子路由",
  [K.NODE_ACTION_DELETE]: "删除",
  [K.NODE_ACTION_VIEW_ROUTE]: "查看路由",
  [K.STORYBOARD_VIEW_TIPS_1_ROUTE]:
    "<i>Storyboard</i> 视图显示当前路由的构件树。",
  [K.STORYBOARD_VIEW_TIPS_1_TEMPLATE]:
    "<i>Storyboard</i> 视图显示当前模板的构件树。",
  [K.STORYBOARD_VIEW_TIPS_2]:
    "拖放构件或挂载点来更改它们的排列顺序。或者拖放构件到其它挂载点。",
  [K.STORYBOARD_VIEW_TIPS_3]:
    "在搜索框中输入关键字，可以根据配置信息来搜索 Storyboard 中的构件。",
  [K.LIBRARY_VIEW_TIPS_1]: "<i>构件库</i>列出所有可用构件。",
  [K.LIBRARY_VIEW_TIPS_2]: "可以搜索并拖放构件到画布中。",
  [K.EVENTS_VIEW_TIPS_1]:
    "<i>事件</i>视图列出有事件监听器或被指定为事件目标的构件。",
  [K.EVENTS_VIEW_TIPS_2]: "点击一个构件来显示它的事件图表。",
  [K.DATA_VIEW_TIPS_1]: "在<i>数据</i>视图中可以管理当前路由的数据。",
  [K.DATA_VIEW_TIPS_2]:
    "数据可以是变量值，也可以是使用 Provider 构件调用获取的远端接口数据。",
  [K.DATA_VIEW_TIPS_3]: "数据在 Storyboard 中也被称作 <i>Context</i>。",
  [K.FIND_BRICKS_BY_CONFIGURATION]: "根据配置信息查找构件",
  [K.SHOW_RELATED_NODES_BASED_ON_EVENTS_WHEN_HOVERING]:
    "悬停时根据事件显示关联构件",
  [K.CANVAS_TYPE_MAIN]: "主画板",
  [K.CANVAS_TYPE_PORTAL]: "Portal 画板",
  [K.BRICK_CATEGORY_RECOMMENDED]: "推荐",
  [K.BRICK_CATEGORY_ATOM]: "原子构件",
  [K.BRICK_CATEGORY_LAYOUT]: "布局与容器",
  [K.BRICK_CATEGORY_CARD]: "卡片列表",
  [K.BRICK_CATEGORY_GENERAL_TABLES]: "表格相关",
  [K.BRICK_CATEGORY_DESCRIPTION]: "详情描述",
  [K.BRICK_CATEGORY_CHART]: "图表相关",
  [K.BRICK_CATEGORY_VALUE_MAPPING]: "数值映射",
  [K.BRICK_CATEGORY_DATA_VIEW]: "数据展示",
  [K.BRICK_CATEGORY_FORM_INPUT]: "表单输入",
  [K.BRICK_CATEGORY_NAVIGATION]: "导航菜单",
  [K.BRICK_CATEGORY_FEEDBACK_AND_TOOLTIP]: "反馈提示",
  [K.BRICK_CATEGORY_DATA_CONVERT]: "数据转换工具",
  [K.BRICK_CATEGORY_TOPOLOGY]: "拓扑",
  [K.BRICK_CATEGORY_OTHER]: "其他",
  [K.LAYOUT_CLASSIC]: "经典布局",
  [K.LAYOUT_BANNER]: "通栏布局",
  [K.LAYOUT_MENU]: "菜单布局",
  [K.METHOD]: "方法",
  [K.EVENTS_HANDLER_BUILTIN_ACTION]: "内置动作",
  [K.EVENTS_HANDLER_USE_PROVIDER]: "调用Provider",
  [K.CUSTOM_EVENTS_SET_PROP]: "设置构件属性",
  [K.CUSTOM_EVENTS_USE_METHOD]: "调用构件方法",
  [K.EVENTS_CUSTOM_BRICK_INTERACTION]: "构件交互",
  [K.NO_EVENTS_TO_ADD]: "无事件可添加",
  [K.DO_NOT_SUPPORT_VISUAL_CONFIG]:
    "当前事件处理器使用了老的配置方式暂不支持，请切换到 yaml 模式修改",
  [K.SELECT_ACTION_LABEL]: "选择动作",
  [K.PROVIDER_TYPE_LABEL]: "Provider 类型",
  [K.BRICK_SELECTOR_LABEL]: "构件",
  [K.PROPERTIES_LABEL]: "属性",
  [K.USE_METHOD_LABEL]: "交互方法",
  [K.ARGS_LABEL]: "参数",
  [K.HANDLE_TYPE_LABEL]: "事件类型",
  [K.CALLBACK_LABEL]: "回调",
  [K.POLLING_LABEL]: "轮询",
  [K.BRICK_EVENT_LABEL]: "处理事项",
  [K.POLLING_ITEM_PLACEHOLDER]: "请填写轮询相关参数",
  [K.BUILTIN_PROVIDER]: "内置Provider",
  [K.IF_LABEL]: "触发条件IF",
  [K.TRANSFORM_LABEL]: "数据转换",
  [K.TRANSFORM_FROM_LABEL]: "指定字段",
  [K.TRANSFORM_MAP_ARRAY]: "数据转换映射",
  [K.TRANSFORM_MAP_ARRAY_TOOLTIP]:
    "设置在数据转换中对数组的映射处理模式，通常不要额外设置，使用默认值即可",
  [K.REJECT_LABEL]: "异常处理",
  [K.TRANSFORM_FROM_TOOLTIP]: "使用返回数据的指定字段作为数据源",
  [K.FLOW_API]: "Flow编排",
  [K.VISUAL_EVENT_ADD_CUSTOM_EVENT_PLACEHOLDER]: "按 Enter 键完成输入",
  [K.LINK_TO_DEVELOPER_PROVIDER_DOC]: "前往开发者中心查看",
  [K.LINK_TO_FLOWER_BUILDER]: "前往 FLow 查看编排",
  [K.LINK_TO_NEXT_DOCS]: "前往文档中心查看",
};

export default locale;
