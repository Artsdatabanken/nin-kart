import React from "react";
import {List, ListItem} from 'material-ui/List';

function FilterTree(props) {
    var fylker = [];

    for (var key in props.items) {
        // skip loop if the property is from prototype
        if (!props.items.hasOwnProperty(key)) continue;

        var children = [];
        var obj = props.items[key];
        for (var prop in obj.Areas) {
            //skip loop if the property is from prototype
            if(!obj.Areas.hasOwnProperty(prop)) continue;

            children.push({
                id: prop,
                name: obj.Areas[prop].Name
            })
        }

        fylker.push({
            id: key,
            name: obj.Name,
            children: children
        })
    }

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
            {mapStructure(fylker)}
        </List>
    );
}

export default FilterTree;
