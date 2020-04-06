/*!
 * React Use Images <https://github.com/smujmaiku/react-use-images>
 * Copyright(c) 2020 Michael Szmadzinski
 * MIT Licensed
 */

import { parse as parsePath } from 'path';
import React, {
	createContext, useContext, useEffect, useReducer, useState,
} from 'react';
import propTypes from 'prop-types';

const ERROR_IMAGE_SRC = '_';
const CHECKER_SRC = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAAAAADhZOFXAAAACXBIWXMAAC4jAAAuIwF4pT92AAAAH0lEQVQI12NMY2BgSGNgYGBigAJMBuMZBgaGWfjVAABn6gJB1NL6yQAAAABJRU5ErkJggg==';

export const imagesContext = createContext();

export function patchReducer(state, { src, image }) {
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

/**
 *
 * @param {Array} list
 * @returns {Object}
 */
export function useImages(list) {
	const globalReducer = useContext(imagesContext);
	const localReducer = useReducer(patchReducer, {});
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
				newImage.onerror = () => addImage({ src, image: newImage });
				newImage.src = src;
				addImage({ src, image: newImage });
			} else if (!image.complete) {
			} else if (image.naturalWidth > 0) {
				dispatch({
					type: 'SET',
					src,
					image,
				});
			} else {
				dispatch({
					type: 'SET',
					src,
					image: errImage || image,
				});
			}
		}
	}, [list, images, errImage]);

	return state.images;
}

/**
 *
 * @param {Object} map
 * @returns {Object}
 */
export function useImagesFromMap(map) {
	const [list, setList] = useState([]);
	const [result, setResult] = useState({});
	const images = useImages(list);

	useEffect(() => {
		setList(Object.values(map));
	}, [map]);

	useEffect(() => {
		const res = {};
		for (const [name, path] of Object.entries(map)) {
			res[name] = images[path];
		}
		setResult(res);
	}, [images]);

	return result;
}

/**
 * Use Images from an ImportAll
 * https://webpack.js.org/guides/dependency-management/#context-module-api
 * @param {Require.Context} ctx
 * @param {Array} list
 * @param {string?} type default|name|nameWithDir
 * @example
 * const assetContext = require.context('../assets/', false, /\.png$/);
 * export default function User() {
 *   const assets = useImagesFromContext(assetContext, ['favicon'], 'name');
 * }
 */
export function useImagesFromContext(ctx, list, type = 'default') {
	const [map, setMap] = useState({});

	useEffect(() => {
		let pathMutate = path => path;
		switch (type) {
		case 'name':
			pathMutate = path => parsePath(path).name;
			break;
		case 'nameWithDir':
			pathMutate = path => {
				const { dir, name } = parsePath(path);
				return `${dir}/${name}`;
			};
			break;
		}

		const res = {};
		for (const key of ctx.keys()) {
			const path = pathMutate(key);
			if (list.includes(path)) res[path] = ctx(key);
		}
		setMap(res);
	}, [ctx, list, type]);

	return useImagesFromMap(map);
}

export function ImagesProvider(props) {
	const { children, defaultCheckers } = props;

	const { Provider } = imagesContext;
	const value = useReducer(patchReducer, {});
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
