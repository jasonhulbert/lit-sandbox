import { TemplateResult } from 'lit-element';

// export type DemoModule =
//     | typeof import('./demo-modules/blue-button.demo')
//     | typeof import('./demo-modules/blue-card.demo');

export interface DemoModule {
    default?: Demo;
}

export interface Demo {
    title: string;
    template: TemplateResult;
    onload: Function;
}

export interface Demos {
    [name: string]: Function;
}
