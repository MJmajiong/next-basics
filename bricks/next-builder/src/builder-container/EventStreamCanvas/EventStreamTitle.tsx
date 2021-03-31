/* istanbul ignore file */
// Todo(steve): Ignore tests temporarily for potential breaking change in the future.
import React from "react";
import classNames from "classnames";
import {
  EventDownstreamNodeOfEvent,
  EventDownstreamNodeOfRoot,
  EventDownstreamType,
  EventStreamNode,
  EventUpstreamType,
} from "./interfaces";
import { styleConfig } from "./styleConfig";

import styles from "./EventStreamTitle.module.css";

export interface EventStreamTitleProps {
  eventNode: EventStreamNode;
  onEventNodeClick?: (eventNode: EventStreamNode) => void;
}

export function EventStreamTitle({
  eventNode,
  onEventNodeClick,
}: EventStreamTitleProps): React.ReactElement {
  const isUpstreamSource = eventNode.type === EventUpstreamType.UPSTREAM_SOURCE;
  if (isUpstreamSource || eventNode.type === EventDownstreamType.ROOT) {
    return (
      <div
        className={classNames(styles.title, {
          [styles.upstreamSource]: isUpstreamSource,
        })}
        style={styleConfig.title}
      >
        {(eventNode as EventDownstreamNodeOfRoot).node.alias}
      </div>
    );
  }

  let eventCategory: string;

  switch (eventNode.type) {
    case EventDownstreamType.CALLBACK:
    case EventUpstreamType.UPSTREAM_CALLBACK:
      eventCategory = "callback";
      break;
    case EventDownstreamType.LIFE_CYCLE:
    case EventUpstreamType.UPSTREAM_LIFE_CYCLE:
      eventCategory = "lifeCycle";
      break;
    default:
      eventCategory = "event";
  }

  const handleClick = () => {
    onEventNodeClick?.(eventNode);
  };

  return (
    <div
      className={classNames(styles.title, styles.clickable)}
      style={{
        ...styleConfig.title,
        marginBottom: styleConfig.titleMarginBottom,
      }}
      onClick={handleClick}
    >
      <span className={styles.eventCategory}>{`${eventCategory}: `}</span>
      <span>{(eventNode as EventDownstreamNodeOfEvent).eventType}</span>
    </div>
  );
}
