import { LitElement, html, css, property, customElement, TemplateResult, CSSResult, unsafeCSS } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import uuid from 'uuid/v4';

import stylesheet from './blue-input.scss';
import { InputType, ValidationState } from './types';

@customElement('blue-input')
export class BlueInput extends LitElement {
    private textboxId = uuid();

    @property({ type: String }) value = '';
    @property({ type: String }) name = '';
    @property({ type: String }) type: InputType = 'text';
    @property({ type: String }) placeholder = '';
    @property({ type: Boolean }) required = false;
    @property({ type: Boolean }) disabled = false;
    @property({ type: Boolean }) error = false;
    @property({ type: Number }) maxlength = -1;
    @property({ type: String }) validationState: ValidationState;
    @property({ type: String }) validationMessage = '';

    @property({ reflect: false }) currentCount: number;

    firstUpdated(): void {
        this.currentCount = this.maxlength;
    }

    static get styles(): CSSResult {
        return css`
            ${unsafeCSS(stylesheet)}
        `;
    }

    protected containerClasses = classMap({
        container: true,
        disabled: this.disabled
    });

    protected labelClasses = classMap({
        [`validation-state-${this.validationState}`]: this.validationState !== undefined,
        ['label-error']: this.error
    });

    protected inputClasses = classMap({
        [`validation-state-${this.validationState}`]: this.validationState !== undefined,
        error: this.error
    });

    renderRequiredSpan(): TemplateResult | undefined {
        console.log('required', this.required);
        if (this.required) {
            return html`
                <span class="required">*</span>
            `;
        }

        return undefined;
    }

    renderCountdown(): TemplateResult {
        return html`
            <div class="countdown-container">
                <span>(${this.currentCount})</span>
            </div>
        `;
    }

    handleInput(event: any): void {
        console.log('event', event);
        this.currentCount = this.maxlength - event.target.value.length;
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
                        .value="${this.value}"
                        placeholder="${this.placeholder}"
                        ?required="${this.required}"
                        ?disabled="${this.disabled}"
                        maxlength="${this.maxlength}"
                        @input="${this.handleInput}"
                    />
                    ${this.renderCountdown()}
                </div>
            </div>
        `;
    }
}
