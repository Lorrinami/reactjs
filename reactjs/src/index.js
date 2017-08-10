import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ProductList from './ProductList';
import TimersDashboard from './secondpart/TimersDashboard';

ReactDOM.render(<TimersDashboard />, document.getElementById('root'));
registerServiceWorker();
