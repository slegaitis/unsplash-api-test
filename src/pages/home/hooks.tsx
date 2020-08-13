import { useState, useEffect, useRef } from 'react';
import { API } from '../../constants';
import { useHomeDispatch, useHomeState } from './context';
import { useApiFetch } from '../../api';
import { ApiImage } from './types';
import { LOCALSTORAGE_FAVOURITES } from './constants';
import { toast } from 'react-toastify';
import { useCustomEffect } from '../../hooks';

export const useButtonClick = () => {
	const dispatch = useHomeDispatch();

	const onFavouriteButtonClick = (image: ApiImage) => {
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

	return { onFavouriteButtonClick };
};

export const useImageListInitialization = () => {
	const dispatch = useHomeDispatch();
	const initializePage = () => dispatch({ type: 'INITIAL' });

	return { initializePage };
};

interface LazyLoadInterface {
	triggerElement: HTMLDivElement | null;
	fetchRequest: Function;
}

export const useInfiniteScroll = ({ triggerElement, fetchRequest }: LazyLoadInterface) => {
	const loader = useRef(fetchRequest);
	const observer = new IntersectionObserver(
		(entries) => {
			const first = entries[0];

			if (first.isIntersecting) {
				loader.current();
			}
		},
		{ threshold: 0.1 }
	);

	useEffect(() => {
		const currentElement = triggerElement;

		if (currentElement) {
			observer.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				observer.unobserve(currentElement);
			}
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [triggerElement]);

	useCustomEffect(() => {
		loader.current = fetchRequest;
	}, [fetchRequest]);
};

interface FetchInterface {
	options: any;
}

export const useFetchPhotos = ({ options }: FetchInterface) => {
	const dispatch = useHomeDispatch();
	const { query } = useHomeState();
	const [page, setPage] = useState<number>(0);
	const { apiFetch, isLoading } = useApiFetch();
	const [error, setError] = useState<string | null>(null);

	const fetchPhotos = async () => {
		try {
			const json = await apiFetch({
				url: `${API}/photos?per_page=25&page=${page + 1}`,
				options: {
					...options,
				},
			});
			setPage(page + 1);
			if (json.length) {
				setError(null);
				dispatch({ type: 'ADD_PHOTOS', payload: json });
			} else {
				setError('We are sorry, unable to load images at this time.');
			}
		} catch (error) {
			setError('We are sorry, unable to load images at this time.');
		}
	};

	const searchPhotos = async (searchQuery: string, isNewQuery?: boolean) => {
		try {
			const json = await apiFetch({
				url: `${API}/search/photos?per_page=25&page=${
					isNewQuery ? 1 : page + 1
				}&query=${encodeURI(searchQuery ? searchQuery : query)}`,
				options: {
					...options,
				},
			});

			setPage(page + 1);
			if (json.results.length >= 0) {
				setError(null);
				dispatch({
					type: 'ADD_SEARCH_PHOTOS',
					payload: { images: json.results, isNewQuery: !!isNewQuery, query: searchQuery },
				});
			} else {
				setError('We are sorry, unable to load images at this time.');
			}
		} catch (error) {
			setError('We are sorry, unable to load images at this time.');
		}
	};

	const reset = async () => {
		dispatch({
			type: 'RESET',
		});
	};

	useEffect(() => {
		if (error && error.length) {
			toast.error(error);
		}
	}, [error]);

	return { fetchPhotos, searchPhotos, reset, error, isLoading };
};
