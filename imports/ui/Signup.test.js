import { Meteor } from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import { mount } from 'enzyme';

import { Signup } from './Signup.js';

if (Meteor.isClient) {
  describe('signup',function () {

    it('should show error messages', function () {
        const error = 'This is not working';
        const wrapper =  mount(<Signup createUser={() => {}}/>);

        wrapper.setState({error});
        const errortext = wrapper.find('p').text();
        expect(errortext).toBe('This is not working');
        wrapper.setState({error:''});
        expect(wrapper.find("p").length).toBe(0);
    });

    it('should call createUser with form data',function () {
      const email = 'Andrew@test.com';
      const password = 'password1234';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);
      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');
      expect(spy.calls[0].arguments[0]).toEqual({email,password});

    });

    it('should set error if short password',function () {
      const email = 'Andrew@test.com';
      const password = 'passw';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);
      wrapper.ref('email').node.value = email;
      wrapper.ref('password').node.value = password;
      wrapper.find('form').simulate('submit');

      expect(wrapper.state('error').length).toBeGreaterThan(0);
      wrapper.setState({error:''});
      expect(wrapper.find("p").length).toBe(0);

    });

    it('should set createUser callback errors',function () {
      const password = 'password123';
      const spy = expect.createSpy();
      const wrapper = mount(<Signup createUser={spy}/>);
      const reason = 'failed';
      wrapper.ref('password').node.value = password;

      wrapper.find('form').simulate('submit');
      spy.calls[0].arguments[1]({reason});
      expect(wrapper.state('error')).toBe(reason);

      spy.calls[0].arguments[1]();
      expect(wrapper.state('error')).toBe('');
    });

  });
}
