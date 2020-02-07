import {
    customElement,
    LitElement,
    TemplateResult,
    html,
    CSSResult,
    css,
    property,
    query,
    PropertyValues
} from 'lit-element';
import parseLocationHash from './utils/parseLocationHash';
import demoModules from './demo-modules';
import { DemoModule } from './types';
import './blue-demo-frame';
import './blue-demo-nav';
import { BlueDemoFrame } from './blue-demo-frame';

@customElement('blue-demo')
export class BlueDemo extends LitElement {
    @property({
        type: String,
        attribute: 'frame-index'
    })
    frameIndex: string;

    @property({
        type: String,
        attribute: 'active-demo',
        reflect: true
    })
    activeDemo: string;

    activeDemoModule: DemoModule;

    @query('blue-demo-frame') frame: BlueDemoFrame;

    static get styles(): CSSResult {
        return css`
            :host {
                display: block;
            }
        `;
    }

    constructor() {
        super();

        this.watchLocationHash();
    }

    render(): TemplateResult {
        return html`
            <div class="wrap">
                <div class="nav">
                    <blue-demo-nav></blue-demo-frame>
                </div>
                <div class="frame">
                    <blue-demo-frame .index="${this.frameIndex}" .demoModule="${this.activeDemoModule}"></blue-demo-frame>
                </div>
            </div>
        `;
    }

    firstUpdated(changed: PropertyValues): void {
        this.activeDemo = parseLocationHash();
        this.initDemoModule(this.activeDemo);

        super.firstUpdated(changed);
    }

    watchLocationHash(): void {
        window.addEventListener('hashchange', () => {
            this.activeDemo = parseLocationHash();
            this.initDemoModule(this.activeDemo);
        });
    }

    async initDemoModule(demo: string): Promise<void> {
        this.activeDemoModule = await this.loadDemoModule(demo);
        this.frame.demoModule = this.activeDemoModule;
    }

    async loadDemoModule(demo: string): Promise<DemoModule> {
        return await demoModules[demo]();
    }
}
