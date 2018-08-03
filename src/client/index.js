
/**
 * Entry point for the React application.
 * @summary React usage.
 * @todo N/A.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import queryString from 'query-string';
import App from './App';

const parsed = queryString.parse(window.location.search);

ReactDOM.render(<App size={8} fen={parsed.fen} />, document.getElementById('root'));
