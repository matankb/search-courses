/* 
* Form for dropdown menus (individual item).
*/

import React from "react";
import { connect } from "react-redux";
import { startSetCourses } from "../actions/courses";
import { setCurrentCategory } from "../actions/filters";

export class DropDownItem extends React.Component {
    handleOnClick = () => {
        this.props.startSetCourses(this.props.tags);
        this.props.setCurrentCategory(this.props.name);
        this.props.history.push(`/search/${this.props.purpose}`);
    }

    render () {
        return (
            <div className="category-item" onClick={this.handleOnClick}>{this.props.name}</div>
        )
    }
};

const mapDispatchToProps = (dispatch) => ({
    startSetCourses: (textFilter) => dispatch(startSetCourses(textFilter)),
    setCurrentCategory: (category) => dispatch(setCurrentCategory(category)) 
});

export default connect(undefined, mapDispatchToProps)(DropDownItem);