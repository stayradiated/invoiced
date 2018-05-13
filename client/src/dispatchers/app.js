import Dispatcher from './dispatcher'

const AppDispatcher = {
  ...Dispatcher,

  handleViewAction (action) {
    return this.dispatch({
      source: 'VIEW_ACTION',
      action: action
    });
  }
}

export default AppDispatcher;
