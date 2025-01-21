import { fixture, html } from '@open-wc/testing-helpers';
import { expect } from '@open-wc/testing';
import '../src/LoanApplication.js';

describe('LoanApplication Component', function () {
  let element;
  this.timeout(5000);

  beforeEach(async () => {
    element = await fixture(html`<loan-application></loan-application>`);
  });

  it('should render the component correctly', () => {
    expect(element).to.exist;
  });
  it('should increment counter when __increment is called', async () => {
    element.__increment();
    await element.updateComplete;
    expect(element.counter).to.equal(6);
  });
  it('should have initial style as per CSS', () => {
    const styles = window.getComputedStyle(element);
    expect(styles.display).to.equal('block');
  });
});
