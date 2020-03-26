export const useSearchHooks = () => {
	const onSearchSubmit = (query: string) => {
		console.log(query);
	};

	return { onSearchSubmit };
};
