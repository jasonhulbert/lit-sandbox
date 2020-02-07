import { LitElement, html, css, customElement, TemplateResult, query, property, CSSResult } from 'lit-element';
import { DemoModule } from './types';

@customElement('blue-demo-frame')
export class BlueDemoFrame extends LitElement {
    @property({ type: String }) index: string;

    @property({ type: Object })
    demoModule: DemoModule;

    @query('.frame') frame: HTMLIFrameElement;

    frameLoaded: boolean;

    static get styles(): CSSResult {
        return css`
            :host {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                border: 0;
                outline: 0;
                width: 100%;
                height: 100%;
                background: #f1f1f1;
            }

            .resizer {
                overflow-x: hidden;
                overflow-y: scroll;
                position: absolute;
                top: 50%;
                left: 50%;
                display: block;
                resize: both;
                width: calc(100% - 4rem);
                height: calc(100% - 4rem);
                max-width: calc(100% - 4rem);
                max-height: calc(100% - 4rem);
                background: #ffffff;
                transform: translate(-50%, -50%);
                box-shadow: 5px 5px 30px -5px rgba(0, 0, 0, 0.2);
            }

            .frame {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                border: 0;
                outline: 0;
                width: 100%;
                height: 100%;
            }
        `;
    }

    constructor() {
        super();

        this.frameLoaded = false;
    }

    render(): TemplateResult {
        return html`
            <div class="resizer">
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
