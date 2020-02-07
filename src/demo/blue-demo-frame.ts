import {
    LitElement,
    html,
    css,
    customElement,
    TemplateResult,
    query,
    property,
    CSSResult,
    PropertyValues
} from 'lit-element';
import { DemoModule } from './types';

@customElement('blue-demo-frame')
export class BlueDemoFrame extends LitElement {
    @property({ type: String }) index: string;

    @property({ type: Object }) demoModule: DemoModule;

    @query('.frame') frame: HTMLIFrameElement;

    private frameLoaded: boolean;

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

    updated(changed: PropertyValues): void {
        if (changed.has('demoModule') && this.demoModule) {
            if (this.frameLoaded === false) {
                this.frame.addEventListener(
                    'load',
                    () => {
                        this.frameLoaded = true;
                        this.renderDemo(this.demoModule);
                    },
                    true
                );
            } else {
                this.renderDemo(this.demoModule);
            }
        }
    }

    renderDemo(demoModule: DemoModule): void {
        if (!this.frameLoaded) return;

        if (this.frame && this.frame.contentDocument) {
            console.dir(this.frame.contentDocument);

            this.frame.contentDocument.body.innerHTML = demoModule.default?.template.getHTML() as string;
        }
    }
}
