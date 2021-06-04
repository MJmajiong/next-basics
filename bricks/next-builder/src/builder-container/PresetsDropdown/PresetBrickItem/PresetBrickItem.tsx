import React, { useEffect } from "react";
import { useDrag } from "react-dnd";
import { BuilderDataTransferType } from "@next-core/editor-bricks-helper";
import { BrickPreset } from "../../interfaces";

import styles from "./PresetBrickItem.module.css";

export interface PresetBrickItemProps {
  preset: BrickPreset;
  onDraggingChange?: (isDragging: boolean) => void;
}

export function PresetBrickItem({
  preset,
  onDraggingChange,
}: PresetBrickItemProps): React.ReactElement {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: BuilderDataTransferType.NODE_TO_ADD,
      brickType: preset.type ?? "brick",
      brick: preset.brick,
      properties: preset.properties,
    },
    options: {
      dropEffect: "copy",
    },
    collect: /* istanbul ignore next */ (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  useEffect(() => {
    onDraggingChange?.(isDragging);
  }, [isDragging, onDraggingChange]);

  return (
    <div className={styles.presetBrickItem} ref={dragRef}>
      <span>{preset.title}</span>
      {/* <img src={preset.preview} /> */}
      <preset.preview />
    </div>
  );
}
