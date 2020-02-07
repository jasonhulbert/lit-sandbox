import { LitElement, html, css, property, customElement, TemplateResult, CSSResult, unsafeCSS } from 'lit-element';

import stylesheet from './blue-button.scss';

@customElement('blue-button')
export class BlueButton extends LitElement {
    @property() theme = 'default';

    static get styles(): CSSResult {
        return css`
            ${unsafeCSS(stylesheet.toString())}
        `;
    }

    render(): TemplateResult {
        return html`
            <button>
                <slot></slot>
            </button>
        `;
    }
}
