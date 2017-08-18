
const highlights = [];

export const updateHighlights = (view, selection) => {
  while (highlights.length) {
    highlights[0].remove();
    highlights.splice(0, 1);
  }

  view.layerViews.items.forEach(layerView =>
    highlights.push(
      layerView.highlight(
        selection
          .filter(item => item.layer === layerView.layer.id)
          .map(item => item.OID),
        ),
      ),
  );
};

export default updateHighlights;
