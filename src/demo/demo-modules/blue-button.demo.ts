import { html } from 'lit-html';

export default {
    title: 'Button',
    template: html`
        <blue-button>Button Example</blue-button>
    `,
    onload: (doc: Document): void => {
        console.dir(doc);
    }
};
