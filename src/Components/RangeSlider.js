import React from 'react';
import { Range } from 'rc-slider';
import Paper from 'material-ui/Paper';
import 'rc-slider/assets/index.css';

const paperStyle = {
    width: 500,
    margin: 20,
    padding: 10,
    textAlign: 'left',
    display: 'inline-block',
};

const RangeSlider = props =>
    <div>
        <Paper style={paperStyle} zDepth={2}>
            <h2>{props.name + ' (' + props.code + ')'}</h2>
            <p>
                <span>{props.minStepName}</span>
            </p>
            <p>
                <span>{props.minStepDescription}</span>
            </p>
            <Range
                dots={true}
                allowCross={false}
                step={props.step}
                min={props.min}
                max={props.max}
                defaultValue={[props.min,props.max]}
                onChange={props.onChange}
            />
            <p>
                <span>{props.maxStepName}</span>
            </p>
            <p>
                <span>{props.maxStepDescription}</span>
            </p>
        </Paper>
    </div>;

export default RangeSlider;