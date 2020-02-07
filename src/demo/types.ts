import { TemplateResult } from 'lit-element';

export interface DemoModules {
    [name: string]: {
        title: string;
        moduleLoader: () => Promise<DemoModule>;
    };
}

export interface DemoModule {
    default?: DemoTemplate;
}

export interface DemoTemplate {
    title: string;
    template: TemplateResult;
    callback: Function;
}
