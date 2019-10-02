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

const target = document.querySelector('#root');
window.addEventListener("resize", () => { store.dispatch(onWindowResize(window.innerWidth)) });

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)
