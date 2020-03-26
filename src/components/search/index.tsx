import React from 'react';
import { useForm } from '../../hooks';
import { useSearchHooks } from './hooks';
import { toast } from 'react-toastify';

export default function Search() {
	const initialState = { search: '' };
	const { onSearchSubmit } = useSearchHooks();
	const { onChange, onSubmit, values } = useForm(onSearchFormSubmit, initialState);

	return (
		<div className="searchBanner">
			<h1>Unsplash Api</h1>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="search"
					placeholder="Searching for..."
					onChange={onChange}
				/>
				<button>
					<i className="icofont-search-2 icofont-1x"></i>
				</button>
			</form>
		</div>
	);

	function onSearchFormSubmit() {
		if (values.search.length >= 3) {
			onSearchSubmit(values);
		} else {
			toast.warn('Query too short...');
		}
	}
}
