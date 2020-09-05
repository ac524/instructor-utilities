import React from "react";

import {
    Modal,
    Columns,
    Card,
    Button
} from "react-bulma-components";

import { useDashboardContext, getDashboardAction as gda } from "pages/Dashboard/store";
import { SET_MANAGE_APPS } from "pages/Dashboard/store/actions";
import Icon from "../../../components/Icon";


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
            type: "studentselect",
            defaultData: []
        }
    ];

    // const installApp = (app) => {

    // }

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
                                        <Icon icon="plus-circle" />
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