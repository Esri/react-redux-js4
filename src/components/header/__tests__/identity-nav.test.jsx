import React from 'react';
import { mount } from 'enzyme';
import { IdentityNav } from '../identity-nav';

function setupSignedIn() {
  const props = {
    username: 'user123',
    fullname: 'John Doe',
    thumbnailurl: 'http://bla.jpg',
    signIn: jest.fn(),
    signOut: jest.fn(),
  };
  const wrapper = mount(<IdentityNav {...props} />);

  return { props, wrapper };
}

function setupNotSignedIn() {
  const props = {
    username: null,
    fullname: null,
    thumbnailurl: null,
    signIn: jest.fn(),
    signOut: jest.fn(),
  };
  const wrapper = mount(<IdentityNav {...props} />);

  return { props, wrapper };
}

describe('components', () => {
  describe('<Identity /> (signed in)', () => {
    it('should render self and show identity dropdown', () => {
      const { wrapper } = setupSignedIn();
      expect(wrapper.find('.dropdown').hasClass('hidden')).toBe(false);
      expect(wrapper.find('#sign-in').hasClass('hidden')).toBe(true);
      expect(wrapper.find('.dropdown-title').text()).toBe('user123');
      expect(wrapper.find('img').prop('src')).toBe('http://bla.jpg');
      expect(wrapper.find('.shortname').text()).toBe('John');
      expect(wrapper.find('#sign-out').text()).toBe('Sign Out');
    });

    it('should call signOut when Sign Out button is clicked', () => {
      const { props, wrapper } = setupSignedIn();
      wrapper.find('#sign-out').simulate('click');
      expect(props.signOut).toHaveBeenCalled();
    });
  });

  describe('<Identity /> (not signed in)', () => {
    it('should render self and hide identity dropdown', () => {
      const { wrapper } = setupNotSignedIn();
      expect(wrapper.find('.dropdown').hasClass('hidden')).toBe(true);
      expect(wrapper.find('#sign-in').hasClass('hidden')).toBe(false);
    });

    it('should call signIn when Sign In button is clicked', () => {
      const { props, wrapper } = setupNotSignedIn();
      wrapper.find('#sign-in').simulate('click');
      expect(props.signIn).toHaveBeenCalled();
    });
  });
});
