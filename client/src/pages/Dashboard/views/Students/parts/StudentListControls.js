import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navbar from 'react-bulma-components/lib/components/navbar';
import Button from 'react-bulma-components/lib/components/button';
// import { ModalLink } from "components/Modal";
import { useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actions";

const { Item, Menu } = Navbar;

function StudentListControls() {

    const dispatch = useDashboardDispatch();

    return (
        <Navbar active={true} className="has-background-clear">
            <Menu className="has-background-clear is-shadowless">
                <Item renderAs="div">
                    <Button outlined color="primary" onClick={() => dispatch(gda(EDIT_STUDENT, null))}>
                        <span className="icon"><FontAwesomeIcon icon="plus-circle" /></span> <span>Add Student</span>
                    </Button>
                </Item>
            </Menu>
        </Navbar>
    );

}

export default StudentListControls;