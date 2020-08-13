import React from 'react';
import ImageListItem from './list/imageListItem';
import AppFooter from './appFooter';
import { ApiImage } from '../pages/home/types';

interface OwnProps {
	photos: ApiImage[];
	setTriggerElement: any;
}

export default function ImageList({ photos, setTriggerElement }: OwnProps) {
	return (
		<>
			<div className="wrapper">
				<ul className="image-list">
					{photos &&
						photos.map((photo) => <ImageListItem key={photo.id} image={photo} />)}
				</ul>
			</div>

			<div ref={setTriggerElement}>
				<AppFooter />
			</div>
		</>
	);
}
