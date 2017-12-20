import React from 'react'
import DigDownList from "./DigDownList";

class DigDownListContainer extends React.Component {


    componentDidMount() {
        this.props.dataFetchFunction(this.props.id);
    }


    render() {
        return (
            <div>
                <DigDownList
                    name={this.props.name}
                    items={this.props.children}
                    key={this.props.filterCode}
                    filterCode={this.props.filterCode}
                    filter={this.props.filter}
                    onClick={id => this.props.dataFetchFunction(id)}
                    onCheck={this.props.handleCheckChange}
                    isSelected={this.props.isSelected}
                />
                {this.props.filter.map(item => (
                    <span key={item}>{item + ","}</span>
                ))}

            </div>
        )
    }
}

export default DigDownListContainer
