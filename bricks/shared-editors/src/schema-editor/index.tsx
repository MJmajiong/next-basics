import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, property } from "@next-core/brick-kit";
import { FormItemElement } from "@next-libs/forms";
import { SchemaEditor, SchemaItemProperty } from "./SchemaEditor";

/**
 * @id shared-editors.schema-editor
 * @author jojiang
 * @history
 * 1.x.0: 新增构件 `shared-editors.schema-editor`
 * @docKind brick
 * @noInheritDoc
 */
export class SchemaEditorElement extends FormItemElement {
  /**
   * @kind any[]
   * @required -️
   * @default -
   * @description schema编辑器的属性列表数据
   * @group basic
   */
  @property({
    attribute: false,
  })
  value: SchemaItemProperty[];

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
          <SchemaEditor
            formElement={this.getFormElement()}
            name={this.name}
            label={this.label}
            required={this.required}
            value={this.value}
            labelTooltip={this.labelTooltip}
            helpBrick={this.helpBrick}
            labelBrick={this.labelBrick}
            labelCol={this.labelCol}
            wrapperCol={this.wrapperCol}
          />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define("shared-editors.schema-editor", SchemaEditorElement);
