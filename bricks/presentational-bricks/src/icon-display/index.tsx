import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { IconDisplay } from "./IconDisplay";
import { MenuIcon } from "@next-core/brick-types";

/**
 * @id presentational-bricks.icon-display
 * @name presentational-bricks.icon-display
 * @author nlicroshan
 * @history
 * 1.x.0: 新增构件 `presentational-bricks.icon-display`
 * @docKind brick
 * @noInheritDoc
 */
export class IconDisplayElement extends UpdatingElement {
  /**
   * @kind MenuIcon
   * @required true
   * @default -
   * @description 图标
   */
  @property({
    attribute: false,
  })
  icon: MenuIcon;

  /**
   * @kind  boolean
   * @default false
   * @required false
   * @description 是否反转icon和背景的颜色。此时背景色为icon传入的颜色，icon为白色
   */
  @property({ attribute: false })
  reverseBgColor: boolean;

  /**
   * @kind object
   * @required false
   * @default -
   * @description icon样式
   */
  @property({
    attribute: false,
  })
  iconStyle: React.CSSProperties;

  /**
   * @kind object
   * @required false
   * @default -
   * @description icon容器样式
   */
  @property({
    attribute: false,
  })
  iconContainerStyle: React.CSSProperties;

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
          <IconDisplay
            icon={this.icon}
            reverseBgColor={this.reverseBgColor}
            iconStyle={this.iconStyle}
            iconContainerStyle={this.iconContainerStyle}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("presentational-bricks.icon-display", IconDisplayElement);
