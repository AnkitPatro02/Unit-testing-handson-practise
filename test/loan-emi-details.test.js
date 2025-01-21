import { fixture, html, elementUpdated } from '@open-wc/testing-helpers';
import { expect } from '@open-wc/testing';
import '../src/LoanEMIDetails/LoanEMIDetails.js';
import { Router } from '@vaadin/router';
import sinon from 'sinon';

describe('LoanEMIDetails Component', () => {
  let element;
  let localStorageStub;
  let routerGoStub;

  const emiData = {
    interestRate: 5.5,
    monthlyEMI: 25000,
    principal: 500000,
    interest: 100000,
    totalAmount: 600000,
  };

  beforeEach(async () => {
    localStorageStub = sinon
      .stub(window.localStorage, 'getItem')
      .returns(JSON.stringify(emiData));
    routerGoStub = sinon.stub(Router, 'go');

    element = await fixture(html`<loanemi-details></loanemi-details>`);
    await elementUpdated(element);
  });

  afterEach(() => {
    localStorageStub.restore();
    routerGoStub.restore();
  });

  it('should render the component correctly', () => {
    expect(element).to.exist;
  });

  it('should display EMI details', () => {
    const interestRate = element.shadowRoot.querySelector('span');
    expect(interestRate.textContent).to.equal('5.5 %');
    const monthlyEMI = element.shadowRoot.querySelectorAll('span')[1];
    expect(monthlyEMI.textContent).to.equal('25000');
    const principal = element.shadowRoot.querySelectorAll('span')[2];
    expect(principal.textContent).to.equal('500000');
    const interest = element.shadowRoot.querySelectorAll('span')[3];
    expect(interest.textContent).to.equal('100000');
    const totalAmount = element.shadowRoot.querySelectorAll('span')[4];
    expect(totalAmount.textContent).to.equal('600000');
  });

  it('should call Router.go with "/details" when _toBasicDetails is called', () => {
    element._toBasicDetails();
    expect(routerGoStub.calledOnceWith('/details')).to.be.true;
  });

  it('should call Router.go with "/customer" when _toCustomer is called', () => {
    element._toCustomer();
    expect(routerGoStub.calledOnceWith('/customer')).to.be.true;
  });

  it('should apply correct styles to the component', () => {
    const styles = window.getComputedStyle(element);
    expect(styles.padding).to.equal('25px');
  });
});
