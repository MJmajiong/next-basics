import React from "react";
import { Menu } from "antd";
import {
  useBuilderContextMenuStatus,
  useBuilderDataManager,
  BuilderRuntimeNode,
  isBrickNode,
} from "@next-core/editor-bricks-helper";
import { useTranslation } from "react-i18next";
import { useBuilderUIContext } from "../BuilderUIContext";
import {
  BuilderAppendBrickDetail,
  BuilderClipboardType,
  BuilderPasteDetailOfCopy,
  BuilderPasteDetailOfCut,
  ToolboxTab,
} from "../interfaces";
import { useCanPaste } from "./useCanPaste";
import { K, NS_NEXT_BUILDER } from "../../i18n/constants";

import styles from "./BuilderContextMenu.module.css";

export interface BuilderContextMenuProps {
  onAskForDeletingNode?: (node: BuilderRuntimeNode) => void;
  onNodeCopyPaste?: (detail: BuilderPasteDetailOfCopy) => void;
  onNodeCutPaste?: (detail: BuilderPasteDetailOfCut) => void;
  onAskForAppendingBrick?: (detail: BuilderAppendBrickDetail) => void;
}

export function BuilderContextMenu({
  onAskForDeletingNode,
  onNodeCopyPaste,
  onNodeCutPaste,
  onAskForAppendingBrick,
}: BuilderContextMenuProps): React.ReactElement {
  const { t } = useTranslation(NS_NEXT_BUILDER);
  const contextMenuStatus = useBuilderContextMenuStatus();
  const manager = useBuilderDataManager();
  const {
    clipboard,
    setClipboard,
    setToolboxTab,
    setEventStreamNodeId,
  } = useBuilderUIContext();
  const canPasteCallback = useCanPaste();
  const canPaste = React.useMemo(
    () => canPasteCallback(clipboard, contextMenuStatus.node),
    [canPasteCallback, clipboard, contextMenuStatus.node]
  );

  const handleCloseMenu = React.useCallback(
    (event: React.MouseEvent) => {
      event.preventDefault();
      manager.contextMenuChange({
        active: false,
      });
    },
    [manager]
  );

  const handleDeleteNode = React.useCallback(() => {
    onAskForDeletingNode(contextMenuStatus.node);
  }, [contextMenuStatus.node, onAskForDeletingNode]);

  const handleShowEventsView = React.useCallback(() => {
    setToolboxTab(ToolboxTab.EVENTS_VIEW);
    setEventStreamNodeId(contextMenuStatus.node.id);
  }, [contextMenuStatus.node, setEventStreamNodeId, setToolboxTab]);

  const handleCopyNode = React.useCallback(() => {
    setClipboard({
      type: BuilderClipboardType.COPY,
      sourceId: contextMenuStatus.node.id,
    });
  }, [contextMenuStatus.node, setClipboard]);

  const handleCutNode = React.useCallback(() => {
    setClipboard({
      type: BuilderClipboardType.CUT,
      sourceInstanceId: contextMenuStatus.node.instanceId,
    });
  }, [contextMenuStatus.node, setClipboard]);

  const handlePasteNode = React.useCallback(() => {
    if (clipboard.type === BuilderClipboardType.CUT) {
      onNodeCutPaste({
        sourceInstanceId: clipboard.sourceInstanceId,
        targetInstanceId: contextMenuStatus.node.instanceId,
      });
    } else {
      onNodeCopyPaste({
        sourceId: clipboard.sourceId,
        targetId: contextMenuStatus.node.id,
      });
    }
    setClipboard(null);
  }, [
    clipboard,
    contextMenuStatus.node,
    onNodeCopyPaste,
    onNodeCutPaste,
    setClipboard,
  ]);

  const activeNodeIsBrick = React.useMemo(
    () => !!contextMenuStatus.node && isBrickNode(contextMenuStatus.node),
    [contextMenuStatus.node]
  );

  const handleAppendBrick = React.useCallback(() => {
    onAskForAppendingBrick({
      node: contextMenuStatus.node,
      defaultSort: Math.max(
        manager
          .getData()
          .edges.filter((edge) => edge.parent === contextMenuStatus.node.$$uid)
          .length
      ),
    });
  }, [contextMenuStatus.node, manager, onAskForAppendingBrick]);

  return (
    <div
      className={styles.menuWrapper}
      style={{
        display: contextMenuStatus.active ? "block" : "none",
      }}
      onClick={handleCloseMenu}
      onContextMenu={handleCloseMenu}
    >
      {contextMenuStatus.active && (
        <Menu
          prefixCls="ant-dropdown-menu"
          style={{
            left: contextMenuStatus.x,
            top: contextMenuStatus.y,
            width: "fit-content",
          }}
        >
          {activeNodeIsBrick && (
            <Menu.Item key="events-view" onClick={handleShowEventsView}>
              {t(K.NODE_ACTION_EVENTS_VIEW)}
            </Menu.Item>
          )}
          <Menu.Item
            key="copy"
            onClick={handleCopyNode}
            disabled={!activeNodeIsBrick}
          >
            {t(K.NODE_ACTION_COPY)}
          </Menu.Item>
          <Menu.Item
            key="cut"
            onClick={handleCutNode}
            disabled={!activeNodeIsBrick}
          >
            {t(K.NODE_ACTION_CUT)}
          </Menu.Item>
          <Menu.Item key="paste" onClick={handlePasteNode} disabled={!canPaste}>
            {t(K.NODE_ACTION_PASTE)}
          </Menu.Item>
          {activeNodeIsBrick && (
            <Menu.Item key="append-brick" onClick={handleAppendBrick}>
              {t(K.NODE_ACTION_APPEND_BRICK)}
            </Menu.Item>
          )}
          <Menu.Item key="delete" onClick={handleDeleteNode}>
            {t(K.NODE_ACTION_DELETE)}
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
}
