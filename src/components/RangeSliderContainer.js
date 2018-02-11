import React, { Component } from 'react'
import RangeSlider from './RangeSlider'

const dummySliderValues = {
  code: '7GR',
  name: 'Grøftingsintensitet',
  values: [
    {
      code: 1,
      value: 'Intakt',
      description: 'Uten grøftingsinngrep',
    },
    {
      code: 2,
      value: 'Ubetydelig grøftingsinngrep',
      description:
        'Grøfting som har gitt, eller forventes å gi, opphav til observerbar effekt på artssammensetningen',
    },
    {
      code: 3,
      value: 'Nokså lite grøftingsinngrep',
      description:
        'Grøfting som har gitt, eller forventes å gi, opphav til betydelig endring i artssammensetningen innenfor en gitt hovedtype',
    },
    {
      code: 4,
      value: 'Omfattende grøfting',
      description:
        'Grøfting som har gitt, eller forventes å gi, opphav til vesentlig endring i artssammensetningen og som dermed gir opphav til V12 Grøftet torvmark',
    },
    {
      code: 5,
      value: 'Gjennomgripende grøfting',
      description:
        'Grøfting som har gitt, eller forventes å gi, opphav til en så sterk endring i artssammensetningen at det utvikles et fastmarkssystem',
    },
  ],
}

export default class RangeSliderContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sliderValues: '',
      sliderValue: [0, 10],
      min: 0,
      max: 10,
      enabled: false,
    }
    this.handleSlider = this.handleSlider.bind(this)
    this.handleCheckChange = this.handleCheckChange.bind(this)
  }

  componentDidMount() {
    // todo: get values from api
    this.setState({
      sliderValues: dummySliderValues,
      min: 0,
      max: dummySliderValues.values.length - 1,
      sliderValue: [0, dummySliderValues.values.length - 1],
    })
  }

  handleSlider = value => {
    this.setState({ sliderValue: value })
  }

  handleCheckChange = (event, isInputChecked) => {
    this.setState({ enabled: isInputChecked })
  }

  render() {
    return (
      <RangeSlider
        enabled={this.state.enabled}
        name={this.state.sliderValues.name}
        code={this.state.sliderValues.code}
        min={this.state.min}
        max={this.state.max}
        step={1}
        value={this.state.sliderValue}
        minStepName={
          this.state.sliderValues.values
            ? this.state.sliderValues.values[this.state.sliderValue[0]].value
            : ''
        }
        minStepDescription={
          this.state.sliderValues.values
            ? this.state.sliderValues.values[this.state.sliderValue[0]]
                .description
            : ''
        }
        maxStepName={
          this.state.sliderValues.values
            ? this.state.sliderValues.values[this.state.sliderValue[1]].value
            : ''
        }
        maxStepDescription={
          this.state.sliderValues.values
            ? this.state.sliderValues.values[this.state.sliderValue[1]]
                .description
            : ''
        }
        handleSlider={this.handleSlider}
        handleCheckChange={this.handleCheckChange}
      />
    )
  }
}
