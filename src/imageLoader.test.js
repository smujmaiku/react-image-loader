const React = require('react');
const {
	ImagesProvider,
} = require('./ImageLoader');

describe('ImageLoader', () => {
	it('Should provide', () => {
		expect(<ImagesProvider/>).toEqual(expect.any(React.Component));
	});
});
