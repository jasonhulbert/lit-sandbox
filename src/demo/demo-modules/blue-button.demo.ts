import { html } from 'lit-html';
import { DemoTemplate } from '../types';

export default {
    title: 'Button',
    template: html`
        <blue-button>Button Example</blue-button>
    `,
    onload: (doc: Document): void => {
        console.dir(doc);
    }
} as DemoTemplate;
