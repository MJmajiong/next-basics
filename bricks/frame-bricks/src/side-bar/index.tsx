import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { ExpandedState, SideBar } from "./SideBar";
import { SidebarSubMenu } from "@next-core/brick-types";

/**
 * @id frame-bricks.side-bar
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `frame-bricks.side-bar`
 * @docKind brick
 * @noInheritDoc
 */
export class SideBarElement extends UpdatingElement {
  /**
   * @kind SidebarSubMenu
   * @required false
   * @default -
   * @description 菜单项
   */
  @property({
    attribute: false,
  })
  menu: SidebarSubMenu;

  /**
   * @kind ExpandedState
   * @required false
   * @default -
   * @description 展开状态，默认折叠收起
   */
  @property({
    attribute: false,
  })
  expandedState: ExpandedState = ExpandedState.Collapsed;

  connectedCallback(): void {
    // Don't override user's style settings.
    // istanbul ignore else
    if (!this.style.display) {
      this.style.display = "block";
    }
    this._render();
  }

  disconnectedCallback(): void {
    ReactDOM.unmountComponentAtNode(this);
  }

  protected _render(): void {
    // istanbul ignore else
    if (this.isConnected) {
      ReactDOM.render(
        <BrickWrapper>
          <SideBar menu={this.menu} expandedState={this.expandedState} />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("frame-bricks.side-bar", SideBarElement);
