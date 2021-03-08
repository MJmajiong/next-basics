import React from "react";
import { useBuilderGroupedChildNodes } from "@next-core/editor-bricks-helper";
import { StoryboardTreeNodeList } from "../StoryboardTreeNodeList/StoryboardTreeNodeList";
import { ToolboxPane } from "../ToolboxPane/ToolboxPane";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BuilderDataType } from "../interfaces";

import styles from "./StoryboardTreeView.module.css";

export function StoryboardTreeView(): React.ReactElement {
  const groups = useBuilderGroupedChildNodes({ isRoot: true });
  const { dataType } = useBuilderUIContext();
  const mountPoint =
    dataType === BuilderDataType.ROUTE_OF_ROUTES ? "routes" : "bricks";
  const childNodes = React.useMemo(
    () =>
      groups.find((group) => group.mountPoint === mountPoint)?.childNodes ?? [],
    [groups, mountPoint]
  );

  return (
    <ToolboxPane title="Storyboard">
      <div className={styles.treeView}>
        <div className={styles.treeWrapper}>
          <StoryboardTreeNodeList
            level={1}
            mountPoint={mountPoint}
            childNodes={childNodes}
          />
        </div>
      </div>
    </ToolboxPane>
  );
}
