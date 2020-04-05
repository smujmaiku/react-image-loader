const React = require('react');

describe('ImageLoader', () => {
	const {
		ImagesProvider,
	} = require('./ImageLoader');

	it('Should provide', () => {
		expect(<ImagesProvider>
			<div />
		</ImagesProvider>).toEqual(expect.any(React.Component));
	});
});
