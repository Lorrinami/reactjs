import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ProductList from './ProductList';

ReactDOM.render(<ProductList />, document.getElementById('root'));
registerServiceWorker();
