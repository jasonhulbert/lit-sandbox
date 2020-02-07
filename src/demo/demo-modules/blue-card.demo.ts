import { html } from 'lit-html';
import { DemoTemplate } from '../types';

export default {
    title: 'Card',
    template: html`
        <blue-card>Card Example</blue-card>
    `,
    callback: (win: Window, doc: Document): void => {
        console.log(win, doc);
    }
} as DemoTemplate;
