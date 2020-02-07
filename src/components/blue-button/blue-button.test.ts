import { BlueButton } from './blue-button';
import { fixture, html, expect, assert } from '@open-wc/testing';

const basic = html`
    <blue-button>Test</blue-button>
`;

describe('blue-button', () => {
    let element: BlueButton;

    before(async () => {
        element = await fixture(basic);
        document.body.appendChild(element);
    });

    after(() => {
        document.body.removeChild(element);
    });

    it('passes sanity check', () => {
        assert.instanceOf(element, BlueButton);
    });

    it('renders', async () => {
        await expect(element).dom.to.be.accessible();
    });

    it('get/set disabled updates the disabled property', async () => {
        element.disabled = true;
        await element.updateComplete;
        const button = element.shadowRoot?.querySelector('button');
        expect(button?.hasAttribute('disabled')).to.be.true;

        element.disabled = false;
        await element.updateComplete;
        assert.equal(button?.hasAttribute('disabled'), false);
    });
});
