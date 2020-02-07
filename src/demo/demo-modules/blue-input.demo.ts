import { html } from 'lit-html';
import { DemoTemplate } from '../types';

export default {
    title: 'Input',
    template: html`
        <blue-input required name="test" type="countdown" placeholder="Input Example" maxlength="25"
            >Input Example</blue-input
        >
    `,
    callback: (doc: Document): void => {
        console.dir(doc);
    }
} as DemoTemplate;
