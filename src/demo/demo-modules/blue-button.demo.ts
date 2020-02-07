import { html } from 'lit-html';
import { DemoTemplate } from '../types';

export default {
    title: 'Button',
    template: html`
        <blue-button>Button Example</blue-button>
    `,
    callback: (doc: Document): void => {
        doc.querySelector('blue-button')?.addEventListener('click', () => console.log('click'));
    }
} as DemoTemplate;
