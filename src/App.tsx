import React from 'react';
import './scss/index.scss';
import HomePage from './pages/home';
import AppHeader from './components/appHeader';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, Slide } from 'react-toastify';

function App() {
	return (
		<>
			<AppHeader />
			<HomePage />
			<ToastContainer
				newestOnTop={true}
				hideProgressBar={true}
				pauseOnHover={true}
				transition={Slide}
				position={'bottom-right'}
			/>
		</>
	);
}

export default App;
