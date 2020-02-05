import {
    LitElement,
    css,
    html,
    property,
    customElement,
    CSSResult,
    TemplateResult
} from 'lit-element';

@customElement('blue-card')
export class BlueCard extends LitElement {
    @property() theme = 'blue';

    static get styles(): CSSResult {
        return css`
            :host {
                display: block;
            }
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
