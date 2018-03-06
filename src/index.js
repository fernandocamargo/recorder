import React from 'react';
import ReactDOM from 'react-dom';

import 'assets/css/theme.css';
import App from './components/app';
import registerServiceWorker from './registerServiceWorker';

export const render = ({ stream, error }) =>
  Promise.resolve(
    ReactDOM.render(
      <App stream={stream} error={error} />,
      document.getElementById('root'),
    ),
  );

export const boost = () => Promise.resolve(registerServiceWorker());

export default navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(stream => render({ stream }))
  .catch(({ message }) => render({ error: message }))
  .then(boost);
