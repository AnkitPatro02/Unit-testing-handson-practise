import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/Customer/Customer-details.js';
import { Router } from '@vaadin/router';

describe('CustomerDetails Component', () => {
  let element;

  beforeEach(async () => {
    element = await fixture(html`<customer-details></customer-details>`);
  });

  it('should render all input fields with default validators', () => {
    const firstName = element.shadowRoot.querySelector('#first_name');
    const lastName = element.shadowRoot.querySelector('#last_name');
    const dob = element.shadowRoot.querySelector('#dateof_birth');
    const email = element.shadowRoot.querySelector('#email');
    const mobileNumber = element.shadowRoot.querySelector('#mobile_number');
    const monthlySalary = element.shadowRoot.querySelector('#monthly_salary');
    const emisAmount = element.shadowRoot.querySelector('#EMIs_amount');
    const terms = element.shadowRoot.querySelector('#terms');

    expect(firstName).to.exist;
    expect(lastName).to.exist;
    expect(dob).to.exist;
    expect(email).to.exist;
    expect(mobileNumber).to.exist;
    expect(monthlySalary).to.exist;
    expect(emisAmount).to.exist;
    expect(terms).to.exist;
  });

  it('should navigate to /emidetails on back button click', () => {
    const routerStub = sinon.stub(Router, 'go');
    const backButton = element.shadowRoot.querySelector('.backbg-btn-color');
    backButton.click();
    expect(routerStub.calledOnce).to.be.true;
    expect(routerStub.calledWith('/emidetails')).to.be.true;
    routerStub.restore();
  });
});
