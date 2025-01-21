import { fixture, html, expect } from '@open-wc/testing';
import '../src/dashboard/Dashboard-overview.js';

describe('Dashboard-Overview Component', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<dashboard-overview></dashboard-overview>`);
  });
  it('should apply correct styles to the component', () => {
    const styles = window.getComputedStyle(element);
    expect(styles.display).to.equal('inline');
  });
});
