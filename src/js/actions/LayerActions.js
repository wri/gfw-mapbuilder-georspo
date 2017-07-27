import dispatcher from 'js/dispatcher';

class LayerActions {

  addActiveLayer (layerId) {
    return layerId;
    // TODO: Remove once current layer panel design is approved
    // if (kids) {
    //   kids.forEach(childLayer => this.dispatch(childLayer));
    // }
  }

  removeActiveLayer (layerId) {
    return layerId;
    // TODO: Remove once current layer panel design is approved
    // if (kids) {
    //   kids.forEach(childLayer => this.dispatch(childLayer));
    // }
  }

  showLoading (layerId) {
    return layerId;
  }

  addSubLayer (info) {
    return info;
  }

  removeSubLayer (info) {
    return info;
  }

  changeViirsFiresTimeline (selectedIndex) {
    return selectedIndex;
  }

  changeModisFiresTimeline (selectedIndex) {
    return selectedIndex;
  }

  updateLossTimeline (data) {
    return {
      from: data.fromSelectedIndex,
      to: data.toSelectedIndex
    };
  }

  updateGladStartDate (startDate) {
    return startDate;
  }

  updateGladEndDate (endDate) {
    return endDate;
  }

  setLossOptions (lossOptionsData) {
    return lossOptionsData;
  }

  changeOpacity (parameters) {
    return parameters;
  }

  addAll () {
    return {};
  }

  removeAll () {
    return {};
  }

  updateCartoSymbol (symbol) {
    return symbol;
  }

}

export default dispatcher.createActions(LayerActions);
