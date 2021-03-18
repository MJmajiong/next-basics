export const NS_NEXT_BUILDER = "next-builder";

export enum K {
  NEXT_BUILDER = "NEXT_BUILDER",
  LIBRARY = "LIBRARY",
  EVENTS = "EVENTS",
  DATA = "DATA",
  SEARCH_BRICKS_IN_LIBRARY = "SEARCH_BRICKS_IN_LIBRARY",
  SEARCH_DATA = "SEARCH_DATA",
  SEARCH_BRICKS_WITH_EVENTS = "SEARCH_BRICKS_WITH_EVENTS",
  SEARCH_ROUTE = "SEARCH_ROUTE",
  SEARCH_TEMPLATE = "SEARCH_TEMPLATE",
  ADD_DATA = "ADD_DATA",
  SETTING = "SETTING",
  VIEW_ROUTE = "VIEW_ROUTE",
  VIEW_TEMPLATE = "VIEW_TEMPLATE",
  BUILD_AND_PUSH_TOOLTIP = "BUILD_AND_PUSH_TOOLTIP",
  PREVIEW = "PREVIEW",
  BRICK_LIBRARY = "BRICK_LIBRARY",
  TIPS = "TIPS",
  STORYBOARD_VIEW_TIPS_1_ROUTE = "STORYBOARD_VIEW_TIPS_1_ROUTE",
  STORYBOARD_VIEW_TIPS_1_TEMPLATE = "STORYBOARD_VIEW_TIPS_1_TEMPLATE",
  STORYBOARD_VIEW_TIPS_2 = "STORYBOARD_VIEW_TIPS_2",
  STORYBOARD_VIEW_TIPS_3 = "STORYBOARD_VIEW_TIPS_3",
  LIBRARY_VIEW_TIPS_1 = "LIBRARY_VIEW_TIPS_1",
  LIBRARY_VIEW_TIPS_2 = "LIBRARY_VIEW_TIPS_2",
  EVENTS_VIEW_TIPS_1 = "EVENTS_VIEW_TIPS_1",
  EVENTS_VIEW_TIPS_2 = "EVENTS_VIEW_TIPS_2",
  DATA_VIEW_TIPS_1 = "DATA_VIEW_TIPS_1",
  DATA_VIEW_TIPS_2 = "DATA_VIEW_TIPS_2",
  DATA_VIEW_TIPS_3 = "DATA_VIEW_TIPS_3",
  FIND = "FIND",
}

export type Locale = { [key in K]: string };
