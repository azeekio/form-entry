import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import FormInput from './FormInput';

var blankInput, onChange, onSubmit;
beforeEach( () => {
	onChange = jest.fn();
	onSubmit = jest.fn();

	blankInput = <FormInput
					key={0}
	        		title={""}
	        		required={true}
	        		error={false}
	        		onChange={onChange}
	        		onSubmit={onSubmit}
    			/>;
})

it('should render without crashing', () => {
	const div = document.createElement('div');
 	ReactDOM.render(blankInput, div);
 	ReactDOM.unmountComponentAtNode(div);
});

it('should call handleChange prop on change', () => {
	const div = document.createElement('div');
	const fi = ReactDOM.render(blankInput, div);
	fi._inputElement.value = 'test';
	fi.handleChange();

	expect( onChange ).toHaveBeenCalled();
	ReactDOM.unmountComponentAtNode(div);
});

it('should set state active correctly when focused and blurred', () => {
 	const fi = shallow(blankInput);
	fi.instance().onFocus();
 	expect( fi.instance().state.active ).toEqual( true );

 	fi.instance().onBlur();
 	expect( fi.instance().state.active ).toEqual( false );
});

it('should not have "error" class in inputClasses when this.prop.error = false', () => {
 	const fi = shallow(blankInput);
	var inputClasses = fi.instance().getInputClasses();

	expect( inputClasses ).not.toEqual( expect.stringContaining('error') );
});

it('should have "error" class in inputClasses when this.prop.error = true', () => {
 	const fi = shallow(<FormInput
							key={0}
			        		title={""}
			        		required={true}
			        		error={true}
			        		onChange={onChange}
			        		onSubmit={onSubmit}
		    			/>);
	var inputClasses = fi.instance().getInputClasses();

	expect( inputClasses ).toEqual( expect.stringContaining('error') );
});

it('should trim input value when pressing enter', () => {
	const div = document.createElement('div');
	const fi = ReactDOM.render(blankInput, div);
	fi._inputElement.value = '    test';
	fi.onKeyDown({which: 13});

	expect( fi._inputElement.value ).toEqual( 'test' );
	ReactDOM.unmountComponentAtNode(div);
});

it('should trim input value when pressing tab', () => {
	const div = document.createElement('div');
	const fi = ReactDOM.render(blankInput, div);
	fi._inputElement.value = '    test';
	fi.onKeyDown({which: 9});

	expect( fi._inputElement.value ).toEqual( 'test' );
	ReactDOM.unmountComponentAtNode(div);
});

it('should not trim input value when pressing other keys', () => {
	const div = document.createElement('div');
	const fi = ReactDOM.render(blankInput, div);
	fi._inputElement.value = '    test';
	fi.onKeyDown({which: 10});

	expect( fi._inputElement.value ).toEqual( '    test' );
	ReactDOM.unmountComponentAtNode(div);
});