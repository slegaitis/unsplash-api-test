import React from 'react';
import { ApiImage } from '../types';
import { useFavouriteButton, useViewButton } from '../hooks';
import { useHomeState } from '../context';

interface OwnProps {
	image: ApiImage;
	onViewClick: () => void;
}

export default function ActionButtons({ image, onViewClick }: OwnProps) {
	const { favourites } = useHomeState();
	const { performFavouriteClick } = useFavouriteButton();

	return (
		<div className="actions">
			<button
				onClick={() => performFavouriteClick(image)}
				className={favourites.includes(image.id) ? 'favourite' : ''}
			>
				Favourite
			</button>
			<button onClick={onViewClick}>View</button>
		</div>
	);
}
