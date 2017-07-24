import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { Info } from '../info';
import * as actions from '../../reducer/webscene/actions';
import reducer from '../../reducer/webscene';


const store = createStore(reducer);

function setup() {
  const { selection, interacting, scale, zoom } = store.getState();
  const props = {
    interacting,
    zoom,
    scale,
    selectionLength: selection.length,
  };
  const wrapper = mount(
    <Provider store={store}>
      <Info {...props} />
    </Provider>,
  );

  return { props, wrapper };
}

describe('components', () => {
  describe('<Info />', () => {
    it('should render self and call init()', () => {
      const { wrapper } = setup();
      expect(wrapper.find('div').at(0).hasClass('info')).toBe(true);
      expect(wrapper.find('.info').children().hasClass('card')).toBe(true);
      expect(wrapper.find('.card').children().hasClass('card-content')).toBe(true);
      expect(wrapper.find('.card-content').children().length).toBe(4);
    });

    it('should render interaction values correctly after VIEW_CHANGE', () => {
      store.dispatch({
        type: actions.VIEW_CHANGE,
        view: {
          interacting: true,
          zoom: 1.2,
          scale: 3.4,
        },
      });
      const { wrapper } = setup();
      expect(wrapper.find('.card-content').children().at(0).text()).toBe('interacting: true');
      expect(wrapper.find('.card-content').children().at(1).text()).toBe('scale: 3.40');
      expect(wrapper.find('.card-content').children().at(2).text()).toBe('zoom: 1.20');
    });

    it('should render selection count correctly after SELECTION_SET', () => {
      store.dispatch({
        type: actions.SELECTION_SET,
        OIDArray: [1, 2],
      });
      const { wrapper } = setup();
      expect(wrapper.find('.card-content').children().at(3).text()).toBe('selected items: 2');
    });
  });
});
