import React from "react";
import { Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import {
  BranchesOutlined,
  CaretRightOutlined,
  ApiOutlined,
  BlockOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  SettingOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import {
  BuilderRouteNode,
  BuilderCustomTemplateNode,
  BuilderSnippetNode,
} from "@next-core/brick-types";
import { useBuilderNode } from "@next-core/editor-bricks-helper";
import styles from "./BuilderToolbar.module.css";
import { RootNodeSelect } from "../RootNodeSelect/RootNodeSelect";
import { LibraryDropdown } from "../LibraryDropdown/LibraryDropdown";
import { SettingDropdown } from "../SettingDropdown/SettingDropdown";
import { useBuilderUIContext } from "../BuilderUIContext";
import { BuilderDataType } from "../interfaces";
import { NS_NEXT_BUILDER, K } from "../../i18n/constants";
import shareStyles from "../share.module.css";

export function BuilderToolbar(): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);

  const {
    onCurrentRouteClick,
    onCurrentTemplateClick,
    onCurrentSnippetClick,
    onBuildAndPush,
    onPreview,
    dataType,
    fullscreen,
    setFullscreen,
    onWorkbenchClose,
  } = useBuilderUIContext();

  const rootNode = useBuilderNode({ isRoot: true });

  const handleRouteClick = () => {
    onCurrentRouteClick?.(rootNode as BuilderRouteNode);
  };

  const handleTemplateClick = () => {
    onCurrentTemplateClick?.(rootNode as BuilderCustomTemplateNode);
  };

  const handleSnippetClick = () => {
    onCurrentSnippetClick?.(rootNode as BuilderSnippetNode);
  };

  const handlePreview = () => {
    onPreview?.();
  };

  const handleBuildAndPush = () => {
    onBuildAndPush?.();
  };

  const handleToggleFullscreen = React.useCallback(() => {
    setFullscreen((prev) => !prev);
  }, [setFullscreen]);

  const handleClose = () => {
    onWorkbenchClose?.();
  };

  return (
    <div className={styles.toolbarContainer}>
      <div className={styles.toolbarLeft}>
        {dataType === BuilderDataType.SNIPPET ? (
          <Tooltip title={t(K.VIEW_SNIPPET)} placement="bottomLeft">
            <a
              className={shareStyles.tabLink}
              role="button"
              onClick={handleSnippetClick}
              data-testid="view-snippet"
            >
              <BlockOutlined />
            </a>
          </Tooltip>
        ) : dataType === BuilderDataType.CUSTOM_TEMPLATE ? (
          <Tooltip title={t(K.VIEW_TEMPLATE)} placement="bottomLeft">
            <a
              className={shareStyles.tabLink}
              role="button"
              onClick={handleTemplateClick}
              data-testid="view-template"
            >
              <BlockOutlined />
            </a>
          </Tooltip>
        ) : (
          <Tooltip title={t(K.VIEW_ROUTE)} placement="bottomLeft">
            <a
              className={shareStyles.tabLink}
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
        <LibraryDropdown />
        <Tooltip title={t(K.BUILD_AND_PUSH_TOOLTIP)} placement="bottomRight">
          <a
            className={shareStyles.tabLink}
            role="button"
            onClick={handleBuildAndPush}
            data-testid="build-and-push"
          >
            <ApiOutlined />
          </a>
        </Tooltip>
        <Tooltip title={t(K.PREVIEW)} placement="bottomRight">
          <a
            className={shareStyles.tabLink}
            role="button"
            onClick={handlePreview}
            data-testid="preview"
          >
            <CaretRightOutlined />
          </a>
        </Tooltip>
        <SettingDropdown />
        {!fullscreen && (
          <Tooltip
            title={t(fullscreen ? K.EXIT_FULLSCREEN : K.ENTER_FULLSCREEN)}
            placement="bottomRight"
          >
            <a
              className={shareStyles.tabLink}
              role="button"
              onClick={handleToggleFullscreen}
              data-testid="toggle-fullscreen"
            >
              {fullscreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            </a>
          </Tooltip>
        )}
        <Tooltip title={t(K.CLOSE)} placement="bottomRight">
          <a
            className={shareStyles.tabLink}
            role="button"
            onClick={handleClose}
            data-testid="workbench-close"
          >
            <CloseOutlined />
          </a>
        </Tooltip>
      </div>
    </div>
  );
}
