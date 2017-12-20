import React from "react";
import {List, ListItem} from 'material-ui/List';
import ActionInfo from 'material-ui/svg-icons/action/info';
import Checkbox from 'material-ui/Checkbox';

function DigDownList(props) {
    return (
        <List>
            <ListItem
                primaryText={props.name}
                />
            {props.items.length ? (
                props.items.map(item => (
                    <ListItem
                        key={item.id}
                        primaryTogglesNestedList={true}
                        rightIcon={<ActionInfo />}
                        primaryText={item.scientificName}
                        secondaryText={item.popularName}
                        onClick={() => props.onClick(item.id)}
                        leftCheckbox={
                            <Checkbox
                                key={item.id}
                                name={""+item.id}
                                alt={props.filterCode}
                                onClick={props.onCheck}
                                checked={props.isSelected(props.filterCode, item.id)}
                            />
                        }
                    />
                ))
            ) : (
                <ListItem
                    primarytext={"Ingen underkategorier"}
                />
            )}
        </List>
    );
}

export default DigDownList;
