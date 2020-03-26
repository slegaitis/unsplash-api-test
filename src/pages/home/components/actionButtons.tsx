import React from 'react';
import { ApiImage } from '../types';
import { onFavouriteButtonClick } from '../controller';

interface OwnProps {
	image: ApiImage;
}

export default function ActionButtons({ image }: OwnProps) {
	return (
		<div className="actions">
			<button onClick={() => onFavouriteButtonClick(image)}>Favourite</button>
			<button>View</button>
		</div>
	);
}
