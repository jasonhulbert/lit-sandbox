import {
    LitElement,
    html,
    property,
    customElement,
    TemplateResult
} from 'lit-element';
//import stylesheet from './blue-button.scss';

@customElement('blue-button')
export class BlueButton extends LitElement {
    @property() theme = 'default';
    @property({type: Boolean, reflect: true}) disabled = false;

    styles = html`<style></style>`;

    render(): TemplateResult {
        return html`
            ${this.styles}
            <button
                id="button"
                ?disabled="${this.disabled}">
                <slot></slot>
            </button>
        `;
    }
}
