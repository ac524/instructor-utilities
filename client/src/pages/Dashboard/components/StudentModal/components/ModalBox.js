import {
	Modal,
    Columns,
} from "react-bulma-components";

import Fade from "animations/Fade";

export const ModalBox = ({ show, onClose, contentProps, children }) => {
    return (
		<Modal
            className="is-student-modal"
            onClose={onClose}
            show={show}
            closeOnBlur={true}>

            <Fade style={{ width: "100%" }} show={show} duration=".5s">
                <Modal.Content {...contentProps} className="hide-overflow">
			        <Columns gapless className="h-100" breakpoint="desktop">
                        {children}
                    </Columns>
                </Modal.Content>
            </Fade>
        </Modal>
    )
}