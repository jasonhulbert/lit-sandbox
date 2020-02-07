import { LitElement, html, css, property, customElement, TemplateResult, CSSResult } from 'lit-element';

import { style } from './blue-button-css';

@customElement('blue-button')
export class BlueButton extends LitElement {
    @property() theme = 'default';
    @property({ type: Boolean, reflect: true }) disabled = false;

    static get styles(): CSSResult {
        return css`
            ${style}
        `;
    }

    render(): TemplateResult {
        return html`
            <button id="button" ?disabled="${this.disabled}">
                <slot></slot>
            </button>
        `;
    }
}
