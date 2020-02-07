import {
    LitElement,
    html,
    css,
    property,
    customElement,
    TemplateResult,
    CSSResult,
    unsafeCSS,
    query
} from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import uuid from 'uuid/v4';

import stylesheet from './blue-input.scss';
import { TextFieldType } from './types';

@customElement('blue-input')
export class BlueInput extends LitElement {
    private textboxId = uuid();

    @property({ type: String }) value = '';
    @property({ type: String }) name = '';
    @property({ type: String }) type: TextFieldType = 'text';
    @property({ type: String }) placeholder = '';
    @property({ type: String }) required = '';
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) error = false;
    @property({ type: Number }) maxlength = -1;
    @property({ type: String }) validationState = '';
    @property({ type: String }) validationMessage = '';

    @query('input') input: HTMLInputElement;

    static get styles(): CSSResult {
        return css`
            ${unsafeCSS(stylesheet)}
        `;
    }

    private containerClasses = classMap({
        container: true,
        disabled: this.disabled
    });

    private labelClasses = classMap({
        [`validation-state-${this.validationState}`]: this.validationState !== undefined,
        ['label-error']: this.error
    });

    private inputClasses = classMap({
        [`validation-state-${this.validationState}`]: this.validationState !== undefined,
        error: this.error
    });

    renderRequiredSpan(): TemplateResult | undefined {
        if (this.required) {
            return html`
                <span class="required">*</span>
            `;
        }

        return undefined;
    }

    renderCountdown(): TemplateResult | undefined {
        if (this.type === 'countdown' && this.maxlength) {
            return html`
                <div class="countdown-container">
                    <span>(${this.maxlength - this.input.value.length})</span>
                </div>
            `;
        }

        return undefined;
    }

    render(): TemplateResult {
        const { textboxId } = this;
        return html`
            <div class="${this.containerClasses}">
                <label class="${this.labelClasses}" htmlFor="${textboxId}">
                    <slot></slot>
                    ${this.renderRequiredSpan()}
                </label>
                <div class="textbox-container">
                    <div class="icon-container"></div>
                    <input
                        id="${this.textboxId}"
                        class="${this.inputClasses}"
                        name="${this.name}"
                        type="${this.type}"
                        value="${this.value}"
                        placeholder="${this.placeholder}"
                        ?required="${this.required}"
                        ?disabled="${this.disabled}"
                        maxlength="${this.maxlength}"
                    />
                    ${this.renderCountdown()}
                </div>
            </div>
        `;
    }
}
