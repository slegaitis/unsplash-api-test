import React, { useState, useRef, useEffect } from 'react';
import { useHomeState } from '../context';
import { useFetchPhotos } from '../controller';
import ImageListItem from '../../../components/list/imageListItem';
import AppFooter from '../../../components/appFooter';
import Loading from '../../../components/loading';

export default function ImageList() {
	const { photos } = useHomeState();
	const { fetchPhotos, isLoading } = useFetchPhotos({ options: {} });
	const [triggerElement, setTriggerElement] = useState<HTMLDivElement | null>(null);
	const loader = useRef(fetchPhotos);
	const observer = new IntersectionObserver(
		(entries) => {
			const first = entries[0];

			if (first.isIntersecting) {
				loader.current();
			}
		},
		{ threshold: 0.1 }
	);

	useEffect(() => {
		loader.current = fetchPhotos;
	}, [fetchPhotos]);

	useEffect(() => {
		const currentElement = triggerElement;

		if (currentElement) {
			observer.observe(currentElement);
		}

		return () => {
			if (currentElement) {
				observer.unobserve(currentElement);
			}
		};
	}, [triggerElement]);

	return (
		<>
			{/* Gal Masonry grid butu graziau cia (del skirtingu dydziu nuotrauku) bet sekiau dizaina kiek imanoma */}
			<ul className="image-list">
				{photos &&
					photos.map((photo, index) => (
						<ImageListItem key={`image-${index}`} image={photo} />
					))}
			</ul>

			{isLoading && <Loading />}

			<div ref={setTriggerElement}>
				<AppFooter />
			</div>
		</>
	);
}
