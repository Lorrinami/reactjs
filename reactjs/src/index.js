import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ProductList from './ProductList';
import TimersDashboard from './secondpart/TimersDashboard';//复杂的交互
import FirstPage from './routing/FirstPage.jsx';//改变url
import SecondPage from './routing/SecondPage.jsx';//使用history
ReactDOM.render(<SecondPage />, document.getElementById('root'));
registerServiceWorker();
