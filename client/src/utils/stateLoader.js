export default class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem('http://amitkharod.com:state');
      if (localStorage.token || localStorage.adminToken) {
        return JSON.parse(serializedState);
      }
      return this.initializeState();
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      if (localStorage.token || localStorage.adminToken) {
        let serializedState = JSON.stringify(state);
        localStorage.setItem('http://amitkharod.com:state', serializedState);
      }
    } catch (err) {}
  }

  initializeState() {
    return {};
  }
}
