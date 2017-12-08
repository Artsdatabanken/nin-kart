import React from "react";
import FilterTreeTopic from './FilterTreeTopic'


const FilterTree = props =>
    <div>
        <FilterTreeTopic items={props.redlistTheme}
                         name={"Rødlistetema"}
                         filterCode={"redlistThemeIds"}
                         handleCheckChange={props.handleCheckChange}
                         isSelected={props.isSelected}
        />
        <FilterTreeTopic items={props.redlistCategories}
                         name={"Rødlistekategorier"}
                         filterCode={"redlistCategoryIds"}
                         handleCheckChange={props.handleCheckChange}
                         isSelected={props.isSelected}
        />
        <FilterTreeTopic items={props.areaItems}
                         name={"Administrative områder"}
                         filterCode={"areaIds"}
                         handleCheckChange={props.handleCheckChange}
                         isSelected={props.isSelected}
        />
    </div>

export default FilterTree;
