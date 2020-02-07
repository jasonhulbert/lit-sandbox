import { LitElement, html, css, customElement, TemplateResult, query, property, CSSResult } from 'lit-element';
import { DemoModule } from './types';

@customElement('blue-demo-frame')
export class BlueDemoFrame extends LitElement {
    @property({ type: String }) index: string;

    @property({ type: Object }) demoModule: DemoModule;

    @query('.frame') frame: HTMLIFrameElement;

    frameLoaded: boolean;

    static get styles(): CSSResult {
        return css`
            :host {
                display: block;
                width: 100%;
            }

            .frame {
                display: block;
                border: 0;
                outline: 0;
                width: 100%;
            }
        `;
    }

    constructor() {
        super();

        this.frameLoaded = false;
    }

    render(): TemplateResult {
        return html`
            <div>
                <iframe class="frame" src=${this.index}></iframe>
            </div>
        `;
    }

    firstUpdated(): void {
        this.frame.addEventListener(
            'load',
            () => {
                this.frameLoaded = true;
                this.renderDemo(this.demoModule);
            },
            true
        );
    }

    updated(): void {
        this.renderDemo(this.demoModule);
    }

    renderDemo(demoModule: DemoModule): void {
        if (!this.demoModule || !this.frameLoaded) return;

        if (this.frame && this.frame.contentDocument) {
            this.frame.contentDocument.body.innerHTML = demoModule.default?.template.getHTML() as string;
            demoModule.default?.callback.apply(demoModule.default, [
                this.frame.contentDocument,
                this.frame.contentWindow
            ]);
        }
    }
}
