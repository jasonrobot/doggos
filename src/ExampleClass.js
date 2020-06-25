import React from 'react';

function logToServer(message) {
    console.log(message);
}

export default class ExampleClass extends React.Component {
    constructor(props) {
        super();
        this.state = {count: 0};
    }

    componentDidMount() { document.title = `You clicked ${this.state.count} times`; }
    componentDidUpdate() { document.title = `You clicked ${this.state.count} times`; }
    componentWillUnmount() { logToServer(`User clicked ${this.state.count} times`); }

    incCount() { this.setState({count: this.state.count + 1}); }

    render() {
        return <button onClick={() => this.incCount()}>{this.state.count}</button>;
    }
}
