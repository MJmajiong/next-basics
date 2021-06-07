import React from "react";
import ReactDOM from "react-dom";
import { BrickWrapper, UpdatingElement } from "@next-core/brick-kit";

export function EasyViewPreview(): React.ReactElement {
  return <div>EasyViewPreview</div>;
}

class EasyViewPreviewElement extends UpdatingElement {
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
          <EasyViewPreview />
        </BrickWrapper>,
        this
      );
    }
  }
}

customElements.define(
  "basic-bricks.easy-view--preview",
  EasyViewPreviewElement
);
