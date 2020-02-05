import { customElement, LitElement, TemplateResult, html } from 'lit-element';
import './blue-demo-frame';
import './blue-demo-nav';

@customElement('blue-demo')
export class BlueDemo extends LitElement {
    render(): TemplateResult {
        return html`
            <div class="wrap">
                <div class="nav">
                    <blue-demo-nav></blue-demo-frame>
                </div>
                <div class="frame">
                    <blue-demo-frame></blue-demo-frame>
                </div>
            </div>
        `;
    }
}