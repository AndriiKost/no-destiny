import React, { Component } from 'react';

import './Battle.css';
import Timer from '../Timer/Timer';
import Player from '../Player';

import Players from '../../model/players';

let battleLogs = [];

class Battle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leftPlayer: {},
            rightPlayer: {},
            battle: {
                rightPlayer: {
                    attackSelectedOption: '',
                    defendSelectedOption: ''
                },
                leftPlayer: {
                    attackSelectedOption: '',
                    defendSelectedOption: ''
                }
            },
            winner: '',
            uiHelp: ''
        }
    }

    componentWillMount() {
        const players = Players;
        this.setState({
            leftPlayer: players.leftPlayer,
            rightPlayer: players.rightPlayer,
            leftHP: players.leftHP,
            rightHP: players.rightHP
        })
    }

    attackHandleOptionChange = (changeEvent) => {
        this.setState({
          attackSelectedOption: changeEvent.target.value
        });
      }

      defendHandleOptionChange = (changeEvent) => {
        this.setState({
          defendSelectedOption: changeEvent.target.value
        });
      }

      handleFormSubmit = () => {
        const giveDamage = this.state.leftPlayer.damage - this.state.rightPlayer.armor;
        const receiveDamage = this.state.rightPlayer.damage - this.state.leftPlayer.armor;
        if (this.state.attackSelectedOption === '' || this.state.defendSelectedOption === '') {
            this.setState({
                uiHelp: 'Please select attack and defend position'
            })
        } else if (this.state.winner !== '') {
            return
        } else {
            this.state.battle.leftPlayer.attackSelectedOption = this.state.attackSelectedOption
            this.state.battle.leftPlayer.defendSelectedOption = this.state.defendSelectedOption

            this.setState({
                uiHelp: ''
            })

            this.buildLogString()
        }
     }

     randomizeAttack = () => {
        const randomNum = this.getRandomInt(3);
        switch (randomNum) {
            case 0:
                return 'head'
            case 1:
                return 'shoulders'
            case 2:
                return 'body'
        }
     }

     randomizeDefense = () => {
        const randomNum = this.getRandomInt(3);
        switch (randomNum) {
            case 0:
                return 'head'
            case 1:
                return 'shoulders'
            case 2:
                return 'body'
        }
     }

     getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
      }

     buildLogString = () => {
        let damage = 0;
        let punch = 0;

        this.state.battle.rightPlayer.attackSelectedOption = this.randomizeAttack();
        this.state.battle.rightPlayer.defendSelectedOption = this.randomizeDefense();

        if (this.state.battle.leftPlayer.attackSelectedOption !== this.state.battle.rightPlayer.defendSelectedOption) {
            damage = this.state.leftPlayer.damage - this.state.rightPlayer.armor; 
        } else { null }
        if (this.state.battle.rightPlayer.attackSelectedOption !== this.state.battle.leftPlayer.defendSelectedOption) {
            punch = this.state.rightPlayer.damage - this.state.leftPlayer.armor;
        } else { null }
        if (this.state.battle.rightPlayer.attackSelectedOption === this.state.battle.leftPlayer.defendSelectedOption || this.state.battle.rightPlayer.attackSelectedOption === this.state.battle.leftPlayer.defendSelectedOption) {
            console.log('blocked')
        } else { null }

        const id = Math.floor((Math.random() * 196781237890) + 1);
        const stringLog = this.state.leftPlayer.name + ' attacked ' + this.state.rightPlayer.name + ' ' + this.state.attackSelectedOption + ' on ' + damage + ' hit points while ' + this.state.rightPlayer.name + ' punched ' + this.state.leftPlayer.name + ' ' + this.state.attackSelectedOption + ' on ' + punch + ' hit points';
        battleLogs.push({id: id, log: stringLog});
        this.changeHitPointsHandler(damage, punch);
     }

     changeHitPointsHandler = (give, receive) => {
        this.setState({
            leftHP: this.state.leftHP - receive,
            rightHP: this.state.rightHP - give
        })
     }
     
    render() {
        const deathHandler = () => {
            if (this.state.leftHP <= this.state.rightHP && this.state.leftHP <= 0 && this.state.rightHP <= 0) {
                this.setState({winner: 'Draw'})
            } else if (this.state.leftHP <= 0) {
                this.setState({winner: 'The winner is ' + this.state.rightPlayer.name})
            } else if (this.state.rightHP <= 0) {
                this.setState({winner: 'The winner is ' + this.state.leftPlayer.name})
            }
            // this.state.leftHP <= 0 ? this.setState({winner: this.state.rightPlayer.name}) : '';
            // this.state.rightHP <= 0 ? this.setState({winner: this.state.leftPlayer.name}) : '';
         }

        const form = (
            <div className="battle-section">
                    <div className="attack-field">
                        <ul><h4>Attack</h4>
                            <li><label>
                                <input type="radio" value="head" 
                                            checked={this.state.attackSelectedOption === 'head'} 
                                            onChange={this.attackHandleOptionChange} />
                                head
                            </label></li>
                            <li><label>
                                <input type="radio" value="shoulders" 
                                            checked={this.state.attackSelectedOption === 'shoulders'} 
                                            onChange={this.attackHandleOptionChange} />
                                shoulders
                            </label></li>
                            <li><label>
                                <input type="radio" value="body" 
                                            checked={this.state.attackSelectedOption === 'body'} 
                                            onChange={this.attackHandleOptionChange} />
                                body
                            </label></li>
                        </ul>
                    </div>

                    <div className="defent-field">
                        <ul><h4>Protect</h4>
                            <li><label>
                                <input type="radio" value="head" 
                                            checked={this.state.defendSelectedOption === 'head'} 
                                            onChange={this.defendHandleOptionChange} />
                                head
                            </label></li>
                            <li><label>
                                <input type="radio" value="shoulders" 
                                            checked={this.state.defendSelectedOption === 'shoulders'} 
                                            onChange={this.defendHandleOptionChange} />
                                shoulders
                            </label></li>
                            <li><label>
                                <input type="radio" value="body" 
                                            checked={this.state.defendSelectedOption === 'body'} 
                                            onChange={this.defendHandleOptionChange} />
                                body
                            </label></li>
                        </ul>
                    </div>
            
                <button className="btn-attack" onClick={this.handleFormSubmit}>Attack</button>

                </div>
         );
        return (
            <div>
                <Timer />
            <div className="Battle">
                <div className="left-player">
                    {this.state.winner === '' ? deathHandler() : this.state.winner}
                    <Player player={this.state.leftPlayer} hp={this.state.leftHP}/>
                </div>
                {form}
                <div className="right-player">
                    <Player player={this.state.rightPlayer} hp={this.state.rightHP}/>
                </div>
                {this.state.uiHelp !== ''  ? <div className="select-attack"><img src="https://vignette.wikia.nocookie.net/mkwikia/images/e/ed/Toasty_mk3.JPG/revision/latest?cb=20110310085358" width="10%" height="10%" /><label>select atacking and protecting positions to punch the enemy as much as you can</label></div> : null}
            </div>
            <div className="battle-logs">
                {battleLogs.map((el) => {
                    return <div>{el.log}</div>
                })}
            </div>
            </div>
        )
    }
}

export default Battle;