/*!
 * React Use Images <https://github.com/smujmaiku/react-use-images>
 * Copyright(c) 2020 Michael Szmadzinski
 * MIT Licensed
 */

import React, {
	createContext, useContext, useEffect, useReducer,
} from 'react';
import propTypes from 'prop-types';

const ERROR_IMAGE_SRC = '_';
const CHECKER_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAAAAADhZOFXAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAH0lEQVQI12NMY2BgSGNgYGBigAJMBuMZBgaGWfjVAABn6gJB1NL6yQAAAABJRU5ErkJggg==';

export const imagesContext = createContext();

export function cacheReducer(state, { src, image }) {
	return {
		...state,
		[src]: image,
	};
}

export function imageReducer(state, action) {
	const {
		type, list, src, image,
	} = action;

	switch (type) {
	case 'INIT':
		return {
			list,
			images: {},
		};
	case 'SET':
		if (state.images[src]) return state;
		return {
			...state,
			images: {
				...state.images,
				[src]: image,
			},
		};
	default:
	}
	return state;
}

export function useImages(list) {
	const globalReducer = useContext(imagesContext);
	const localReducer = useReducer(cacheReducer, {});
	const [images, addImage] = globalReducer || localReducer;

	const errImage = images[ERROR_IMAGE_SRC];

	const [state, dispatch] = useReducer(imageReducer, {
		list,
		images: {},
	});

	useEffect(() => {
		dispatch({
			type: 'INIT',
			list,
		});
	}, [list]);

	useEffect(() => {
		for (const src of list) {
			const image = images[src];
			if (!image) {
				const newImage = new Image();
				newImage.onload = () => addImage({ src, image: newImage });
				newImage.onerror = () => addImage({ src, image: errImage });
				newImage.src = src;
				addImage({ src, image: newImage });
			} else if (image.complete) {
				dispatch({
					type: 'SET',
					src,
					image,
				});
			}
		}
	}, [list, images]);

	return state.images;
}

export function ImagesProvider(props) {
	const { children, defaultCheckers } = props;

	const { Provider } = imagesContext;
	const value = useReducer(cacheReducer, {});
	const [, setState] = value;

	useEffect(() => {
		if (defaultCheckers) {
			const image = new Image();
			image.src = CHECKER_SRC;
			setState({ src: ERROR_IMAGE_SRC, image });
		}
	}, []);

	return (
		<Provider value={value}>
			{children}
		</Provider>
	);
}

ImagesProvider.defaultProps = {
	defaultCheckers: false,
};

ImagesProvider.propTypes = {
	children: propTypes.node.isRequired,
	defaultCheckers: propTypes.bool,
};
