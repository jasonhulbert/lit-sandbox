import { html } from 'lit-html';
import { DemoTemplate } from '../types';

export default {
    title: 'Card',
    template: html`
        <blue-card>Card Example</blue-card>
    `,
    onload: (doc: Document): void => {
        console.dir(doc);
    }
} as DemoTemplate;
