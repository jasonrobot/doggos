import React, {useEffect} from 'react';

import {
    combineReducers,
} from 'redux';

import {
    connect,
} from 'react-redux';

// ACTION CREATORS

function incrementDoggoCount() {
    return {
        type: 'INCREMENT_DOGGO_COUNT'
    };
}

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
        dispatch(incrementDoggoCount());
    };
}

// REDUCERS

function doggoCount(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT_DOGGO_COUNT':
            return state + 1;
        case 'SET_DOGGO_COUNT':
            return action.count;
        default:
            return state;
    }
}

function currentDoggo(state = '', action) {
    switch (action.type) {
        case 'SET_DOGGO':
            return action.doggo;
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    doggoCount: doggoCount,
    currentDoggo: currentDoggo,
});

const mapStateToProps = (state) => {
    return {
        currentDoggo: state.currentDoggo,
        doggoCount: state.doggoCount,
    };
};

const mapDispatchToProps = {
    getNextDoggo
};

function ReduxDoggo({
    currentDoggo,
    doggoCount,
    getNextDoggo,
}) {

    useEffect(() => {
        getNextDoggo();
    }, []);

    useEffect(() => {
        document.title = `You've seen ${doggoCount} doggos.`;
    }, [doggoCount]);

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
)(ReduxDoggo);

