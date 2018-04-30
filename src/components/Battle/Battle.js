import React, { Component } from 'react';

import './Battle.css';

import LeftPlayer from '../LeftPlayer';
import RightPlayer from '../RightPlayer';
import Logs from '../Logs/Logs';

let battleLogs = [];

class Battle extends Component {
    state={
        leftPlayer: {
            name: 'LeftPlayer_PWNZ',
            damage: 3,
            armor: 5,
            hitPoints: 25,
            img: "https://cdn1.iconfinder.com/data/icons/zeshio-s-fantasy-avatars/200/Fantasy_avatar_people-07-512.png"
        },
        rightPlayer: {
            name: 'RightPlayer_Boss',
            damage: 1,
            armor: 8,
            hitPoints: 20,
            img: "https://cdn1.iconfinder.com/data/icons/zeshio-s-fantasy-avatars/200/Fantasy_avatar_people-17-512.png"
        },
        battle: {
            rightPlayer: {
                attackSelectedOption: 'body',
                defendSelectedOption: 'body'
            },
            leftPlayer: {
                attackSelectedOption: '',
                defendSelectedOption: ''
            }
        },
        attackSelectedOption: '',
        defendSelectedOption: '',
        leftHP: 25,
        rightHP: 20,
        winner: ''
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
            console.log('Please select both atack and defend positions');
        } else if (this.state.winner !== '') {
            return
        } else {
            this.state.battle.leftPlayer.attackSelectedOption = this.state.attackSelectedOption
            this.state.battle.leftPlayer.defendSelectedOption = this.state.defendSelectedOption
            // this.calculateDamage()

            this.setState({
                attackSelectedOption: '',
                defendSelectedOption: ''
            })

            this.buildLogString()
        }
     }

     buildLogString = () => {
        let damage = 0;
        let punch = 0;
        if (this.state.battle.leftPlayer.attackSelectedOption !== this.state.battle.rightPlayer.defendSelectedOption) {
            damage = this.state.rightPlayer.armor - this.state.leftPlayer.damage; 
        } else { null }
        if (this.state.battle.rightPlayer.attackSelectedOption !== this.state.battle.leftPlayer.defendSelectedOption) {
            punch = this.state.leftPlayer.armor - this.state.rightPlayer.damage;
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

    //  deathHandler = () => {
    //     this.state.leftHP <= 0 ? this.setState({winner: this.state.rightPlayer.name}) : '';
    //     this.state.rightHP <= 0 ? this.setState({winner: this.state.leftPlayer.name}) : '';
    //     console.log(this.state.winner)
    //     console.log(this.state.leftHP)
    //     console.log(this.state.rightHP)
    //  }
     
    render() {
        const deathHandler = () => {
            this.state.leftHP <= 0 ? this.setState({winner: this.state.rightPlayer.name}) : '';
            this.state.rightHP <= 0 ? this.setState({winner: this.state.leftPlayer.name}) : '';
         }
        return (
            <div>
            <div className="Battle">
                <div className="left-player">
                    {this.state.winner === '' ? deathHandler() : 'winner is ' + this.state.winner}
                    <LeftPlayer player={this.state.leftPlayer} hp={this.state.leftHP}/>
                </div>
                <div className="battle-section">
                {/* <form onSubmit={this.handleFormSubmit}> */}
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
                <div className="right-player">
                    <RightPlayer player={this.state.rightPlayer} hp={this.state.rightHP}/>
                </div>
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