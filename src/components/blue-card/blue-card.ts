import { LitElement, html, property, customElement, TemplateResult, CSSResult, css } from 'lit-element';

import { style } from './blue-card-css';

@customElement('blue-card')
export class BlueCard extends LitElement {
    @property() theme = 'default';

    static get styles(): CSSResult {
        return css`
            ${style}
        `;
    }

    render(): TemplateResult {
        return html`
            <div>
                <slot></slot>
            </div>
        `;
    }
}
