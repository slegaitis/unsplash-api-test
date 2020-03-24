import AppHeader from '../../components/appHeader';
import React, { useRef, useState, useEffect } from 'react';
import { useFetchPhotos } from '../../api';
import { API } from '../../constants';
import ImageListItem from '../../components/list/imageListItem';

export default function HomePage() {
	const { fetchPhotos, isLoading, data: images } = useFetchPhotos({ options: {} });
	const [page, setPage] = useState(1);
	const [element, setElement] = useState(null);

	return (
		<>
			<AppHeader />

			{/** When you hit the bottom trigger loadMore function */}
			<ul className="image-list">
				{images &&
					images.map((image, index) => (
						<ImageListItem key={`image-${index}`} image={image} />
					))}
			</ul>

			<footer ref={setElement as any}>
				<h6>Made by Tautvydas Šlėgaitis &copy; 2020</h6>
			</footer>
		</>
	);
}
