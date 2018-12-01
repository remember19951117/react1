require('core-js');
require('es6-promise');
require('fetch-ie8');
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';
import { useRouterHistory ,browserHistory  } from 'react-router'
import { createHistory } from 'history'
const history = useRouterHistory(createHistory)({
    basename: '/mobile'
});
/**
 * 主文件，项目入口
 */
ReactDOM.render(<Root history={history} />,document.getElementById('root'));
