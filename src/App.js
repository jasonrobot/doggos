import React from 'react';

import thunk from 'redux-thunk';

import {
    applyMiddleware,
    createStore,
} from 'redux';

import {
    Provider,
} from 'react-redux';

import './App.css';

import ReduxDoggo, {rootReducer} from './ReduxDoggo.js';

const rootStore = createStore(rootReducer, applyMiddleware(thunk));

function App() {
    return (
            <Provider store={rootStore}>
            {/*<ExampleClass/>*/}
        {/*<ExampleHooks/>*/}
        {/*<FunctionDoggo/>*/}
        <ReduxDoggo/>
        </Provider>
    );
}

export default App;
