/*
 * @Author: 史涛 
 * @Date: 2019-01-05 19:32:26 
 * @Last Modified by: 史涛
 * @Last Modified time: 2021-01-11 16:41:34
 */

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './routes/App';


ReactDOM.render(<App />, document.getElementById('app'));

if (module.hot)
    module.hot.accept();