import React from 'react';
import { useForm } from '../../hooks';
import { toast } from 'react-toastify';
import { useFetchPhotos } from '../../pages/home/hooks';
import { useHomeState } from '../../pages/home/context';

export default function Search() {
	const initialState = { search: '' };
	const { query } = useHomeState();
	const { onChange, onSubmit, values, setValues } = useForm(onSearchFormSubmit, initialState);
	const { searchPhotos, reset } = useFetchPhotos({ options: {} });

	return (
		<div className="searchBanner">
			<h1>{query && `Searching: ${query} |`} Unsplash Api</h1>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="search"
					placeholder="Searching for..."
					onChange={onChange}
					value={values.search}
				/>
				<button>
					<i className="icofont-search-2 icofont-1x"></i>
				</button>
			</form>
			{query && (
				<button
					className="reset-button"
					onClick={() => {
						setValues({ search: '' });
						reset();
					}}
				>
					Go back
				</button>
			)}
		</div>
	);

	function onSearchFormSubmit() {
		if (values.search.length >= 3) {
			searchPhotos(values.search, true);
		} else {
			toast.warn('Query too short...');
		}
	}
}
