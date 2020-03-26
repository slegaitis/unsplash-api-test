import React from 'react';
import { ApiImage } from '../types';

interface OwnProps {
	image: ApiImage;
}

export default function ImageViewModal({ image }: OwnProps) {
	return (
		<div className="image-view-modal">
			<img
				src={image.urls.regular}
				alt={image.alt_description ? image.alt_description : image.description}
			/>
		</div>
	);
}
