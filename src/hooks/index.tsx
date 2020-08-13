import { useEffect, DependencyList, EffectCallback, useState } from 'react';

export function useCustomEffect(effect: EffectCallback, deps: DependencyList) {
	useEffect(() => {
		let mounted = true;

		if (mounted) {
			effect();
		}

		return () => {
			mounted = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [...deps]);
}

export const useForm = (callback: () => void, initialState: any) => {
	const [values, setValues] = useState(initialState);

	const onChange = (e: any) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const onSubmit = (e: any) => {
		e.preventDefault();
		callback();
	};

	return { onChange, onSubmit, values, setValues };
};
