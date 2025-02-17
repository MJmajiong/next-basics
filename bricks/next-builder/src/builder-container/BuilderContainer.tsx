import React from "react";
import classNames from "classnames";
import { noop } from "lodash";
import { getRuntime } from "@next-core/brick-kit";
import {
  BuilderRouteOrBrickNode,
  ContextConf,
  BuilderRouteNode,
  BuilderCustomTemplateNode,
  BuilderSnippetNode,
  Story,
} from "@next-core/brick-types";
import {
  AbstractBuilderDataManager,
  BuilderRuntimeNode,
  EventDetailOfNodeAdd,
  EventDetailOfNodeMove,
  EventDetailOfNodeReorder,
  EventDetailOfSnippetApply,
  SharedEditorConf,
  useBuilderDataManager,
} from "@next-core/editor-bricks-helper";
import { HighlightTokenSettings } from "@next-libs/code-editor-components";
import { BuilderToolbox } from "./BuilderToolbox/BuilderToolbox";
import { BuilderCanvas } from "./BuilderCanvas/BuilderCanvas";
import {
  BrickOptionItem,
  BuilderClipboard,
  BuilderClipboardType,
  BuilderDataType,
  ToolboxTab,
} from "./interfaces";
import {
  BuilderContextMenu,
  BuilderContextMenuProps,
} from "./BuilderContextMenu/BuilderContextMenu";
import { BuilderUIContext } from "./BuilderUIContext";
import { BuilderToolbar } from "./BuilderToolbar/BuilderToolbar";
import { getBuilderClipboard } from "./getBuilderClipboard";
import { defaultToolboxTab } from "./constants";
import { EventStreamNode } from "./EventStreamCanvas/interfaces";
import { StoriesCache } from "../data-providers/utils/StoriesCache";

import styles from "./BuilderContainer.module.css";

export const InstallExpandInfo = async (
  e: CustomEvent<EventDetailOfNodeAdd>,
  manager: ReturnType<typeof useBuilderDataManager>
): Promise<void> => {
  if (
    getRuntime().getFeatureFlags()["next-builder-stories-json-lazy-loading"]
  ) {
    const store = StoriesCache.getInstance();
    const id = e.detail.nodeData.brick;
    if (!store.hasInstalled(id)) {
      const res = await store.install(
        {
          list: [id],
          fields: ["id", "doc", "examples", "originData"],
        },
        true
      );
      if (res && res.find((item) => item.originData !== null)) {
        // it mean the new node was widget, and we got the originData
        // so we should update the manager data
        manager.storyListInit(store.getStoryList());
        manager.updateBrick(e.detail);
      }
    }
  }
};

