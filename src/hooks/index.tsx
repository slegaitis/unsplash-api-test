import { useEffect, DependencyList, EffectCallback } from 'react';

export function useCustomEffect(effect: EffectCallback, deps: DependencyList) {
	useEffect(() => {
		let mounted = true;

		if (mounted) {
			effect();
		}

		return () => {
			mounted = false;
		};
	}, [...deps]);
}
