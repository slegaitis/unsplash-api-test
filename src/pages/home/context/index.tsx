import React, { Dispatch, useReducer, useContext, createContext } from 'react';
import { ApiImage, ViewType } from '../types';
import { LOCALSTORAGE_FAVOURITES } from '../constants';

export type StateActions =
	| { type: 'INITIAL' }
	| { type: 'RESET' }
	| { type: 'ADD_PHOTOS'; payload: ApiImage[] }
	| {
			type: 'ADD_SEARCH_PHOTOS';
			payload: { images: ApiImage[]; query: string; isNewQuery: boolean };
	  }
	| { type: 'FAVOURITES_UPDATED'; payload: string[] };

export type HomeProps = {
	currentView: ViewType;
	query: string;
	photos: ApiImage[];
	favourites: string[];
};

type HomeProviderProps = { children: React.ReactNode };

const HomeContext = createContext<HomeProps | undefined>(undefined);
const HomeDispatchContext = createContext<Dispatch<StateActions> | undefined>(undefined);
const initialHomeState: HomeProps = {
	currentView: ViewType.latest,
	query: '',
	photos: [],
	favourites: [],
};

function HomeReducer(state: HomeProps, action: StateActions) {
	if (process.env.NODE_ENV === 'development') {
		console.log('ACTION SENT: ', action);
	}

	switch (action.type) {
		case 'INITIAL':
			const currentFavourites = localStorage.getItem(LOCALSTORAGE_FAVOURITES)
				? JSON.parse(localStorage.getItem(LOCALSTORAGE_FAVOURITES)!!)
				: [];
			return { ...state, favourites: [...currentFavourites] };
		case 'RESET':
			return { ...state, query: '', currentView: ViewType.latest, photos: [] };
		case 'ADD_PHOTOS':
			return {
				...state,
				photos: [...state.photos, ...action.payload],
			};
		case 'ADD_SEARCH_PHOTOS':
			return {
				...state,
				currentView: ViewType.search,
				query: action.payload.isNewQuery ? action.payload.query : state.query,
				photos: action.payload.isNewQuery
					? action.payload.images
					: [...state.photos, ...action.payload.images],
			};
		case 'FAVOURITES_UPDATED':
			return { ...state, favourites: [...action.payload] };
		default: {
			console.log('ACTION SENT: ', action);
			throw new Error(`Unhandled action type: ${action}`);
		}
	}
}

export function HomeProvider({ children }: HomeProviderProps) {
	const [state, dispatch] = useReducer(HomeReducer, initialHomeState);
	return (
		<HomeContext.Provider value={state}>
			<HomeDispatchContext.Provider value={dispatch}>{children}</HomeDispatchContext.Provider>
		</HomeContext.Provider>
	);
}

export function useHomeState() {
	const context = useContext(HomeContext);

	if (context === undefined) {
		throw new Error('HomeState must be used within a HomeProvider');
	}

	return context;
}

export function useHomeDispatch() {
	const context = useContext(HomeDispatchContext);

	if (context === undefined) {
		throw new Error('HomeDispatch must be used within a HomeProvider');
	}

	return context;
}
