import { customElement, LitElement, TemplateResult, html, css, property, PropertyValues, CSSResult } from 'lit-element';
import { DemoModules } from './types';

@customElement('blue-demo-nav')
export class BlueDemoNav extends LitElement {
    @property({ type: Object })
    demoModules: DemoModules;

    static get styles(): CSSResult {
        return css`
            :host {
                display: block;
                padding: 1rem;
            }

            ul,
            li {
                display: block;
            }

            ul {
                margin: 0;
                padding: 0;
                list-style: none;
            }

            li {
                font-weight: normal;
                border-top: 1px solid #cccccc;
            }

            li:first-child {
                border-top: 0;
            }

            a {
                display: block;
                padding: 0.5rem;
                text-decoration: none;
                line-height: 1.1;
                color: royalblue;
                white-space: nowrap;
            }
        `;
    }

    constructor() {
        super();

        this.demoModules = {};
    }

    render(): TemplateResult {
        return html`
            <div>
                <ul>
                    ${Object.keys(this.demoModules).map(
                        name => html`
                            <li><a href="#${name}">${this.demoModules[name]?.title}</a></li>
                        `
                    )}
                </ul>
            </div>
        `;
    }

    updated(changed: PropertyValues): void {
        console.log(changed);
    }
}
