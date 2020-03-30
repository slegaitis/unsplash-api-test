import React from 'react';
import { mount } from 'enzyme';

describe('Custom Hooks', () => {
	// function to test hooks
	const renderHook = (hook) => {
		let results;

		function HookWrapper() {
			results = hook();
			return null;
		}

		mount(<HookWrapper />);

		return results;
	};

	it('works', () => {
		expect(2 + 2).toEqual(4);
	});
});
