import { BlueInput } from './blue-input';
import { fixture, html, expect, assert } from '@open-wc/testing';

const basic = html`
    <blue-input>Test</blue-input>
`;

describe('blue-input', () => {
    let element: BlueInput;

    before(async () => {
        element = await fixture(basic);
        document.body.appendChild(element);
    });

    after(() => {
        document.body.removeChild(element);
    });

    it('passes sanity check', () => {
        assert.instanceOf(element, BlueInput);
    });

    it('renders', async () => {
        await expect(element).dom.to.be.accessible();
    });
});
