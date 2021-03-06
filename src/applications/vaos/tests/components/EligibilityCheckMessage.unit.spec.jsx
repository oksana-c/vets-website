import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

import EligibilityCheckMessage from '../../components/EligibilityCheckMessage';

describe('VAOS <EligibilityCheckMessage>', () => {
  it('should render past visit message', () => {
    const eligibility = {
      requestSupported: true,
      requestPastVisit: false,
      requestPastVisitValue: 24,
    };

    const tree = mount(<EligibilityCheckMessage eligibility={eligibility} />);

    expect(tree.text()).to.contain('couldn’t find a recent appointment');
    expect(tree.find('[aria-atomic="true"]').exists()).to.be.true;
    tree.unmount();
  });

  it('should render limit message', () => {
    const eligibility = {
      requestSupported: true,
      requestPastVisit: true,
      requestLimit: false,
    };

    const tree = mount(<EligibilityCheckMessage eligibility={eligibility} />);

    expect(tree.text()).to.contain('already have an appointment request');
    expect(tree.find('[aria-atomic="true"]').exists()).to.be.true;
    tree.unmount();
  });

  it('should render generic message', () => {
    const eligibility = {
      requestSupported: true,
      requestPastVisit: true,
      requestLimit: true,
    };

    const tree = mount(<EligibilityCheckMessage eligibility={eligibility} />);

    expect(tree.text()).to.contain('Something went wrong');
    expect(tree.find('[aria-atomic="true"]').exists()).to.be.true;
    tree.unmount();
  });

  it('should render not supported message', () => {
    const eligibility = {
      requestSupported: false,
      requestPastVisit: true,
      requestLimit: true,
    };

    const tree = mount(<EligibilityCheckMessage eligibility={eligibility} />);

    expect(tree.text()).to.contain('does not allow online');
    expect(tree.find('[aria-atomic="true"]').exists()).to.be.true;
    tree.unmount();
  });

  it('should render error message', () => {
    const eligibility = {
      requestFailed: true,
      requestSupported: true,
      requestPastVisit: false,
      requestPastVisitValue: 24,
    };

    const tree = mount(<EligibilityCheckMessage eligibility={eligibility} />);

    expect(tree.text()).to.contain('Something went wrong');
    expect(tree.find('AlertBox').props().status).to.equal('error');
    expect(tree.find('[aria-atomic="true"]').exists()).to.be.true;
    tree.unmount();
  });
});
