import { SELECTION_SET, SELECTION_TOGGLE, SELECTION_RESET } from '../../constants/action-types';


export const registerClickEvent = (view, store) => {
  view.on('click', (event) => {
    const multiSelect = event.native.shiftKey || event.native.ctrlKey || event.native.metaKey;

    view.hitTest(event.screenPoint)
      .then((response) => {
        const graphic = response.results && response.results[0] && response.results[0].graphic;
        if (graphic) {
          store.dispatch({
            type: multiSelect ? SELECTION_TOGGLE : SELECTION_SET,
            layer: graphic.layer.id,
            OID: graphic.attributes[graphic.layer.objectIdField],
          });
        } else if (!multiSelect) {
          store.dispatch({ type: SELECTION_RESET });
        }
      });
  });
};

export default registerClickEvent;
