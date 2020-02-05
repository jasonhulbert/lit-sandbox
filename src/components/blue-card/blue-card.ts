import {
    LitElement,
    html,
    property,
    customElement,
    TemplateResult
} from 'lit-element';
import stylesheet from './blue-card.scss';

@customElement('blue-card')
export class BlueCard extends LitElement {
    @property() theme = 'default';

    styles = html`<style>${stylesheet.toString()}</style>`;

    render(): TemplateResult {
        return html`
            <div>
                <slot></slot>
            </div>
        `;
    }
}
