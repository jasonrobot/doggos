import React, {useEffect} from 'react';

import {
    combineReducers,
} from 'redux';

import {
    connect,
} from 'react-redux';

// ACTION CREATORS

function setCurrentDoggo(doggo) {
    return {
        type: 'SET_DOGGO',
        doggo
    };
}

// THUNK ACTIONS

function getNextDoggo() {
    return async function(dispatch) {
        const response = await fetch('https://random.dog/woof');
        dispatch(setCurrentDoggo(await response.text()));
    };
}

// REDUCERS

function currentDoggo(state = '', action) {
    switch (action.type) {
        case 'SET_DOGGO':
            return action.doggo;
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    currentDoggo: currentDoggo,
});

// Redux bindings

const mapStateToProps = (state) => {
    return {
        currentDoggo: state.currentDoggo,
    };
};

const mapDispatchToProps = {
    getNextDoggo
};

// Finally, the component

function ReduxDoggo1({
    currentDoggo,
    getNextDoggo,
}) {

    useEffect(() => {
        getNextDoggo();
    }, []);

    if (currentDoggo === undefined) {
        return 'Where\'s the doggo?';
    } else if (currentDoggo.endsWith( 'mp4')) {
        return (
                <video autoPlay={true} loop={true} onClick={getNextDoggo}>
                <source src={`https://random.dog/${currentDoggo}`} type="video/mp4"/>
                </video>
        );
    } else {
        return (
                <img src={`https://random.dog/${currentDoggo}`} alt="dog" onClick={getNextDoggo}></img>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReduxDoggo1);