import { html } from 'lit-html';
import { DemoTemplate } from '../types';

export default {
    title: 'Input',
    template: html`
        <blue-input name="test" type="text" placeholder="Input Example">Input Example</blue-input>
    `,
    callback: (doc: Document): void => {
        console.dir(doc);
    }
} as DemoTemplate;
