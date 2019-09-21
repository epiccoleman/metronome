import React from 'react';
import Tone, { Sampler } from "tone";
import './App.css';
import TempoDial from './TempoDial';

import Tick from "./assets/sound/tick.wav"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

export default class App extends React.Component {

   constructor(props) {
    super(props);
    this.state = { isLoaded: false, isPlaying: false, bpm: 80};

    this.sampler = new Sampler(
      { A1: Tick },
      {
        onload: () => {
          this.setState({ isLoaded: true });
        }
      }
    ).toMaster();

    Tone.Transport.bpm.value = this.state.bpm;
  }

  handleStart = () => {
    var loop = new Tone.Loop((time) => {
      //triggered every eighth note. 
      console.log(time);
      this.sampler.triggerAttack("A1");
    }, "4n").start(0);

    Tone.Transport.start();
    this.setState({isPlaying: true});
  }

  handleStop = () => {
    Tone.Transport.stop();
    this.setState({isPlaying: false});
  }

  handleStartStop = () => {
    if (!this.state.isPlaying) {
      this.handleStart();
    } else {
      this.handleStop();
    }
  }

  changeTempo = (tempo) => {
    Tone.Transport.bpm.value = tempo;
    this.setState({bpm: tempo})
  }

  render() {
    const { isLoaded, isPlaying, bpm } = this.state;
    return (
      <div id="app-container">
        <TempoDial bpm={bpm} changeTempo={this.changeTempo}/>
        <div>
          <button className="play-pause-button" disabled={!isLoaded} onClick={this.handleStartStop}>
            <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} size="2x" style={{color: "#61892f" }}/>
          </button>
        </div>
      </div>
    );
  }
}