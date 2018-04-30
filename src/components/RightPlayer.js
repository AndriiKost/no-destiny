import React, { Component } from 'react';

import ProgressBar from './ProgressBar';

class RightPlayer extends Component {
    render() {
        return (
            <div>
                <ProgressBar />
                <h3>{this.props.player.name}</h3>
                <img src="https://cdn1.iconfinder.com/data/icons/zeshio-s-fantasy-avatars/200/Fantasy_avatar_people-17-512.png" height="50%" width="50%" />
                <p>Damage: {this.props.player.damage}</p>
                <p>Armor: {this.props.player.armor}</p>
                <p>Hit Points: {this.props.hp}</p>
            </div>
        )
    }
}

export default RightPlayer;