import React from "react";
import List, {ListItem} from "material-ui/List";

function FactList(props) {
    return (
        <List>
            {props.items.map(item => (
                    <ListItem
                        primaryText={item.primary}
                        secondaryText={item.secondary}
                        key={item.id}
                        onClick={() => props.onClick(item.id)}
                    />
                ))
            }
        </List>
    );
}

export default FactList;
