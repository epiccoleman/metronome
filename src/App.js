import React from 'react';
import Tone, { Sampler } from "tone";
import './App.css';
import TempoDial from './TempoDial';

import Tick from "./tick.wav"

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

  changeTempo = (tempo) => {
    Tone.Transport.bpm.value = tempo;
    this.setState({bpm: tempo})
  }

  render() {
    const { isLoaded, isPlaying, bpm } = this.state;
    return (
      <div id="app-container">
        <button disabled={!isLoaded || isPlaying} onClick={this.handleStart}>
          start
        </button>
        <button disabled={!isPlaying} onClick={this.handleStop}>stop</button>
        <TempoDial bpm={this.state.bpm} changeTempo={this.changeTempo}/>
      </div>
    );
  }
}