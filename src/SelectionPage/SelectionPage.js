import React from 'react';
import DigDownListContainer from "../DigDownList/DigDownListContainer";
import backend from "../backend";

class SelectionPage extends React.Component {


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
                />
            </div>

        )
    }
}

export default SelectionPage;
