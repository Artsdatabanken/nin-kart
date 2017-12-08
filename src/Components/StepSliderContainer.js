import React, {Component} from 'react';
import StepSlider from './StepSlider'

const dummySliderValues = {
    code: "7GR",
    name: "Grøftingsintensitet",
    values: [
        {
            code: 1,
            value:"Intakt",
            description: "Uten grøftingsinngrep"
        },
        {
            code: 2,
            value:"Ubetydelig grøftingsinngrep",
            description: "Grøfting som har gitt, eller forventes å gi, opphav til observerbar effekt på artssammensetningen"
        },
        {
            code: 3,
            value:"Nokså lite grøftingsinngrep",
            description: "Grøfting som har gitt, eller forventes å gi, opphav til betydelig endring i artssammensetningen innenfor en gitt hovedtype"
        },
        {
            code: 4,
            value:"Omfattende grøfting",
            description: "Grøfting som har gitt, eller forventes å gi, opphav til vesentlig endring i artssammensetningen og som dermed gir opphav til V12 Grøftet torvmark"
        },
        {
            code: 5,
            value:"Gjennomgripende grøfting",
            description: "Grøfting som har gitt, eller forventes å gi, opphav til en så sterk endring i artssammensetningen at det utvikles et fastmarkssystem"
        },
    ]
};

// material-ui støtter ikke range, bruk evt denne: https://github.com/davidchin/react-input-range

export default class StepSliderContainer extends Component {
    state = {
        sliderValues: "",
        sliderValue: 0,
        max: 1
    };

    componentDidMount() {
        // todo: get values from api
        this.setState({
            sliderValues: dummySliderValues,
            max: dummySliderValues.values.length-1

        });
    }

    handleSlider = (event, value) => {
        this.setState({sliderValue: value});
    };

    render() {
        return (
            <StepSlider
                name={this.state.sliderValues.name}
                code={this.state.sliderValues.code}
                min={0}
                max={this.state.max}
                step={1}
                value={this.state.sliderValue}
                currentStepName={this.state.sliderValues.values ? this.state.sliderValues.values[this.state.sliderValue].value : ""}
                currentStepDescription={this.state.sliderValues.values ? this.state.sliderValues.values[this.state.sliderValue].description : ""}
                onChange={this.handleSlider}
            />
        );
    }
}