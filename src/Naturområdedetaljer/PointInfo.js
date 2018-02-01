import React from "react";
import List, {ListItem} from "material-ui/List";

function PointInfo(props) {
    if(Object.keys(props.pointInfo).length > 0)
    return(
        <List>
            {Object.keys(props.pointInfo).map(key => (
                    <ListItem
                        primaryText={props.pointInfo[key].name||key}
                        secondaryText={props.pointInfo[key].value}
                        key={key}
                    />
                ))
            }
        </List>
    );
    return null;
}

export default PointInfo;
