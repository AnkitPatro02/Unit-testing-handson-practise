import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/SuccessAndError/Error.js';
import { localize } from '@lion/localize';
import { Router } from '@vaadin/router';

describe('LoanError Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<loan-error></loan-error>`);
  });

  it('renders correctly with localized content', () => {
    const heading = element.shadowRoot.querySelector('h2').textContent.trim();
    const description = element.shadowRoot
      .querySelector('p')
      .textContent.trim();
    const button = element.shadowRoot.querySelector('.home-btn');

    expect(heading).to.equal(`${localize.msg('change-language:oop')}!!`);
    expect(description).to.equal(localize.msg('change-language:errDesc'));
    expect(button.textContent.trim()).to.equal(
      localize.msg('change-language:home')
    );
  });

  it('navigates to home when the button is clicked', () => {
    const routerStub = sinon.stub(Router, 'go');
    element._toHome();
    expect(routerStub.calledOnceWithExactly('/')).to.be.true;
    routerStub.restore();
  });
});
