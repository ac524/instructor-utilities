import React from "react";

import Modal from 'react-bulma-components/lib/components/modal';
import Columns from 'react-bulma-components/lib/components/columns';
import Card from 'react-bulma-components/lib/components/card';
import Button from 'react-bulma-components/lib/components/button'
;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useDashboardContext, getDashboardAction as gda } from "pages/Dashboard/store";
import { SET_MANAGE_APPS } from "pages/Dashboard/store/actions";


const { Column } = Columns;

const modalStyles = {
    flexGrow:1,
    borderRadius:"10px",
    width: "calc(100% - 32px)",
    maxHeight: "calc(100vh - 96px)",
    marginTop: "64px",
    padding: "2rem"
}

const sizes = {
    tablet: {size: 'one-third'},
    desktop: {size: 'one-quarter'},
    widescreen: {size: 'one-fifth'}
}

const ManageApps = () => {

    const [ { isManagingApps }, dispatch ] = useDashboardContext();

    const apps = [
        {
            name: "Student Picker",
            type: "studentselect"
        }
    ];

    return (
        <Modal
            show={isManagingApps}
            onClose={() => dispatch(gda( SET_MANAGE_APPS, false ))}
            closeOnBlur={true}
            >
            <Modal.Content style={modalStyles} className="has-background-white">
                <Columns>
                {
                    apps.map(app => (
                        <Column {...sizes}>
                            <Card key={app.type}>
                                <Card.Content>
                                    {app.name}
                                </Card.Content>
                                <Card.Footer>
                                    <Card.Footer.Item renderAs={Button} color="primary" className="is-radiusless is-light">
                                        <span class="icon">
                                            <FontAwesomeIcon icon="plus-circle" />
                                        </span>
                                        <span>Install</span>
                                    </Card.Footer.Item>
                                </Card.Footer>
                            </Card>
                        </Column>
                    ))
                }
                </Columns>
            </Modal.Content>
        </Modal>
    )

}

export default ManageApps;