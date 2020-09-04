import React from "react";

import Modal from 'react-bulma-components/lib/components/modal';
import { useDashboardContext, getDashboardAction as gda } from "pages/Dashboard/store";
import { SET_MANAGE_APPS } from "pages/Dashboard/store/actions";

const modalStyles = {
    flexGrow:1,
    borderRadius:"10px",
    width: "calc(100% - 32px)",
    maxHeight: "calc(100vh - 96px)",
    marginTop: "64px",
    padding: "2rem"
}

const ManageApps = () => {

    const [ { isManagingApps }, dispatch ] = useDashboardContext();

    return (
        <Modal
            show={isManagingApps}
            onClose={() => dispatch(gda( SET_MANAGE_APPS, false ))}
            closeOnBlur={true}
            >
            <Modal.Content style={modalStyles} className="has-background-white">
                <div>
                    TESTING!
                </div>
            </Modal.Content>
        </Modal>
    )

}

export default ManageApps;