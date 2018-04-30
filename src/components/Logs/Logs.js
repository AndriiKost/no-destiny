import React from 'react';

const logs = (props) => {

    // const buildLogString = () => {
    //     return <div>{this.props.leftPlayer.name + ' attacked ' + this.props.rightPlayer.name  + this.props.attackSelectedOption + ' on hit points' + '/n' + this.props.rightPlayer.name + ' attacked ' +this.props.leftPlayer.name  + this.props.attackSelectedOption + ' on hit points' }</div>
    // }

    return (
        <div className="Logs">
            <div>{this.props.leftPlayer.name + ' attacked ' + this.props.rightPlayer.name  + this.props.attackSelectedOption + ' on hit points' + '/n' + this.props.rightPlayer.name + ' attacked ' +this.props.leftPlayer.name  + this.props.attackSelectedOption + ' on hit points' }</div>
        </div>
    )
};

export default logs;