import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import {PrivateHeader} from './PrivateHeader.js';

if (Meteor.isClient) {

  describe("PrivateHeader",function () {
    it('should set button text to logout',function () {
      const wrapper = mount(<PrivateHeader title='Test Title' handleLogout={() => {}}/>);
      const buttontext = wrapper.find(".button").text();
      expect(buttontext).toBe('Log Out');
    });

    it('should set props title to h1 header',function () {
      const testtitle = 'Leonardo';
      const wrapper = mount(<PrivateHeader title={testtitle} handleLogout={() => {}}/>);
      const buttontext = wrapper.find(".header__title").text();
      expect(buttontext).toBe(testtitle);
    });

    it('should call the function',function () {
      const spy = expect.createSpy();
      spy(3,4,5);
      spy('Af');
      expect(spy).toHaveBeenCalledWith('Af');
    });

    it('should call handlelogout on click',function(){
      const spy = expect.createSpy();
      const wrapper = mount(<PrivateHeader title='title' handleLogout={spy}/>);
      wrapper.find('.button').simulate('click');
      expect(spy).toHaveBeenCalled();
    });

  });

}