export interface BuilderContainerProps extends BuilderContextMenuProps {
  appId?: string;
  dataSource?: BuilderRouteOrBrickNode[];
  brickList?: BrickOptionItem[];
  editorList?: SharedEditorConf[];
  providerList?: string[];
  storyList?: Story[];
  routeList?: BuilderRouteNode[];
  templateList?: BuilderCustomTemplateNode[];
  snippetList?: BuilderSnippetNode[];
  templateSources?: BuilderCustomTemplateNode[];
  processing?: boolean;
  highlightTokens?: HighlightTokenSettings[];
  containerForContextModal?: string;
  migrateClipboard?: boolean;
  clipboardData?: BuilderClipboard;
  initialFullscreen?: boolean;
  initialToolboxTab?: ToolboxTab;
  initialEventStreamNodeId?: string;
  /** @deprecated */
  initialClipboardType?: BuilderClipboardType;
  /** @deprecated */
  initialClipboardSource?: string;
  /** @deprecated */
  initialClipboardNodeType?: string;
  initialCanvasIndex?: number;
  initialStoryboardQuery?: string;
  onNodeAdd?: (event: CustomEvent<EventDetailOfNodeAdd>) => void;
  onSnippetApply?: (event: CustomEvent<EventDetailOfSnippetApply>) => void;
  onNodeReorder?: (event: CustomEvent<EventDetailOfNodeReorder>) => void;
  onNodeMove?: (event: CustomEvent<EventDetailOfNodeMove>) => void;
  onNodeClick?: (event: CustomEvent<BuilderRuntimeNode>) => void;
  onToggleFullscreen?: (fullscreen?: boolean) => void;
  onSwitchToolboxTab?: (tab?: ToolboxTab) => void;
  onSelectEventStreamNode?: (nodeId?: string) => void;
  /** @deprecated */
  onClipboardChange?: (clipboard: BuilderClipboard) => void;
  onContextUpdate?: (context: ContextConf[]) => void;
  onRouteSelect?: (route: BuilderRouteNode) => void;
  onTemplateSelect?: (template: BuilderCustomTemplateNode) => void;
  onSnippetSelect?: (snippet: BuilderSnippetNode) => void;
  onCurrentRouteClick?: (route: BuilderRouteNode) => void;
  onCurrentTemplateClick?: (template: BuilderCustomTemplateNode) => void;
  onCurrentSnippetClick?: (snippet: BuilderSnippetNode) => void;
  onBuildAndPush?: () => void;
  onPreview?: () => void;
  onEventNodeClick?: (eventNode: EventStreamNode) => void;
  onConvertToTemplate?: (node: BuilderRuntimeNode) => void;
  onWorkbenchClose?: () => void;
  onSwitchCanvasIndex?: (canvasIndex: number) => void;
  onStoryboardQueryUpdate?: (storyboardQuery: string) => void;
  onClickHighlightToken?: (token: { type: string; value: string }) => void;
}

