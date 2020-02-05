import {
    LitElement,
    html,
    property,
    customElement,
    TemplateResult
} from 'lit-element';
import _styles from './blue-button.scss';

@customElement('blue-button')
export class BlueButton extends LitElement {
    @property() theme = 'blue';

    styles = html`<style>${_styles.toString()}</style>`;

    render(): TemplateResult {
        return html`
            ${this.styles}
            <button>
                <slot></slot>
            </button>
        `;
    }
}
