import React from "react";
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

class FilterTree extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIds: [],
        };

        this.handleCheckChange = this.handleCheckChange.bind(this);
    }

    handleCheckChange(event) {
        const value = event.target.checked;
        const name = event.target.name;

        this.updateFilter(value, 'selectedIds', name);
    }

    updateFilter = (add, type, code) => {
        if (type === undefined) {
            return;
        }
        if (add === true) {
            this.setState({
                [type]: [...this.state[type], code]
            })
        } else {
            this.setState((prevState) => ({
                [type]: prevState[type].filter(i => i !== code)
            }));
        }
    };

    mapApi = (apiNodes) => {
        if (apiNodes) {
            let nodes = [];
            for (let key in apiNodes) {
                // skip loop if the property is from prototype
                if (!apiNodes.hasOwnProperty(key)) continue;

                let obj = apiNodes[key];

                nodes.push({
                    id: key,
                    name: obj.Name,
                    count: obj.Count || obj.NatureAreaCount,
                    children: this.mapApi(obj[this.props.childname])
                })
            }
            return nodes;
        }
    };

    areas = this.mapApi(this.props.items[this.props.childname]);

    mapStructure = (nodes) => {
        if (nodes) {
            return nodes.map(node => (
                <ListItem
                    key={node.id}
                    primaryText={node.name}
                    secondaryText={node.count}
                    leftCheckbox={<Checkbox
                        name={node.id}
                        checked={this.state['selectedIds'].indexOf(node.id) >= 0}
                        onCheck={this.handleCheckChange}/>}
                    primaryTogglesNestedList={true}
                    // rightIconButton={
                    //     <Chip>{node.count}</Chip>
                    // }
                    //initiallyOpen //optional
                    nestedItems={this.mapStructure(node.children)}
                />
            ));
        }
    };

    render() {
        return (
            <List>
                {this.mapStructure(this.areas)}
            </List>
        );
    }
}

export default FilterTree;
