import React from "react";
import {List, ListItem} from 'material-ui/List';
//import Chip from 'material-ui/Chip';
import Checkbox from 'material-ui/Checkbox';

function FilterTree(props) {

    const mapApi = (apiNodes) => {
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
                    children: mapApi(obj[props.childname])
                })
            }
            return nodes;
        }

    };

    let areas = mapApi(props.items[props.childname]);

    const mapStructure = (nodes) => {
        if (nodes) {
            return nodes.map(node => (
                <ListItem
                    key={node.id}
                    primaryText={node.name}
                    secondaryText={node.count}
                    //leftCheckbox={<Checkbox />}
                    primaryTogglesNestedList={true}
                    // rightIconButton={
                    //     <Chip>{node.count}</Chip>
                    // }
                    //initiallyOpen //optional
                    nestedItems={mapStructure(node.children)}
                />
            ));
        }
    };

    return (
         <List>
            {mapStructure(areas)}
        </List>
    );
}

export default FilterTree;
