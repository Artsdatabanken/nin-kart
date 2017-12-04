import React from "react";
import {List, ListItem} from 'material-ui/List';

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
