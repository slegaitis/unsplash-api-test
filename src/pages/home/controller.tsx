import { useState, useEffect } from 'react';
import { API } from '../../constants';
import { useHomeDispatch } from './context';
import { useApiFetch } from '../../api';
import { ApiImage } from './types';

export const onFavouriteButtonClick = (image: ApiImage) => {
	const currentFavourites = localStorage.getItem('unsplashFavourites')
		? JSON.parse(localStorage.getItem('unsplashFavourites')!!)
		: [];
};

interface FetchInterface {
	options: any;
}

export const useFetchPhotos = ({ options }: FetchInterface) => {
	const dispatch = useHomeDispatch();
	const [page, setPage] = useState(1);
	const { apiFetch, isLoading } = useApiFetch();
	const [error, setError] = useState(null);
	const fetchPhotos = async () => {
		setPage(page + 1);

		try {
			const json = await apiFetch({
				url: `${API}/photos?per_page=25&page=${page}`,
				options: {
					...options,
				},
			});
			dispatch({ type: 'ADD_PHOTOS', payload: json });
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		let mounted = true;

		if (mounted) {
			fetchPhotos();
		}

		return () => {
			mounted = false;
		};
	}, []);

	return { fetchPhotos, error, isLoading };
};
