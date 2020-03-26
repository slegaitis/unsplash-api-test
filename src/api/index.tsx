import { useState } from 'react';

interface FetchInterface {
	url: string;
	options?: RequestInit;
}

export const useApiFetch = () => {
	const [isLoading, setIsLoading] = useState(false);
	const fetchOptions = {
		headers: {
			Authorization: `Client-ID ${process.env.REACT_APP_API_KEY}`,
			'Content-Type': 'application/json',
		},
	};

	async function apiFetch({ url, options }: FetchInterface) {
		setIsLoading(true);
		return await fetch(url, { ...fetchOptions, ...options })
			.then((res: Response) => {
				setIsLoading(false);
				return res.json();
			})
			.catch((err: Error) => {
				setIsLoading(false);
				return err;
			});
	}

	return { apiFetch, isLoading };
};
