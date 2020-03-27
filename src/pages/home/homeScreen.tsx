import React from 'react';
import LatestImages from './components/latestImages';
import { useHomeState } from './context';
import { ViewType } from './types';
import SearchImages from './components/searchImages';
import Search from '../../components/search';

export default function HomeScreen() {
	const { currentView } = useHomeState();
	return (
		<>
			<Search />
			{currentView === ViewType.latest ? <LatestImages /> : <SearchImages />}
		</>
	);
}
