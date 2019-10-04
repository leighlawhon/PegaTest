import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './store'
import App from './containers/App'
import 'bootstrap/dist/css/bootstrap.min.css';

import 'sanitize.css/sanitize.css'
import './styles/styles.scss'
import { onWindowResize } from './modules/global/actions';
import { fetchData } from './modules/global/actions';
import MetaTags from 'react-meta-tags';

const target = document.querySelector('#root');
window.addEventListener("resize", () => { store.dispatch(onWindowResize(window.innerWidth)) });

store.dispatch(fetchData());

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <MetaTags>
          <title>Pega Test</title>
          <meta name="Pega Test" content="Agenda application for Pega test" />
          <meta property="og:title" content="Pega Test" />
          <meta property="og:image" content="./images/pega-logo-horizontal-positive-rgb-2@2x.png" />
        </MetaTags>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
