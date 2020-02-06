import { LitElement, html, property, customElement, TemplateResult, CSSResult, css, unsafeCSS } from 'lit-element';
import stylesheet from './blue-card.scss';

@customElement('blue-card')
export class BlueCard extends LitElement {
    @property() theme = 'default';

    static get styles(): CSSResult {
        return css`
            ${unsafeCSS(stylesheet)}
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
