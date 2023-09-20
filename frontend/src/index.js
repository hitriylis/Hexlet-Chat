/* eslint-disable functional/no-expression-statements */

import ReactDOM from 'react-dom/client';
import init from './init';

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById('chat'));
  root.render(await init());
};

app();
