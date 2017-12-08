import React from "react";
import {List, ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';


class FilterTreeTopic extends React.Component {

    constructor(props) {
        super(props);

        this.handleCheckChange = props.handleCheckChange.bind(this);
        this.isSelected = props.isSelected.bind(this);
    }
    componentDidMount() {

    }

    mapStructure = (nodes) => {
        if (nodes) {
            return nodes.map(node => (
                <ListItem
                    key={node.id}
                    primaryText={node.name}
                    secondaryText={node.count}
                    leftCheckbox={<Checkbox
                        name={node.id}
                        alt={this.props.filterCode}
                        checked={this.isSelected(this.props.filterCode, node.id)}
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
                <ListItem
                    primaryText={this.props.name}
                    primaryTogglesNestedList={true}
                    nestedItems={this.mapStructure(this.props.items)}
                />
            </List>
        );
    }
}

export default FilterTreeTopic;
