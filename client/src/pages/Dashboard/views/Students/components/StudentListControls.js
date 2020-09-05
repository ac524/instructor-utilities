import React from "react";

import {
    Navbar,
    Button
} from "react-bulma-components";

// import { ModalLink } from "components/Modal";
import { useDashboardDispatch, getDashboardAction as gda } from "pages/Dashboard/store";
import { EDIT_STUDENT } from "pages/Dashboard/store/actions";
import Icon from "../../../../../components/Icon";

const { Item, Menu } = Navbar;

function StudentListControls() {

    const dispatch = useDashboardDispatch();

    return (
        <Navbar active={true} className="has-background-clear">
            <Menu className="has-background-clear is-shadowless">
                <Item renderAs="div">
                    <Button outlined color="primary" onClick={() => dispatch(gda(EDIT_STUDENT, null))}>
                        <Icon icon="plus-circle" />
                        <span>Add Student</span>
                    </Button>
                </Item>
            </Menu>
        </Navbar>
    );

}

export default StudentListControls;