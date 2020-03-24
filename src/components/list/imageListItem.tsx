import React from 'react';
import { Image } from '../../api';

interface OwnProps {
	image: Image;
}

export default function ImageListItem({ image }: OwnProps) {
	return (
		<li>
			<img
				src={image.urls.small}
				alt={image.description ? image.description.substring(0, 75) : image.user.username}
			/>
		</li>
	);
}
