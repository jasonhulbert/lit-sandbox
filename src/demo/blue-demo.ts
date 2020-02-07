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
import { DemoModules, DemoModule } from './types';
import { BlueDemoNav } from './blue-demo-nav';
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

    demoModules: DemoModules;
    activeDemoModule: DemoModule;

    @query('blue-demo-frame') frame: BlueDemoFrame;

    @query('blue-demo-nav') nav: BlueDemoNav;

    static get styles(): CSSResult {
        return css`
            :host {
                position: absolute;
                top: 0;
                left: 0;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                width: 100%;
                height: 100%;
                align-content: center;
            }

            .nav,
            .frame {
                box-sizing: border-box;
            }

            .nav {
                flex: 1 0 20%;
                max-width: 16rem;
                background: #ebebeb;
                border-right: 1px solid #cccccc;
            }

            .frame {
                flex: 1 1 80%;
            }
        `;
    }

    constructor() {
        super();

        this.demoModules = demoModules;

        this.watchLocationHash();
    }

    render(): TemplateResult {
        return html`
            <div class="nav">
                <blue-demo-nav .demoModules="${this.demoModules}"></blue-demo-nav>
            </div>
            <div class="frame">
                <blue-demo-frame .index="${this.frameIndex}" .demoModule="${this.activeDemoModule}"></blue-demo-frame>
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
        const module = await demoModules[demo].moduleLoader();
        this.activeDemoModule = module;
        this.frame.demoModule = this.activeDemoModule;
    }
}
