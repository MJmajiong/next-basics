import {
  filterBricks,
  processBricks,
  getShortName,
  insertBricks,
} from "./filterBrick";
import { Story } from "@next-core/brick-types";
import { BrickOptionItem, LayerType } from "../interfaces";

jest.mock("../constants.ts", () => ({
  brickSearchResultLimit: 24,
  LIB_ALL_CATEGORY: "all",
  frequentlyUsedBricks: [
    {
      type: "brick",
      name: "basic-bricks.micro-view",
    },
    {
      type: "brick",
      name: "basic-bricks.general-button",
    },
    {
      type: "brick",
      name: "basic-bricks.general-card",
    },
  ],
}));

describe("processor", () => {
  describe("get short name", () => {
    it("should return brick type", () => {
      const brick = {
        type: "brick",
        name: "forms.general-input",
      } as BrickOptionItem;
      const result = getShortName(brick, "my-app");
      expect(result).toEqual("general-input");
    });

    it("should return customTemplate type", () => {
      const brick = {
        type: "customTemplate",
        name: "tpl-my-template",
      } as BrickOptionItem;
      const result = getShortName(brick, "my-app");
      expect(result).toEqual("tpl-my-template");
    });

    it("should return snippet type", () => {
      const brick = {
        type: "snippet",
        name: "snippet-test",
      } as BrickOptionItem;
      const result = getShortName(brick, "my-app");
      expect(result).toEqual("snippet-test");
    });
  });

  describe("process bricks", () => {
    it("should merge story data", () => {
      const brickList = [
        {
          type: "brick",
          name: "forms.general-input",
          layerType: "brick",
        },
        {
          type: "brick",
          name: "basic-bricks.general-card",
          layerType: "brick",
        },
        {
          type: "brick",
          name: "chart-v2.pie-chart",
          layerType: "brick",
        },
      ] as BrickOptionItem[];

      const storyList = [
        {
          category: "form-input",
          icon: {
            icon: "pencil-alt",
            lib: "fa",
          },
          storyId: "forms.general-input",
          text: {
            en: "general input",
            zh: "普通输入框",
          },
          description: {
            en: "general input",
            zh: "普通输入框",
          },
        },
        {
          category: "card",
          icon: {
            icon: "chevron-down",
            lib: "fa",
          },
          storyId: "basic-bricks.general-card",
          text: {
            en: "general-card",
            zh: "卡片",
          },
        },
      ] as Partial<Story>[] as Story[];

      const result = processBricks(
        brickList,
        storyList,
        "my-app",
        "form-input",
        LayerType.BRICK
      );

      expect(result).toEqual([
        {
          category: "form-input",
          description: "普通输入框",
          icon: { icon: "pencil-alt", lib: "fa" },
          name: "forms.general-input",
          layerType: "brick",
          shortName: "general-input",
          title: "普通输入框",
          type: "brick",
        },
      ]);
    });

    it("should show frequently bricks", () => {
      const brickList = [
        {
          type: "brick",
          name: "forms.general-input",
          layerType: "brick",
        },
        {
          type: "brick",
          name: "basic-bricks.general-card",
          layerType: "brick",
        },
        {
          type: "brick",
          name: "chart-v2.pie-chart",
          layerType: "brick",
        },
      ] as BrickOptionItem[];

      const storyList = [
        {
          category: "form-input",
          icon: {
            icon: "pencil-alt",
            lib: "fa",
          },
          storyId: "forms.general-input",
          text: {
            en: "general input",
            zh: "普通输入框",
          },
          description: {
            en: "general input",
            zh: "普通输入框",
          },
        },
        {
          category: "card",
          icon: {
            icon: "chevron-down",
            lib: "fa",
          },
          storyId: "basic-bricks.general-card",
          text: {
            en: "general-card",
            zh: "卡片",
          },
        },
      ] as Partial<Story>[] as Story[];

      const result = processBricks(
        brickList,
        storyList,
        "my-app",
        undefined,
        LayerType.BRICK
      );
      expect(result).toEqual([
        {
          name: "basic-bricks.micro-view",
          shortName: "micro-view",
          type: "brick",
        },
        {
          name: "basic-bricks.general-button",
          shortName: "general-button",
          type: "brick",
        },
        {
          category: "card",
          description: undefined,
          icon: { icon: "chevron-down", lib: "fa" },
          name: "basic-bricks.general-card",
          shortName: "general-card",
          title: "卡片",
          type: "brick",
        },
        {
          category: "form-input",
          description: "普通输入框",
          icon: { icon: "pencil-alt", lib: "fa" },
          name: "forms.general-input",
          shortName: "general-input",
          title: "普通输入框",
          type: "brick",
          layerType: "brick",
        },
        {
          name: "chart-v2.pie-chart",
          shortName: "pie-chart",
          type: "brick",
          layerType: "brick",
        },
      ]);
    });
  });

  describe("filter bricks", () => {
    it("return filter result", () => {
      const brickList: BrickOptionItem[] = [
        {
          type: "brick",
          name: "forms.general-input",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          name: "basic-bricks.general-card",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          name: "forms.general-form",
          layerType: LayerType.BRICK,
        },
        {
          type: "customTemplate",
          name: "tpl-create-form",
          layerType: LayerType.BRICK,
        },
      ];

      const storyList = [
        {
          category: "form-input",
          icon: {
            icon: "pencil-alt",
            lib: "fa",
          },
          storyId: "forms.general-input",
          text: {
            en: "general input",
            zh: "普通输入框",
          },
          description: {
            en: "general input",
            zh: "普通输入框",
          },
        },
        {
          category: "card",
          icon: {
            icon: "chevron-down",
            lib: "fa",
          },
          storyId: "basic-bricks.general-card",
          text: {
            en: "general-card",
            zh: "卡片",
          },
        },
      ] as Partial<Story>[] as Story[];

      const result = filterBricks({
        q: "",
        category: "all",
        brickList,
        storyList,
        appId: "my-app",
        layerType: LayerType.BRICK,
      });
      expect(result).toEqual([
        {
          type: "brick",
          name: "basic-bricks.micro-view",
          shortName: "micro-view",
        },
        {
          type: "brick",
          name: "basic-bricks.general-button",
          shortName: "general-button",
        },
        {
          category: "card",
          description: undefined,
          icon: {
            icon: "chevron-down",
            lib: "fa",
          },
          title: "卡片",
          type: "brick",
          name: "basic-bricks.general-card",
          shortName: "general-card",
        },
        {
          category: "form-input",
          description: "普通输入框",
          icon: { icon: "pencil-alt", lib: "fa" },
          name: "forms.general-input",
          shortName: "general-input",
          title: "普通输入框",
          type: "brick",
          layerType: LayerType.BRICK,
        },
        {
          name: "forms.general-form",
          shortName: "general-form",
          type: "brick",
          layerType: LayerType.BRICK,
        },
        {
          type: "customTemplate",
          shortName: "tpl-create-form",
          name: "tpl-create-form",
          layerType: LayerType.BRICK,
        },
      ]);

      const result2 = filterBricks({
        q: undefined,
        category: "form-input",
        brickList,
        storyList,
        appId: "my-app",
        layerType: LayerType.BRICK,
      });
      expect(result2).toEqual([
        {
          category: "form-input",
          description: "普通输入框",
          icon: { icon: "pencil-alt", lib: "fa" },
          name: "forms.general-input",
          shortName: "general-input",
          title: "普通输入框",
          type: "brick",
          layerType: LayerType.BRICK,
        },
      ]);

      const result3 = filterBricks({
        q: "general-input",
        brickList,
        storyList,
        appId: "my-app",
        layerType: LayerType.BRICK,
      });
      expect(result3).toEqual([
        {
          category: "form-input",
          description: "普通输入框",
          icon: { icon: "pencil-alt", lib: "fa" },
          name: "forms.general-input",
          shortName: "general-input",
          title: "普通输入框",
          type: "brick",
          layerType: LayerType.BRICK,
        },
      ]);

      const result4 = filterBricks({
        q: "general",
        brickList,
        storyList,
        appId: "my-app",
        limit: 2,
        layerType: LayerType.BRICK,
      });
      expect(result4).toEqual([
        {
          name: "basic-bricks.general-button",
          shortName: "general-button",
          type: "brick",
        },
        {
          category: "card",
          description: undefined,
          icon: { icon: "chevron-down", lib: "fa" },
          name: "basic-bricks.general-card",
          shortName: "general-card",
          title: "卡片",
          type: "brick",
        },
      ]);

      const result5 = filterBricks({
        q: "",
        brickList,
        storyList,
        appId: "my-app",
        rootNode: {
          type: "custom-template",
          templateId: "tpl-create-form",
          id: "B-001",
        },
        layerType: LayerType.BRICK,
      });

      expect(result5).toEqual([
        {
          type: "brick",
          name: "basic-bricks.micro-view",
          shortName: "micro-view",
        },
        {
          type: "brick",
          name: "basic-bricks.general-button",
          shortName: "general-button",
        },
        {
          category: "card",
          description: undefined,
          icon: {
            icon: "chevron-down",
            lib: "fa",
          },
          title: "卡片",
          type: "brick",
          name: "basic-bricks.general-card",
          shortName: "general-card",
        },
        {
          category: "form-input",
          description: "普通输入框",
          icon: { icon: "pencil-alt", lib: "fa" },
          name: "forms.general-input",
          shortName: "general-input",
          title: "普通输入框",
          type: "brick",
          layerType: LayerType.BRICK,
        },
        {
          name: "forms.general-form",
          shortName: "general-form",
          type: "brick",
          layerType: LayerType.BRICK,
        },
      ]);
    });

    it("should return layout result", () => {
      const brickList: BrickOptionItem[] = [
        {
          type: "brick",
          name: "forms.general-input",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          name: "basic-bricks.general-card",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          name: "forms.general-form",
          layerType: LayerType.BRICK,
        },
        {
          type: "customTemplate",
          name: "tpl-create-form",
          layerType: LayerType.BRICK,
        },
        {
          type: "snippet",
          name: "basic-bricks.easy-view[classic]",
          layerType: LayerType.LAYOUT,
          category: "layout",
        },
        {
          type: "snippet",
          name: "basic-bricks.easy-view[basic]",
          layerType: LayerType.LAYOUT,
          category: "layout",
        },
        {
          type: "snippet",
          name: "basic-bricks.easy-view[right-aligned-menu]",
          layerType: LayerType.LAYOUT,
          category: "layout",
        },
      ];

      const storyList = [
        {
          category: "form-input",
          icon: {
            icon: "pencil-alt",
            lib: "fa",
          },
          storyId: "forms.general-input",
          text: {
            en: "general input",
            zh: "普通输入框",
          },
          description: {
            en: "general input",
            zh: "普通输入框",
          },
        },
        {
          category: "card",
          icon: {
            icon: "chevron-down",
            lib: "fa",
          },
          storyId: "basic-bricks.general-card",
          text: {
            en: "general-card",
            zh: "卡片",
          },
        },
      ] as Partial<Story>[] as Story[];

      const result = filterBricks({
        q: "",
        category: "layout",
        brickList,
        storyList,
        appId: "my-app",
        layerType: LayerType.LAYOUT,
      });

      expect(result).toEqual([
        {
          type: "snippet",
          name: "basic-bricks.easy-view[classic]",
          layerType: LayerType.LAYOUT,
          category: "layout",
          shortName: "easy-view[classic]",
        },
        {
          type: "snippet",
          name: "basic-bricks.easy-view[basic]",
          layerType: LayerType.LAYOUT,
          category: "layout",
          shortName: "easy-view[basic]",
        },
        {
          type: "snippet",
          name: "basic-bricks.easy-view[right-aligned-menu]",
          layerType: LayerType.LAYOUT,
          category: "layout",
          shortName: "easy-view[right-aligned-menu]",
        },
      ]);
    });

    it("should return snippets result", () => {
      const brickList: BrickOptionItem[] = [
        {
          type: "brick",
          name: "forms.general-input",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          name: "basic-bricks.general-card",
          layerType: LayerType.BRICK,
        },
        {
          type: "brick",
          name: "forms.general-form",
          layerType: LayerType.BRICK,
        },
        {
          type: "customTemplate",
          name: "tpl-create-form",
          layerType: LayerType.BRICK,
        },
        {
          type: "snippet",
          name: "basic-bricks.easy-view[classic]",
          layerType: LayerType.WIDGET,
          category: "layout",
        },
        {
          type: "snippet",
          name: "basic-bricks.easy-view[basic]",
          layerType: LayerType.WIDGET,
          category: "layout",
        },
        {
          type: "snippet",
          name: "basic-bricks.easy-view[right-aligned-menu]",
          layerType: LayerType.WIDGET,
          category: "layout",
        },
      ];

      const storyList = [
        {
          category: "form-input",
          icon: {
            icon: "pencil-alt",
            lib: "fa",
          },
          storyId: "forms.general-input",
          text: {
            en: "general input",
            zh: "普通输入框",
          },
          description: {
            en: "general input",
            zh: "普通输入框",
          },
        },
        {
          category: "card",
          icon: {
            icon: "chevron-down",
            lib: "fa",
          },
          storyId: "basic-bricks.general-card",
          text: {
            en: "general-card",
            zh: "卡片",
          },
        },
      ] as Partial<Story>[] as Story[];

      const result = filterBricks({
        q: "",
        category: "layout",
        brickList,
        storyList,
        appId: "my-app",
        layerType: LayerType.WIDGET,
      });

      expect(result).toEqual([
        {
          type: "snippet",
          name: "basic-bricks.easy-view[classic]",
          layerType: LayerType.WIDGET,
          category: "layout",
          shortName: "easy-view[classic]",
        },
        {
          type: "snippet",
          name: "basic-bricks.easy-view[basic]",
          layerType: LayerType.WIDGET,
          category: "layout",
          shortName: "easy-view[basic]",
        },
        {
          type: "snippet",
          name: "basic-bricks.easy-view[right-aligned-menu]",
          layerType: LayerType.WIDGET,
          category: "layout",
          shortName: "easy-view[right-aligned-menu]",
        },
      ]);
    });
  });

  describe("insert Bricks", () => {
    it("should insert specified bricks", () => {
      const brickList: BrickOptionItem[] = [
        {
          type: "brick",
          name: "basic-bricks.micro-view",
        },
        {
          type: "brick",
          name: "basic-bricks.general-button",
        },
        {
          type: "brick",
          name: "basic-bricks.general-card",
        },
        {
          type: "brick",
          name: "basic-bricks.grid-layout",
        },
        {
          type: "brick",
          name: "basic-bricks.general-modal",
        },
        {
          type: "brick",
          name: "basic-bricks.general-drawer",
        },
        {
          type: "brick",
          name: "basic-bricks.general-custom-buttons",
        },
        {
          type: "brick",
          name: "basic-bricks.popover-container",
        },
      ];

      const frequentlyUsedBricks: BrickOptionItem[] = [
        { type: "customTemplate", name: "tpl-my-template" },
        {
          type: "brick",
          name: "basic-bricks.popover-container",
        },
        {
          type: "brick",
          name: "basic-bricks.general-custom-buttons",
        },
        {
          type: "template",
          name: "general-list.general-card-list",
        },
        {
          type: "brick",
          name: "basic-bricks.general-drawer",
        },
      ];

      const result = insertBricks(brickList, frequentlyUsedBricks);

      expect(result).toEqual([
        { type: "customTemplate", name: "tpl-my-template" },
        {
          type: "brick",
          name: "basic-bricks.popover-container",
        },
        {
          type: "brick",
          name: "basic-bricks.general-custom-buttons",
        },
        {
          type: "template",
          name: "general-list.general-card-list",
        },
        {
          type: "brick",
          name: "basic-bricks.general-drawer",
        },
        {
          type: "brick",
          name: "basic-bricks.micro-view",
        },
        {
          type: "brick",
          name: "basic-bricks.general-button",
        },
        {
          type: "brick",
          name: "basic-bricks.general-card",
        },
        {
          type: "brick",
          name: "basic-bricks.grid-layout",
        },
        {
          type: "brick",
          name: "basic-bricks.general-modal",
        },
      ]);
    });
  });
});
