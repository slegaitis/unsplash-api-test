import { ReactNode } from 'react';
import { ApiImage, ViewType } from '../types';

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

export type HomeProviderProps = { children: ReactNode };
