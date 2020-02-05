import {
    LitElement,
    html,
    property,
    customElement,
    TemplateResult
} from 'lit-element';
import stylesheet from './blue-button.scss';

@customElement('blue-button')
export class BlueButton extends LitElement {
    @property() theme = 'default';

    styles = html`<style>${stylesheet.toString()}</style>`;

    render(): TemplateResult {
        return html`
            ${this.styles}
            <button>
                <slot></slot>
            </button>
        `;
    }
}
