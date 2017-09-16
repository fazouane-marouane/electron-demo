import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import * as isDevMode from 'electron-is-dev';
// tslint:disable:no-var-requires no-require-imports
if (isDevMode) {
  require('react-hot-loader/patch');
}
import '../services'; // init services
import '../data-models'; // init data models
// tslint:enable
import { App } from '../app';

function render() {
  // tslint:disable-next-line:no-require-imports
  const e = React.createElement;
  ReactDOM.render(
    e(AppContainer, {}, e(App)),
    document.getElementById('app'));
}

if (module.hot) { module.hot.accept(render); }
render();
