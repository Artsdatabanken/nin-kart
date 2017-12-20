import React from 'react';
import DigDownListContainer from "../DigDownList/DigDownListContainer";
import backend from "../backend";

class SelectionPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // filter:
            areaIds: [],
            natureAreaIds: [],
            redlistThemeIds: [],
            redlistCategoryIds: [],
            TaxonIds: [],
        };

        // this.handleDataFetch = this.taxonFetch.bind(this);
        this.handleCheckChange = this.handleCheckChange.bind(this);
        this.isSelected = this.isSelected.bind(this);
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

    taxonFetch = function(taxonId) {
        backend.loadTaxonTree(taxonId)
            .then(data =>
                this.setState({
                    obj: data.taxonTreeNodes[0],
                    children: data.taxonTreeNodes[0].children,
                    parentId: data.taxonTreeNodes[0].parentId,
                    id: taxonId,
                })
            )
    };

    redlistThemeFetch = function(filter) {
        backend.countsByRedlistTheme(filter)
            .then(data =>
                this.setState({
                    obj: data[0],
                    children: data[0].children,
                    parentId: 0,
                    id: data[0].id,
                })
            )
    };




    render() {
        return (
            <div>
                <DigDownListContainer
                name={"Taxons"}
                filterCode={"TaxonIds"}
                id={0}
                dataFetchFunction={this.taxonFetch}
                handleCheckChange={this.handleCheckChange}
                isSelected={this.isSelected}
                filter={this.state.TaxonIds}
            />
                <DigDownListContainer
                    name={"Rødlistetema"}
                    filterCode={"redlistThemeIds"}
                    id={0}
                    dataFetchFunction={this.redlistThemeFetch}
                    handleCheckChange={this.handleCheckChange}
                    isSelected={this.isSelected}
                    filter={this.state.redlistCategoryIds}
                />
            </div>

        )
    }
}

export default SelectionPage;
