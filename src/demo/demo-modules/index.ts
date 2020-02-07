import { DemoModules, DemoModule } from '../types';

const demos: DemoModules = {
    button: {
        title: 'Button',
        moduleLoader: (): Promise<DemoModule> =>
            import(/* webpackChunkName: "demo/blue-button.demo" */ './blue-button.demo')
    },
    card: {
        title: 'Card',
        moduleLoader: (): Promise<DemoModule> =>
            import(/* webpackChunkName: "demo/blue-card.demo" */ './blue-card.demo')
    },
    input: {
        title: 'Input',
        moduleLoader: (): Promise<DemoModule> =>
            import(/* webpackChunkName: "demo/blue-input.demo" */ './blue-input.demo')
    }
};

export default demos;
