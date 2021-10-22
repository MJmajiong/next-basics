import { Chapter } from "../interfaces";
import BrickCollectionInstanceExecutionMD from "../docs/presentational-bricks/brick-collection-instance-execution.md";

const chapter: Chapter = {
  title: {
    en: "Auto Collection",
    zh: "自动采集",
  },
  stories: [
    {
      id: "presentational-bricks.brick-collection-instance-execution",
      text: {
        en: "execute collection instance",
        zh: "执行采集实例",
      },
      examples: {
        brick: "presentational-bricks.brick-collection-instance-execution",
      },
      doc: BrickCollectionInstanceExecutionMD,
    },
  ],
};
export default chapter;
