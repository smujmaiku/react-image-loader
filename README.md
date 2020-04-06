# React Image Loader

Load and cache images for canvas or reasons

## Installation

`npm i smujmaiku/react-image-loader`

## Examples

### ES6

Babel with `import`

```jsx
import React from 'react';
import { useImages } from 'react-image-loader';

const Component = (props) => {
	const images = useImages(['/img/picture.png']);
	// images['/img/picture.png'] is Image() once loaded

	return 'something';
};

const App = (props) => {
	return <ImageProvider>
		<Component>
	</ImageProvider>;
};
```

## License

Copyright (c) 2020, Michael Szmadzinski. (MIT License)