export function LegacyBuilderContainer(
  {
    appId,
    dataSource,
    brickList,
    editorList,
    providerList,
    storyList,
    routeList,
    templateList,
    snippetList,
    templateSources,
    processing,
    highlightTokens,
    containerForContextModal,
    migrateClipboard,
    clipboardData,
    initialFullscreen,
    initialToolboxTab,
    initialEventStreamNodeId,
    initialClipboardType,
    initialClipboardSource,
    initialClipboardNodeType,
    initialCanvasIndex,
    initialStoryboardQuery,
    onNodeAdd,
    onSnippetApply,
    onNodeReorder,
    onNodeMove,
    onNodeClick,
    onAskForDeletingNode,
    onAskForAppendingBrick,
    onAskForAppendingRoute,
    onToggleFullscreen,
    onSwitchToolboxTab,
    onSelectEventStreamNode,
    onClipboardChange,
    onNodeCopy,
    onNodeCut,
    onNodeCopyPaste,
    onNodeCutPaste,
    onClipboardClear,
    onContextUpdate,
    onRouteSelect,
    onTemplateSelect,
    onSnippetSelect,
    onCurrentRouteClick,
    onCurrentTemplateClick,
    onCurrentSnippetClick,
    onBuildAndPush,
    onPreview,
    onEventNodeClick,
    onConvertToTemplate,
    onWorkbenchClose,
    onSwitchCanvasIndex,
    onStoryboardQueryUpdate,
    onClickHighlightToken,
  }: BuilderContainerProps,
  ref: React.Ref<AbstractBuilderDataManager>
): React.ReactElement {
  const [fullscreen, setFullscreen] = React.useState(initialFullscreen);
  const [highlightNodes, setHighlightNodes] = React.useState(new Set<number>());

  const memoToolboxTab = React.useMemo(
    () => initialToolboxTab ?? defaultToolboxTab,
    [initialToolboxTab]
  );
  const [toolboxTab, setToolboxTab] = React.useState(memoToolboxTab);

  const [eventStreamNodeId, setEventStreamNodeId] = React.useState(
    initialEventStreamNodeId
  );
  const [dataType, setDataType] = React.useState<BuilderDataType>();

  const memoLegacyClipboard = React.useMemo(
    () =>
      getBuilderClipboard(
        initialClipboardType,
        initialClipboardSource,
        initialClipboardNodeType
      ),
    [initialClipboardType, initialClipboardSource, initialClipboardNodeType]
  );
  const [legacyClipboard, legacySetClipboard] =
    React.useState<BuilderClipboard>(memoLegacyClipboard);

  const memoCanvasIndex = React.useMemo(
    () => initialCanvasIndex,
    [initialCanvasIndex]
  );
  const [canvasIndex, setCanvasIndex] = React.useState(memoCanvasIndex);

  const memoStoryboardQuery = React.useMemo(
    () => initialStoryboardQuery,
    [initialStoryboardQuery]
  );
  const [storyboardQuery, setStoryboardQuery] =
    React.useState(memoStoryboardQuery);

  const manager = useBuilderDataManager();

  React.useImperativeHandle(ref, () => manager);

  React.useEffect(() => {
    setCanvasIndex(memoCanvasIndex);
  }, [memoCanvasIndex]);

  React.useEffect(() => {
    manager.storyListInit(storyList);
  }, [storyList, manager]);

  React.useEffect(() => {
    let type = BuilderDataType.UNKNOWN;
    let rootNode: BuilderRouteOrBrickNode;
    if (dataSource?.length === 1) {
      rootNode = dataSource[0];
      switch (rootNode.type) {
        case "bricks":
          type = BuilderDataType.ROUTE_OF_BRICKS;
          break;
        case "routes":
          type = BuilderDataType.ROUTE_OF_ROUTES;
          break;
        case "redirect":
          type = BuilderDataType.ROUTE_OF_REDIRECT;
          break;
        case "custom-template":
          type = BuilderDataType.CUSTOM_TEMPLATE;
          break;
        case "snippet":
          type = BuilderDataType.SNIPPET;
          break;
        // Rest types are currently not supported,
        // such as `"brick"`.
      }
    }
    if (type !== BuilderDataType.UNKNOWN) {
      manager.dataInit(
        dataSource[0],
        templateSources
          ? new Map(templateSources.map((tpl) => [tpl.templateId, tpl]))
          : undefined
      );
    } else {
      // eslint-disable-next-line no-console
      console.error("Unexpected dataSource", dataSource);
    }
    setDataType(type);
  }, [dataSource, manager, templateSources]);

  React.useEffect(() => {
    // If the canvas index is not specified, set to portal canvas if the
    // canvas is not empty and has only portal bricks in first level,
    // otherwise set to main canvas.
    if (initialCanvasIndex == null) {
      const { rootId, nodes, edges } = manager.getData();
      const rootChildNodes = edges
        .filter((edge) => edge.parent === rootId)
        .map((edge) => nodes.find((node) => node.$$uid === edge.child));
      const newCanvasIndex =
        rootChildNodes.length > 0 &&
        !rootChildNodes.some((node) => !node.portal)
          ? 1
          : 0;
      setCanvasIndex(newCanvasIndex);
    }
  }, [initialCanvasIndex, manager]);

  React.useEffect(() => {
    manager.sharedEditorListInit(editorList);
  }, [editorList, manager]);

  React.useEffect(() => {
    const removeListeners = [
      manager.onNodeAdd((e) => InstallExpandInfo(e, manager)),
      manager.onNodeAdd(onNodeAdd),
      manager.onSnippetApply(onSnippetApply),
      manager.onNodeMove(onNodeMove),
      manager.onNodeReorder(onNodeReorder),
      manager.onNodeClick(onNodeClick),
    ];
    return () => {
      for (const fn of removeListeners) {
        fn();
      }
    };
  }, [
    manager,
    onNodeAdd,
    onNodeClick,
    onNodeMove,
    onNodeReorder,
    onSnippetApply,
  ]);

  React.useEffect(() => {
    setFullscreen(initialFullscreen);
  }, [initialFullscreen]);

  React.useEffect(() => {
    onToggleFullscreen?.(fullscreen);
  }, [fullscreen, onToggleFullscreen]);

  React.useEffect(() => {
    setToolboxTab(memoToolboxTab);
  }, [memoToolboxTab]);

  React.useEffect(() => {
    if (toolboxTab !== ToolboxTab.EVENTS_VIEW) {
      setEventStreamNodeId(null);
    }
    onSwitchToolboxTab?.(toolboxTab);
  }, [toolboxTab, onSwitchToolboxTab]);

  React.useEffect(() => {
    setEventStreamNodeId(initialEventStreamNodeId);
  }, [initialEventStreamNodeId]);

  React.useEffect(() => {
    onSelectEventStreamNode?.(eventStreamNodeId);
  }, [eventStreamNodeId, onSelectEventStreamNode]);

  React.useEffect(() => {
    legacySetClipboard(memoLegacyClipboard);
  }, [memoLegacyClipboard]);

  React.useEffect(() => {
    if (!migrateClipboard) {
      onClipboardChange?.(legacyClipboard);
    }
  }, [legacyClipboard, migrateClipboard, onClipboardChange]);

  React.useEffect(() => {
    onSwitchCanvasIndex?.(canvasIndex);
  }, [canvasIndex, onSwitchCanvasIndex]);

  React.useEffect(() => {
    setStoryboardQuery(memoStoryboardQuery);
  }, [memoStoryboardQuery]);

  React.useEffect(() => {
    onStoryboardQueryUpdate?.(storyboardQuery);
  }, [storyboardQuery, onStoryboardQueryUpdate]);

  const handleClickOverlay = (): void => {
    onWorkbenchClose?.();
  };

  return (
    <BuilderUIContext.Provider
      value={{
        appId,
        dataType,
        brickList,
        providerList,
        storyList,
        routeList,
        templateList,
        snippetList,
        processing,
        containerForContextModal,
        migrateClipboard,
        fullscreen,
        setFullscreen,
        toolboxTab,
        setToolboxTab,
        highlightNodes,
        setHighlightNodes,
        eventStreamNodeId,
        setEventStreamNodeId,
        clipboard: migrateClipboard ? clipboardData : legacyClipboard,
        legacySetClipboard: migrateClipboard ? noop : legacySetClipboard,
        canvasIndex,
        setCanvasIndex,
        storyboardQuery,
        setStoryboardQuery,
        onRouteSelect,
        onTemplateSelect,
        onSnippetSelect,
        onCurrentRouteClick,
        onCurrentTemplateClick,
        onCurrentSnippetClick,
        onBuildAndPush,
        onPreview,
        onEventNodeClick,
        onConvertToTemplate,
        onWorkbenchClose,
        highlightTokens,
        onClickHighlightToken,
      }}
    >
      <div
        className={classNames(styles.builderWrapper, {
          [styles.fullscreen]: fullscreen,
        })}
      >
        <div
          className={styles.builderOverlay}
          onClick={handleClickOverlay}
        ></div>
        <div className={styles.builderContainer}>
          <BuilderToolbar />
          <div className={styles.builderBodyWrapper}>
            <BuilderToolbox onContextUpdate={onContextUpdate} />
            <BuilderCanvas />
          </div>
        </div>
        <BuilderContextMenu
          onAskForDeletingNode={onAskForDeletingNode}
          onAskForAppendingBrick={onAskForAppendingBrick}
          onAskForAppendingRoute={onAskForAppendingRoute}
          onNodeCopy={onNodeCopy}
          onNodeCut={onNodeCut}
          onNodeCopyPaste={onNodeCopyPaste}
          onNodeCutPaste={onNodeCutPaste}
          onClipboardClear={onClipboardClear}
        />
      </div>
    </BuilderUIContext.Provider>
  );
}

export const BuilderContainer = React.forwardRef(LegacyBuilderContainer);
