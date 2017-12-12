import React from "react";
import Slider from 'material-ui/Slider';
import Paper from 'material-ui/Paper';

const paperStyle = {
    width: 300,
    margin: 20,
    padding: 10,
    textAlign: 'left',
    display: 'inline-block',
};

const StepSlider = props =>
    <div>
        <Paper style={paperStyle} zDepth={2}>
        <h2>{props.name + ' (' + props.code + ')'}</h2>
        <Slider
            min={props.min}
            max={props.max}
            step={props.step}
            value={props.value}
            onChange={props.onChange} />
        <p>
            <span>{props.currentStepName}</span>
        </p>
        <p>
            <span>{props.currentStepDescription}</span>
        </p>
        </Paper>
    </div>

export default StepSlider;
