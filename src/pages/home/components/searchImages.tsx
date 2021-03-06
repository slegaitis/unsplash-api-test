import React, { useState } from 'react';
import { useHomeState } from '../context';
import { useFetchPhotos, useImageListInitialization, useInfiniteScroll } from '../hooks';
import Loading from '../../../components/loading';
import { useCustomEffect } from '../../../hooks';
import ImageList from '../../../components/imageList';
import NoContent from '../../../components/noContent';

export default function SearchImages() {
	const { photos } = useHomeState();
	const { searchPhotos, isLoading } = useFetchPhotos({ options: {} });
	const { initializePage } = useImageListInitialization();
	const [triggerElement, setTriggerElement] = useState<HTMLDivElement | null>(null);

	useInfiniteScroll({ triggerElement: triggerElement, fetchRequest: searchPhotos });

	useCustomEffect(() => {
		initializePage();
	}, []);

	return (
		<>
			{isLoading && <Loading />}

			{photos.length >= 1 ? (
				<ImageList photos={photos} setTriggerElement={setTriggerElement} />
			) : (
				<NoContent message="We are sorry we could not find any images." />
			)}
		</>
	);
}
