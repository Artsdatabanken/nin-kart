import React from 'react'
import DigDownList from "./DigDownList";
import TopBar from '../TopBar/TopBar'

class DigDownListContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            obj: "",
            children: [],

            // filter:
            areaIds: [],
            natureAreaIds: [],
            redlistThemeIds: [],
            redlistCategoryIds: [],
            TaxonIds: [],
        };

        this.handleDataFetch = props.dataFetchFunction.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.isSelected = this.isSelected.bind(this);
    }

    componentDidMount() {
        this.handleDataFetch(this.state.id);
    }
    handleCheckChange = function(event) {
        event.stopPropagation();
        const add = event.target.checked;
        const name = event.target.name;
        const filtercode = event.target.alt;

        console.log(filtercode + ", add: " + add + " " + name);
        this.updateFilter(add, filtercode, name);
    };

    isSelected(selectedIds, nodeId) {
        return this.state[selectedIds].indexOf(""+nodeId) >= 0
    }
    updateTree() {
        // let filter = {
        //     Municipalities: this.state.areaIds,
        //     NatureAreaTypeCodes: this.state.natureAreaIds,
        //     RedlistCategories: this.state.redlistCategoryIds,
        // };

        //this.goFetch(filter)
    }

    updateFilter = (add, type, code) => {
        if (type === undefined) {
            return;
        }
        if (add === true) {
            this.setState({
                [type]: [...this.state[type], code]
            }, () => this.updateTree())
        } else {
            this.setState((prevState) => ({
                [type]: prevState[type].filter(i => i !== code)
            }),() => this.updateTree());
        }
    };

    render() {
        return (
            <div>
                <TopBar
                    onClick={id => this.handleDataFetch(id)}
                    name={this.props.name}
                    parentId={this.state.parentId}
                />
                <DigDownList
                    items={this.state.children}
                    key={this.props.filterCode}
                    filterCode={this.props.filterCode}
                    filter={this.state[this.props.filterCode]}
                    onClick={id => this.handleDataFetch(id)}
                    onCheck={this.handleCheckChange}
                    isSelected={this.isSelected}
                />
                {this.state.TaxonIds.map(item => (
                    <span>{item + ","}</span>
                ))}

            </div>
        )
    }
}

export default DigDownListContainer
