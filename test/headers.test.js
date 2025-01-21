import { expect, fixture, html } from '@open-wc/testing';
import { localize } from '@lion/localize';

import '../src/header/Header.js';

describe('Header Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<loan-header></loan-header>`);
  });

  it('renders correctly at refresh', () => {
    const headerText = element.shadowRoot
      .querySelector('header p')
      .textContent.trim();
    const enButton = element.shadowRoot.querySelector('#en-GB');
    const nlButton = element.shadowRoot.querySelector('#nl-NL');

    expect(headerText).to.equal(localize.msg('change-language:heading'));
    expect(enButton).to.exist;
    expect(nlButton).to.exist;
    expect(enButton.classList.contains('bg-btn-color')).to.be.true;
    expect(nlButton.classList.contains('btn-cursor')).to.be.true;
  });

  it('changes language to "nl-NL" when NL button is clicked', async () => {
    const nlButton = element.shadowRoot.querySelector('#nl-NL');
    const enButton = element.shadowRoot.querySelector('#en-GB');

    nlButton.click();
    await element.updateComplete;

    expect(localize.locale).to.equal('nl-NL');
    expect(nlButton.classList.contains('bg-btn-color')).to.be.true;
    expect(nlButton.classList.contains('btn-cursor')).to.be.false;
    expect(enButton.classList.contains('bg-btn-color')).to.be.false;
    expect(enButton.classList.contains('btn-cursor')).to.be.true;
  });

  it('changes language to "en-GB" when EN button is clicked', async () => {
    const nlButton = element.shadowRoot.querySelector('#nl-NL');
    const enButton = element.shadowRoot.querySelector('#en-GB');

    nlButton.click();
    await element.updateComplete;
    enButton.click();
    await element.updateComplete;

    expect(localize.locale).to.equal('en-GB');
    expect(enButton.classList.contains('bg-btn-color')).to.be.true;
    expect(enButton.classList.contains('btn-cursor')).to.be.false;
    expect(nlButton.classList.contains('bg-btn-color')).to.be.false;
    expect(nlButton.classList.contains('btn-cursor')).to.be.true;
  });
});
