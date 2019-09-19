import React from 'react';
import Roundy from 'roundy';
import "./TempoDial.css"

const TempoDial = (props) => {
    return(
        <div className="tempo-dial-container">
            <div className="bpm-display">{props.bpm}</div>
            <Roundy
            value={props.bpm}
            min={40}
            max={220}
            // stepSize={1}
            // radius={100}
            arcSize={270}
            allowClick={true}
            rotationOffset={-45}
            color='#faa620'
            onChange={props.changeTempo} />
        </div>
    );
}

export default TempoDial;