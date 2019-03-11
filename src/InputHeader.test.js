import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import InputHeader from './InputHeader';

it('should render without crashing', () => {
	const div = document.createElement('div');
 	ReactDOM.render(<InputHeader title={'FIRST NAME'} required={true} error={false}/>, div);
 	ReactDOM.unmountComponentAtNode(div);
});

it('required text should not be visible when this.props.error = false', () => {
	const ih = shallow(<InputHeader title={'FIRST NAME'} required={true} error={false}/>);
	var headerClasses = ih.instance().getHeaderClasses();

	expect( headerClasses ).not.toEqual( expect.stringContaining('visible') );
});

it('required text should be visible when this.props.error = true', () => {
	const ih = shallow(<InputHeader title={'FIRST NAME'} required={true} error={true}/>);
	var headerClasses = ih.instance().getHeaderClasses();

	expect( headerClasses ).toEqual( expect.stringContaining('visible') );
});