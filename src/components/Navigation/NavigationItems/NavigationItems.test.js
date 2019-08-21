import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItem from './NavigationItem/NavigationItem';
import NavigationItems from './NavigationItems';

configure ({adapter: new Adapter()});

describe ('<NavigationItems />', () => {
    let wrapper;

    beforeEach (() => {
        wrapper = shallow(<NavigationItems />);
    })

    it('should render two <NavigationItem /> elements if not authenticated ', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render 3 <NavigationItem /> elements if  authenticated ', () => {
        //wrapper = shallow(<NavigationItems isAuthenticated/>); //either we can set props value like this or use setProps methode to pass any props.
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    //To test if the Navigation item contains logout
    it('should exact a logout button ', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});