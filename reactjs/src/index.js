import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import ProductList from './ProductList';
import Switch from './advancedcomponent/Switch.jsx';
import StatelessSwitch from './advancedcomponent/StatelessSwitch.jsx';
import TimersDashboard from './secondpart/TimersDashboard';//复杂的交互
import FirstPage from './routing/FirstPage.jsx';//改变url
import SecondPage from './routing/SecondPage.jsx';//使用history
import ThirdPage from './routing/ThirdPage.jsx';//模拟router库的实现
import Fourth from './routing/usinglibrary/ForthPage.jsx';
ReactDOM.render(<Fourth />, document.getElementById('root'));
registerServiceWorker();
