import { Demos, DemoModule } from '../types';

export default {
    button: (): Promise<DemoModule> => import(/* webpackChunkName: "demo/blue-button.demo" */ './blue-button.demo'),
    card: (): Promise<DemoModule> => import(/* webpackChunkName: "demo/blue-card.demo" */ './blue-card.demo')
} as Demos;
