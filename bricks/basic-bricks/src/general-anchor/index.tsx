import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property, UpdatingElement } from "@next-core/brick-kit";
import { GeneralAnchor } from "./GeneralAnchor";
import { AnchorLinkProps, AnchorProps } from "antd";
import { UseBrickConf } from "@next-core/brick-types";
export interface AnchorListType extends AnchorLinkProps {
  /* 其他参数请参考 https://ant.design/components/anchor-cn/#Link-Props */
  title: string;
  href: string;
  target?: string;
  children?: AnchorListType[];
}

/**
 * @id basic-bricks.general-anchor
 * @author astrid
 * @history
 * 1.138.0: 新增构件 `basic-bricks.general-anchor`
 * @docKind brick
 * @noInheritDoc
 */
export class GeneralAnchorElement extends UpdatingElement {
  /**
   * @kind `AnchorListType[]`
   * @required true
   * @default -
   * @description 锚点链接的list,会根据list的结构渲染出对应的锚点排布,
   */
  @property({
    attribute: false,
  })
  anchorList: AnchorListType[];

  /**
   * @kind `AnchorProps`
   * @required false
   * @default -
   * @description 锚点的具体参数，这里offsetTop设置了默认为`56`，其他参数可参考antd https://ant.design/docs/react/use-in-typescript-cn#Anchor-Props
   */
  @property({
    attribute: false,
  })
  configProps: AnchorProps;

  /**
   * @kind `"default" | "radio"`
   * @required false
   * @default `default`
   * @description 锚点的类型 ， `radio` 的类型不支持 `anchorList`属性有`children`，否则会样式有问题
   */
  @property({
    attribute: false,
  })
  type: "default" | "radio";
  /**
   * @kind `{ useBrick: UseBrickConf }`
   * @required false
   * @default  -
   * @description 右上角有操作区
   * @group basic
   */
  @property({ attribute: false })
  extraBrick: { useBrick: UseBrickConf };

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
          <GeneralAnchor
            anchorList={this.anchorList}
            configProps={this.configProps}
            type={this.type || "default"}
            extraBrick={this.extraBrick}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("basic-bricks.general-anchor", GeneralAnchorElement);
