import React, { Component } from 'react';

import './Timer.css';

class Timer extends Component {
    state = {
        timer: null,
        counter: 45
    };

    componentDidMount() {
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
    }

    componentWillUnmount() {
        this.clearInterval(this.state.timer);
    }

    tick = () => {
            this.setState({
                counter: this.state.counter - 1
              });
    }

    render() {
      return (
        <div className="Timer">
            <h1>{this.state.counter}</h1>
            {this.state.counter <= 0 ? <p>Finish him!</p> : null}
            {this.state.counter <= -10 ? <p>What taking you that long?</p> : null}
            {this.state.counter <= -20 ? <p>Your enemy just fell asleep</p> : null}
            {this.state.counter <= -30 ? <p>....ZZZZZzzzzzz</p> : null}
        </div>
    )
    }
}

export default Timer;