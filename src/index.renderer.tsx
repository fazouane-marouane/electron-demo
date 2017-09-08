import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
// tslint:disable-next-line:no-var-requires no-require-imports
require('./services'); // init services
require('./data-models'); // init data models

declare global {
  interface NodeModule {
    hot: {
      accept: (render: Function) => any;
    } | undefined | null;
  }
}

export function render() {
  // tslint:disable-next-line:no-require-imports
  let App = require('./app').App;
  ReactDOM.render(<AppContainer><App /></AppContainer>, document.getElementById('App'));
}

if (module.hot) { module.hot.accept(render); }
