import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

import './index.css';
import reducer from './reducers';
import TodoIndex from './components/todo_index';
import TodoNew from './components/todo_new';
import TodoDetail from './components/todo_detail';

// 開発環境はデバックできるようにする
const enhancer =
    process.env.NODE_ENV === 'development'
        ? composeWithDevTools(applyMiddleware(thunk))
        : applyMiddleware(thunk);

const store = createStore(reducer, enhancer);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                {/* exact は完全にマッチする場合のみルーティング */}
                <Route exact path="/" component={TodoIndex} />
                <Route exact path="/todo" component={TodoIndex} />
                <Route path="/register" component={TodoNew} />
                {/* id は変数で実際の値は event の id のため、 : が必要 */}
                <Route path="/todo/:id" component={TodoDetail} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
