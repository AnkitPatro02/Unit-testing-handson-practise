import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/SuccessAndError/Success.js';
import { localize } from '@lion/localize';
import { Router } from '@vaadin/router';

describe('LoanSuccess Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<loan-success></loan-success>`);
  });

  it('renders correctly with localized content', () => {
    const heading = element.shadowRoot.querySelector('h2').textContent.trim();
    const description = element.shadowRoot
      .querySelector('p')
      .textContent.trim();
    const button = element.shadowRoot.querySelector('.home-btn');

    expect(heading).to.equal(`${localize.msg('change-language:congo')}!!!`);
    expect(description).to.equal(localize.msg('change-language:scsDesc'));
    expect(button.textContent.trim()).to.equal(
      localize.msg('change-language:home')
    );
  });

  it('navigates to home when the button is clicked', () => {
    const routerStub = sinon.stub(Router, 'go');
    const button = element.shadowRoot.querySelector('.home-btn');

    button.click();

    expect(routerStub.calledOnceWithExactly('/')).to.be.true;

    routerStub.restore();
  });
});
