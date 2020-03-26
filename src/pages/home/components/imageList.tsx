import React, { useState, useRef } from 'react';
import { useHomeState } from '../context';
import { useFetchPhotos, useImageListInitialization } from '../hooks';
import ImageListItem from '../../../components/list/imageListItem';
import AppFooter from '../../../components/appFooter';
import Loading from '../../../components/loading';
import { useCustomEffect } from '../../../hooks';

export default function ImageList() {
	const { photos } = useHomeState();
	const { fetchPhotos, isLoading } = useFetchPhotos({ options: {} });
	const { initializePage } = useImageListInitialization();
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

	useCustomEffect(() => {
		initializePage();
	}, []);

	useCustomEffect(() => {
		loader.current = fetchPhotos;
	}, [fetchPhotos]);

	useCustomEffect(() => {
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
			{isLoading && <Loading />}

			<div className="wrapper">
				<ul className="image-list">
					{photos &&
						photos.map((photo, index) => (
							<ImageListItem key={`image-${index}`} image={photo} />
						))}
				</ul>
			</div>

			<div ref={setTriggerElement}>
				<AppFooter />
			</div>
		</>
	);
}
