import React, { Dispatch, useReducer, useContext, createContext } from 'react';
import { ApiImage } from '../types';
import { LOCALSTORAGE_FAVOURITES } from '../constants';

export type StateActions =
	| { type: 'INITIAL' }
	| { type: 'ADD_PHOTOS'; payload: ApiImage[] }
	| { type: 'FAVOURITES_UPDATED'; payload: string[] };
export type HomeProps = {
	photos: ApiImage[];
	favourites: string[];
};
type HomeProviderProps = { children: React.ReactNode };

const HomeContext = createContext<HomeProps | undefined>(undefined);
const HomeDispatchContext = createContext<Dispatch<StateActions> | undefined>(undefined);

const initialHomeState: HomeProps = {
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
		case 'ADD_PHOTOS':
			return { ...state, photos: [...state.photos, ...action.payload] };
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
