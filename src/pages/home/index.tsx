import React from 'react';
import { HomeProvider } from './context';
import ImageList from './components/imageList';
import Search from '../../components/search';

export default function HomePage() {
	return (
		<HomeProvider>
			<Search />
			<ImageList />
		</HomeProvider>
	);
}
