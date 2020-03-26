import React from 'react';
import './scss/index.scss';
import HomePage from './pages/home';
import AppHeader from './components/appHeader';

function App() {
	return (
		<>
			<AppHeader />

			<HomePage />
		</>
	);
}

export default App;
