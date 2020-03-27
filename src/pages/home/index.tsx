import React from 'react';
import { HomeProvider } from './context';
import HomeScreen from './homeScreen';

export default function HomePage() {
	return (
		<HomeProvider>
			<HomeScreen />
		</HomeProvider>
	);
}
