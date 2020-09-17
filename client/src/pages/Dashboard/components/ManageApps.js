import React, { useState, useEffect } from "react";

import {
    Modal,
    Columns,
    Card,
    Button
} from "react-bulma-components";

import Icon from "components/Icon";
import api from "utils/api";
import { useClassroom, useDashboardContext, getDashboardAction as gda } from "pages/Dashboard/store";
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

export const AppTypeCard = ( { appType } ) => {

    const { _id, apps: installedApps } = useClassroom();
    const isInstalled = installedApps.includes( appType._id );
    const icon = isInstalled ? "check" : "download";
    const color = isInstalled ? "success" : "primary";
    const text = isInstalled ? "Installed" : "Available";

    const toggleAppInstall = async () => {

        if( ! isInstalled ) await api.installApp( _id, appType._id );

    }

    return (
        <Card>
            <Card.Content>
                {appType.name}
            </Card.Content>
            <Card.Footer>
                <Card.Footer.Item renderAs={Button} color={color} className="is-radiusless is-light is-small" onClick={toggleAppInstall}>
                    <Icon icon={icon} />
                    <span>{text}</span>
                </Card.Footer.Item>
            </Card.Footer>
        </Card>
    );

}

const ManageApps = () => {

    const [ { isManagingApps }, dispatch ] = useDashboardContext();
    const [ appTypes, setAppTypes ] = useState([]);

    useEffect(() => {
        
        if( !isManagingApps ) return;

        const loadAppTypes = async () => setAppTypes( (await api.getAppTypes()).data );

        loadAppTypes();

        return () => setAppTypes( [] );

    }, [ isManagingApps, setAppTypes ]);

    return (
        <Modal
            show={isManagingApps}
            onClose={() => dispatch(gda( SET_MANAGE_APPS, false ))}
            closeOnBlur={true}
            >
            <Modal.Content style={modalStyles} className="has-background-white">
                <Columns>
                {
                    appTypes.map(appType => (
                        <Column key={appType.type} {...sizes}>
                            <AppTypeCard appType={appType} />
                        </Column>
                    ))
                }
                </Columns>
            </Modal.Content>
        </Modal>
    )

}

export default ManageApps;