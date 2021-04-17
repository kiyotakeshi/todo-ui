import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './index.css';
import reducer from './reducers';
import TodoIndex from './components/todo_index';
import TodoNew from './components/todo_new';

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Switch>
                <Route exact path="/register" component={TodoNew} />
                <Route exact path="/" component={TodoIndex} />
            </Switch>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
