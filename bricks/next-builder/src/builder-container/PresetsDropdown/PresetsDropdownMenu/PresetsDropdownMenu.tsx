import React from "react";
import { BrickPresets } from "../constants";
import { PresetBrickItem } from "../PresetBrickItem/PresetBrickItem";

import styles from "./PresetsDropdownMenu.module.css";

interface PresetsDropdownMenuProps {
  onDraggingChange?: (isDragging: boolean) => void;
}

export function PresetsDropdownMenu({
  onDraggingChange,
}: PresetsDropdownMenuProps): React.ReactElement {
  return (
    <div className={styles.presetsMenuWrapper}>
      <div className={styles.presetsMenuTitle}>View Layout:</div>
      <div className={styles.presetsMenu}>
        {BrickPresets.map((preset, index) => (
          <PresetBrickItem
            key={index}
            preset={preset}
            onDraggingChange={onDraggingChange}
          />
        ))}
      </div>
    </div>
  );
}
