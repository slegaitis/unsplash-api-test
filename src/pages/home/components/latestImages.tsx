import React, { useState } from 'react';
import { useHomeState } from '../context';
import { useFetchPhotos, useImageListInitialization, useInfiniteScroll } from '../hooks';
import Loading from '../../../components/loading';
import { useCustomEffect } from '../../../hooks';
import ImageList from '../../../components/imageList';

export default function LatestImages() {
	const { photos } = useHomeState();
	const { fetchPhotos, isLoading } = useFetchPhotos({ options: {} });
	const { initializePage } = useImageListInitialization();
	const [triggerElement, setTriggerElement] = useState<HTMLDivElement | null>(null);

	useInfiniteScroll({ triggerElement: triggerElement, fetchRequest: fetchPhotos });

	useCustomEffect(() => {
		initializePage();
	}, []);

	return (
		<>
			{isLoading && <Loading />}

			<ImageList photos={photos} setTriggerElement={setTriggerElement} />
		</>
	);
}
