import React from "react";
import styles from "./BuilderToolbar.module.css";
import { RootNodeSelect } from "../RootNodeSelect/RootNodeSelect";
import {
  BranchesOutlined,
  CaretRightOutlined,
  ApiOutlined,
} from "@ant-design/icons";
import { BuilderRouteNode } from "@next-core/brick-types";
import { useBuilderUIContext } from "../BuilderUIContext";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import { BuilderDataType } from "../interfaces";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";

export function BuilderToolbar(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const {
    onCurrentRouteClick,
    onBuildAndPush,
    onPreview,
    dataType,
  } = useBuilderUIContext();
  const rootNode = useBuilderNode({ isRoot: true });
  const handleRouteClick = () => {
    onCurrentRouteClick?.(rootNode as BuilderRouteNode);
  };

  const handlePreview = () => {
    onPreview?.();
  };

  const handleBuildAndPush = () => {
    onBuildAndPush?.();
  };

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.toolbarLeft}>
        {dataType !== BuilderDataType.CUSTOM_TEMPLATE && (
          <Tooltip title={t(K.VIEW_ROUTE)} placement="bottomLeft">
            <a
              className={styles.tabLink}
              role="button"
              onClick={handleRouteClick}
              data-testid="view-route"
            >
              <BranchesOutlined />
            </a>
          </Tooltip>
        )}
        <RootNodeSelect />
      </div>
      <div className={styles.toolbarRight}>
        <Tooltip title={t(K.BUILD_AND_PUSH_TOOLTIP)} placement="bottomRight">
          <a
            className={styles.tabLink}
            role="button"
            onClick={handleBuildAndPush}
            data-testid="build-and-push"
          >
            <ApiOutlined />
          </a>
        </Tooltip>
        <Tooltip title={t(K.PREVIEW)} placement="bottomRight">
          <a
            className={styles.tabLink}
            role="button"
            onClick={handlePreview}
            data-testid="preview"
          >
            <CaretRightOutlined />
          </a>
        </Tooltip>
      </div>
    </div>
  );
}
