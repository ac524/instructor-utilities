import React from "react";

import {
    Navbar,
    Button
} from "react-bulma-components";

import Icon from "../../../../../components/Icon";
import { useDashboardDispatch, getDashboardAction as gda } from "../../../store";
import { EDIT_STUDENT } from "../../../store/actions";

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