import { fixture, html, expect } from '@open-wc/testing';
import { Router } from '@vaadin/router';
import '../src/dashboard/Dashboard-menu.js';
import sinon from 'sinon';

describe('Dashboard-Menu Component', () => {
  let element;
  let routerGoStub;
  let localStorageStub;
  beforeEach(async () => {
    routerGoStub = sinon.stub(Router, 'go');
    element = await fixture(html`<dashboard-menu
      imageURL="test-image.jpg"
      title="Test Title"
    ></dashboard-menu>`);

    localStorageStub = sinon.stub(window.localStorage, 'setItem');
  });
  afterEach(() => {
    localStorageStub.restore();
    routerGoStub.restore();
  });
  it('should apply correct styles to the component', () => {
    const styles = window.getComputedStyle(element);
    expect(styles.display).to.equal('inline');
  });

  it('should call Router.go with "/details" when navigateToDetails() is called', () => {
    element.navigateToDetails();
    expect(routerGoStub.calledOnceWith('/details')).to.be.true;
  });

  it('should set the title in localStorage and navigate to /details', () => {
    element._setTypeInLS();
    expect(localStorageStub.calledOnceWith('type', 'Test Title')).to.be.true;
    expect(routerGoStub.calledOnceWith('/details')).to.be.true;
  });
});
