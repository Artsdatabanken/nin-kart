import React from 'react';
import { Range } from 'rc-slider';
import Paper from 'material-ui/Paper';
import 'rc-slider/assets/index.css';
import Checkbox from 'material-ui/Checkbox';

const styles = {
    paperStyle: {
        width: 500,
        margin: 20,
        padding: 10,
        textAlign: 'left',
        display: 'inline-block',
    },
    checkbox: {
        marginBottom: 16,
    },
};

// https://github.com/react-component/slider
class RangeSlider extends React.Component {

    constructor(props) {
        super(props);

        this.handleCheckChange = props.handleCheckChange.bind(this);
        this.handleSlider = props.handleSlider.bind(this);
    }

    render() {
        return (
        <div>
            <Paper style={styles.paperStyle} zDepth={2}>
                <Checkbox
                    label={this.props.name + ' (' + this.props.code + ')'}
                    style={styles.checkbox}
                    checked={this.props.enabled}
                    onCheck={this.handleCheckChange}
                />
                <p>
                    <span>{this.props.minStepName}</span>
                </p>
                <p>
                    <span>{this.props.minStepDescription}</span>
                </p>
                <Range
                    dots={true}
                    allowCross={false}
                    step={this.props.step}
                    min={this.props.min}
                    max={this.props.max}
                    defaultValue={[this.props.min, this.props.max]}
                    onChange={this.handleSlider}
                    disabled={!this.props.enabled}
                />
                <p>
                    <span>{this.props.maxStepName}</span>
                </p>
                <p>
                    <span>{this.props.maxStepDescription}</span>
                </p>
            </Paper>
        </div>
    )
    }
}

export default RangeSlider;
