import React from 'react';
import LazyImage from '../lazyImage';
import ActionButtons from '../../pages/home/components/actionButtons';
import { ApiImage } from '../../pages/home/types';

interface OwnProps {
	image: ApiImage;
}

export default function ImageListItem({ image }: OwnProps) {
	return (
		<li>
			<LazyImage
				src={image.urls.regular}
				alt={image.description ? image.description.substring(0, 75) : image.user.username}
			/>

			<div className="content">
				<h4>
					{image.alt_description
						? `${image.alt_description.substring(0, 20)}...`
						: '______'}
				</h4>
				<span className="br" />
				<h6>{image.user.username}</h6>

				<ActionButtons image={image} />
			</div>
		</li>
	);
}
