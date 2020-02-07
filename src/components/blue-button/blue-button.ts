import { LitElement, html, css, property, customElement, TemplateResult, CSSResult, unsafeCSS } from 'lit-element';

//import stylesheet from './blue-button.scss';

@customElement('blue-button')
export class BlueButton extends LitElement {
    @property() theme = 'default';
    @property({type: Boolean, reflect: true}) disabled = false;

    static get styles(): CSSResult {
        // TODO: Figure out sass imports
        // return css`
        //     ${unsafeCSS(stylesheet.toString())}
        // `;
        return css`
            ${unsafeCSS(':host {}')}
        `;
    }

    render(): TemplateResult {
        return html`
            <button
                id="button"
                ?disabled="${this.disabled}">
                <slot></slot>
            </button>
        `;
    }
}
