import React from "react";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Navbar from 'react-bulma-components/lib/components/navbar';
import { ModalLink } from "components/Modal";

const { Item, Menu, Container } = Navbar;

function StudentListControls() {

    return (
        <Navbar active={true} className="has-background-clear">
            <Menu>
                <Item renderAs="div">
                    <ModalLink>
                        <FontAwesomeIcon icon="plus-circle" /> Add Student
                    </ModalLink>
                </Item>
            </Menu>
        </Navbar>
    );

}

export default StudentListControls;