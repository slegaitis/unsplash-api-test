import React from 'react';
import { ApiImage } from '../types';
import { useButtonClick } from '../hooks';
import { useHomeState } from '../context';

interface OwnProps {
	image: ApiImage;
	onViewClick: () => void;
}

export default function ActionButtons({ image, onViewClick }: OwnProps) {
	const { favourites } = useHomeState();
	const { onFavouriteButtonClick } = useButtonClick();

	return (
		<div className="actions">
			<button
				onClick={() => onFavouriteButtonClick(image)}
				className={favourites.includes(image.id) ? 'favourite' : ''}
			>
				Favourite
			</button>
			<button onClick={onViewClick}>View</button>
		</div>
	);
}
