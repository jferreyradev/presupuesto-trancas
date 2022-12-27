import { useState, useEffect } from 'react';
import axios from 'axios';

export const useResource = resourceUrl => {
	const [resource, setResource] = useState(null);

	useEffect(() => {
		const getData = async () => {
			const response = await axios.get(resourceUrl);
			setResource(response.data);
		}

		setResource(getData());

	}, [resourceUrl]);

    //console.log(resourceUrl)
    //console.log(resource)

	return resource;
}