import React, { Component } from 'react';

import ProgressBar from './ProgressBar';

class LeftPlayer extends Component {

    render() {

        return (
            <div>
                <ProgressBar />
                <h3>{this.props.player.name}</h3>
                <img src={this.props.player.img} height="50%" width="50%"/>
                <p>Damage: {this.props.player.damage}</p>
                <p>Armor: {this.props.player.armor}</p>
                <p>Hit Points: {this.props.hp}</p>
            </div>
        )
    }
}

export default LeftPlayer;