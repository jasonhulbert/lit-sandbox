import { LitElement, html, customElement, TemplateResult, query } from 'lit-element';

@customElement('blue-demo-frame')
export class BlueDemoFrame extends LitElement {
    @query('.frame') static readonly frame: HTMLIFrameElement;

    render(): TemplateResult {
        return html`
            <iframe class=".frame"></iframe>
        `;
    }

    connectedCallback(): void {
        console.dir(BlueDemoFrame.frame);
    }
}