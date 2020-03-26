import { useState } from 'react';
import { API } from '../../constants';
import { useHomeDispatch } from './context';
import { useApiFetch } from '../../api';
import { ApiImage } from './types';
import { LOCALSTORAGE_FAVOURITES } from './constants';

export const useFavouriteButton = () => {
	const dispatch = useHomeDispatch();

	const performFavouriteClick = (image: ApiImage) => {
		let currentFavourites = localStorage.getItem(LOCALSTORAGE_FAVOURITES)
			? JSON.parse(localStorage.getItem(LOCALSTORAGE_FAVOURITES)!!)
			: [];
		const isItemInFavourites = currentFavourites.includes(image.id);

		if (isItemInFavourites) {
			currentFavourites = currentFavourites.filter(
				(favourite: string) => favourite !== image.id
			);
			localStorage.setItem(LOCALSTORAGE_FAVOURITES, JSON.stringify(currentFavourites));
		} else {
			currentFavourites.push(image.id);
			localStorage.setItem(LOCALSTORAGE_FAVOURITES, JSON.stringify(currentFavourites));
		}

		dispatch({ type: 'FAVOURITES_UPDATED', payload: currentFavourites });
	};

	return { performFavouriteClick };
};

export const useImageListInitialization = () => {
	const dispatch = useHomeDispatch();
	const initializePage = () => dispatch({ type: 'INITIAL' });

	return { initializePage };
};

interface FetchInterface {
	options: any;
}

export const useFetchPhotos = ({ options }: FetchInterface) => {
	const dispatch = useHomeDispatch();
	const [page, setPage] = useState<number>(1);
	const { apiFetch, isLoading } = useApiFetch();
	const [error, setError] = useState<string | null>(null);
	const fetchPhotos = async () => {
		setPage(page + 1);

		try {
			const json = await apiFetch({
				url: `${API}/photos?per_page=25&page=${page}`,
				options: {
					...options,
				},
			});
			if (json.length) {
				setError('');
				dispatch({ type: 'ADD_PHOTOS', payload: json });
			} else {
				setError('We are sorry, unable to load images at this time.');
			}
		} catch (error) {
			setError('We are sorry, unable to load images at this time.');
		}
	};

	return { fetchPhotos, error, isLoading };
};
