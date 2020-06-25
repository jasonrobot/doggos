import React from 'react';

export default class ClassDoggo extends React.Component {
    constructor(props) {
        super();
        this.state = {
            currentDoggo: props.doggo
        };
    }

    async nextDoggo() {
        const response = await fetch('https://random.dog/woof');
        const text = await response.text();
        this.setState({currentDoggo: text});
    }

    componentDidMount() {
        this.nextDoggo();
        document.title = `You've seen ${this.state.count} doggos.`;
    }

    componentDidUpdate() {
        document.title = `You've seen ${this.state.count} doggos.`;
    }

    render() {
        if (this.state.currentDoggo === undefined) {
            return 'Where\'s the doggo?';
        } else {
            return (
                    <img src={`https://random.dog/${this.state.currentDoggo}`} alt="dog" onClick={() => this.nextDoggo()}></img>
            );
        }
    }
}
