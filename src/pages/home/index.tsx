import React from 'react';
import { HomeProvider } from './context';
import ImageList from './components/imageList';

export default function HomePage() {
	return (
		<HomeProvider>
			<ImageList />
		</HomeProvider>
	);
}
