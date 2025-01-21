import { fixture, html, expect } from '@open-wc/testing';
import '../src/dashboard/Dashboard.js';

describe('Dashboard Component', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<dash-board></dash-board>`);
  });
  it('should apply correct styles to the component', () => {
    const styles = window.getComputedStyle(element);
    expect(styles.margin).to.equal('0px');
  });
});
