/* 
* The number of pages with more results at the bottom of the list.
*/

import React from "react";
import { NavLink } from 'react-router-dom'
import { connect } from "react-redux";
import getVisiblePagesLinks from "../selectors/pagesLinks";
import PageLink from "./PageLink";

export const PagesLinks = (props) => {
    return (
        <div className="pagination-wrapper">
            <ul className="pagination">
                {props.pagesLinks.map((pageLink) => (
                    <li key={pageLink}>
                        <PageLink pageNumber={pageLink}/>
                    </li>
                ))}
            </ul>
        </div>
    )
};

const mapStateToProps = (state) => ({
    pagesLinks: getVisiblePagesLinks(state.courses)
});

export default connect(mapStateToProps)(PagesLinks);



