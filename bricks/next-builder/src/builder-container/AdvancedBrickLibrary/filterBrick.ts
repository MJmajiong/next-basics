import i18next from "i18next";
import { isNil, uniqBy } from "lodash";
import {
  Story,
  I18nString,
  BuilderRouteOrBrickNode,
} from "@next-core/brick-types";
import {
  brickSearchResultLimit,
  LIB_ALL_CATEGORY,
  frequentlyUsedBricks,
} from "../constants";
import { BrickOptionItem } from "../interfaces";

const lang = i18next.language
  ? (i18next.language.split("-")[0] as keyof I18nString)
  : "zh";

export function filterBricks({
  q,
  category = LIB_ALL_CATEGORY,
  brickList,
  storyList,
  limit = brickSearchResultLimit,
  appId,
  rootNode,
}: {
  q: string;
  category?: string;
  brickList: BrickOptionItem[];
  storyList: Story[];
  limit?: number;
  appId: string;
  rootNode?: BuilderRouteOrBrickNode;
}): BrickOptionItem[] {
  const formatBrickList = processBricks(
    rootNode?.type === "custom-template"
      ? brickList.filter((item) => item.name !== rootNode.templateId)
      : brickList,
    storyList,
    appId,
    category
  );

  const keywords = (q ?? "").toLowerCase().match(/\S+/g);
  if (!keywords) {
    return formatBrickList.slice(0, limit);
  }

  const bricks: BrickOptionItem[] = [];
  for (const brick of formatBrickList) {
    if (
      keywords.every(
        (keyword) =>
          brick.name.toLowerCase().includes(keyword) ||
          brick.title?.toLowerCase()?.includes(keyword)
      )
    ) {
      bricks.push(brick);
      if (bricks.length === limit) {
        break;
      }
    }
  }
  return bricks;
}

function processBricks(
  brickList: BrickOptionItem[],
  storyList: Story[],
  appId: string,
  category: string = LIB_ALL_CATEGORY
): BrickOptionItem[] {
  const sortedBricks =
    category === LIB_ALL_CATEGORY
      ? insertBricks(brickList, frequentlyUsedBricks)
      : brickList;

  return sortedBricks
    .map((item) => {
      const brick = {
        ...item,
        shortName: getShortName(item),
      };
      const find = storyList?.find((story) => story.storyId === item.name);
      if (find) {
        return {
          ...brick,
          category: find.category,
          title: find.text?.[lang],
          description: find.description?.[lang],
          icon: find.icon,
        };
      }

      return brick;
    })
    .filter((item) => {
      if (isNil(category) || category === LIB_ALL_CATEGORY) {
        return true;
      }

      return item.category === category;
    });
}

function getShortName(brick: BrickOptionItem): string {
  if (brick.type === "customTemplate" && !brick.name.includes(".")) {
    return brick.name;
  } else {
    const [, ...rest] = brick.name.split(".");
    return rest.join(".");
  }
}

export function insertBricks(
  bricks: BrickOptionItem[],
  frequentlyUsedBricks: BrickOptionItem[]
): BrickOptionItem[] {
  return uniqBy(
    frequentlyUsedBricks.concat(bricks),
    (item) => `${item.type}:${item.name}`
  );
}
