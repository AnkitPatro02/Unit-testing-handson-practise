import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import { Router } from '@vaadin/router';
import '../src/LoanBasicDetails/BasicDetails.js';
// import { MinNumber, MaxNumber, Required } from '@lion/form-core';

describe('Basic details', () => {
  // Write test cases inside this block
  // refer basic-details.js files
  let element;

  beforeEach(async () => {
    element = await fixture(html`<basic-details></basic-details>`);
  });

  // afterEach(() => {
  //   sinon.restore();
  // });

  it('adds and removes e-handle class after 2 seconds', () => {
    // eslint-disable-next-line prefer-const
    const clock = sinon.useFakeTimers();
    const amountInput = element.shadowRoot.querySelector('.amount');
    amountInput.value = '9000';
    element._captureDetails();
    expect(amountInput.classList.contains('e-handle')).to.be.true;
    clock.tick(2000);
    expect(amountInput.classList.contains('e-handle')).to.be.false;
    clock.restore();
  });

  it('displays amount in words when typing in the amount field', () => {
    const amountInput = element.shadowRoot.querySelector('.amount');
    amountInput.value = '10000';
    const event = new Event('keyup');
    amountInput.dispatchEvent(event);
    const wordsOutput = element.shadowRoot
      .querySelector('#word')
      .textContent.trim();
    expect(wordsOutput).to.equal('ten thousand');
  });

  it('adds error styling for invalid amount input', () => {
    const amountInput = element.shadowRoot.querySelector('.amount');
    amountInput.value = '5000';
    element._captureDetails();
    expect(amountInput.classList.contains('e-handle')).to.be.true;
    setTimeout(() => {
      expect(amountInput.classList.contains('e-handle')).to.be.false;
    }, 2000);
  });

  it('captures and logs user details correctly', () => {
    const consoleLogStub = sinon.stub(console, 'log');
    const nameInput = element.shadowRoot.querySelector('.type');
    const amountInput = element.shadowRoot.querySelector('.amount');
    const periodInput = element.shadowRoot.querySelector('.period');
    nameInput.value = 'Home Loan';
    amountInput.value = '20000';
    periodInput.value = '5';
    element._captureDetails();
    expect(consoleLogStub.calledOnce).to.be.true;
    const loggedData = consoleLogStub.getCall(0).args[0];
    expect(loggedData).to.deep.equal({
      name: 'Home Loan',
      amount: '20000',
      period: '5',
    });
    consoleLogStub.restore();
  });

  it('should render the form with default values', () => {
    const name = element.shadowRoot.querySelector('.type');
    const amountInput = element.shadowRoot.querySelector('.amount');
    const periodInput = element.shadowRoot.querySelector('.period');
    expect(name).to.exist;
    expect(amountInput).to.exist;
    expect(periodInput).to.exist;

    expect(name.value).to.equal('');
    expect(amountInput.value).to.equal('10,000.00');
    expect(periodInput.value).to.equal('2');
  });

  it('should check if the amount input is less than 10000', () => {
    const amountInput = element.shadowRoot.querySelector('.amount');
    amountInput.value = '9000';
    const captureDetailsSpy = sinon.spy(element, '_captureDetails');
    element._captureDetails();
    expect(captureDetailsSpy.calledOnce).to.be.true;
    expect(amountInput.classList.contains('e-handle')).to.be.true;
    setTimeout(() => {
      expect(amountInput.classList.contains('e-handle')).to.be.false;
    }, 2000);
  });

  it('should navigate to dashboard on button click', () => {
    const routerStub = sinon.stub(Router, 'go');
    const dashboardButton = element.shadowRoot.querySelector('.btn-previous');
    dashboardButton.click();
    expect(routerStub.calledWith('/')).to.be.true;
    routerStub.restore();
  });
});
