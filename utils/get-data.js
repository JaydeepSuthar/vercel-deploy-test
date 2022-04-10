export const getData = async (url, axios) => {
	let response = await axios.get(url);

	return {
		data: response.data
	};
};
