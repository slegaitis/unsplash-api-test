import React from 'react';
import HomePage from '../../../pages/home/index';
import { mount } from 'enzyme';

describe('Homepage', () => {
	let wrapper;
	const intersectionObserverMock = () => ({
		observe: () => null,
	});
	window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

	beforeEach(() => {
		wrapper = mount(<HomePage />);
	});

	it('renders', () => {
		expect(wrapper).not.toBeNull();
	});

	it('shows default header', () => {
		expect(wrapper.find('h1').text()).toEqual(' Unsplash Api');
	});
});
